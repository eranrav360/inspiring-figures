import { useState, useMemo } from "react";
import { FIGURES } from "./data.js";

const CATEGORIES = ["הכל", "מדע וטכנולוגיה", "פוליטיקה ומנהיגות", "אמנות וספרות", "ספורט"];

export default function App() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("הכל");
  const [selected, setSelected] = useState(null);
  const [imgError, setImgError] = useState({});

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
      background: "#0D0D0D",
      color: "#F5EDD6",
      fontFamily: "'Heebo', 'Arial Hebrew', Arial, sans-serif",
      direction: "rtl",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .card:hover { border-color: rgba(201,168,76,0.5) !important; transform: translateY(-4px); }
        .cat-btn:hover { border-color: #C9A84C !important; color: #C9A84C !important; }
        .back-btn:hover { color: #C9A84C !important; }
        .story-card:hover { border-color: rgba(201,168,76,0.4) !important; transform: translateY(-2px); }
        input::placeholder { color: #555; }
        .fade { animation: fadeUp 0.5s ease both; }
      `}</style>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", padding: "52px 0 32px" }}>
          <div style={{ fontSize: 10, letterSpacing: 6, textTransform: "uppercase", color: "#C9A84C", marginBottom: 12 }}>
            גלה • למד • התנשא
          </div>
          <h1 style={{
            fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.6rem)",
            fontWeight: 900, lineHeight: 1.1,
            background: "linear-gradient(135deg, #F5EDD6 0%, #E8CC80 50%, #F5EDD6 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>דמויות מעוררות השראה</h1>
          <div style={{ width: 70, height: 2, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "16px auto" }} />
          <p style={{ color: "#777", fontSize: "0.9rem", fontWeight: 300 }}>
            {FIGURES.length} דמויות מרתקות — חפש, סנן וגלה
          </p>
        </div>

        {/* Search */}
        <div style={{
          display: "flex", background: "#161616",
          border: "1px solid rgba(201,168,76,0.25)", borderRadius: 4,
          overflow: "hidden", marginBottom: 16,
        }}>
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(null); }}
            placeholder="חפש לפי שם, תחום..."
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              padding: "13px 18px", fontSize: "1rem", color: "#F5EDD6",
              fontFamily: "inherit", direction: "rtl"
            }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{
              background: "transparent", border: "none", padding: "0 16px",
              color: "#555", cursor: "pointer", fontSize: "1.2rem"
            }}>✕</button>
          )}
        </div>

        {/* Category Filter */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} className="cat-btn" onClick={() => { setActiveCategory(cat); setSelected(null); }} style={{
              background: activeCategory === cat ? "#C9A84C" : "transparent",
              border: "1px solid " + (activeCategory === cat ? "#C9A84C" : "rgba(201,168,76,0.25)"),
              borderRadius: 2, padding: "6px 16px", fontSize: "0.82rem",
              color: activeCategory === cat ? "#0D0D0D" : "#888",
              cursor: "pointer", fontFamily: "inherit", fontWeight: activeCategory === cat ? 700 : 400,
              transition: "all 0.2s"
            }}>{cat}</button>
          ))}
        </div>

        {/* Detail View */}
        {selected && (
          <div className="fade" key={selected.id}>
            <button className="back-btn" onClick={() => setSelected(null)} style={{
              background: "transparent", border: "none", color: "#888",
              cursor: "pointer", fontFamily: "inherit", fontSize: "0.85rem",
              marginBottom: 20, display: "flex", alignItems: "center", gap: 8,
              transition: "color 0.2s"
            }}>
              ← חזרה לרשימה
            </button>

            {/* Profile Card */}
            <div style={{
              background: "#161616", border: "1px solid rgba(201,168,76,0.15)",
              borderRadius: 6, overflow: "hidden", marginBottom: 20,
              display: "grid", gridTemplateColumns: imgError[selected.id] ? "1fr" : "200px 1fr"
            }}>
              {!imgError[selected.id] && (
                <div style={{ position: "relative", overflow: "hidden", background: "#1a1a1a", minHeight: 260 }}>
                  <img
                    src={selected.wikiImage}
                    alt={selected.name}
                    onError={() => setImgError(p => ({ ...p, [selected.id]: true }))}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "sepia(15%) contrast(1.05)" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, #161616 0%, transparent 35%)" }} />
                </div>
              )}
              <div style={{ padding: "30px 26px" }}>
                <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#C9A84C", marginBottom: 8 }}>
                  {selected.category}
                </div>
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.9rem", fontWeight: 700, color: "#F5EDD6", lineHeight: 1.1, marginBottom: 10 }}>
                  {selected.name}
                </h2>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
                  {[selected.field, selected.years].map((m, i) => (
                    <span key={i} style={{ color: "#888", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 4, height: 4, background: "#C9A84C", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
                      {m}
                    </span>
                  ))}
                </div>
                <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "0.95rem", color: "#E8CC80", lineHeight: 1.6, paddingRight: 14, borderRight: "2px solid #C9A84C" }}>
                  "{selected.quote}"
                </div>
              </div>
            </div>

            {/* Story */}
            <div style={{ background: "#161616", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 6, padding: "26px", marginBottom: 20 }}>
              <SectionTitle>הסיפור</SectionTitle>
              <p style={{ fontSize: "0.98rem", lineHeight: 1.9, color: "#C8C0AD", fontWeight: 300 }}>{selected.story}</p>
            </div>

            {/* Story Ideas */}
            <div style={{ background: "#161616", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 6, padding: "26px", marginBottom: 48 }}>
              <SectionTitle>רעיונות לסיפורים מעוררי השראה</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14 }}>
                {selected.stories.map((s, i) => (
                  <div key={i} className="story-card" style={{
                    background: "#1F1F1F", border: "1px solid rgba(201,168,76,0.1)",
                    borderRadius: 4, padding: "20px 16px", transition: "all 0.25s"
                  }}>
                    <div style={{ fontFamily: "Georgia, serif", fontSize: "2rem", color: "rgba(201,168,76,0.15)", lineHeight: 1, marginBottom: 10 }}>0{i + 1}</div>
                    <h3 style={{ fontSize: "0.88rem", fontWeight: 700, color: "#F5EDD6", marginBottom: 8, lineHeight: 1.4 }}>{s.title}</h3>
                    <p style={{ fontSize: "0.78rem", color: "#777", lineHeight: 1.7, fontWeight: 300 }}>{s.description}</p>
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
              <div style={{ textAlign: "center", padding: "60px 0", color: "#555" }}>
                לא נמצאו דמויות תואמות לחיפוש
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16, marginBottom: 52 }}>
                {filtered.map(fig => (
                  <div key={fig.id} className="card" onClick={() => selectFigure(fig)} style={{
                    background: "#161616", border: "1px solid rgba(201,168,76,0.12)",
                    borderRadius: 6, overflow: "hidden", cursor: "pointer",
                    transition: "all 0.25s"
                  }}>
                    <div style={{ height: 160, overflow: "hidden", background: "#1a1a1a", position: "relative" }}>
                      {!imgError[fig.id] ? (
                        <img
                          src={fig.wikiImage}
                          alt={fig.name}
                          onError={() => setImgError(p => ({ ...p, [fig.id]: true }))}
                          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", filter: "sepia(20%) contrast(1.05)" }}
                        />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, background: "#1f1f1f" }}>
                          👤
                        </div>
                      )}
                      <div style={{ position: "absolute", bottom: 0, inset: "auto 0 0 0", height: 60, background: "linear-gradient(to top, #161616, transparent)" }} />
                      <div style={{
                        position: "absolute", top: 10, right: 10,
                        background: "rgba(13,13,13,0.8)", border: "1px solid rgba(201,168,76,0.3)",
                        borderRadius: 2, padding: "2px 8px", fontSize: "0.68rem",
                        color: "#C9A84C", letterSpacing: 1
                      }}>{fig.category}</div>
                    </div>
                    <div style={{ padding: "16px 18px 20px" }}>
                      <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.15rem", fontWeight: 700, color: "#F5EDD6", marginBottom: 4 }}>{fig.name}</h3>
                      <div style={{ fontSize: "0.78rem", color: "#666", marginBottom: 12 }}>{fig.field} · {fig.years}</div>
                      <p style={{ fontSize: "0.78rem", color: "#888", fontStyle: "italic", lineHeight: 1.6, fontFamily: "Georgia, serif" }}>
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
