"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

/* ─── feature data ─────────────────────────────────────── */
const features = [
  {
    icon: "⚡",
    iconBg: "#FFF7ED",
    iconColor: "#EA580C",
    title: "Attendance in One Click",
    description:
      "What used to take 10 minutes manually now takes seconds. Professor taps once — every student in the classroom is marked in real time.",
    badge: "10 Seconds",
    badgeIcon: "⏱",
  },
  {
    icon: "🛡️",
    iconBg: "#F0FDF4",
    iconColor: "#16A34A",
    title: "Proxy-Proof Face Recognition",
    description:
      "AI-powered liveness detection ensures only the real, physically present student gets marked. Photos and spoofing attempts are rejected instantly.",
  },
  {
    icon: "📊",
    iconBg: "#EFF6FF",
    iconColor: "#2563EB",
    title: "Real-Time Campus Dashboard",
    description:
      "Get a live, bird's-eye view of attendance across departments, batches, and classrooms — all in one dashboard.",
  },
  {
    icon: "🚨",
    iconBg: "#FEF2F2",
    iconColor: "#DC2626",
    title: "At-Risk Student Alerts",
    description:
      "When a student's attendance drops below threshold, professors and parents are notified automatically — reducing dropouts before they happen.",
  },
  {
    icon: "🎓",
    iconBg: "#F5F3FF",
    iconColor: "#7C3AED",
    title: "NAAC Criteria 2, 5, 6, 7 Ready",
    description:
      "Built to support Teaching-Learning (2), Student Support (5), Governance (6), and Institutional Values (7) — making NAAC documentation effortless.",
  },
  {
    icon: "📡",
    iconBg: "#ECFDF5",
    iconColor: "#059669",
    title: "Works in Every Classroom",
    description:
      "IoT module creates a secure local network. No internet dependency. Plug & play setup in any classroom.",
  },
];

/* ─── interactive illustrations ───────────────────────── */

function IllustrationAttendance() {
  const students = [
    { name: "Arjun P.", init: "A", bg: "#DBEAFE", color: "#2563EB" },
    { name: "Sneha K.", init: "S", bg: "#D1FAE5", color: "#16A34A" },
    { name: "Ravi M.", init: "R", bg: "#FEE2E2", color: "#DC2626" },
    { name: "Priya D.", init: "P", bg: "#F3E8FF", color: "#7C3AED" },
  ];
  const [started, setStarted] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(students.map(() => false));
  const [timer, setTimer] = useState(10);

  const handleStart = () => {
    if (started) {
      // Reset
      setStarted(false);
      setChecked(students.map(() => false));
      setTimer(10);
      return;
    }
    setStarted(true);
    setTimer(10);
    students.forEach((_, i) => {
      setTimeout(() => {
        setChecked((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 400 + i * 600);
    });
  };

  useEffect(() => {
    if (!started || timer <= 0) return;
    const id = setInterval(() => setTimer((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, [started, timer]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: 200, background: "#fff", borderRadius: 20, border: "2px solid #E5E7EB",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)", overflow: "hidden", position: "relative", zIndex: 2,
      }}>
        {/* Status bar */}
        <div style={{ background: "#F8FAFC", padding: "8px 12px", borderBottom: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 9, color: "#64748B", fontWeight: 600 }}>Computer Science 301</span>
          <span style={{ fontSize: 8, color: "#94A3B8" }}>10:00 AM</span>
        </div>
        {/* Timer */}
        {started && (
          <div style={{ textAlign: "center", padding: "6px 0", background: timer <= 3 ? "#FEF2F2" : "#F0F9FF", transition: "background 0.3s" }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: timer <= 3 ? "#DC2626" : "#2F54FF", fontVariantNumeric: "tabular-nums" }}>{timer}s</span>
          </div>
        )}
        {/* Student list */}
        <div style={{ padding: "6px 12px" }}>
          {students.map((s, i) => (
            <div key={s.name} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0",
              borderBottom: i < students.length - 1 ? "1px solid #F1F5F9" : "none",
              opacity: started && !checked[i] ? 0.5 : 1, transition: "opacity 0.3s",
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
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: checked[i] ? "scale(1)" : "scale(0.8)",
              }}>
                {checked[i] ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2.5 5l2 2 3.5-3.5" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D1D5DB" }} />
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Start / Reset button */}
        <div style={{ padding: "8px 12px 12px" }}>
          <button
            onClick={handleStart}
            style={{
              width: "100%", border: "none", cursor: "pointer",
              background: started
                ? "linear-gradient(135deg, #16A34A, #22C55E)"
                : "linear-gradient(135deg, #2F54FF, #3B82F6)",
              color: "#fff", fontSize: 9, fontWeight: 700, textAlign: "center",
              padding: "9px 0", borderRadius: 10,
              boxShadow: started ? "0 4px 12px rgba(22,163,74,0.3)" : "0 4px 12px rgba(47,84,255,0.3)",
              transition: "all 0.3s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
            }}
          >
            {started ? (
              checked.every(Boolean) ? <>✓ All Marked — Tap to Reset</> : <>⏳ Marking...</>
            ) : (
              <>▶ Start Attendance</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function IllustrationFaceRecognition() {
  const [phase, setPhase] = useState<"idle" | "scanning" | "verified" | "rejected">("idle");
  const [scanProgress, setScanProgress] = useState(0);

  const startScan = (isReal: boolean) => {
    setPhase("scanning");
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase(isReal ? "verified" : "rejected"), 200);
          return 100;
        }
        return p + 4;
      });
    }, 40);
  };

  const reset = () => {
    setPhase("idle");
    setScanProgress(0);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: 190, borderRadius: 20, background: "#F8FAFC",
        border: "2px solid #E5E7EB", overflow: "hidden",
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "16px 14px",
      }}>
        {/* Face frame */}
        <div style={{
          width: 90, height: 100, borderRadius: "50%",
          border: `3px ${phase === "scanning" ? "solid" : "dashed"} ${
            phase === "verified" ? "#16A34A" : phase === "rejected" ? "#DC2626" : "#93C5FD"
          }`,
          position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "border-color 0.3s",
          overflow: "hidden",
        }}>
          <span style={{ fontSize: 44, filter: phase === "rejected" ? "grayscale(1)" : "none", transition: "filter 0.3s" }}>🧑</span>
          {/* Scan line */}
          {phase === "scanning" && (
            <div style={{
              position: "absolute", left: 0, right: 0, height: 3,
              background: "linear-gradient(90deg, transparent, #2F54FF, transparent)",
              top: `${scanProgress}%`,
              transition: "top 0.04s linear",
              borderRadius: 2,
            }} />
          )}
          {/* Overlay for rejected */}
          {phase === "rejected" && (
            <div style={{
              position: "absolute", inset: 0, background: "rgba(220,38,38,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
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
            <div style={{ width: `${scanProgress}%`, height: "100%", background: "linear-gradient(90deg, #2F54FF, #3B82F6)", borderRadius: 2, transition: "width 0.04s linear" }} />
          </div>
        )}

        {/* Status badge */}
        <div style={{ marginTop: 10, minHeight: 28 }}>
          {phase === "verified" && (
            <div style={{
              display: "flex", alignItems: "center", gap: 4,
              background: "#D1FAE5", borderRadius: 8, padding: "5px 12px",
              animation: "featureBadgePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="6" fill="#16A34A" />
                <path d="M3.5 6l1.5 1.5 3.5-3.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: 8, fontWeight: 700, color: "#16A34A" }}>Verified · Live Person</span>
            </div>
          )}
          {phase === "rejected" && (
            <div style={{
              display: "flex", alignItems: "center", gap: 4,
              background: "#FEE2E2", borderRadius: 8, padding: "5px 12px",
              animation: "featureShake 0.4s ease",
            }}>
              <span style={{ fontSize: 10 }}>🚫</span>
              <span style={{ fontSize: 8, fontWeight: 700, color: "#DC2626" }}>Spoofing Detected!</span>
            </div>
          )}
          {phase === "scanning" && (
            <span style={{ fontSize: 8, color: "#2F54FF", fontWeight: 600 }}>Analyzing liveness...</span>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 6, marginTop: 10, width: "100%" }}>
          {phase === "idle" ? (
            <>
              <button onClick={() => startScan(true)} style={{
                flex: 1, border: "none", cursor: "pointer", fontSize: 8, fontWeight: 700,
                background: "#D1FAE5", color: "#16A34A", padding: "7px 0", borderRadius: 8,
                transition: "transform 0.15s", 
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                🧑 Real Person
              </button>
              <button onClick={() => startScan(false)} style={{
                flex: 1, border: "none", cursor: "pointer", fontSize: 8, fontWeight: 700,
                background: "#FEE2E2", color: "#DC2626", padding: "7px 0", borderRadius: 8,
                transition: "transform 0.15s",
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                📷 Photo Spoof
              </button>
            </>
          ) : (phase === "verified" || phase === "rejected") ? (
            <button onClick={reset} style={{
              flex: 1, border: "none", cursor: "pointer", fontSize: 8, fontWeight: 700,
              background: "#F1F5F9", color: "#64748B", padding: "7px 0", borderRadius: 8,
            }}>
              ↺ Try Again
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function IllustrationDashboard() {
  const [hoveredDept, setHoveredDept] = useState<number | null>(null);
  const [animated, setAnimated] = useState(false);
  const [selectedView, setSelectedView] = useState<"overall" | "weekly">("overall");

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  const depts = [
    { name: "CSE", pct: 89, color: "#16A34A", students: 120 },
    { name: "ECE", pct: 84, color: "#2563EB", students: 98 },
    { name: "Mech", pct: 81, color: "#7C3AED", students: 85 },
    { name: "Civil", pct: 76, color: "#EA580C", students: 72 },
  ];

  const weeklyData = [65, 72, 88, 82, 91, 78, 87];
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: 220, background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)", padding: 14, overflow: "hidden",
      }}>
        {/* Toggle */}
        <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 8, padding: 2, marginBottom: 12, gap: 2 }}>
          {(["overall", "weekly"] as const).map((v) => (
            <button key={v} onClick={() => setSelectedView(v)} style={{
              flex: 1, border: "none", cursor: "pointer", fontSize: 8, fontWeight: 600,
              padding: "5px 0", borderRadius: 6,
              background: selectedView === v ? "#fff" : "transparent",
              color: selectedView === v ? "#111827" : "#94A3B8",
              boxShadow: selectedView === v ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.2s",
              textTransform: "capitalize",
            }}>
              {v}
            </button>
          ))}
        </div>

        {selectedView === "overall" ? (
          <>
            {/* Big number */}
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: "#94A3B8", marginBottom: 2 }}>Overall Attendance</div>
              <span style={{ fontSize: 36, fontWeight: 800, color: "#111827", letterSpacing: "-0.03em" }}>87%</span>
            </div>
            {/* Department bars */}
            {depts.map((d, i) => (
              <div
                key={d.name}
                onMouseEnter={() => setHoveredDept(i)}
                onMouseLeave={() => setHoveredDept(null)}
                style={{
                  display: "flex", alignItems: "center", gap: 6, marginBottom: 5, padding: "3px 4px",
                  borderRadius: 6, cursor: "pointer",
                  background: hoveredDept === i ? "#F8FAFC" : "transparent",
                  transition: "background 0.2s",
                }}
              >
                <span style={{ fontSize: 8, fontWeight: 600, color: "#6B7280", width: 28, flexShrink: 0 }}>{d.name}</span>
                <div style={{ flex: 1, height: 7, background: "#F1F5F9", borderRadius: 4, overflow: "hidden", position: "relative" }}>
                  <div style={{
                    width: animated ? `${d.pct}%` : "0%", height: "100%",
                    background: hoveredDept === i
                      ? `linear-gradient(90deg, ${d.color}, ${d.color}dd)`
                      : d.color,
                    borderRadius: 4,
                    transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s",
                  }} />
                </div>
                <span style={{
                  fontSize: 8, fontWeight: 700, width: 24, textAlign: "right", flexShrink: 0,
                  color: hoveredDept === i ? d.color : "#374151",
                  transition: "color 0.2s",
                }}>{d.pct}%</span>
              </div>
            ))}
            {/* Tooltip on hover */}
            {hoveredDept !== null && (
              <div style={{
                marginTop: 6, background: "#F8FAFC", borderRadius: 8, padding: "6px 10px",
                border: "1px solid #E2E8F0", fontSize: 8, color: "#64748B",
                animation: "featureBadgePop 0.2s ease",
              }}>
                <strong style={{ color: "#111827" }}>{depts[hoveredDept].name}:</strong>{" "}
                {depts[hoveredDept].students} students · {depts[hoveredDept].pct}% avg
              </div>
            )}
          </>
        ) : (
          <>
            <div style={{ fontSize: 9, fontWeight: 600, color: "#94A3B8", marginBottom: 8, textAlign: "center" }}>Weekly Trend</div>
            {/* Mini bar chart */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-around", height: 80, padding: "0 4px", gap: 4 }}>
              {weeklyData.map((v, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap: 3 }}>
                  <span style={{
                    fontSize: 7, fontWeight: 600, color: hoveredDept === i ? "#2F54FF" : "#94A3B8",
                    transition: "color 0.2s",
                  }}>{v}%</span>
                  <div
                    onMouseEnter={() => setHoveredDept(i)}
                    onMouseLeave={() => setHoveredDept(null)}
                    style={{
                      width: "100%", borderRadius: 4, cursor: "pointer",
                      height: animated ? `${v * 0.7}px` : "0px",
                      background: hoveredDept === i
                        ? "linear-gradient(180deg, #2F54FF, #3B82F6)"
                        : v >= 85 ? "#D1FAE5" : v >= 75 ? "#FEF3C7" : "#FEE2E2",
                      transition: "height 0.8s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s",
                    }}
                  />
                  <span style={{ fontSize: 7, fontWeight: 600, color: "#94A3B8" }}>{days[i]}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function IllustrationAlerts() {
  const [expanded, setExpanded] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);

  const toggleExpand = () => {
    if (!expanded) {
      setExpanded(true);
      setTimeout(() => setNotifVisible(true), 300);
    } else {
      setNotifVisible(false);
      setTimeout(() => setExpanded(false), 200);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: 200, background: "#fff", borderRadius: 16, border: "1px solid #FEE2E2",
        boxShadow: "0 4px 20px rgba(220,38,38,0.08)", overflow: "hidden",
        transition: "all 0.3s ease",
      }}>
        {/* Profile header */}
        <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #FEF2F2" }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #FEE2E2, #FECACA)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15,
            boxShadow: "0 2px 8px rgba(220,38,38,0.15)",
          }}>🧑‍🎓</div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#111827" }}>Ankit Sharma</div>
            <div style={{ fontSize: 8, color: "#94A3B8" }}>Roll No. 42 · CSE-A</div>
          </div>
        </div>

        {/* Alert box */}
        <div style={{ padding: "10px 14px" }}>
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
            {/* Attendance bar */}
            <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ flex: 1, height: 5, background: "#FECACA", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: "68%", height: "100%", background: "#DC2626", borderRadius: 3 }} />
              </div>
              <span style={{ fontSize: 8, fontWeight: 700, color: "#DC2626" }}>68%</span>
            </div>
          </div>
        </div>

        {/* Expanded details */}
        <div style={{
          maxHeight: expanded ? 120 : 0, overflow: "hidden",
          transition: "max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          padding: expanded ? "0 14px 10px" : "0 14px",
        }}>
          <div style={{ background: "#F8FAFC", borderRadius: 8, padding: "8px 10px", fontSize: 8, color: "#64748B", lineHeight: 1.6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span>Classes Attended</span>
              <strong style={{ color: "#111827" }}>34 / 50</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span>Last Absent</span>
              <strong style={{ color: "#DC2626" }}>Today</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Parent Notified</span>
              <strong style={{ color: "#16A34A" }}>✓ Yes</strong>
            </div>
          </div>

          {/* Notification popup */}
          {notifVisible && (
            <div style={{
              marginTop: 6, background: "#FEF3C7", borderRadius: 8, padding: "6px 10px",
              border: "1px solid #FDE68A", fontSize: 7, color: "#92400E",
              display: "flex", alignItems: "center", gap: 4,
              animation: "featureSlideUp 0.3s ease",
            }}>
              <span style={{ fontSize: 10 }}>📱</span>
              SMS sent to parent: &ldquo;Your child&apos;s attendance is 68%&rdquo;
            </div>
          )}
        </div>

        {/* Action button */}
        <div style={{ padding: "0 14px 12px" }}>
          <button
            onClick={toggleExpand}
            style={{
              width: "100%", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
              color: "#DC2626", fontSize: 9, fontWeight: 700, padding: "7px 0",
              background: expanded ? "#FEE2E2" : "transparent",
              borderRadius: 8, transition: "all 0.2s",
            }}
          >
            {expanded ? "Hide Details ▲" : "View Details →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function IllustrationNAAC() {
  const [completedCriteria, setCompletedCriteria] = useState<Set<string>>(new Set(["2"]));
  const [hoveredCrit, setHoveredCrit] = useState<string | null>(null);

  const criteria = [
    { num: "2", label: "Teaching-Learning", color: "#2563EB", desc: "Curriculum, pedagogy & assessment" },
    { num: "5", label: "Student Support", color: "#16A34A", desc: "Scholarships, placements & mentoring" },
    { num: "6", label: "Governance", color: "#EA580C", desc: "Leadership, strategy & quality" },
    { num: "7", label: "Institutional Values", color: "#7C3AED", desc: "Ethics, inclusion & sustainability" },
  ];

  const toggleCriteria = (num: string) => {
    setCompletedCriteria((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  const progress = Math.round((completedCriteria.size / criteria.length) * 100);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
          <span style={{ fontSize: 9, fontWeight: 800, color: progress === 100 ? "#16A34A" : "#2F54FF" }}>
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

        {/* Criteria list */}
        {criteria.map((c) => {
          const isDone = completedCriteria.has(c.num);
          const isHovered = hoveredCrit === c.num;
          return (
            <div key={c.num}>
              <button
                onClick={() => toggleCriteria(c.num)}
                onMouseEnter={() => setHoveredCrit(c.num)}
                onMouseLeave={() => setHoveredCrit(null)}
                style={{
                  width: "100%", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 8, marginBottom: 4,
                  background: isHovered ? "#F8FAFC" : isDone ? "#F0FDF4" : "#F8FAFC",
                  borderRadius: 8, padding: "7px 8px",
                  transition: "all 0.2s",
                  transform: isHovered ? "scale(1.02)" : "scale(1)",
                }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: isDone ? c.color : "#E2E8F0",
                  color: "#fff", fontSize: 9, fontWeight: 700, display: "flex",
                  alignItems: "center", justifyContent: "center", flexShrink: 0,
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transform: isDone ? "scale(1)" : "scale(0.9)",
                }}>{c.num}</div>
                <span style={{ fontSize: 8, fontWeight: 600, color: "#374151", textAlign: "left", flex: 1 }}>{c.label}</span>
                <div style={{
                  width: 16, height: 16, borderRadius: "50%",
                  background: isDone ? "#D1FAE5" : "#F1F5F9",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transform: isDone ? "rotate(0deg)" : "rotate(-90deg)",
                }}>
                  {isDone ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2.5 5l2 2 3.5-3.5" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#CBD5E1" }} />
                  )}
                </div>
              </button>
              {/* Tooltip on hover */}
              {isHovered && (
                <div style={{
                  fontSize: 7, color: "#94A3B8", padding: "2px 8px 4px 38px",
                  animation: "featureBadgePop 0.15s ease",
                }}>
                  {c.desc}
                </div>
              )}
            </div>
          );
        })}

        {/* Completion badge */}
        {progress === 100 && (
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

function IllustrationClassroom() {
  const rooms = [
    { id: "301", label: "Room 301", emoji: "🏫", angle: -40, distance: 72 },
    { id: "102", label: "Room 102", emoji: "🏫", angle: 40, distance: 75 },
    { id: "lab", label: "Lab A", emoji: "🔬", angle: 160, distance: 70 },
    { id: "lib", label: "Library", emoji: "📚", angle: 210, distance: 78 },
  ];

  const [connected, setConnected] = useState<Set<string>>(new Set(["301"]));
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  const toggleRoom = (id: string) => {
    setConnected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: 220, height: 220 }}>
        {/* Pulse rings */}
        <div style={{
          position: "absolute", left: "50%", top: "50%", width: 120, height: 120,
          marginLeft: -60, marginTop: -60, borderRadius: "50%",
          border: `2px solid rgba(47,84,255,${connected.size > 0 ? 0.12 : 0.04})`,
          animation: connected.size > 0 ? "featureRingPulse 2s ease-out infinite" : "none",
          transition: "border-color 0.3s",
        }} />
        <div style={{
          position: "absolute", left: "50%", top: "50%", width: 170, height: 170,
          marginLeft: -85, marginTop: -85, borderRadius: "50%",
          border: `2px solid rgba(47,84,255,${connected.size > 0 ? 0.06 : 0.02})`,
          animation: connected.size > 0 ? "featureRingPulse 2s ease-out 0.5s infinite" : "none",
          transition: "border-color 0.3s",
        }} />

        {/* Central IoT module */}
        <div style={{
          position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
          width: 72, height: 72, borderRadius: 18, background: "#fff",
          border: `2px solid ${connected.size > 0 ? "#C7D5FF" : "#E5E7EB"}`,
          boxShadow: connected.size > 0
            ? "0 8px 24px rgba(47,84,255,0.12)"
            : "0 4px 12px rgba(0,0,0,0.06)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          zIndex: 5, transition: "all 0.3s",
        }}>
          <span style={{ fontSize: 7, fontWeight: 800, color: "#2F54FF", letterSpacing: "0.05em" }}>nexalaya</span>
          <span style={{ fontSize: 5, color: "#94A3B8", fontWeight: 600, marginTop: 1 }}>IoT Module</span>
          {/* Wifi icon */}
          <svg width="18" height="14" viewBox="0 0 20 16" fill="none" style={{ marginTop: 3 }}>
            <path d="M10 14a1 1 0 100-2 1 1 0 000 2z" fill="#2F54FF" />
            <path d="M6.3 10.3a5.2 5.2 0 017.4 0" stroke="#2F54FF" strokeWidth="1.5" strokeLinecap="round" opacity={connected.size >= 1 ? 1 : 0.2} style={{ transition: "opacity 0.3s" }} />
            <path d="M3 7a9 9 0 0114 0" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" opacity={connected.size >= 2 ? 1 : 0.2} style={{ transition: "opacity 0.3s" }} />
            <path d="M0.5 4a13 13 0 0119 0" stroke="#DBEAFE" strokeWidth="1.5" strokeLinecap="round" opacity={connected.size >= 3 ? 1 : 0.2} style={{ transition: "opacity 0.3s" }} />
          </svg>
          {/* Connection count */}
          <div style={{
            position: "absolute", top: -6, right: -6,
            width: 18, height: 18, borderRadius: "50%",
            background: connected.size > 0 ? "#2F54FF" : "#94A3B8",
            color: "#fff", fontSize: 8, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.3s",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}>
            {connected.size}
          </div>
        </div>

        {/* Room nodes */}
        {rooms.map((room) => {
          const isConn = connected.has(room.id);
          const isHov = hoveredRoom === room.id;
          const rad = (room.angle * Math.PI) / 180;
          const x = 110 + Math.cos(rad) * room.distance - 30;
          const y = 110 + Math.sin(rad) * room.distance - 16;
          return (
            <button
              key={room.id}
              onClick={() => toggleRoom(room.id)}
              onMouseEnter={() => setHoveredRoom(room.id)}
              onMouseLeave={() => setHoveredRoom(null)}
              style={{
                position: "absolute", left: x, top: y,
                background: "#fff", borderRadius: 10,
                padding: "5px 8px", border: `1.5px solid ${isConn ? "#C7D5FF" : "#E5E7EB"}`,
                boxShadow: isHov ? "0 4px 16px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
                display: "flex", alignItems: "center", gap: 4, zIndex: 4,
                cursor: "pointer", whiteSpace: "nowrap",
                transition: "all 0.2s",
                transform: isHov ? "scale(1.08)" : "scale(1)",
              }}
            >
              <span style={{ fontSize: 10 }}>{room.emoji}</span>
              <span style={{ fontSize: 7, fontWeight: 600, color: "#374151" }}>{room.label}</span>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: isConn ? "#16A34A" : "#D1D5DB",
                transition: "background 0.3s",
                boxShadow: isConn ? "0 0 4px rgba(22,163,74,0.4)" : "none",
              }} />
            </button>
          );
        })}

        {/* Connection lines (SVG) */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 3, pointerEvents: "none" }}>
          {rooms.map((room) => {
            const isConn = connected.has(room.id);
            const rad = (room.angle * Math.PI) / 180;
            const x2 = 110 + Math.cos(rad) * room.distance;
            const y2 = 110 + Math.sin(rad) * room.distance;
            return (
              <line
                key={room.id}
                x1="110" y1="110" x2={x2} y2={y2}
                stroke={isConn ? "#2F54FF" : "#E5E7EB"}
                strokeWidth={isConn ? 1.5 : 1}
                strokeDasharray={isConn ? "none" : "4 3"}
                opacity={isConn ? 0.4 : 0.2}
                style={{ transition: "all 0.4s" }}
              />
            );
          })}
        </svg>

        {/* Hint text */}
        <div style={{
          position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)",
          fontSize: 7, color: "#94A3B8", fontWeight: 500, whiteSpace: "nowrap",
        }}>
          Click rooms to connect / disconnect
        </div>
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
    const next = (current + 1) % features.length;
    goTo(next, "next");
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    const prev = (current - 1 + features.length) % features.length;
    goTo(prev, "prev");
  }, [current, goTo]);

  /* keyboard arrow navigation */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  /* touch swipe */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
  };

  const f = features[current];
  const Illust = illustrations[current];

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

        {/* Carousel */}
        <AnimateOnScroll>
          <div
            className="features-carousel-wrapper"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Card */}
            <div
              className={`features-carousel-card ${isAnimating ? "features-card-exit" : "features-card-enter"}`}
              key={current}
              style={{ ["--slide-dir" as string]: direction === "next" ? "1" : "-1" }}
            >
              {/* Left: text content */}
              <div className="features-card-text">
                <div style={{
                  width: 48, height: 48, borderRadius: 14, background: f.iconBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem", marginBottom: 20, flexShrink: 0,
                }}>
                  {f.icon}
                </div>
                <h3 style={{
                  fontWeight: 700, fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                  color: "#111827", marginBottom: 10, letterSpacing: "-0.01em", lineHeight: 1.25,
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontSize: "0.925rem", color: "#6B7280", lineHeight: 1.7,
                  margin: 0, maxWidth: 360,
                }}>
                  {f.description}
                </p>
                {f.badge && (
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16,
                    background: "#F0F3FF", border: "1px solid #C7D5FF", borderRadius: 999,
                    padding: "5px 14px", fontSize: "0.78rem", fontWeight: 600, color: "#2F54FF",
                  }}>
                    {f.badgeIcon && <span>{f.badgeIcon}</span>}
                    {f.badge}
                  </div>
                )}
              </div>
              {/* Right: interactive illustration */}
              <div className="features-card-illust">
                <Illust />
              </div>
            </div>

            {/* Navigation arrows */}
            <button className="features-nav-btn features-nav-prev" onClick={goPrev} aria-label="Previous feature">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="features-nav-btn features-nav-next" onClick={goNext} aria-label="Next feature">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Dots indicator */}
            <div className="features-dots">
              {features.map((feat, i) => (
                <button
                  key={feat.title}
                  className={`features-dot ${i === current ? "features-dot-active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to feature ${i + 1}`}
                />
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
          overflow: hidden;
        }

        .features-card-text { flex: 1; min-width: 0; }
        .features-card-illust {
          flex: 0 0 260px;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .features-card-enter {
          animation: featureCardEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .features-card-exit {
          animation: featureCardExit 0.35s cubic-bezier(0.7, 0, 0.84, 0) forwards;
        }

        @keyframes featureCardEnter {
          from { opacity: 0; transform: translateX(calc(30px * var(--slide-dir, 1))); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes featureCardExit {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(calc(-30px * var(--slide-dir, 1))); }
        }

        /* Nav buttons */
        .features-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px; height: 44px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid #E5E7EB;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #374151;
          transition: all 0.2s ease;
          z-index: 5;
        }
        .features-nav-btn:hover {
          background: #2F54FF;
          border-color: #2F54FF;
          color: #fff;
          box-shadow: 0 4px 16px rgba(47, 84, 255, 0.25);
        }
        .features-nav-prev { left: -56px; }
        .features-nav-next { right: -56px; }

        /* Dots */
        .features-dots {
          display: flex; align-items: center; justify-content: center;
          gap: 8px; margin-top: 28px;
        }
        .features-dot {
          width: 8px; height: 8px; border-radius: 50%;
          border: none; background: #D1D5DB; cursor: pointer;
          padding: 0; transition: all 0.3s ease;
        }
        .features-dot-active {
          background: #2F54FF; width: 28px; border-radius: 4px;
        }

        /* Illustration animations */
        @keyframes featurePulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes featureScanLine {
          0% { top: 0; }
          50% { top: calc(100% - 3px); }
          100% { top: 0; }
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
        @keyframes featureSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .features-nav-prev { left: -12px; }
          .features-nav-next { right: -12px; }
        }

        @media (max-width: 768px) {
          .features-carousel-card {
            flex-direction: column;
            padding: 28px 24px;
            gap: 24px;
            min-height: auto;
          }
          .features-card-illust {
            flex: none; width: 100%; height: 240px; order: -1;
          }
          .features-nav-prev { left: 4px; }
          .features-nav-next { right: 4px; }
          .features-nav-btn { width: 36px; height: 36px; }
        }

        @media (max-width: 480px) {
          .features-carousel-card {
            padding: 20px 16px;
            border-radius: 20px;
          }
          .features-card-illust { height: 200px; }
        }
      `}</style>
    </section>
  );
}
