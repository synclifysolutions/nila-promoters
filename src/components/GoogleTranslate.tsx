import { useEffect, useId } from "react";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

let scriptLoading = false;

export default function GoogleTranslate() {
  // unique container id so desktop + mobile copies don't collide
  const containerId = useId().replace(/:/g, "");

  useEffect(() => {
    const initWidget = () => {
      if (!window.google?.translate?.TranslateElement) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "ta,en",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        containerId
      );
    };

    if (window.google?.translate?.TranslateElement) {
      initWidget();
      return;
    }

    window.googleTranslateElementInit = initWidget;

    if (!scriptLoading && !document.getElementById("google-translate-script")) {
      scriptLoading = true;
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [containerId]);

  return <div id={containerId} style={{ display: "flex", alignItems: "center", minWidth: 60 }} />;
}
