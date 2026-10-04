import { ImageResponse } from "next/og";

const logoMark = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><rect x="2" y="2" width="60" height="60" rx="18" fill="#18211D"/><path d="M39 13H31C20.507 13 12 21.507 12 32s8.507 19 19 19h8" stroke="#D0F766" stroke-width="5.5" stroke-linecap="round"/><path d="M28 38 50 16M38 16h12v12" stroke="#ED684A" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
)}`;

export const alt =
  "DelighTech software studio — websites, web apps, and mobile apps. Led by Olaoluwa Moshood, CEO.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#18211d",
        color: "#f4f5ee",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -210,
          right: -60,
          width: 550,
          height: 550,
          display: "flex",
          border: "1px solid rgba(208,247,102,.22)",
          borderRadius: 275,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 440,
          bottom: -260,
          width: 480,
          height: 480,
          display: "flex",
          border: "1px solid rgba(237,104,74,.34)",
          borderRadius: 240,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 54,
          left: 64,
          right: 64,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#aab5a9",
          fontSize: 15,
          letterSpacing: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #d0f766",
              borderRadius: 15,
              color: "#d0f766",
              fontSize: 12,
              letterSpacing: 0,
            }}
          >
            <img src={logoMark} width={30} height={30} alt="" />
          </div>
          <span>DELIGHTECH / FIELD NOTES</span>
        </div>
        <span>WEB · MOBILE · PRODUCT</span>
      </div>
      <div
        style={{
          width: 700,
          position: "absolute",
          top: 158,
          left: 66,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 11,
            color: "#d0f766",
            fontSize: 15,
            letterSpacing: 2,
          }}
        >
          <span>01</span>
          <span style={{ color: "#9eaa9f" }}>
            OLAOLUWA MOSHOOD / CEO OF DELIGHTECH
          </span>
        </div>
        <div
          style={{
            marginTop: 21,
            display: "flex",
            flexDirection: "column",
            fontSize: 64,
            lineHeight: 1.02,
            fontWeight: 700,
            letterSpacing: -2,
          }}
        >
          <div>Good software begins</div>
          <div>with a better question.</div>
        </div>
        <div
          style={{
            width: 595,
            marginTop: 20,
            color: "#c1c9bf",
            fontSize: 21,
            lineHeight: 1.45,
          }}
        >
          Thoughtful web and mobile products, built by the DelighTech team.
        </div>
        <div
          style={{
            marginTop: 26,
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#d0f766",
            fontSize: 15,
            letterSpacing: 1,
          }}
        >
          <span style={{ width: 35, height: 2, backgroundColor: "#ed684a" }} />
          <span>DELIGHTECH / SOFTWARE STUDIO</span>
        </div>
      </div>
      <div
        style={{
          width: 232,
          height: 370,
          position: "absolute",
          top: 142,
          right: 103,
          padding: 8,
          display: "flex",
          border: "1px solid #879087",
          borderRadius: 29,
          backgroundColor: "#111512",
          boxShadow: "0 24px 48px rgba(0,0,0,.36)",
          transform: "rotate(5deg)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: "24px 15px 13px",
            display: "flex",
            flexDirection: "column",
            borderRadius: 22,
            backgroundColor: "#f2f4ed",
            color: "#223128",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#69766d",
              fontSize: 10,
            }}
          >
            <span>9:41</span>
            <span>LTE / 100%</span>
          </div>
          <div
            style={{ marginTop: 21, display: "flex", flexDirection: "column" }}
          >
            <span style={{ color: "#718077", fontSize: 10, letterSpacing: 1 }}>
              ORACLE / MARKET RADAR
            </span>
            <strong style={{ marginTop: 5, fontSize: 20 }}>
              Signals, explained.
            </strong>
          </div>
          <div
            style={{
              marginTop: 17,
              padding: 11,
              display: "flex",
              flexDirection: "column",
              border: "1px solid #dce5d6",
              backgroundColor: "#e8efdf",
            }}
          >
            <span style={{ color: "#72826f", fontSize: 9 }}>
              SMART MONEY CONVERGENCE
            </span>
            <strong style={{ marginTop: 7, fontSize: 19 }}>$BONK</strong>
            <span style={{ marginTop: 4, color: "#718074", fontSize: 10 }}>
              9 wallets entered in 12 minutes
            </span>
            <div
              style={{
                height: 35,
                marginTop: 13,
                display: "flex",
                alignItems: "flex-end",
                gap: 5,
                borderBottom: "1px solid #cad6c5",
              }}
            >
              {[30, 42, 36, 61, 48, 74, 62, 90, 72, 100].map(
                (height, index) => (
                  <div
                    key={index}
                    style={{
                      height: `${height}%`,
                      flex: 1,
                      backgroundColor: index > 6 ? "#ed684a" : "#71936a",
                    }}
                  />
                ),
              )}
            </div>
          </div>
          <div
            style={{
              marginTop: 10,
              padding: 10,
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid #e0e4db",
              backgroundColor: "#fff",
              fontSize: 10,
            }}
          >
            <span>WHALE ROTATION</span>
            <strong style={{ color: "#506e54" }}>$JUP / $RAY</strong>
          </div>
          <div
            style={{
              marginTop: "auto",
              paddingTop: 11,
              display: "flex",
              justifyContent: "space-around",
              borderTop: "1px solid #dfe4dc",
              color: "#68756b",
              fontSize: 9,
            }}
          >
            <span>HOME</span>
            <span>RADAR</span>
            <span>PROFILE</span>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 66,
          bottom: 54,
          color: "#9ba69a",
          fontSize: 11,
          letterSpacing: 2,
        }}
      >
        DELIGHTECH.NET / 2026
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 54,
          left: 66,
          color: "#869187",
          fontSize: 12,
          letterSpacing: 1,
        }}
      >
        USEFUL SOFTWARE. BUILT WITH INTENT.
      </div>
    </div>,
    { ...size },
  );
}
