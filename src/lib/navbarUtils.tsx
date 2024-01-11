// navbarUtils.ts

export const getTextColor = (path: string) => {
  const colorMap: Record<string, string> = {
    "/": "text-indigo-500",
    "/about": "text-red-500",
    "/portfolio": "text-green-500",
    "/services": "text-purple-500",
    "/contact": "text-blue-500",
    // Add more paths and colors as needed
  };

  return colorMap[path] || "";
};

export const getStyles = (path: string) => {
  const styleMap: Record<
    string,
    { fontFamily: string; backgroundImage: string }
  > = {
    "/": {
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
    "/": "#6366f1",
    "/about": "#ff0000",
    "/portfolio": "#00ff00",
    "/services": "#800080",
    "/contact": "#0000ff",
  };

  return neonColorMap[path] || "";
};
