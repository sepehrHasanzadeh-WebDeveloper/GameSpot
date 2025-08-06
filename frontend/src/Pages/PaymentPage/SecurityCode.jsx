import { IoReloadCircle } from "react-icons/io5";

function SecurityCodeInput({ code, setCode }) {
  const generateCode = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const handleRefresh = () => {
    setCode(generateCode());
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div
        style={{
          padding: "10px 20px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          fontSize: "20px",
          fontWeight: "bold",
          width: "120px",
          textAlign: "center",
          userSelect: "none",
          backgroundColor: "#f0f0f0",
          letterSpacing: "4px",
          fontFamily: "monospace",
        }}
      >
        {code}
      </div>
      <IoReloadCircle
        size={60}
        onClick={handleRefresh}
        style={{ padding: "8px 12px", cursor: "pointer" }}
      />
    </div>
  );
}

export default SecurityCodeInput;
