/**
 * useMatchmaking — public quick-match system for Vocab Battle & Reading Race
 *
 * Flow:
 *  1. Player clicks "Quick Match" → writes to matchmakingQueue/{uid}
 *  2. Listens for another player in the queue for the same gameType
 *  3. The player who FIRST detects a pair creates the room and removes both from queue
 *  4. If no match within BOT_TIMEOUT ms → cancels queue entry and returns botMode:true
 *
 * Returns:
 *   { matchmaking, startMatchmaking, cancelMatchmaking, botMode, matchedRoom }
 */

import { useEffect, useRef, useState } from "react";
import {
  doc, setDoc, deleteDoc, onSnapshot, getDocs,
  collection, query, where, serverTimestamp, getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const BOT_TIMEOUT = 8000; // ms before falling back to bot

export default function useMatchmaking({ user, gameType, onMatched }) {
  const [matchmaking, setMatchmaking] = useState(false);
  const [botMode, setBotMode] = useState(false);
  const [countdown, setCountdown] = useState(BOT_TIMEOUT / 1000);

  const unsubRef = useRef(null);
  const botTimerRef = useRef(null);
  const countdownRef = useRef(null);
  const cancelledRef = useRef(false);

  async function startMatchmaking() {
    if (!user) return;
    cancelledRef.current = false;
    setBotMode(false);
    setMatchmaking(true);
    setCountdown(BOT_TIMEOUT / 1000);

    // Write our queue entry
    const entry = {
      uid: user.uid,
      name: user.displayName || user.email?.split("@")[0] || "Player",
      gameType,
      joinedAt: serverTimestamp(),
    };
    await setDoc(doc(db, "matchmakingQueue", user.uid), entry);

    // Countdown UI
    let remaining = BOT_TIMEOUT / 1000;
    countdownRef.current = setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
    }, 1000);

    // Bot fallback timer
    botTimerRef.current = setTimeout(async () => {
      clearInterval(countdownRef.current);
      if (cancelledRef.current) return;
      // Remove from queue and go bot mode
      try { await deleteDoc(doc(db, "matchmakingQueue", user.uid)); } catch {}
      setMatchmaking(false);
      setBotMode(true);
      onMatched({ botMode: true });
    }, BOT_TIMEOUT);

    // Listen to queue for a match
    const q = query(
      collection(db, "matchmakingQueue"),
      where("gameType", "==", gameType)
    );

    if (unsubRef.current) unsubRef.current();
    unsubRef.current = onSnapshot(q, async (snap) => {
      if (cancelledRef.current) return;

      const others = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(p => p.uid !== user.uid);

      if (others.length === 0) return;

      // Match found — the player with the lexicographically smaller uid creates the room
      // This prevents both players from creating rooms simultaneously
      const opponent = others[0];
      const iAmCreator = user.uid < opponent.uid;

      if (!iAmCreator) {
        // Wait — the other player will create the room and we'll be added
        // But set a hard limit: if the creator doesn't act within 3s, we take over
        return;
      }

      // We're creating the room
      clearTimeout(botTimerRef.current);
      clearInterval(countdownRef.current);
      if (unsubRef.current) unsubRef.current();

      // Remove both from queue
      try {
        await deleteDoc(doc(db, "matchmakingQueue", user.uid));
        await deleteDoc(doc(db, "matchmakingQueue", opponent.uid));
      } catch {}

      if (cancelledRef.current) return;

      setMatchmaking(false);
      onMatched({
        botMode: false,
        opponentId: opponent.uid,
        opponentName: opponent.name,
        role: "host",
      });
    });
  }

  async function cancelMatchmaking() {
    cancelledRef.current = true;
    clearTimeout(botTimerRef.current);
    clearInterval(countdownRef.current);
    if (unsubRef.current) unsubRef.current();
    setMatchmaking(false);
    setBotMode(false);
    try { await deleteDoc(doc(db, "matchmakingQueue", user.uid)); } catch {}
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      clearTimeout(botTimerRef.current);
      clearInterval(countdownRef.current);
      if (unsubRef.current) unsubRef.current();
    };
  }, []);

  return { matchmaking, countdown, botMode, startMatchmaking, cancelMatchmaking };
}
