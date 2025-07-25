import { useEffect, useState } from "react";
import { instance } from "../api";

const usePageModules = (pageType) => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    instance
      .get(`/page_modules/${pageType}`)
      .then((res) => {
        const parsed = res.data.map((mod) => ({
          ...mod,
          content:
            typeof mod.content === "string"
              ? JSON.parse(mod.content)
              : mod.content,
          styles:
            typeof mod.styles === "string"
              ? JSON.parse(mod.styles)
              : mod.styles,
        }));
        setModules(parsed);
      })
      .catch(() => setModules([]));
  }, [pageType]);

  return modules;
};

export default usePageModules;
