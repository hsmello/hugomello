import { useEffect } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './WebScraping.css'

export default function CodeWindow({ codeString, fileName = "myScript.js" }) {
  useEffect(() => {
    const preventCopy = (e) => e.preventDefault();
    document.addEventListener("copy", preventCopy);
    document.addEventListener("cut", preventCopy);
    document.addEventListener("paste", preventCopy);
    return () => {
      document.removeEventListener("copy", preventCopy);
      document.removeEventListener("cut", preventCopy);
      document.removeEventListener("paste", preventCopy);
    };
  }, []);

  const styles = {
    container: {
      width: "100%",
      maxWidth: "100%",
      maxHeight: "100%",
      borderRadius: "16px",
      overflow: "hidden",
      backgroundColor: "#1e1e1e",
      color: "white",
      fontFamily: "monospace",
      userSelect: "none",
      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
      display: "flex",
      flexDirection: "column",
    },
    topBar: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 16px",
      backgroundColor: "#2d2d2d",
      fontSize: "14px",
      color: "#ccc",
      flexShrink: 0,
    },
    circle: (color) => ({
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: color,
    }),
      code: {
      padding: "16px",
      whiteSpace: "pre",
      overflowY: "auto",
      flexGrow: 1,
      lineHeight: "1.5",
      textAlign: "left",
      tabSize: 4,
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <div style={styles.circle("#ff5f56")} />
        <div style={styles.circle("#ffbd2e")} />
        <div style={styles.circle("#27c93f")} />
        <span style={{ marginLeft: "16px" }}>{fileName}</span>
      </div>
      <pre style={styles.code}>
        
        <SyntaxHighlighter
        language="python"
        style={vscDarkPlus}
        wrapLines={true}
        showLineNumbers={true}
        customStyle={{
            margin: 0,
            backgroundColor: "#1e1e1e",
            fontSize: "14px",
            lineHeight: "1.5",
            userSelect: "none",
            overflowY: "auto",
            borderRadius: "16px",
        }}
        >

        {codeString}
      </SyntaxHighlighter>
        
        
      </pre>
    </div>
  );
}
