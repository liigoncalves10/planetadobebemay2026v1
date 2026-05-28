import React, { useEffect } from "react";
import { useProduct } from "vtex.product-context";

export const ScriptImagensPdp02: React.FC = () => {
  const productContextValue = useProduct();
  const productReference = productContextValue?.product?.productReference;

  useEffect(() => {
    if (!productReference) return;

    const loadScript = () => {
      const script = document.createElement("script");
      script.setAttribute("type", "text/javascript");

      script.innerHTML = `
        window.SYNDI = window.SYNDI || [];
        SYNDI.push('${productReference}');
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
  }, [productReference]);

  return null;
};
