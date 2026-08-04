import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebase";
import { useAuth } from "../context/AuthContext";
import useMobile from "../hooks/useMobile";
import toast from "react-hot-toast";
import { getOrCreateReferralCode, applyReferralCode } from "../services/referralService";
import { Gift, Copy, Check, DollarSign, Award, Users, ArrowRight } from "lucide-react";

export default function Referrals() {
  const { user } = useAuth();
  const isMobile = useMobile();

  const [referralCode, setReferralCode] = useState("");
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [earningsBalance, setEarningsBalance] = useState(0);
  const [referralHistory, setReferralHistory] = useState([]);
  const [inputCode, setInputCode] = useState("");
  const [applying, setApplying] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadReferralData();
  }, [user]);

  async function loadReferralData() {
    try {
      const code = await getOrCreateReferralCode(user);
      setReferralCode(code);

      const db = getFirestore(app);
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setTotalReferrals(data.totalReferrals || 0);
        setEarningsBalance(data.referralBalance || 0);
        setReferralHistory(data.referralHistory || []);
      }
    } catch (error) {
      console.error("Error loading referral data:", error);
    }
  }

  function copyCode() {
    if (!referralCode) return;
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast.success("Referral code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleRedeemCode(e) {
    e.preventDefault();
    if (!inputCode.trim()) {
      toast.error("Please enter a referral code.");
      return;
    }
    setApplying(true);
    try {
      const result = await applyReferralCode(user.uid, inputCode.trim());
      toast.success(`Referral code ${result.code} applied successfully!`);
      setInputCode("");
      loadReferralData();
    } catch (err) {
      toast.error(err.message || "Failed to apply referral code.");
    } finally {
      setApplying(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: isMobile ? "30px 15px" : "60px 30px",
        fontFamily: "inherit",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* HEADER */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#e0f2fe", color: "#0369a1", padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: "800", marginBottom: "12px" }}>
            <Gift size={16} /> 20% COMMISSION REFERRAL PROGRAM
          </div>
          <h1 style={{ fontSize: isMobile ? "36px" : "48px", fontWeight: "900", color: "#0f172a" }}>
            Invite Friends & Earn Rewards
          </h1>
          <p style={{ color: "#64748b", marginTop: "8px", fontSize: "18px", maxWidth: "650px" }}>
            Share your unique referral code. Whenever a friend joins and purchases their first Premium plan, you get <strong>20% of their plan price</strong> directly added to your balance!
          </p>
        </div>

        {/* TOP CARDS GRID */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
          
          {/* CODE CARD */}
          <div
            style={{
              background: "#ffffff",
              padding: "32px",
              borderRadius: "24px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              border: "1px solid #e2e8f0",
            }}
          >
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>
              Your Unique Referral Code
            </h2>

            <div
              style={{
                background: "#f1f5f9",
                border: "2px dashed #0284c7",
                padding: "20px",
                borderRadius: "18px",
                fontSize: "28px",
                fontWeight: "900",
                color: "#0284c7",
                letterSpacing: "1px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              {referralCode || "Generating..."}
            </div>

            <button
              onClick={copyCode}
              style={{
                background: copied ? "#16a34a" : "linear-gradient(135deg, #0284c7, #2563eb)",
                border: "none",
                padding: "16px",
                borderRadius: "14px",
                color: "white",
                fontWeight: "800",
                fontSize: "16px",
                cursor: "pointer",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 14px rgba(2, 132, 199, 0.3)",
              }}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Code Copied!" : "Copy Referral Code"}
            </button>
          </div>

          {/* EARNINGS STATS CARD */}
          <div
            style={{
              background: "linear-gradient(135deg, #0891b2, #1d4ed8)",
              color: "white",
              padding: "32px",
              borderRadius: "24px",
              boxShadow: "0 10px 30px rgba(8, 145, 178, 0.25)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: "14px", fontWeight: "700", opacity: 0.9, textTransform: "uppercase", letterSpacing: "1px" }}>
                Total 20% Earnings Balance
              </div>
              <h1 style={{ fontSize: "56px", fontWeight: "900", margin: "10px 0" }}>
                ₹{earningsBalance.toFixed(2)}
              </h1>
            </div>

            <div style={{ display: "flex", gap: "20px", borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "16px", marginTop: "16px" }}>
              <div>
                <span style={{ fontSize: "12px", opacity: 0.85 }}>Total Friends Invited</span>
                <div style={{ fontSize: "22px", fontWeight: "800" }}>{totalReferrals} Students</div>
              </div>
              <div>
                <span style={{ fontSize: "12px", opacity: 0.85 }}>Commission Rate</span>
                <div style={{ fontSize: "22px", fontWeight: "800" }}>20% Per Sub</div>
              </div>
            </div>
          </div>
        </div>

        {/* REDEEM REFERRAL CODE SECTION */}
        <div
          style={{
            background: "#ffffff",
            padding: isMobile ? "24px" : "32px",
            borderRadius: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            marginBottom: "32px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
            Have a Friend's Referral Code?
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>
            Redeem their referral code here to link accounts before upgrading to Premium.
          </p>

          <form onSubmit={handleRedeemCode} style={{ display: "flex", gap: "12px", maxWidth: "540px" }}>
            <input
              type="text"
              placeholder="Enter Referral Code (e.g. REF-ABC123)"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              style={{
                flex: 1,
                padding: "14px 16px",
                borderRadius: "14px",
                border: "1px solid #cbd5e1",
                fontSize: "15px",
                outline: "none",
                fontWeight: "600",
              }}
            />
            <button
              type="submit"
              disabled={applying}
              style={{
                background: "#0891b2",
                color: "#ffffff",
                border: "none",
                borderRadius: "14px",
                padding: "14px 24px",
                fontWeight: "800",
                fontSize: "15px",
                cursor: applying ? "not-allowed" : "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {applying ? "Applying..." : "Redeem Code"}
            </button>
          </form>
        </div>

        {/* EARNINGS HISTORY TABLE */}
        {referralHistory.length > 0 && (
          <div
            style={{
              background: "#ffffff",
              padding: isMobile ? "24px" : "32px",
              borderRadius: "24px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              marginBottom: "32px",
            }}
          >
            <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "20px" }}>
              20% Commission History
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {referralHistory.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "#f8fafc",
                    padding: "16px",
                    borderRadius: "14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: "700", color: "#0f172a" }}>
                      Referral for {item.planName || "Premium Plan"}
                    </div>
                    <span style={{ fontSize: "12px", color: "#64748b" }}>
                      Referred: {item.referredUserEmail || "Friend"} · {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: "800", color: "#16a34a" }}>
                    +₹{item.commissionAmount} (20%)
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}