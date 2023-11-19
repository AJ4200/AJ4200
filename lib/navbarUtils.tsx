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
      backgroundImage: "url(//images.weserv.nl/?url=i.imgur.com/6QJjYMe.jpg)",
    },
    "/about": {
      fontFamily: "MonaspaceRadon",
      backgroundImage:
        "url('https://img.freepik.com/free-photo/red-black-brush-stroke-banner-background-perfect-canva_1361-3597.jpg?w=900&t=st=1700381273~exp=1700381873~hmac=a5c66abec64f0fac7e1b7e0e6dd128ac115709d186b326beb1f0279e6ed7ba57')",
    },
    "/portfolio": {
      fontFamily: "font-mono",
      backgroundImage: "url('/imgs/pbg.jpg')",
    },
    "/services": {
      fontFamily: "font-serif",
      backgroundImage: "url('/images/services-background.jpg')",
    },
    "/contact": {
      fontFamily: "font-sans",
      backgroundImage: "url('/images/contact-background.jpg')",
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
