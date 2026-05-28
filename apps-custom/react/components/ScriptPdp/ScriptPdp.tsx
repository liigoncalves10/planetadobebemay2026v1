import React, { useEffect } from "react";

export const ScriptPdp: React.FC = () => {
  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement("script");
      script.setAttribute("async", "async");
      script.setAttribute(
        "src",
        "https://widget.pagaleve.com.br/pagaleve-widget-installer.js"
      );
      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      loadScript();
      return; // 👈 ESSENCIAL
    }

    window.addEventListener("load", loadScript);

    return () => {
      window.removeEventListener("load", loadScript);
    };
  }, []);

  return <div id="pagaleve-widget-calculator-root"></div>;
};
