import AnimateOnScroll from "./AnimateOnScroll";

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: "80px 0 40px" }}>
      <div className="container">
        {/* Dark container */}
        <div
          style={{
            background: "#111",
            borderRadius: 28,
            padding: "80px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle radial ring */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 500,
              height: 500,
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
          <AnimateOnScroll>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#93C5FD",
                display: "block",
                marginBottom: 12,
              }}
            >
              How It Works
            </span>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              Three taps.{" "}
              <span
                style={{
                  color: "#93C5FD",
                  textDecoration: "underline",
                  textDecorationColor: "#3B82F6",
                  textUnderlineOffset: 4,
                }}
              >
                Ten seconds.
              </span>
            </h2>
            <p
              style={{
                marginTop: 12,
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.5)",
                maxWidth: 480,
                margin: "12px auto 0",
                lineHeight: 1.7,
              }}
            >
              No complex setup. No dedicated hardware room. The IoT module plugs
              directly into any classroom — and your entire college goes smart.
            </p>
          </AnimateOnScroll>

          {/* Bento Grid */}
          <div className="bento-grid">
            {/* Step 1 */}
            <AnimateOnScroll delay={0}>
              <div className="bento-card bento-card-uniform">
                {/* Phone mockup */}
                <div className="bento-phone-wrap">
                  <img
                    src="/ux/WhatsApp Image 2026-06-24 at 21.26.13 (1).jpeg"
                    alt="Start Attendance"
                    className="bento-phone-img"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <span className="bento-step-num">01</span>
                    <h3 className="bento-title">Professor taps &quot;Start Attendance&quot;</h3>
                  </div>
                  <p className="bento-desc">
                    One tap on the nexalaya app activates the IoT module.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Step 2 */}
            <AnimateOnScroll delay={100}>
              <div className="bento-card bento-card-uniform">
                {/* Phone mockup */}
                <div className="bento-phone-wrap">
                  <img
                    src="/ux/WhatsApp Image 2026-06-24 at 21.30.11.jpeg"
                    alt="Face Scan Range"
                    className="bento-phone-img"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <span className="bento-step-num">02</span>
                    <h3 className="bento-title">Face scan appears only in-range</h3>
                  </div>
                  <p className="bento-desc">
                    The <strong>facial recognition</strong> prompt appears only for students physically <strong>inside the classroom</strong>.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Step 3 */}
            <AnimateOnScroll delay={200}>
              <div className="bento-card bento-card-uniform">
                {/* Phone mockup */}
                <div className="bento-phone-wrap">
                  <img
                    src="/ux/WhatsApp Image 2026-06-24 at 21.26.11 (1).jpeg"
                    alt="Done in 10 seconds"
                    className="bento-phone-img"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <span className="bento-step-num">03</span>
                    <h3 className="bento-title">Done in 10 seconds. Synced everywhere.</h3>
                  </div>
                  <p className="bento-desc">
                    Every verified face is marked instantly. Reports are generated automatically — <strong>zero paperwork</strong>.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>

      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 48px;
        }

        .bento-card {
          background: #ffffff;
          border: 1px solid #E5E7EB;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .bento-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
        }

        .bento-card-uniform {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 32px 24px;
          gap: 28px;
          text-align: center;
          height: 100%;
        }

        .bento-step-num {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #F0F3FF;
          color: #2F54FF;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bento-title {
          font-weight: 700;
          font-size: 1.1rem;
          color: #111827;
          margin: 0;
        }

        .bento-desc {
          font-size: 0.875rem;
          color: #6B7280;
          line-height: 1.6;
          margin: 0;
        }

        .bento-phone-wrap {
          width: 100%;
          max-width: 220px;
          aspect-ratio: 9/20;
          border: 6px solid #1F2937;
          border-radius: 28px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          flex-shrink: 0;
        }

        .bento-phone-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 768px) {
          #how-it-works > div > div {
            padding: 48px 24px !important;
          }
          .bento-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .bento-card-uniform {
            padding: 32px 20px !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
