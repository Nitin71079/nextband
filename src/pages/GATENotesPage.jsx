import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronLeft, ArrowRight, CheckCircle2, AlertCircle, FileText, Layers, Play } from "lucide-react";
import { GATE_CONFIGS } from "../config/gateConfig";

const GATE_REVISION_NOTES = {
  CS: [
    {
      subject: "Operating Systems",
      chapters: [
        {
          title: "Process Synchronization & Deadlocks",
          topics: [
            {
              name: "Semaphores & Peterson Solution",
              notes: `
### Key Concepts:
1. **Critical Section Problem:** Mutual Exclusion, Progress, Bounded Waiting.
2. **Peterson's Solution:** Two-process solution using \`flag[2]\` array and \`turn\` variable. Guarantees all 3 criteria on modern atomic architectures.
3. **Counting vs Binary Semaphores:**
   - Counting Semaphore $S \\ge 0$: initialized to $N$.
   - $P(S)$ or $wait(S)$: Decrements $S$. If $S < 0$, process blocks.
   - $V(S)$ or $signal(S)$: Increments $S$. If $S \\le 0$, unblocks a waiting process.

### Common GATE Formulae:
- **Maximum Processes without Deadlock:** 
  If $N$ processes request at most $K$ resources of type $R$, the minimum number of resources to prevent deadlock is:
  $$R_{min} = N \\times (K - 1) + 1$$

### Common Mistakes:
- Forgetting that counting semaphores initialized to $S$ can block after $S$ successful $wait()$ calls.
- Mixing up deadlock prevention (violating one of 4 Coffman conditions) with deadlock avoidance (Banker's Algorithm safe state).
              `
            },
            {
              name: "Paging & Virtual Memory",
              notes: `
### Key Concepts:
1. **Page Table Size:**
   $$\\text{Page Table Size} = \\text{Number of Pages} \\times \\text{Page Table Entry (PTE) Size}$$
2. **Number of Pages:**
   $$\\text{Number of Pages} = \\frac{\\text{Virtual Address Space Size}}{\\text{Page Size}}$$
3. **Multi-level Paging:**
   For a $k$-level page table, address translation requires $k$ memory accesses for the page table + 1 memory access for data = $k+1$ total memory accesses (without TLB).

### Effective Memory Access Time (EMAT):
$$\\text{EMAT} = h \\times (t_{tlb} + t_{mem}) + (1 - h) \\times (t_{tlb} + (k + 1) \\times t_{mem})$$
where $h$ is TLB hit ratio and $k$ is page table levels.
              `
            }
          ]
        }
      ]
    },
    {
      subject: "Data Structures & Algorithms",
      chapters: [
        {
          title: "Graph Algorithms & Asymptotics",
          topics: [
            {
              name: "Dijkstra & Kruskal Algorithms",
              notes: `
### Key Formulae & Recurrences:
- **Dijkstra's Shortest Path:** $O((V + E) \\log V)$ using Fibonacci heap. Fails on negative weight edges.
- **Kruskal's MST:** $O(E \\log E)$ or $O(E \\log V)$ sorting edge list.
- **Master Theorem:**
  For $T(n) = a T(n/b) + f(n)$ where $a \\ge 1, b > 1$:
  - If $f(n) = O(n^{\\log_b a - \\epsilon})$, then $T(n) = \\Theta(n^{\\log_b a})$.
  - If $f(n) = \\Theta(n^{\\log_b a})$, then $T(n) = \\Theta(n^{\\log_b a} \\log n)$.
  - If $f(n) = \\Omega(n^{\\log_b a + \\epsilon})$, then $T(n) = \\Theta(f(n))$.
              `
            }
          ]
        }
      ]
    }
  ],
  DA: [
    {
      subject: "Machine Learning & Statistics",
      chapters: [
        {
          title: "Linear Algebra & Bayes Theorem",
          topics: [
            {
              name: "Eigenvalues & SVD",
              notes: `
### Key Concepts:
1. **Eigenvalue Equation:** $A v = \\lambda v$.
2. **Properties of Eigenvalues:**
   - $\\sum \\lambda_i = \\text{Trace}(A)$
   - \\prod \\lambda_i = \\det(A)
3. **Singular Value Decomposition (SVD):**
   $$A = U \\Sigma V^T$$
   where $U$ contains eigenvectors of $A A^T$, $V$ contains eigenvectors of $A^T A$, and $\\Sigma$ contains singular values $\\sigma_i = \\sqrt{\\lambda_i}$.
              `
            }
          ]
        }
      ]
    }
  ]
};

export default function GATENotesPage() {
  const navigate = useNavigate();
  const [selectedPaper, setSelectedPaper] = useState("CS");
  const [selectedTopicIdx, setSelectedTopicIdx] = useState(0);

  const paperNotes = useMemo(() => {
    return GATE_REVISION_NOTES[selectedPaper] || GATE_REVISION_NOTES.CS;
  }, [selectedPaper]);

  const allTopics = useMemo(() => {
    const list = [];
    paperNotes.forEach((subj) => {
      subj.chapters.forEach((chap) => {
        chap.topics.forEach((t) => {
          list.push({ subject: subj.subject, chapter: chap.title, ...t });
        });
      });
    });
    return list;
  }, [paperNotes]);

  const currentTopic = allTopics[selectedTopicIdx] || allTopics[0];

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 0%, #0369a1 0%, #0f172a 70%)", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <button
            onClick={() => navigate("/gate")}
            style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "8px 16px", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <ChevronLeft size={16} /> Return to GATE Center
          </button>

          <span style={{ background: "rgba(168,85,247,0.2)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.4)", padding: "4px 14px", borderRadius: 999, fontSize: 12, fontWeight: 900 }}>
            OFFICIAL GATE REVISION &amp; NOTES REPOSITORY
          </span>
        </div>

        {/* Paper Selector Tabs */}
        <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
          {["CS", "DA"].map((p) => (
            <button
              key={p}
              onClick={() => {
                setSelectedPaper(p);
                setSelectedTopicIdx(0);
              }}
              style={{
                background: selectedPaper === p ? "linear-gradient(135deg, #0284c7, #7c3aed)" : "rgba(255,255,255,0.06)",
                color: "#ffffff",
                border: selectedPaper === p ? "1px solid #38bdf8" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14,
                padding: "10px 22px",
                fontSize: 14,
                fontWeight: 800,
                cursor: "pointer"
              }}
            >
              GATE {p} Revision Notes
            </button>
          ))}
        </div>

        {/* Main Content Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 24 }}>

          {/* Left Topic Sidebar */}
          <div style={{ background: "rgba(15,23,42,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 900, color: "#ffffff", marginBottom: 14, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Topics List ({allTopics.length})
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {allTopics.map((t, idx) => {
                const isSelected = idx === selectedTopicIdx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedTopicIdx(idx)}
                    style={{
                      background: isSelected ? "rgba(56,189,248,0.18)" : "rgba(255,255,255,0.04)",
                      border: isSelected ? "1px solid #38bdf8" : "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 12,
                      padding: 12,
                      cursor: "pointer"
                    }}
                  >
                    <div style={{ fontSize: 11, color: "#38bdf8", fontWeight: 800 }}>{t.subject}</div>
                    <div style={{ fontSize: 13, fontWeight: isSelected ? 800 : 500, color: isSelected ? "#ffffff" : "#cbd5e1", marginTop: 2 }}>{t.name}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Notes Viewer */}
          <div style={{ background: "rgba(15,23,42,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 32 }}>
            <div style={{ marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 16 }}>
              <span style={{ background: "rgba(56,189,248,0.2)", color: "#38bdf8", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 900 }}>
                {currentTopic?.subject} · {currentTopic?.chapter}
              </span>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: "#ffffff", marginTop: 8 }}>
                {currentTopic?.name}
              </h2>
            </div>

            {/* Markdown/Text Content */}
            <div style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.7, whiteSpace: "pre-wrap", fontFamily: "Inter, sans-serif" }}>
              {currentTopic?.notes}
            </div>

            {/* Action Bar: Practice Related Questions */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, marginTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>Ready to test this topic?</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#ffffff" }}>Attempt related questions in GATE Mock 001</div>
              </div>

              <button
                onClick={() => navigate("/gate")}
                style={{ background: "linear-gradient(135deg, #0284c7, #7c3aed)", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px 24px", fontWeight: 900, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                Launch Mock Exam <Play size={16} fill="#ffffff" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
