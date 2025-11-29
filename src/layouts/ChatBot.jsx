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
        // Hide the widget using CSS as a fallback
        const style = document.createElement('style');
        style.id = 'hide-chatbot-style';
        style.innerHTML = `
          [id^="chatling"], [id^="chtl"], .chatling-widget { display: none !important; }
        `;
        document.head.appendChild(style);
      } catch (e) {
        window.chtlConfig = undefined;
      }
    };
  }, []);

  // Remove the hiding style when component mounts
  useEffect(() => {
    const style = document.getElementById('hide-chatbot-style');
    if (style) style.remove();
  });

  return null; 
};

export default Chatbot;