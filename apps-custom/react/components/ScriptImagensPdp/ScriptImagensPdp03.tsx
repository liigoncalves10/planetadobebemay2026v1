import { useEffect } from "react";

export const ScriptImagensPdp03 = () => {

  useEffect(() => {
    const loadScript = () => {
        const script = document.createElement("div");
        script.setAttribute("id", "syndi_inline");

        document.querySelector(
        ".vtex-store-components-3-x-productDescriptionText--product-description"
        )?.before(script);
    };

    if (document.readyState === 'complete') {
        loadScript();
        return;
    }
  }, []);

  return null;
};

