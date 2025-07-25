import styles from "./Communication.module.scss";
import usePageModules from "../../hooks/usePageModules";

export const Communication = () => {
  const modules = usePageModules("communication");

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
          // інші модулі добавлю потім
          return null;
        })}
      </div>
    </div>
  );
};
  