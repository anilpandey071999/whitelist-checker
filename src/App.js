import React, { useState } from "react";
import whitelist from "./whitelist.json"; // Import the default export
import logo from './logo.png';

const whitelistedAddresses = whitelist.whitelistedAddresses; // Access property
const OGAddresses = whitelist.OGAddresses;

export default function WhitelistChecker() {
  const [inputAddress, setInputAddress] = useState(""); // State for user input
  const [isWhitelisted, setIsWhitelisted] = useState(null); // State for whitelist result
  const [isOG, setIsOG] = useState(false); // State to check if address is in OG list
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [isHovered, setIsHovered] = useState(false); // State for hover animation

  const handleInputChange = (event) => {
    setInputAddress(event.target.value);
  };

  const checkWhitelistHandler = () => {
    if (!whitelistedAddresses || !OGAddresses) return;

    setLoading(true);
    setIsWhitelisted(null);
    setIsOG(false);

    setTimeout(() => {
      const normalizedWhitelist = whitelistedAddresses.map((addr) =>
        addr.trim().toLowerCase()
      );
      const normalizedOGList = OGAddresses.map((addr) =>
        addr.trim().toLowerCase()
      );
      const normalizedInput = inputAddress.trim().toLowerCase();

      if (normalizedOGList.includes(normalizedInput)) {
        setIsWhitelisted(true);
        setIsOG(true);
      } else if (normalizedWhitelist.includes(normalizedInput)) {
        setIsWhitelisted(true);
        setIsOG(false);
      } else {
        setIsWhitelisted(false);
      }

      setLoading(false);
    }, 1000);
  };

  const redirectToHome = () => {
    window.location.href = "https://kongonape.com/"; // Redirect to home page
  };

  return (
    <div style={styles.container}>
      {/* Logo */}
      <img src={logo} alt="Logo" style={styles.logo} />

      {/* Back to Home Button */}

      <h1 style={styles.title}>Are you  eligible for the Whitelist or OG spots?</h1>

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
        <button
          onClick={checkWhitelistHandler}
          style={{
            ...styles.button,
            ...(isHovered ? styles.buttonHover : {}),
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Whitelist"}
        </button>

      </div>

      {/* Display result after checking */}
      {isWhitelisted !== null && !loading ? (
        <div style={styles.result}>
          {isWhitelisted ? (
            isOG ? (
              <p style={{ ...styles.message, color: "purple" }}>
                🎉 The address is in the OG List! You have special privileges!
              </p>
            ) : (
              <p style={{ ...styles.message, color: "#5CB338" }}>
                ✅ The address is whitelisted!
              </p>
            )
          ) : (
            <p style={{ ...styles.message, color: "red" }}>
              ❌ The address is not whitelisted.
            </p>
          )}
        </div>
      ) : (
        // Placeholder to maintain layout
        <div style={styles.resultPlaceholder}>
          {/* Invisible placeholder */}
          <p style={{ visibility: "hidden" }}>❌ The address is not whitelisted.</p>
        </div>
      )}

      <button
        onClick={redirectToHome}
        style={styles.button}
      >
        Back to Home
      </button>

    </div>

  );
}

const styles = {
  container: {
    fontFamily: "'Stalinist One', sans-serif",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#000", // Black background
    color: "#FFFFFF", // White text color
    padding: "20px",
  },
  logo: {
    width: "150px", // Adjust size of the logo
    height: "auto",
    marginBottom: "20px", // Add space below the logo
  },
  title: {
    fontSize: "clamp(36px, 6vw, 60px)", // Responsive title size
    fontWeight: "bold",
    marginBottom: "20px", // Space below title
    color: "#FFFFFF", // White title text
  },
  form: {
    backgroundColor: "#111", // Slightly lighter black for contrast
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(255, 255, 255, 0.1)", // Subtle shadow
    maxWidth: "400px", // Restrict width for better alignment
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px", // Space between form elements
  },
  label: {
    fontSize: "clamp(18px, 3vw, 20px)", // Responsive label size
    color: "#FFFFFF", // White label text
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "18px", // Larger input text size for readability
    borderRadius: "5px",
    borderColor: "#ccc", // Light gray border for input field
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px", // Button text size
    borderRadius: "5px",
    borderColor: "#5CB338",
    backgroundColor: "#5CB338"

  },
  message: {
    fontSize: "clamp(18px, 2.5vw, 24px)", // Responsive font size
    fontWeight: "bold", // Make the message bold for emphasis
    marginTop: "20px", // Add space above the message
    textAlign: "center", // Center-align the text
    color: "#FFFFFF", // Default white color (can be overridden dynamically)
  },
};

// Add media queries for finer control over layout on smaller screens
const responsiveStyles = `
@media (max-width: 768px) {
  .form {
      padding: 15px;
      gap: 10px;
      box-shadow:none; /* Simplify design for smaller screens */
   }
}
`;
