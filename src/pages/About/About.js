import styles from "./About.module.scss";
import usePageModules from "../../hooks/usePageModules";

export const About = () => {
  const modules = usePageModules("about");

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        {modules.map((mod) => {
          if (mod.module_type === "text") {
            const content = mod.content || {};
            const style = mod.styles || {};
            return (
              <div key={mod.id} style={style}>
                {content.title && (
                  <h3 style={{ fontWeight: "bold" }}>{content.title}</h3>
                )}
                {content.content && (
                  <div
                    dangerouslySetInnerHTML={{ __html: content.content }}
                  />
                )}
              </div>
            );
          }
          if (mod.module_type === "gallery") {
            const { images = [] } = mod.content || {};
            const { columns = 3 } = mod.styles || {};
            return (
              <div
                key={mod.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                  gap: "20px",
                  margin: "40px 0",
                }}
              >
                {images.map((img, idx) => (
                  <div key={idx} style={{ textAlign: "center" }}>
                    <img
                      src={img.url}
                      alt={img.caption || ""}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                    {img.caption && (
                      <div style={{ marginTop: "8px", color: "#555" }}>
                        {img.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          }
          // інші модулі добавлю потім
          return null;
        })}
      </div>
    </div>
  );
};
