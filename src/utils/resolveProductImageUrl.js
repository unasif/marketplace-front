const getApiBase = () => {
  if (typeof window === "undefined") {
    return "/api/";
  }

  const path = window.location.pathname;
  if (path.startsWith("/testdevelopment")) {
    return "/testdevelopment/api/";
  }
  if (path.startsWith("/marketdemo")) {
    return "/marketdemo/api/";
  }
  return "/api/";
};

export const resolveProductImageUrl = (mainPhoto) => {
  if (!mainPhoto) {
    return "";
  }

  if (mainPhoto.startsWith("http://") || mainPhoto.startsWith("https://")) {
    return mainPhoto;
  }

  return `${getApiBase()}${mainPhoto.replace(/\\/g, "/")}`;
};
