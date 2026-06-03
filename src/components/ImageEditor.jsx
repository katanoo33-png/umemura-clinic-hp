import { useState } from "react";
import { DEFAULT_IMAGES, IMAGE_LABELS } from "../config/images";

export function ImageEditor({ images, setImages, open, setOpen }) {
  const [editKey, setEditKey] = useState("");
  const [urlInput, setUrlInput] = useState("");

  if (!open) return null;

  const handleFileUpload = (key) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => setImages((p) => ({ ...p, [key]: ev.target.result }));
      reader.readAsDataURL(file);
    };
    input.click();
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 5000,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,.55)", backdropFilter: "blur(4px)",
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, width: "90%", maxWidth: 720,
        maxHeight: "85vh", overflow: "auto", padding: "32px 28px",
        position: "relative", boxShadow: "0 24px 80px rgba(0,0,0,.2)",
      }}>
        <button onClick={() => setOpen(false)} style={{
          position: "absolute", top: 16, right: 20,
          background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#999",
        }}>×</button>

        <h3 style={{ fontSize: 20, fontWeight: 600, color: "#333", marginBottom: 6, fontFamily: "'Noto Serif JP', serif" }}>
          写真の管理
        </h3>
        <p style={{ fontSize: 13, color: "#999", marginBottom: 24 }}>
          URLを入力するか、ファイルを選択して写真を差し替えてください
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
          {Object.keys(IMAGE_LABELS).map((key) => (
            <div key={key} style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #eee" }}>
              <div style={{
                height: 120, backgroundImage: `url(${images[key]})`,
                backgroundSize: "cover", backgroundPosition: "center", position: "relative",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(transparent 40%, rgba(0,0,0,.5))",
                  display: "flex", alignItems: "flex-end", padding: "10px 12px",
                }}>
                  <span style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>{IMAGE_LABELS[key]}</span>
                </div>
              </div>
              <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
                <input
                  type="text"
                  placeholder="画像URLを入力..."
                  value={editKey === key ? urlInput : ""}
                  onFocus={() => { setEditKey(key); setUrlInput(images[key] || ""); }}
                  onChange={(e) => { setUrlInput(e.target.value); setEditKey(key); }}
                  style={{
                    width: "100%", padding: "7px 10px", borderRadius: 8,
                    border: "1px solid #ddd", fontSize: 12, outline: "none",
                  }}
                />
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    onClick={() => {
                      if (editKey === key && urlInput) {
                        setImages((p) => ({ ...p, [key]: urlInput }));
                        setEditKey("");
                      }
                    }}
                    style={{
                      flex: 1, padding: "6px 0", borderRadius: 8, border: "none",
                      background: "#9a8e7f", color: "#fff", fontSize: 11, cursor: "pointer", fontWeight: 500,
                    }}
                  >URL適用</button>
                  <button
                    onClick={() => handleFileUpload(key)}
                    style={{
                      flex: 1, padding: "6px 0", borderRadius: 8,
                      border: "1px solid #ddd", background: "#fff", color: "#666",
                      fontSize: 11, cursor: "pointer",
                    }}
                  >ファイル選択</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setImages({ ...DEFAULT_IMAGES })}
          style={{
            marginTop: 16, padding: "8px 20px", borderRadius: 10,
            border: "1px solid #ddd", background: "#fafafa",
            color: "#888", fontSize: 12, cursor: "pointer",
          }}
        >デフォルトに戻す</button>
      </div>
    </div>
  );
}
