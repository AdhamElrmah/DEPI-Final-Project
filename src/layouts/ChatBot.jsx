import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    window.chtlConfig = { chatbotId: "2823549576" };

    const script = document.createElement("script");
    script.async = true;
    script.id = "chtl-script";
    script.type = "text/javascript";
    script.dataset.id = "1953682756";
    script.src = "https://chatling.ai/js/embed.js";
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
      try {
        delete window.chtlConfig;
      } catch (e) {
        window.chtlConfig = undefined;
      }
    };
  }, []);

  return null; 
};

export default Chatbot;