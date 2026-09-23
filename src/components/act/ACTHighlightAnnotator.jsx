import React, { useState, useRef, useEffect } from "react";
import { Highlighter, Edit3, Trash2, StickyNote, Plus, X, Check } from "lucide-react";

/**
 * ACTHighlightAnnotator Component
 * Official ACT Highlighting & Sticky Note Annotation System.
 * Enables students to select key phrases in reading & science passages, apply multi-color highlights,
 * and attach inline sticky notes.
 */
export default function ACTHighlightAnnotator({
  passageId,
  passageTitle,
  passageText,
  highlights = [],
  onUpdateHighlights
}) {
  const containerRef = useRef(null);
  const [selectedText, setSelectedText] = useState("");
  const [selectionRange, setSelectionRange] = useState(null);
  const [menuPos, setMenuPos] = useState(null);
  const [activeNoteModal, setActiveNoteModal] = useState(null);
  const [noteInputValue, setNoteInputValue] = useState("");

  // Detect Text Selection inside container
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setMenuPos(null);
      setSelectedText("");
      return;
    }

    const text = selection.toString().trim();
    if (text.length > 2 && containerRef.current && containerRef.current.contains(selection.anchorNode)) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      setSelectedText(text);
      setSelectionRange(range);
      setMenuPos({
        top: rect.top - containerRect.top - 45,
        left: Math.max(10, rect.left - containerRect.left + rect.width / 2 - 100)
      });
    } else {
      setMenuPos(null);
    }
  };

  const addHighlight = (color) => {
    if (!selectedText) return;

    const newHighlight = {
      id: `hl_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      passageId,
      text: selectedText,
      color, // 'yellow', 'cyan', 'pink'
      note: "",
      createdAt: new Date().toISOString()
    };

    const updated = [...highlights, newHighlight];
    onUpdateHighlights(updated);
    setMenuPos(null);
    setSelectedText("");
    window.getSelection()?.removeAllRanges();
  };

  const addNoteToHighlight = () => {
    if (!selectedText) return;
    const hlId = `hl_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const newHighlight = {
      id: hlId,
      passageId,
      text: selectedText,
      color: "yellow",
      note: "Sticky Note: ",
      createdAt: new Date().toISOString()
    };

    const updated = [...highlights, newHighlight];
    onUpdateHighlights(updated);
    setMenuPos(null);
    setSelectedText("");
    window.getSelection()?.removeAllRanges();
    setActiveNoteModal(hlId);
    setNoteInputValue("");
  };

  const saveNote = (hlId) => {
    const updated = highlights.map((h) => (h.id === hlId ? { ...h, note: noteInputValue } : h));
    onUpdateHighlights(updated);
    setActiveNoteModal(null);
    setNoteInputValue("");
  };

  const removeHighlight = (hlId) => {
    const updated = highlights.filter((h) => h.id !== hlId);
    onUpdateHighlights(updated);
  };

  const clearAllPassageHighlights = () => {
    const updated = highlights.filter((h) => h.passageId !== passageId);
    onUpdateHighlights(updated);
  };

  const currentPassageHighlights = highlights.filter((h) => h.passageId === passageId);

  // Helper to render text with highlights
  const renderAnnotatedText = () => {
    if (!passageText) return null;
    if (currentPassageHighlights.length === 0) {
      return <div style={{ color: "#e2e8f0", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-line" }}>{passageText}</div>;
    }

    // Build rendered chunks by searching highlights in passageText
    let segments = [{ text: passageText, highlight: null }];

    currentPassageHighlights.forEach((hl) => {
      const nextSegments = [];
      segments.forEach((seg) => {
        if (seg.highlight) {
          nextSegments.push(seg);
          return;
        }

        const idx = seg.text.indexOf(hl.text);
        if (idx !== -1) {
          const before = seg.text.slice(0, idx);
          const match = seg.text.slice(idx, idx + hl.text.length);
          const after = seg.text.slice(idx + hl.text.length);

          if (before) nextSegments.push({ text: before, highlight: null });
          nextSegments.push({ text: match, highlight: hl });
          if (after) nextSegments.push({ text: after, highlight: null });
        } else {
          nextSegments.push(seg);
        }
      });
      segments = nextSegments;
    });

    return (
      <div style={{ color: "#e2e8f0", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-line" }}>
        {segments.map((seg, i) => {
          if (!seg.highlight) return <span key={i}>{seg.text}</span>;

          const colorMap = {
            yellow: "rgba(250, 204, 21, 0.35)",
            cyan: "rgba(56, 189, 248, 0.35)",
            pink: "rgba(244, 114, 182, 0.35)"
          };

          const hl = seg.highlight;
          return (
            <span
              key={i}
              style={{
                background: colorMap[hl.color] || colorMap.yellow,
                borderBottom: `2px solid ${hl.color === "cyan" ? "#38bdf8" : hl.color === "pink" ? "#f472b6" : "#facc15"}`,
                borderRadius: 4,
                padding: "2px 4px",
                position: "relative",
                cursor: "pointer"
              }}
              title={hl.note ? `Note: ${hl.note}` : "Click to view options"}
            >
              {seg.text}
              {hl.note && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveNoteModal(hl.id);
                    setNoteInputValue(hl.note);
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#facc15",
                    color: "#0f172a",
                    border: "none",
                    borderRadius: "50%",
                    width: 16,
                    height: 16,
                    fontSize: 9,
                    fontWeight: 900,
                    marginLeft: 4,
                    cursor: "pointer",
                    verticalAlign: "super"
                  }}
                >
                  📝
                </button>
              )}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ position: "relative" }} ref={containerRef} onMouseUp={handleMouseUp}>
      {/* Passage Header Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: "#38bdf8", textTransform: "uppercase" }}>
          {passageTitle || "Passage Text"}
        </div>
        {currentPassageHighlights.length > 0 && (
          <button
            onClick={clearAllPassageHighlights}
            style={{
              background: "rgba(239, 68, 68, 0.12)",
              color: "#f87171",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: 8,
              padding: "4px 10px",
              fontSize: 11,
              fontWeight: 800,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 4
            }}
          >
            <Trash2 size={12} /> Clear Passage Highlights ({currentPassageHighlights.length})
          </button>
        )}
      </div>

      {/* Main Passage Text Rendering */}
      {renderAnnotatedText()}

      {/* Floating Selection Tool Menu */}
      {menuPos && (
        <div
          style={{
            position: "absolute",
            top: menuPos.top,
            left: menuPos.left,
            background: "#0f172a",
            border: "1px solid #38bdf8",
            borderRadius: 12,
            padding: "6px 10px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
            zIndex: 999
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 900, color: "#94a3b8" }}>HIGHLIGHT:</span>
          <button
            onClick={() => addHighlight("yellow")}
            style={{ background: "#facc15", width: 22, height: 22, borderRadius: "50%", border: "none", cursor: "pointer" }}
            title="Yellow Highlight"
          />
          <button
            onClick={() => addHighlight("cyan")}
            style={{ background: "#38bdf8", width: 22, height: 22, borderRadius: "50%", border: "none", cursor: "pointer" }}
            title="Cyan Highlight"
          />
          <button
            onClick={() => addHighlight("pink")}
            style={{ background: "#f472b6", width: 22, height: 22, borderRadius: "50%", border: "none", cursor: "pointer" }}
            title="Pink Highlight"
          />
          <div style={{ height: 16, width: 1, background: "rgba(255,255,255,0.2)" }} />
          <button
            onClick={addNoteToHighlight}
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "#ffffff",
              border: "none",
              borderRadius: 8,
              padding: "4px 8px",
              fontSize: 11,
              fontWeight: 800,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4
            }}
          >
            <StickyNote size={12} color="#facc15" /> Add Sticky Note
          </button>
        </div>
      )}

      {/* Active Sticky Note Editor Modal */}
      {activeNoteModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              background: "#0f172a",
              border: "2px solid #facc15",
              borderRadius: 20,
              padding: 24,
              width: 380,
              boxShadow: "0 20px 40px rgba(0,0,0,0.8)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#facc15", fontWeight: 900, fontSize: 14 }}>
                <StickyNote size={18} /> ACT STICKY ANNOTATION
              </div>
              <X size={18} style={{ cursor: "pointer", color: "#94a3b8" }} onClick={() => setActiveNoteModal(null)} />
            </div>

            <textarea
              value={noteInputValue}
              onChange={(e) => setNoteInputValue(e.target.value)}
              placeholder="Type your study note or passage commentary here..."
              style={{
                width: "100%",
                height: 120,
                background: "#020617",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 12,
                padding: 12,
                color: "#ffffff",
                fontSize: 13,
                outline: "none",
                resize: "none",
                marginBottom: 16
              }}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => {
                  removeHighlight(activeNoteModal);
                  setActiveNoteModal(null);
                }}
                style={{
                  background: "rgba(239, 68, 68, 0.15)",
                  color: "#f87171",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  borderRadius: 10,
                  padding: "8px 14px",
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                }}
              >
                <Trash2 size={14} /> Remove Highlight
              </button>
              <button
                onClick={() => saveNote(activeNoteModal)}
                style={{
                  background: "linear-gradient(135deg, #0284c7, #7c3aed)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 10,
                  padding: "8px 18px",
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                }}
              >
                <Check size={14} /> Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
