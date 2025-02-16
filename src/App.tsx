import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [options, setOptions] = useState({
    number: false,
    character: false,
  });
  const [password, setPassword] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let charList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (options.number) charList += "0123456789";
    if (options.character) charList += "!@#$%^&*()";

    const password = Array.from({ length }, () =>
      charList.charAt(Math.floor(Math.random() * charList.length))
    ).join("");

    setPassword(password);
  }, [length, options]);

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password).then(() => {
      setCopyMessage("Copied to clipboard!");
      setTimeout(() => {
        setCopyMessage("");
      }, 2000);
    });
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleOptionChange = (option: "number" | "character") => {
    setOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
      <h1 className="text-white text-center mb-4">Password Generator</h1>

      {/* Notification Message */}
      {copyMessage && (
        <div className="mb-4 p-2 bg-green-500 text-white text-center rounded">
          {copyMessage}
        </div>
      )}

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
          aria-label="Generated Password"
        />
        <button
          className="p-2 ml-2 border border-orange-500 rounded-md bg-orange-500 text-white hover:bg-orange-400"
          onClick={copyPasswordToClipboard}
          aria-label="Copy Password"
        >
          Copy
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-white mb-2">
          Password Length: {length}
        </label>
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          className="w-full cursor-pointer"
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center text-white gap-x-2">
          <input
            type="checkbox"
            checked={options.number}
            onChange={() => handleOptionChange("number")}
            aria-label="Include Numbers"
          />
          Numbers
        </label>
      </div>

      <div className="mb-4">
        <label className="flex items-center text-white gap-x-2">
          <input
            type="checkbox"
            checked={options.character}
            onChange={() => handleOptionChange("character")}
            aria-label="Include Special Characters"
          />
          Characters
        </label>
      </div>

      <button
        onClick={generatePassword}
        className="w-full p-2 mt-4 text-white bg-orange-500 rounded-md hover:bg-orange-400"
        aria-label="Generate Password"
      >
        Generate Password
      </button>
    </div>
  );
}

export default App;
