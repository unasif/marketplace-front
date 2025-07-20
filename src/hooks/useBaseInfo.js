import { useState, useEffect } from "react";
import { instance } from "../api";

const useBaseInfo = () => {
  const [baseInfo, setBaseInfo] = useState({});

  useEffect(() => {
    instance.get("/base_info")
      .then(res => setBaseInfo(res.data))
      .catch(() => setBaseInfo({}));
  }, []);

  return baseInfo;
};

export default useBaseInfo;