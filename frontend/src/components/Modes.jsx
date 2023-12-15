import React, { useState, useEffect } from "react";
import "./darkMode.css";

function Mode() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`Mode ${theme}`}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

export default Mode;
