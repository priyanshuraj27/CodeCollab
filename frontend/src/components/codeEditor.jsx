import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const CodeEditor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);
  const [code, setCode] = useState("// Start coding...");
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const darkMode = useSelector((state) => state.theme.darkMode);
  const language = useSelector((state) => state.theme.language);
  const fontSize = useSelector((state) => state.theme.fontSize);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleCodeChange = (newValue) => {
    setCode(newValue);
    onCodeChange(newValue);
    socketRef.current.emit("CODE_CHANGE", { roomId, code: newValue });

    // Typing animation
    setIsTyping(true);
    if (typingTimeout) clearTimeout(typingTimeout);
    const timeout = setTimeout(() => setIsTyping(false), 800);
    setTypingTimeout(timeout);
  };

  useEffect(() => {
    if (!socketRef.current) return;

    const handleCodeSync = ({ code }) => {
      setCode(code);
    };

    socketRef.current.on("CODE_SYNC", handleCodeSync);

    return () => {
      socketRef.current.off("CODE_SYNC", handleCodeSync);
    };
  }, [socketRef]);

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Typing animation */}
      {isTyping && (
        <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
          <Loader2 className="h-4 w-4 text-blue-400 animate-pulse" />
          <span className="text-sm text-blue-400 font-medium">Typing...</span>
        </div>
      )}

      {/* Global style for pulse animation */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.75; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* Monaco Editor */}
      <div style={{ flex: 1 }}>
        <Editor
          height="100%"
          language={language}
          value={code}
          onMount={handleEditorDidMount}
          onChange={handleCodeChange}
          theme={darkMode ? "vs-dark" : "light"}
          options={{
            fontSize: fontSize,
            automaticLayout: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on",
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
