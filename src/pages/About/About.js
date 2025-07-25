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
          // інші модулі добавлю потім
          return null;
        })}
      </div>
    </div>
  );
};
