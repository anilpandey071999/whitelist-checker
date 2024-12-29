import React, { useState } from "react";
import whitelist from "./whitelist.json"; // Import the default export

const whitelistedAddresses = whitelist.whitelistedAddresses; // Access property
const OGAddresses = whitelist.OGAddresses;

export default function WhitelistChecker() {
  const [inputAddress, setInputAddress] = useState(""); // State for user input
  const [isWhitelisted, setIsWhitelisted] = useState(null); // State for whitelist result
  const [isOG, setIsOG] = useState(false); // State to check if address is in OG list
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Handle user input change
  const handleInputChange = (event) => {
    setInputAddress(event.target.value);
  };

  // Check if the entered address is whitelisted or in OG list
  const checkWhitelistHandler = () => {
    if (!whitelistedAddresses || !OGAddresses) return;

    setLoading(true); // Show loading indicator during processing
    setIsWhitelisted(null); // Reset previous result
    setIsOG(false); // Reset OG state

    setTimeout(() => {
      // Normalize addresses for comparison
      const normalizedWhitelist = whitelistedAddresses.map((addr) =>
        addr.trim().toLowerCase()
      );
      const normalizedOGList = OGAddresses.map((addr) =>
        addr.trim().toLowerCase()
      );
      const normalizedInput = inputAddress.trim().toLowerCase();

      console.log(normalizedWhitelist, normalizedInput);

      if (normalizedOGList.includes(normalizedInput)) {
        setIsWhitelisted(true);
        setIsOG(true); // Mark as OG address
      } else if (normalizedWhitelist.includes(normalizedInput)) {
        setIsWhitelisted(true);
        setIsOG(false); // Mark as regular whitelist address
      } else {
        setIsWhitelisted(false);
      }

      setLoading(false); // Hide loading indicator after checking
    }, 1000); // Simulated delay for better UX
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Whitelist Checker</h1>

      <div style={styles.form}>
        <label htmlFor="walletAddress" style={styles.label}>
          Enter Wallet Address:
        </label>
        <input
          type="text"
          id="walletAddress"
          value={inputAddress}
          onChange={handleInputChange}
          placeholder="0x1234..."
          style={styles.input}
        />
        <button onClick={checkWhitelistHandler} style={styles.button} disabled={loading}>
          {loading ? "Checking..." : "Check Whitelist"}
        </button>
      </div>

      {/* Display result after checking */}
      {isWhitelisted !== null && !loading && (
        <div style={styles.result}>
          {isWhitelisted ? (
            isOG ? (
              <p style={{ ...styles.message, color: "purple" }}>
                🎉 The address is in the **OG List**! You have special privileges!
              </p>
            ) : (
              <p style={{ ...styles.message, color: "green" }}>
                ✅ The address is whitelisted!
              </p>
            )
          ) : (
            <p style={{ ...styles.message, color: "red" }}>
              ❌ The address is not whitelisted.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    marginTop: "50px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "16px",
    marginBottom: "10px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "15px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    cursor: "pointer",
  },
  result: {
    marginTop: "20px",
  },
  message: {
    fontSize: "18px",
    fontWeight: "bold",
  },
};
