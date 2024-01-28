import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import CodeEditor from "@uiw/react-textarea-code-editor";

function Home() {
  const [serverMsg, setServerMsg] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(""); // State to track the selected language

  const languageSelection: string[] = [
    "py",
    "js",
    "jsx",
    "c",
    "c++",
    "java",
    "html",
    "css",
    "php",
    "ruby",
    "swift",
    "kotlin",
    "typescript",
    "go",
    "rust",
    "dart",
    "r",
    "shell",
    "sql",
    "objective-c",
    "scala",
    "perl",
    "lua",
    "matlab",
    "groovy",
    "haskell",
    "elixir",
    "coffeescript",
    "vb",
    "powershell",
    "clojure",
    "f#",
    "plaintext",
  ];

  const socket = io("http://127.0.0.1:8080");

  useEffect(() => {
    socket.on("chat message", (msg) => {
      console.log(msg);
      setServerMsg(msg);
    });

    socket.on("lang change", (msg) => {
      console.log(msg);
      setSelectedLanguage(msg);
    });
  }, []);

  function sendMessage(msg: string) {
    socket.emit("chat message", msg);
  }

  function sendLanguageSelected(msg: string) {
    socket.emit("lang change", msg);
  }

  return (
    <>
      <div>
        <h2>Enter your code below</h2>
        <CodeEditor
          value={serverMsg}
          language={selectedLanguage}
          placeholder={`Please enter ${selectedLanguage} code`}
          onChange={(event) => {
            sendMessage(event.target.value);
          }}
          padding={15}
          style={{
            backgroundColor: "#2f2f2f",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
          minHeight={400}
        />
      </div>

      <div>
        <label htmlFor="languageDropdown">Select a Programming Language:</label>
        <select
          id="languageDropdown"
          value={selectedLanguage}
          onChange={(event) => {
            sendLanguageSelected(event.target.value);
          }}
        >
          <option value="" disabled>
            Select a language
          </option>
          {languageSelection.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Home;