"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

/* ─── feature data ─────────────────────────────────────── */
const features = [
  {
    icon: "⚡",
    iconBg: "#FFF7ED",
    title: "Attendance in One Click",
    description:
      "What used to take 10 minutes manually now takes seconds. Professor taps once — every student in the classroom is marked in real time.",
    badge: "10 Seconds",
    badgeIcon: "⏱",
  },
  {
    icon: "🛡️",
    iconBg: "#F0FDF4",
    title: "Proxy-Proof Face Recognition",
    description:
      "AI-powered liveness detection ensures only the real, physically present student gets marked. Photos and spoofing attempts are rejected instantly.",
  },
  {
    icon: "📊",
    iconBg: "#EFF6FF",
    title: "Real-Time Campus Dashboard",
    description:
      "Get a live, bird's-eye view of attendance across departments, batches, and classrooms — all in one dashboard.",
  },
  {
    icon: "🚨",
    iconBg: "#FEF2F2",
    title: "At-Risk Student Alerts",
    description:
      "When a student's attendance drops below threshold, professors and parents are notified automatically — reducing dropouts before they happen.",
  },
  {
    icon: "🎓",
    iconBg: "#F5F3FF",
    title: "NAAC Criteria 2, 5, 6, 7 Ready",
    description:
      "Built to support Teaching-Learning (2), Student Support (5), Governance (6), and Institutional Values (7) — making NAAC documentation effortless.",
  },
  {
    icon: "📡",
    iconBg: "#ECFDF5",
    title: "Works in Every Classroom",
    description:
      "IoT module creates a secure local network. No internet dependency. Plug & play setup in any classroom.",
  },
];

/* ─── auto-looping illustrations ──────────────────────── */

function IllustrationAttendance({ isActive }: { isActive: boolean }) {
  const students = [
    { name: "Arjun P.", init: "A", bg: "#DBEAFE", color: "#2563EB" },
    { name: "Sneha K.", init: "S", bg: "#D1FAE5", color: "#16A34A" },
    { name: "Ravi M.", init: "R", bg: "#FEE2E2", color: "#DC2626" },
    { name: "Priya D.", init: "P", bg: "#F3E8FF", color: "#7C3AED" },
  ];
  const [phase, setPhase] = useState<"idle" | "marking" | "done">("idle");
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);
  const [timer, setTimer] = useState(10);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive) {
      setPhase("idle");
      setChecked([false, false, false, false]);
      setTimer(10);
      return;
    }

    const runLoop = () => {
      // Phase 1: idle → marking
      setPhase("idle");
      setChecked([false, false, false, false]);
      setTimer(10);

      const startDelay = setTimeout(() => {
        setPhase("marking");
        // Mark students one by one
        students.forEach((_, i) => {
          setTimeout(() => {
            setChecked((prev) => { const n = [...prev]; n[i] = true; return n; });
          }, i * 500);
        });
        // Countdown timer
        let t = 10;
        const timerInterval = setInterval(() => {
          t -= 1;
          setTimer(t);
          if (t <= 0) clearInterval(timerInterval);
        }, 250);

        // Phase 2: done
        setTimeout(() => {
          clearInterval(timerInterval);
          setTimer(0);
          setPhase("done");
        }, students.length * 500 + 200);
      }, 800);

      return startDelay;
    };

    const startDelay = runLoop();
    // Full loop: 800ms idle + ~2200ms marking + 2500ms hold done = ~5500ms
    const loopInterval = setInterval(() => {
      runLoop();
    }, 5500);

    return () => {
      clearTimeout(startDelay);
      clearInterval(loopInterval);
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const btnBg = phase === "done"
    ? "linear-gradient(135deg, #16A34A, #22C55E)"
    : phase === "marking"
      ? "linear-gradient(135deg, #F59E0B, #FBBF24)"
      : "linear-gradient(135deg, #2F54FF, #3B82F6)";

  const btnText = phase === "done" ? "✓ All Marked" : phase === "marking" ? "⏳ Marking..." : "▶ Start Attendance";

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: 200, background: "#fff", borderRadius: 20, border: "2px solid #E5E7EB",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ background: "#F8FAFC", padding: "8px 12px", borderBottom: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 9, color: "#64748B", fontWeight: 600 }}>Computer Science 301</span>
          <span style={{ fontSize: 8, color: "#94A3B8" }}>10:00 AM</span>
        </div>
        {/* Timer bar */}
        {phase !== "idle" && (
          <div style={{
            textAlign: "center", padding: "5px 0",
            background: phase === "done" ? "#F0FDF4" : timer <= 3 ? "#FEF2F2" : "#F0F9FF",
            transition: "background 0.3s",
          }}>
            <span style={{
              fontSize: 16, fontWeight: 800,
              color: phase === "done" ? "#16A34A" : timer <= 3 ? "#DC2626" : "#2F54FF",
              fontVariantNumeric: "tabular-nums",
            }}>{timer}s</span>
          </div>
        )}
        {/* Student list */}
        <div style={{ padding: "6px 12px" }}>
          {students.map((s, i) => (
            <div key={s.name} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0",
              borderBottom: i < students.length - 1 ? "1px solid #F1F5F9" : "none",
              opacity: phase === "marking" && !checked[i] ? 0.45 : 1,
              transition: "opacity 0.3s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: "50%", background: s.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 8, fontWeight: 700, color: s.color,
                }}>{s.init}</div>
                <span style={{ fontSize: 9, color: "#374151", fontWeight: 500 }}>{s.name}</span>
              </div>
              <div style={{
                width: 16, height: 16, borderRadius: "50%",
                background: checked[i] ? "#D1FAE5" : "#F1F5F9",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: checked[i] ? "scale(1.1)" : "scale(0.85)",
              }}>
                {checked[i] ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 5l2 2 3.5-3.5" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D1D5DB" }} />
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Button */}
        <div style={{ padding: "8px 12px 12px" }}>
          <div style={{
            width: "100%", background: btnBg, color: "#fff", fontSize: 9, fontWeight: 700,
            textAlign: "center", padding: "9px 0", borderRadius: 10,
            boxShadow: "0 4px 12px rgba(47,84,255,0.2)",
            transition: "all 0.4s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
          }}>
            {btnText}
          </div>
        </div>
      </div>
    </div>
  );
}

function IllustrationFaceRecognition({ isActive }: { isActive: boolean }) {
  const [phase, setPhase] = useState<"idle" | "scanning" | "verified" | "rejected">("idle");
  const [scanY, setScanY] = useState(0);

  useEffect(() => {
    if (!isActive) { setPhase("idle"); setScanY(0); return; }

    let cancelled = false;
    const runLoop = () => {
      if (cancelled) return;
      // Cycle: idle → scanning → verified → pause → scanning → rejected → pause → repeat
      setPhase("idle"); setScanY(0);

      const seq = [
        // Start scan for real person
        { delay: 600, fn: () => { if (!cancelled) setPhase("scanning"); } },
        // Animate scan line
        ...Array.from({ length: 25 }, (_, i) => ({
          delay: 600 + i * 50,
          fn: () => { if (!cancelled) setScanY(i * 4); },
        })),
        // Show verified
        { delay: 1900, fn: () => { if (!cancelled) { setPhase("verified"); setScanY(0); } } },
        // Hold
        { delay: 3600, fn: () => { if (!cancelled) setPhase("idle"); } },
        // Start scan for spoof
        { delay: 4200, fn: () => { if (!cancelled) setPhase("scanning"); } },
        ...Array.from({ length: 25 }, (_, i) => ({
          delay: 4200 + i * 50,
          fn: () => { if (!cancelled) setScanY(i * 4); },
        })),
        // Show rejected
        { delay: 5500, fn: () => { if (!cancelled) { setPhase("rejected"); setScanY(0); } } },
        // Hold then reset
        { delay: 7200, fn: () => { if (!cancelled) setPhase("idle"); } },
      ];

      const timeouts = seq.map((s) => setTimeout(s.fn, s.delay));
      return timeouts;
    };

    let timeouts = runLoop();
    const loopInterval = setInterval(() => {
      timeouts = runLoop();
    }, 7800);

    return () => {
      cancelled = true;
      clearInterval(loopInterval);
      timeouts?.forEach(clearTimeout);
    };
  }, [isActive]);

  const borderColor = phase === "verified" ? "#16A34A" : phase === "rejected" ? "#DC2626" : phase === "scanning" ? "#3B82F6" : "#93C5FD";

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: 190, borderRadius: 20, background: "#F8FAFC", border: "2px solid #E5E7EB",
        padding: "16px 14px", display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        {/* Face frame */}
        <div style={{
          width: 90, height: 100, borderRadius: "50%",
          border: `3px ${phase === "scanning" ? "solid" : "dashed"} ${borderColor}`,
          position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "border-color 0.3s", overflow: "hidden",
        }}>
          <span style={{
            fontSize: 44,
            filter: phase === "rejected" ? "grayscale(1)" : "none",
            transition: "filter 0.3s",
          }}>🧑</span>
          {/* Scan line */}
          {phase === "scanning" && (
            <div style={{
              position: "absolute", left: 0, right: 0, height: 3,
              background: "linear-gradient(90deg, transparent, #2F54FF, transparent)",
              top: `${scanY}%`, borderRadius: 2,
            }} />
          )}
          {/* Rejected overlay */}
          {phase === "rejected" && (
            <div style={{
              position: "absolute", inset: 0, background: "rgba(220,38,38,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "featureShake 0.4s ease",
            }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="#DC2626" strokeWidth="2" fill="rgba(220,38,38,0.1)" />
                <path d="M14 14l12 12M26 14l-12 12" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </div>

        {/* Progress bar */}
        {phase === "scanning" && (
          <div style={{ width: "100%", height: 4, background: "#E2E8F0", borderRadius: 2, marginTop: 10, overflow: "hidden" }}>
            <div style={{ width: `${scanY}%`, height: "100%", background: "linear-gradient(90deg, #2F54FF, #3B82F6)", borderRadius: 2 }} />
          </div>
        )}

        {/* Status badge */}
        <div style={{ marginTop: 10, minHeight: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          {phase === "verified" && (
            <div style={{
              display: "flex", alignItems: "center", gap: 4,
              background: "#D1FAE5", borderRadius: 8, padding: "5px 12px",
              animation: "featureBadgePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="6" fill="#16A34A" /><path d="M3.5 6l1.5 1.5 3.5-3.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span style={{ fontSize: 8, fontWeight: 700, color: "#16A34A" }}>Verified</span>
            </div>
          )}
          {phase === "rejected" && (
            <div style={{
              display: "flex", alignItems: "center", gap: 4,
              background: "#FEE2E2", borderRadius: 8, padding: "5px 12px",
              animation: "featureBadgePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}>
              <span style={{ fontSize: 10 }}>🚫</span>
              <span style={{ fontSize: 8, fontWeight: 700, color: "#DC2626" }}>Spoofing Detected!</span>
            </div>
          )}
          {phase === "scanning" && (
            <span style={{ fontSize: 8, color: "#2F54FF", fontWeight: 600 }}>Analyzing liveness...</span>
          )}
          {phase === "idle" && (
            <span style={{ fontSize: 8, color: "#94A3B8", fontWeight: 500 }}>Waiting for face...</span>
          )}
          {/* Sub-label */}
          {phase === "verified" && <span style={{ fontSize: 7, color: "#16A34A", fontWeight: 500 }}>Live Person Detected</span>}
          {phase === "rejected" && <span style={{ fontSize: 7, color: "#DC2626", fontWeight: 500 }}>Photo attempt blocked</span>}
        </div>
      </div>
    </div>
  );
}

function IllustrationDashboard({ isActive }: { isActive: boolean }) {
  const depts = [
    { name: "CSE", pct: 89, color: "#16A34A", students: 120 },
    { name: "ECE", pct: 84, color: "#2563EB", students: 98 },
    { name: "Mech", pct: 81, color: "#7C3AED", students: 85 },
    { name: "Civil", pct: 76, color: "#EA580C", students: 72 },
  ];
  const [barWidths, setBarWidths] = useState([0, 0, 0, 0]);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const [overallNum, setOverallNum] = useState(0);

  useEffect(() => {
    if (!isActive) { setBarWidths([0, 0, 0, 0]); setHighlightIdx(-1); setOverallNum(0); return; }

    let cancelled = false;
    const runLoop = () => {
      if (cancelled) return;
      setBarWidths([0, 0, 0, 0]);
      setHighlightIdx(-1);
      setOverallNum(0);

      // Animate bars in
      depts.forEach((d, i) => {
        setTimeout(() => {
          if (!cancelled) setBarWidths((prev) => { const n = [...prev]; n[i] = d.pct; return n; });
        }, 300 + i * 250);
      });

      // Count up overall number
      const countSteps = 20;
      for (let s = 1; s <= countSteps; s++) {
        setTimeout(() => {
          if (!cancelled) setOverallNum(Math.round((87 * s) / countSteps));
        }, 200 + s * 50);
      }

      // Highlight departments one by one
      depts.forEach((_, i) => {
        setTimeout(() => { if (!cancelled) setHighlightIdx(i); }, 1800 + i * 800);
      });
      setTimeout(() => { if (!cancelled) setHighlightIdx(-1); }, 1800 + depts.length * 800 + 400);
    };

    runLoop();
    const loop = setInterval(runLoop, 6000);
    return () => { cancelled = true; clearInterval(loop); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: 220, background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)", padding: 16, overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: "#374151" }}>Overall Attendance</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect width="14" height="14" rx="3" fill="#DBEAFE" />
            <rect x="1.5" y="7" width="2.5" height="5.5" rx="0.75" fill="#2563EB" />
            <rect x="5.5" y="4" width="2.5" height="8.5" rx="0.75" fill="#2563EB" />
            <rect x="9.5" y="1.5" width="2.5" height="11" rx="0.75" fill="#2563EB" />
          </svg>
        </div>
        {/* Big number */}
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <span style={{
            fontSize: 40, fontWeight: 800, color: "#111827", letterSpacing: "-0.03em",
            fontVariantNumeric: "tabular-nums",
          }}>{overallNum}%</span>
        </div>
        {/* Department bars */}
        <div style={{ fontSize: 8, fontWeight: 600, color: "#94A3B8", marginBottom: 6 }}>Departments</div>
        {depts.map((d, i) => (
          <div key={d.name} style={{
            display: "flex", alignItems: "center", gap: 6, marginBottom: 6, padding: "3px 4px",
            borderRadius: 6,
            background: highlightIdx === i ? "#F8FAFC" : "transparent",
            transition: "background 0.3s",
          }}>
            <span style={{ fontSize: 8, fontWeight: 600, color: "#6B7280", width: 30, flexShrink: 0 }}>{d.name}</span>
            <div style={{ flex: 1, height: 7, background: "#F1F5F9", borderRadius: 4, overflow: "hidden" }}>
              <div style={{
                width: `${barWidths[i]}%`, height: "100%",
                background: highlightIdx === i
                  ? `linear-gradient(90deg, ${d.color}, ${d.color}bb)`
                  : d.color,
                borderRadius: 4,
                transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s",
              }} />
            </div>
            <span style={{
              fontSize: 8, fontWeight: 700, width: 24, textAlign: "right", flexShrink: 0,
              color: highlightIdx === i ? d.color : "#374151",
              transition: "color 0.3s",
            }}>{barWidths[i] > 0 ? d.pct : 0}%</span>
          </div>
        ))}
        {/* Info tooltip */}
        {highlightIdx >= 0 && (
          <div style={{
            marginTop: 4, background: "#F8FAFC", borderRadius: 8, padding: "5px 10px",
            border: "1px solid #E2E8F0", fontSize: 8, color: "#64748B",
            animation: "featureBadgePop 0.2s ease",
          }}>
            <strong style={{ color: "#111827" }}>{depts[highlightIdx].name}:</strong>{" "}
            {depts[highlightIdx].students} students · {depts[highlightIdx].pct}% avg
          </div>
        )}
      </div>
    </div>
  );
}

function IllustrationAlerts({ isActive }: { isActive: boolean }) {
  const [showAlert, setShowAlert] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showSMS, setShowSMS] = useState(false);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    if (!isActive) { setShowAlert(false); setShowDetails(false); setShowSMS(false); setBarWidth(0); return; }

    let cancelled = false;
    const runLoop = () => {
      if (cancelled) return;
      setShowAlert(false); setShowDetails(false); setShowSMS(false); setBarWidth(0);

      const seq = [
        { delay: 400, fn: () => { if (!cancelled) setShowAlert(true); } },
        { delay: 800, fn: () => { if (!cancelled) setBarWidth(68); } },
        { delay: 1800, fn: () => { if (!cancelled) setShowDetails(true); } },
        { delay: 2600, fn: () => { if (!cancelled) setShowSMS(true); } },
        { delay: 5000, fn: () => {
          if (!cancelled) { setShowSMS(false); setShowDetails(false); }
        }},
        { delay: 5400, fn: () => { if (!cancelled) { setShowAlert(false); setBarWidth(0); } } },
      ];
      return seq.map((s) => setTimeout(s.fn, s.delay));
    };

    let timeouts = runLoop();
    const loop = setInterval(() => { timeouts = runLoop(); }, 6000);
    return () => { cancelled = true; clearInterval(loop); timeouts?.forEach(clearTimeout); };
  }, [isActive]);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: 200, background: "#fff", borderRadius: 16, border: "1px solid #FEE2E2",
        boxShadow: "0 4px 20px rgba(220,38,38,0.08)", overflow: "hidden",
      }}>
        {/* Profile */}
        <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #FEF2F2" }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg, #FEE2E2, #FECACA)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15,
            boxShadow: "0 2px 8px rgba(220,38,38,0.15)",
          }}>🧑‍🎓</div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#111827" }}>Ankit Sharma</div>
            <div style={{ fontSize: 8, color: "#94A3B8" }}>Roll No. 42 · CSE-A</div>
          </div>
        </div>

        {/* Alert */}
        <div style={{
          padding: "10px 14px",
          maxHeight: showAlert ? 120 : 0, overflow: "hidden",
          opacity: showAlert ? 1 : 0,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{
            background: "#FEF2F2", borderRadius: 10, padding: "10px 12px",
            border: "1px solid #FECACA",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 11 }}>⚠️</span>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#DC2626" }}>Attendance Alert</span>
            </div>
            <p style={{ fontSize: 8, color: "#7F1D1D", lineHeight: 1.6, margin: 0 }}>
              Attendance dropped below <strong>75%</strong>
            </p>
            <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ flex: 1, height: 5, background: "#FECACA", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${barWidth}%`, height: "100%", background: "#DC2626", borderRadius: 3, transition: "width 0.6s ease" }} />
              </div>
              <span style={{ fontSize: 8, fontWeight: 700, color: "#DC2626" }}>{barWidth}%</span>
            </div>
          </div>
        </div>

        {/* Expanded details */}
        <div style={{
          maxHeight: showDetails ? 100 : 0, overflow: "hidden",
          opacity: showDetails ? 1 : 0,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          padding: showDetails ? "0 14px 6px" : "0 14px",
        }}>
          <div style={{ background: "#F8FAFC", borderRadius: 8, padding: "8px 10px", fontSize: 8, color: "#64748B", lineHeight: 1.7 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
              <span>Classes Attended</span><strong style={{ color: "#111827" }}>34 / 50</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
              <span>Last Absent</span><strong style={{ color: "#DC2626" }}>Today</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Parent Notified</span><strong style={{ color: "#16A34A" }}>✓ Yes</strong>
            </div>
          </div>
        </div>

        {/* SMS notification */}
        <div style={{
          maxHeight: showSMS ? 50 : 0, overflow: "hidden",
          opacity: showSMS ? 1 : 0,
          transition: "all 0.3s ease",
          padding: showSMS ? "0 14px 10px" : "0 14px",
        }}>
          <div style={{
            background: "#FEF3C7", borderRadius: 8, padding: "6px 10px",
            border: "1px solid #FDE68A", fontSize: 7, color: "#92400E",
            display: "flex", alignItems: "center", gap: 4,
          }}>
            <span style={{ fontSize: 10 }}>📱</span>
            SMS sent to parent: &ldquo;Attendance is 68%&rdquo;
          </div>
        </div>
      </div>
    </div>
  );
}

function IllustrationNAAC({ isActive }: { isActive: boolean }) {
  const criteria = [
    { num: "2", label: "Teaching-Learning", color: "#2563EB" },
    { num: "5", label: "Student Support", color: "#16A34A" },
    { num: "6", label: "Governance", color: "#EA580C" },
    { num: "7", label: "Institutional Values", color: "#7C3AED" },
  ];
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [highlightNum, setHighlightNum] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (!isActive) { setCompleted(new Set()); setHighlightNum(null); setShowCelebration(false); return; }

    let cancelled = false;
    const runLoop = () => {
      if (cancelled) return;
      setCompleted(new Set()); setHighlightNum(null); setShowCelebration(false);

      const seq: { delay: number; fn: () => void }[] = [];
      criteria.forEach((c, i) => {
        // Highlight
        seq.push({ delay: 600 + i * 800, fn: () => { if (!cancelled) setHighlightNum(c.num); } });
        // Complete
        seq.push({ delay: 600 + i * 800 + 400, fn: () => {
          if (!cancelled) {
            setCompleted((prev) => new Set([...prev, c.num]));
            setHighlightNum(null);
          }
        }});
      });
      // Celebration
      seq.push({ delay: 600 + criteria.length * 800 + 200, fn: () => { if (!cancelled) setShowCelebration(true); } });
      // Reset
      seq.push({ delay: 600 + criteria.length * 800 + 2200, fn: () => {
        if (!cancelled) { setShowCelebration(false); setCompleted(new Set()); }
      }});

      return seq.map((s) => setTimeout(s.fn, s.delay));
    };

    let timeouts = runLoop();
    const totalDuration = 600 + criteria.length * 800 + 2800;
    const loop = setInterval(() => { timeouts = runLoop(); }, totalDuration);
    return () => { cancelled = true; clearInterval(loop); timeouts?.forEach(clearTimeout); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const progress = Math.round((completed.size / criteria.length) * 100);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: 210, background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)", padding: 14, overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 24, height: 24, borderRadius: 6, background: "#EFF6FF",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11,
            }}>🏛️</div>
            <span style={{ fontSize: 9, fontWeight: 700, color: "#374151" }}>NAAC Compliance</span>
          </div>
          <span style={{ fontSize: 10, fontWeight: 800, color: progress === 100 ? "#16A34A" : "#2F54FF", transition: "color 0.3s" }}>
            {progress}%
          </span>
        </div>
        {/* Progress bar */}
        <div style={{ width: "100%", height: 4, background: "#F1F5F9", borderRadius: 2, marginBottom: 10, overflow: "hidden" }}>
          <div style={{
            width: `${progress}%`, height: "100%",
            background: progress === 100 ? "#16A34A" : "linear-gradient(90deg, #2F54FF, #3B82F6)",
            borderRadius: 2, transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }} />
        </div>
        {/* Criteria */}
        {criteria.map((c) => {
          const isDone = completed.has(c.num);
          const isHL = highlightNum === c.num;
          return (
            <div key={c.num} style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 5,
              background: isHL ? "#FEF3C7" : isDone ? "#F0FDF4" : "#F8FAFC",
              borderRadius: 8, padding: "7px 8px",
              transition: "all 0.3s",
              transform: isHL ? "scale(1.03)" : "scale(1)",
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: "50%",
                background: isDone ? c.color : isHL ? "#FBBF24" : "#E2E8F0",
                color: "#fff", fontSize: 9, fontWeight: 700, display: "flex",
                alignItems: "center", justifyContent: "center", flexShrink: 0,
                transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: isDone ? "scale(1.1)" : "scale(0.9)",
              }}>{c.num}</div>
              <span style={{ fontSize: 8, fontWeight: 600, color: "#374151", flex: 1 }}>{c.label}</span>
              <div style={{
                width: 16, height: 16, borderRadius: "50%",
                background: isDone ? "#D1FAE5" : "#F1F5F9",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}>
                {isDone ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 5l2 2 3.5-3.5" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : isHL ? (
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FBBF24", animation: "featurePulse 0.6s ease infinite" }} />
                ) : (
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#CBD5E1" }} />
                )}
              </div>
            </div>
          );
        })}
        {/* Celebration */}
        {showCelebration && (
          <div style={{
            marginTop: 8, background: "#D1FAE5", borderRadius: 8, padding: "6px 10px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
            animation: "featureBadgePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}>
            <span style={{ fontSize: 10 }}>🎉</span>
            <span style={{ fontSize: 8, fontWeight: 700, color: "#16A34A" }}>All Criteria Met!</span>
          </div>
        )}
      </div>
    </div>
  );
}

function IllustrationClassroom({ isActive }: { isActive: boolean }) {
  const rooms = [
    { id: "301", label: "Room 301", emoji: "🏫", angle: -40, distance: 72 },
    { id: "102", label: "Room 102", emoji: "🏫", angle: 40, distance: 75 },
    { id: "lab", label: "Lab A", emoji: "🔬", angle: 160, distance: 70 },
    { id: "lib", label: "Library", emoji: "📚", angle: 210, distance: 78 },
  ];
  const [connected, setConnected] = useState<Set<string>>(new Set());
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  useEffect(() => {
    if (!isActive) { setConnected(new Set()); setActiveRoom(null); return; }

    let cancelled = false;
    const runLoop = () => {
      if (cancelled) return;
      setConnected(new Set()); setActiveRoom(null);

      const seq: { delay: number; fn: () => void }[] = [];
      // Connect rooms one by one
      rooms.forEach((r, i) => {
        seq.push({ delay: 500 + i * 700, fn: () => {
          if (!cancelled) setActiveRoom(r.id);
        }});
        seq.push({ delay: 500 + i * 700 + 350, fn: () => {
          if (!cancelled) {
            setConnected((prev) => new Set([...prev, r.id]));
            setActiveRoom(null);
          }
        }});
      });
      // Hold all connected
      seq.push({ delay: 500 + rooms.length * 700 + 1000, fn: () => {
        if (!cancelled) setConnected(new Set());
      }});

      return seq.map((s) => setTimeout(s.fn, s.delay));
    };

    let timeouts = runLoop();
    const totalDuration = 500 + rooms.length * 700 + 1600;
    const loop = setInterval(() => { timeouts = runLoop(); }, totalDuration);
    return () => { cancelled = true; clearInterval(loop); timeouts?.forEach(clearTimeout); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: 220, height: 220 }}>
        {/* Pulse rings */}
        {connected.size > 0 && (
          <>
            <div style={{
              position: "absolute", left: "50%", top: "50%", width: 120, height: 120,
              marginLeft: -60, marginTop: -60, borderRadius: "50%",
              border: "2px solid rgba(47,84,255,0.12)",
              animation: "featureRingPulse 2s ease-out infinite",
            }} />
            <div style={{
              position: "absolute", left: "50%", top: "50%", width: 170, height: 170,
              marginLeft: -85, marginTop: -85, borderRadius: "50%",
              border: "2px solid rgba(47,84,255,0.06)",
              animation: "featureRingPulse 2s ease-out 0.5s infinite",
            }} />
          </>
        )}

        {/* Central IoT module */}
        <div style={{
          position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
          width: 72, height: 72, borderRadius: 18, background: "#fff",
          border: `2px solid ${connected.size > 0 ? "#C7D5FF" : "#E5E7EB"}`,
          boxShadow: connected.size > 0 ? "0 8px 24px rgba(47,84,255,0.12)" : "0 4px 12px rgba(0,0,0,0.06)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          zIndex: 5, transition: "all 0.3s",
        }}>
          <span style={{ fontSize: 7, fontWeight: 800, color: "#2F54FF", letterSpacing: "0.05em" }}>nexalaya</span>
          <span style={{ fontSize: 5, color: "#94A3B8", fontWeight: 600, marginTop: 1 }}>IoT Module</span>
          <svg width="18" height="14" viewBox="0 0 20 16" fill="none" style={{ marginTop: 3 }}>
            <path d="M10 14a1 1 0 100-2 1 1 0 000 2z" fill="#2F54FF" />
            <path d="M6.3 10.3a5.2 5.2 0 017.4 0" stroke="#2F54FF" strokeWidth="1.5" strokeLinecap="round" opacity={connected.size >= 1 ? 1 : 0.15} style={{ transition: "opacity 0.4s" }} />
            <path d="M3 7a9 9 0 0114 0" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" opacity={connected.size >= 2 ? 1 : 0.15} style={{ transition: "opacity 0.4s" }} />
            <path d="M0.5 4a13 13 0 0119 0" stroke="#DBEAFE" strokeWidth="1.5" strokeLinecap="round" opacity={connected.size >= 3 ? 1 : 0.15} style={{ transition: "opacity 0.4s" }} />
          </svg>
          {/* Count badge */}
          <div style={{
            position: "absolute", top: -6, right: -6,
            width: 18, height: 18, borderRadius: "50%",
            background: connected.size > 0 ? "#2F54FF" : "#CBD5E1",
            color: "#fff", fontSize: 8, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.3s", boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}>{connected.size}</div>
        </div>

        {/* Connection lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 3, pointerEvents: "none" }}>
          {rooms.map((room) => {
            const isConn = connected.has(room.id);
            const isActive = activeRoom === room.id;
            const rad = (room.angle * Math.PI) / 180;
            const x2 = 110 + Math.cos(rad) * room.distance;
            const y2 = 110 + Math.sin(rad) * room.distance;
            return (
              <line key={room.id} x1="110" y1="110" x2={x2} y2={y2}
                stroke={isConn ? "#2F54FF" : isActive ? "#FBBF24" : "#E5E7EB"}
                strokeWidth={isConn ? 2 : isActive ? 2 : 1}
                strokeDasharray={isConn ? "none" : "4 3"}
                opacity={isConn ? 0.5 : isActive ? 0.7 : 0.2}
                style={{ transition: "all 0.4s" }}
              />
            );
          })}
        </svg>

        {/* Room nodes */}
        {rooms.map((room) => {
          const isConn = connected.has(room.id);
          const isAct = activeRoom === room.id;
          const rad = (room.angle * Math.PI) / 180;
          const x = 110 + Math.cos(rad) * room.distance - 30;
          const y = 110 + Math.sin(rad) * room.distance - 14;
          return (
            <div key={room.id} style={{
              position: "absolute", left: x, top: y,
              background: "#fff", borderRadius: 10,
              padding: "5px 8px",
              border: `1.5px solid ${isConn ? "#C7D5FF" : isAct ? "#FDE68A" : "#E5E7EB"}`,
              boxShadow: isAct ? "0 4px 16px rgba(251,191,36,0.2)" : isConn ? "0 2px 12px rgba(47,84,255,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
              display: "flex", alignItems: "center", gap: 4, zIndex: 4,
              whiteSpace: "nowrap",
              transition: "all 0.35s",
              transform: isAct ? "scale(1.1)" : "scale(1)",
            }}>
              <span style={{ fontSize: 10 }}>{room.emoji}</span>
              <span style={{ fontSize: 7, fontWeight: 600, color: "#374151" }}>{room.label}</span>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: isConn ? "#16A34A" : isAct ? "#FBBF24" : "#D1D5DB",
                transition: "background 0.3s",
                boxShadow: isConn ? "0 0 4px rgba(22,163,74,0.4)" : isAct ? "0 0 6px rgba(251,191,36,0.5)" : "none",
              }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const illustrations = [
  IllustrationAttendance,
  IllustrationFaceRecognition,
  IllustrationDashboard,
  IllustrationAlerts,
  IllustrationNAAC,
  IllustrationClassroom,
];

/* ─── main carousel component ─────────────────────────── */

export default function Features() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef(0);

  const goTo = useCallback(
    (index: number, dir?: "next" | "prev") => {
      if (isAnimating || index === current) return;
      setDirection(dir || (index > current ? "next" : "prev"));
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setIsAnimating(false);
      }, 350);
    },
    [current, isAnimating]
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % features.length, "next");
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + features.length) % features.length, "prev");
  }, [current, goTo]);

  /* keyboard navigation */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top >= window.innerHeight || rect.bottom <= 0) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); goNext(); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); goPrev(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  /* touch swipe */
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
  };

  const f = features[current];

  return (
    <section id="features" ref={sectionRef} style={{ padding: "80px 0" }}>
      <div className="container">
        <AnimateOnScroll>
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 48px" }}>
            <p style={{
              fontSize: "0.8125rem", fontWeight: 600, color: "#2F54FF",
              textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8,
            }}>
              Powerful Features
            </p>
            <h2 style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700,
              letterSpacing: "-0.02em", color: "#111827", lineHeight: 1.15,
            }}>
              Everything <span style={{ color: "#2F54FF" }}>Your Campus</span> Needs
            </h2>
            <p style={{ marginTop: 12, fontSize: "0.95rem", color: "#6B7280", lineHeight: 1.7 }}>
              Smart technology that makes attendance effortless, accurate, and actionable.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="features-carousel-wrapper" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {/* Card */}
            <div
              className={`features-carousel-card ${isAnimating ? "fc-exit" : "fc-enter"}`}
              key={current}
              style={{ ["--slide-dir" as string]: direction === "next" ? "1" : "-1" }}
            >
              <div className="features-card-text">
                <div style={{
                  width: 48, height: 48, borderRadius: 14, background: f.iconBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem", marginBottom: 20,
                }}>
                  {f.icon}
                </div>
                <h3 style={{
                  fontWeight: 700, fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                  color: "#111827", marginBottom: 10, letterSpacing: "-0.01em", lineHeight: 1.25,
                }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "0.925rem", color: "#6B7280", lineHeight: 1.7, margin: 0, maxWidth: 360 }}>
                  {f.description}
                </p>
                {f.badge && (
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16,
                    background: "#F0F3FF", border: "1px solid #C7D5FF", borderRadius: 999,
                    padding: "5px 14px", fontSize: "0.78rem", fontWeight: 600, color: "#2F54FF",
                  }}>
                    {f.badgeIcon && <span>{f.badgeIcon}</span>}{f.badge}
                  </div>
                )}
              </div>
              <div className="features-card-illust">
                {/* Render all illustrations, only active one animates */}
                {illustrations.map((Illust, i) => (
                  <div key={i} style={{ display: i === current ? "contents" : "none" }}>
                    <Illust isActive={i === current && !isAnimating} />
                  </div>
                ))}
              </div>
            </div>

            {/* Nav arrows */}
            <button className="fc-nav fc-nav-prev" onClick={goPrev} aria-label="Previous feature">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button className="fc-nav fc-nav-next" onClick={goNext} aria-label="Next feature">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>

            {/* Dots */}
            <div className="fc-dots">
              {features.map((feat, i) => (
                <button key={feat.title} className={`fc-dot ${i === current ? "fc-dot-active" : ""}`} onClick={() => goTo(i)} aria-label={`Feature ${i + 1}`} />
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      <style>{`
        .features-carousel-wrapper {
          position: relative;
          max-width: 860px;
          margin: 0 auto;
        }
        .features-carousel-card {
          display: flex;
          align-items: center;
          gap: 40px;
          background: #ffffff;
          border: 1px solid #E5E7EB;
          border-radius: 28px;
          padding: 44px;
          min-height: 360px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
          overflow: visible;
        }
        .features-card-text { flex: 1; min-width: 0; }
        .features-card-illust {
          flex: 0 0 260px;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fc-enter { animation: fcEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .fc-exit { animation: fcExit 0.35s cubic-bezier(0.7, 0, 0.84, 0) both; }

        @keyframes fcEnter {
          from { opacity: 0; transform: translateX(calc(30px * var(--slide-dir, 1))); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fcExit {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(calc(-30px * var(--slide-dir, 1))); }
        }

        .fc-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 44px; height: 44px; border-radius: 50%;
          background: #fff; border: 1px solid #E5E7EB;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          color: #374151; transition: all 0.2s; z-index: 5;
        }
        .fc-nav:hover {
          background: #2F54FF; border-color: #2F54FF; color: #fff;
          box-shadow: 0 4px 16px rgba(47,84,255,0.25);
        }
        .fc-nav-prev { left: -56px; }
        .fc-nav-next { right: -56px; }

        .fc-dots { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 28px; }
        .fc-dot {
          width: 8px; height: 8px; border-radius: 50%;
          border: none; background: #D1D5DB; cursor: pointer;
          padding: 0; transition: all 0.3s;
        }
        .fc-dot-active { background: #2F54FF; width: 28px; border-radius: 4px; }

        @keyframes featurePulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }
        @keyframes featureRingPulse {
          0% { opacity: 0.6; transform: scale(0.9); }
          100% { opacity: 0; transform: scale(1.3); }
        }
        @keyframes featureBadgePop {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes featureShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-4px); }
          40% { transform: translateX(4px); }
          60% { transform: translateX(-3px); }
          80% { transform: translateX(2px); }
        }

        @media (max-width: 1024px) {
          .fc-nav-prev { left: -12px; }
          .fc-nav-next { right: -12px; }
        }
        @media (max-width: 768px) {
          .features-carousel-card {
            flex-direction: column; padding: 28px 24px;
            gap: 24px; min-height: auto;
          }
          .features-card-illust { flex: none; width: 100%; height: 240px; order: -1; }
          .fc-nav-prev { left: 4px; }
          .fc-nav-next { right: 4px; }
          .fc-nav { width: 36px; height: 36px; }
        }
        @media (max-width: 480px) {
          .features-carousel-card { padding: 20px 16px; border-radius: 20px; }
          .features-card-illust { height: 200px; }
        }
      `}</style>
    </section>
  );
}
