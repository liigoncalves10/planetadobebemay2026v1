import React, { useEffect } from "react";

export const ScriptImagensPdp01: React.FC = () => {
  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement("script");
      script.setAttribute("type", "text/javascript");

      script.innerHTML = `
        (function (s, y, n, di, go) {
          di = s.createElement(y);
          di.type = 'text/java'+y;
          di.async = true;
          di.src = n + Math.floor(Date.now() / 86400000);
          go = s.getElementsByTagName(y)[0];
          go.parentNode.insertBefore(di,go);
        }(document,'script', "https://content.syndigo.com/site/49e9f9b3-6df2-796a-cbb5-980299d13ad5/tag.js?cv="));
      `;

      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      loadScript();
      return;
    }

    window.addEventListener("load", loadScript);

    return () => {
      window.removeEventListener("load", loadScript);
    };
  }, []);

  return null;
};
