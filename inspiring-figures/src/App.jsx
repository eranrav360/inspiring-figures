import { useState, useMemo, useEffect } from "react";
import { FIGURES } from "./data.js";

const CATEGORIES = ["הכל", "מדע וטכנולוגיה", "פוליטיקה ומנהיגות", "אמנות וספרות", "ספורט"];

export default function App() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("הכל");
  const [selected, setSelected] = useState(null);
  const [imgError, setImgError] = useState({});
  const [storyModal, setStoryModal] = useState(null);
  const [showPurim, setShowPurim] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const hidden = localStorage.getItem("purim-dismissed");
    if (!hidden) setShowPurim(true);
  }, []);

  function closePurim() {
    if (dontShowAgain) localStorage.setItem("purim-dismissed", "1");
    setShowPurim(false);
  }

  const filtered = useMemo(() => {
    return FIGURES.filter(f => {
      const matchCat = activeCategory === "הכל" || f.category === activeCategory;
      const matchQuery = query === "" ||
        f.name.includes(query) ||
        f.field.includes(query) ||
        f.category.includes(query);
      return matchCat && matchQuery;
    });
  }, [query, activeCategory]);

  function selectFigure(fig) {
    setSelected(fig);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F5F0E8",
      color: "#1A1A1A",
      fontFamily: "'Rubik', 'Arial Hebrew', Arial, sans-serif",
      direction: "rtl",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700;900&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes modalIn { from { opacity:0; transform:translateY(30px) scale(0.96); } to { opacity:1; transform:translateY(0) scale(1); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Rubik', 'Arial Hebrew', Arial, sans-serif; background: #F5F0E8; }
        .card:hover { border-color: rgba(201,168,76,0.5) !important; transform: translateY(-4px); }
        .cat-btn:hover { border-color: #C9A84C !important; color: #C9A84C !important; }
        .back-btn:hover { color: #C9A84C !important; }
        .story-card:hover { border-color: rgba(160,120,40,0.5) !important; transform: translateY(-2px); background: #E8E2D4 !important; cursor: pointer; }
        input::placeholder { color: #AAA; }
        .fade { animation: fadeUp 0.5s ease both; }
        .modal-inner { animation: modalIn 0.3s ease both; }
      `}</style>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", padding: "52px 0 32px" }}>
          {/* Logo */}
          <div style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="28" cy="28" r="27" stroke="#C9A84C" strokeWidth="1.5" strokeOpacity="0.4"/>
              <circle cx="28" cy="28" r="20" stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.2"/>
              <polygon points="28,10 32,24 47,24 35,33 39,47 28,38 17,47 21,33 9,24 24,24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinejoin="round"/>
              <circle cx="28" cy="28" r="3" fill="#C9A84C" fillOpacity="0.8"/>
            </svg>
          </div>
          <div style={{ fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: "#C9A84C", marginBottom: 12, fontFamily: "'Rubik', sans-serif", fontWeight: 500 }}>
            גלה • למד • התנסה
          </div>
          <h1 style={{
            fontFamily: "'Rubik', sans-serif", fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
            fontWeight: 900, lineHeight: 1.1, color: "#1A1A1A",
          }}>דמויות מעוררות השראה</h1>
          <div style={{ width: 70, height: 2, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "16px auto" }} />
          <p style={{ color: "#777", fontSize: "1rem", fontWeight: 300 }}>
            {FIGURES.length} דמויות מרתקות — חפש, סנן וגלה
          </p>
        </div>

        {/* Search */}
        <div style={{
          display: "flex", background: "#FFFFFF",
          border: "1px solid rgba(201,168,76,0.25)", borderRadius: 4,
          overflow: "hidden", marginBottom: 16,
        }}>
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(null); }}
            placeholder="חפש לפי שם, תחום..."
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              padding: "15px 20px", fontSize: "1.05rem", color: "#1A1A1A",
              fontFamily: "inherit", direction: "rtl"
            }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{
              background: "transparent", border: "none", padding: "0 16px",
              color: "#999", cursor: "pointer", fontSize: "1.2rem"
            }}>✕</button>
          )}
        </div>

        {/* Category Filter */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} className="cat-btn" onClick={() => { setActiveCategory(cat); setSelected(null); }} style={{
              background: activeCategory === cat ? "#C9A84C" : "transparent",
              border: "1px solid " + (activeCategory === cat ? "#C9A84C" : "rgba(201,168,76,0.25)"),
              borderRadius: 2, padding: "7px 18px", fontSize: "0.9rem",
              color: activeCategory === cat ? "#FFFFFF" : "#888",
              cursor: "pointer", fontFamily: "inherit", fontWeight: activeCategory === cat ? 700 : 400,
              transition: "all 0.2s"
            }}>{cat}</button>
          ))}
        </div>

        {/* Detail View */}
        {selected && (
          <div className="fade" key={selected.id}>
            <button className="back-btn" onClick={() => setSelected(null)} style={{
              background: "transparent", border: "none", color: "#777",
              cursor: "pointer", fontFamily: "inherit", fontSize: "0.85rem",
              marginBottom: 20, display: "flex", alignItems: "center", gap: 8,
              transition: "color 0.2s"
            }}>
              ← חזרה לרשימה
            </button>

            {/* Profile Card */}
            <div style={{
              background: "#FFFFFF", border: "1px solid rgba(201,168,76,0.15)",
              borderRadius: 6, overflow: "hidden", marginBottom: 20,
              display: "grid", gridTemplateColumns: imgError[selected.id] ? "1fr" : "200px 1fr"
            }}>
              {!imgError[selected.id] && (
                <div style={{ position: "relative", overflow: "hidden", background: "#E8E2D8", minHeight: 260 }}>
                  <img
                    src={selected.wikiImage}
                    alt={selected.name}
                    onError={() => setImgError(p => ({ ...p, [selected.id]: true }))}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "none" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, #FFFFFF 0%, transparent 35%)" }} />
                </div>
              )}
              <div style={{ padding: "30px 26px" }}>
                <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#C9A84C", marginBottom: 8 }}>
                  {selected.category}
                </div>
                <h2 style={{ fontFamily: "'Rubik', sans-serif", fontSize: "2.1rem", fontWeight: 800, color: "#1A1A1A", lineHeight: 1.1, marginBottom: 10 }}>
                  {selected.name}
                </h2>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
                  {[selected.field, selected.years].map((m, i) => (
                    <span key={i} style={{ color: "#777", fontSize: "0.92rem", display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 4, height: 4, background: "#C9A84C", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
                      {m}
                    </span>
                  ))}
                </div>
                <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "1.05rem", color: "#7A5500", lineHeight: 1.6, paddingRight: 14, borderRight: "2px solid #C9A84C" }}>
                  "{selected.quote}"
                </div>
              </div>
            </div>

            {/* Story */}
            <div style={{ background: "#FFFFFF", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 6, padding: "26px", marginBottom: 20 }}>
              <SectionTitle>הסיפור</SectionTitle>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.9, color: "#444444", fontWeight: 300 }}>{selected.story}</p>
            </div>

            {/* Fun Fact */}
            <div style={{
              background: "linear-gradient(135deg, #FFFBEE, #FFF6D6)",
              border: "1px solid rgba(201,168,76,0.25)", borderRadius: 6, padding: "22px 26px",
              marginBottom: 20, display: "flex", gap: 16, alignItems: "flex-start"
            }}>
              <span style={{ fontSize: "1.6rem", flexShrink: 0, lineHeight: 1 }}>💡</span>
              <div>
                <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#C9A84C", marginBottom: 8, fontWeight: 500 }}>
                  Fun Fact
                </div>
                <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "#3A3A3A", fontWeight: 300 }}>
                  {selected.funFact}
                </p>
              </div>
            </div>

            {/* Story Ideas */}
            <div style={{ background: "#FFFFFF", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 6, padding: "26px", marginBottom: 48 }}>
              <SectionTitle>רעיונות לסיפורים מעוררי השראה</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14 }}>
                {selected.stories.map((s, i) => (
                  <div key={i} className="story-card" onClick={() => setStoryModal({ ...s, index: i })} style={{
                    background: "#F0EBE0", border: "1px solid rgba(201,168,76,0.1)",
                    borderRadius: 4, padding: "20px 16px", transition: "all 0.25s", cursor: "pointer"
                  }}>
                    <div style={{ fontFamily: "Georgia, serif", fontSize: "2rem", color: "rgba(201,168,76,0.15)", lineHeight: 1, marginBottom: 10 }}>0{i + 1}</div>
                    <h3 style={{ fontSize: "0.97rem", fontWeight: 700, color: "#1A1A1A", marginBottom: 8, lineHeight: 1.4 }}>{s.title}</h3>
                    <p style={{ fontSize: "0.86rem", color: "#666", lineHeight: 1.7, fontWeight: 300 }}>{s.description}</p>
                    <div style={{ marginTop: 14, fontSize: "0.78rem", color: "#C9A84C", letterSpacing: 1 }}>לחץ לסיפור המלא ←</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Grid View */}
        {!selected && (
          <div className="fade" key="grid">
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#999" }}>
                לא נמצאו דמויות תואמות לחיפוש
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16, marginBottom: 52 }}>
                {filtered.map(fig => (
                  <div key={fig.id} className="card" onClick={() => selectFigure(fig)} style={{
                    background: "#FFFFFF", border: "1px solid rgba(201,168,76,0.12)",
                    borderRadius: 6, overflow: "hidden", cursor: "pointer",
                    transition: "all 0.25s"
                  }}>
                    <div style={{ height: 160, overflow: "hidden", background: "#E8E2D8", position: "relative" }}>
                      {!imgError[fig.id] ? (
                        <img
                          src={fig.wikiImage}
                          alt={fig.name}
                          onError={() => setImgError(p => ({ ...p, [fig.id]: true }))}
                          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", filter: "none" }}
                        />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, background: "#EDE8DE" }}>
                          👤
                        </div>
                      )}
                      <div style={{ position: "absolute", bottom: 0, inset: "auto 0 0 0", height: 60, background: "linear-gradient(to top, #FFFFFF, transparent)" }} />
                      <div style={{
                        position: "absolute", top: 10, right: 10,
                        background: "rgba(255,255,255,0.95)", border: "1px solid rgba(201,168,76,0.3)",
                        borderRadius: 2, padding: "2px 8px", fontSize: "0.68rem",
                        color: "#C9A84C", letterSpacing: 1
                      }}>{fig.category}</div>
                    </div>
                    <div style={{ padding: "16px 18px 20px" }}>
                      <h3 style={{ fontFamily: "'Rubik', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "#1A1A1A", marginBottom: 4 }}>{fig.name}</h3>
                      <div style={{ fontSize: "0.85rem", color: "#666", marginBottom: 12 }}>{fig.field} · {fig.years}</div>
                      <p style={{ fontSize: "0.85rem", color: "#777", fontStyle: "italic", lineHeight: 1.6, fontFamily: "Georgia, serif" }}>
                        "{fig.quote.slice(0, 70)}{fig.quote.length > 70 ? "..." : ""}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{ textAlign: "center", paddingBottom: 28, color: "rgba(136,136,136,0.3)", fontSize: "0.68rem", letterSpacing: 3 }}>
          INSPIRING FIGURES · {FIGURES.length} CHARACTERS
        </div>
      </div>

      {/* Purim Greeting Modal */}
      {showPurim && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 2000, padding: 24, backdropFilter: "blur(6px)"
        }}>
          <div style={{
            background: "#FFFDF5",
            border: "2px solid #E8A020",
            borderRadius: 20,
            maxWidth: 420, width: "100%",
            padding: "40px 36px 32px",
            textAlign: "center",
            position: "relative",
            boxShadow: "0 24px 80px rgba(232,160,32,0.25), 0 0 0 6px rgba(232,160,32,0.08)",
            fontFamily: "'Rubik', sans-serif",
            direction: "rtl",
          }}>

            {/* Floating confetti emojis */}
            <style>{`
              @keyframes float1 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(15deg)} }
              @keyframes float2 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(-10deg)} }
              @keyframes float3 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(20deg)} }
              @keyframes popIn { from{opacity:0;transform:scale(0.7)} to{opacity:1;transform:scale(1)} }
              .purim-modal { animation: popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both; }
            `}</style>

            {/* Top icons row */}
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 20, fontSize: "2.2rem" }}>
              <span style={{ animation: "float1 2.5s ease-in-out infinite" }}>🎭</span>
              <span style={{ animation: "float2 2.8s ease-in-out infinite 0.3s" }}>🎪</span>
              <span style={{ animation: "float3 2.3s ease-in-out infinite 0.6s" }}>🥳</span>
              <span style={{ animation: "float2 2.6s ease-in-out infinite 0.1s" }}>🍭</span>
              <span style={{ animation: "float1 3s ease-in-out infinite 0.4s" }}>🎭</span>
            </div>

            {/* Subtitle */}
            <div style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#E8A020", marginBottom: 14, fontWeight: 600 }}>
              משלוח מנות לפורים
            </div>

            {/* Main greeting */}
            <h2 style={{
              fontSize: "2rem", fontWeight: 900, color: "#1A1A1A",
              lineHeight: 1.2, marginBottom: 8
            }}>
              פורים שמח ארז! 🎉
            </h2>

            <p style={{ fontSize: "1.1rem", color: "#555", marginBottom: 6, fontWeight: 400, lineHeight: 1.5 }}>
              מאת
            </p>
            <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#B07010", marginBottom: 24 }}>
              אהד רביב
            </p>

            {/* Divider */}
            <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, transparent, #E8A020, transparent)", margin: "0 auto 24px" }} />

            {/* Message */}
            <p style={{ fontSize: "0.95rem", color: "#777", lineHeight: 1.7, marginBottom: 28, fontWeight: 300 }}>
              קיבלת מתנה — אוסף של דמויות מעוררות השראה מכל תחומי החיים.
              <br />חג שמח! 🎊
            </p>

            {/* Bottom icons */}
            <div style={{ fontSize: "1.6rem", marginBottom: 28, letterSpacing: 8 }}>
              🍡 🎁 🃏 🎈 🍡
            </div>

            {/* Don't show again checkbox */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 20 }}>
              <input
                type="checkbox"
                id="purim-no-show"
                checked={dontShowAgain}
                onChange={e => setDontShowAgain(e.target.checked)}
                style={{ width: 16, height: 16, cursor: "pointer", accentColor: "#E8A020" }}
              />
              <label htmlFor="purim-no-show" style={{ fontSize: "0.85rem", color: "#999", cursor: "pointer", userSelect: "none" }}>
                אל תציג את זה בפעם הבאה
              </label>
            </div>

            {/* CTA Button */}
            <button
              onClick={closePurim}
              style={{
                background: "linear-gradient(135deg, #E8A020, #C07010)",
                border: "none", borderRadius: 10,
                padding: "13px 40px", fontSize: "1rem",
                color: "#FFFFFF", fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit",
                boxShadow: "0 4px 16px rgba(232,160,32,0.35)",
                transition: "transform 0.15s, box-shadow 0.15s",
                width: "100%"
              }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px rgba(232,160,32,0.45)"; }}
              onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 16px rgba(232,160,32,0.35)"; }}
            >
              לאפליקציה 🎭
            </button>
          </div>
        </div>
      )}

      {/* Story Modal */}
      {storyModal && (
        <div
          onClick={() => setStoryModal(null)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000, padding: 24, backdropFilter: "blur(4px)"
          }}
        >
          <div
            className="modal-inner"
            onClick={e => e.stopPropagation()}
            style={{
              background: "#FFFFFF", border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: 8, maxWidth: 560, width: "100%", padding: "40px 36px",
              position: "relative"
            }}
          >
            {/* Close */}
            <button onClick={() => setStoryModal(null)} style={{
              position: "absolute", top: 16, left: 16,
              background: "transparent", border: "none", color: "#999",
              cursor: "pointer", fontSize: "1.3rem", lineHeight: 1
            }}>✕</button>

            {/* Number */}
            <div style={{ fontFamily: "Georgia, serif", fontSize: "3rem", color: "rgba(201,168,76,0.12)", lineHeight: 1, marginBottom: 16 }}>
              0{storyModal.index + 1}
            </div>

            {/* Figure name */}
            <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#C9A84C", marginBottom: 10 }}>
              {selected?.name} — רעיון לסיפור
            </div>

            {/* Title */}
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.6rem", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.2, marginBottom: 20 }}>
              {storyModal.title}
            </h2>

            <div style={{ width: 50, height: 1, background: "linear-gradient(90deg, #C9A84C, transparent)", marginBottom: 20 }} />

            {/* Theme */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <span style={{ fontSize: "0.75rem", letterSpacing: 2, color: "#999", textTransform: "uppercase" }}>נושא</span>
              <span style={{ fontSize: "0.88rem", color: "#C9A84C", fontWeight: 400 }}>{storyModal.theme}</span>
            </div>

            {/* Full Guide */}
            <p style={{ fontSize: "1.02rem", lineHeight: 1.85, color: "#444444", fontWeight: 300, marginBottom: 28 }}>
              {storyModal.fullGuide}
            </p>

            {/* Questions */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#C9A84C", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                שאלות מנחות
                <span style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.15)" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {storyModal.questions.map((q, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: "#C9A84C", fontSize: "0.75rem", marginTop: 3, flexShrink: 0 }}>◆</span>
                    <p style={{ fontSize: "0.95rem", color: "#555555", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>{q}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Structure */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#C9A84C", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                מבנה מוצע לסיפור
                <span style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.15)" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {storyModal.structure.map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{
                      background: "#FFF5D6", border: "1px solid rgba(201,168,76,0.2)",
                      borderRadius: 2, padding: "1px 8px", fontSize: "0.75rem", color: "#C9A84C",
                      flexShrink: 0, marginTop: 2, fontFamily: "Georgia, serif"
                    }}>{i + 1}</span>
                    <p style={{ fontSize: "0.95rem", color: "#555555", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>{s}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div style={{
              background: "#FBF8EE", border: "1px solid rgba(201,168,76,0.15)",
              borderRadius: 4, padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-start"
            }}>
              <span style={{ fontSize: "0.75rem", letterSpacing: 2, color: "#C9A84C", textTransform: "uppercase", flexShrink: 0, marginTop: 1 }}>טון</span>
              <p style={{ fontSize: "0.92rem", color: "#777", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>{storyModal.tone}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: 5, textTransform: "uppercase", color: "#C9A84C", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
      {children}
      <span style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.2)", display: "block" }} />
    </div>
  );
}
