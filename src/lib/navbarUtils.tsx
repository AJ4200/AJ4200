export const getTextColor = (path: string) => {
  const colorMap: Record<string, string> = {
    "/": "text-black",
    "/home": "text-indigo-500",
    "/about": "text-red-500",
    "/portfolio": "text-green-500",
    "/services": "text-purple-500",
    "/contact": "text-blue-500",
  };

  return colorMap[path] || "";
};

export const getStyles = (path: string) => {
  const styleMap: Record<
    string,
    { fontFamily: string; backgroundImage: string }
  > = {
    "/": {
      fontFamily: "Ethnocentric",
      backgroundImage: "url(imgs/bw.jpg)",
    },
    "/home": {
      fontFamily: "MonaspaceKrypton",
      backgroundImage: "url(imgs/bbw.jpg)",
    },
    "/about": {
      fontFamily: "pricedown",
      backgroundImage: "url('imgs/apg.jpg')",
    },
    "/portfolio": {
      fontFamily: "Girdens",
      backgroundImage: "url('/imgs/pbg.jpg')",
    },
    "/services": {
      fontFamily: "rimouski",
      backgroundImage: "url('/imgs/8753.jpg')",
    },
    "/contact": {
      fontFamily: "Teqto",
      backgroundImage: "url('/imgs/water.jpg')",
    },
  };

  return styleMap[path] || { fontFamily: "", backgroundImage: "" };
};

export const getNeonColor = (path: string) => {
  const neonColorMap: Record<string, string> = {
    "/": "#000",
    "/home": "#6366f1",
    "/about": "#ff0000",
    "/portfolio": "#00ff00",
    "/services": "#800080",
    "/contact": "#0000ff",
  };

  return neonColorMap[path] || "";
};
export const getFont = (path: string) => {
  const fontMap: Record<string, string> = {
    "/": "Ethnocentric",
    "/home": "MonaspaceKrypton",
    "/about": "pricedown",
    "/portfolio": "Girdens",
    "/services": "rimouski",
    "/contact": "Teqto",
  };

  return fontMap[path] || "";
};
