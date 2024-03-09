import { useState } from "react";
import { Login, signUp } from "../api/methods/methods";

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [message, setMessage] = useState("");

  const onConnect = async () => {
    try {
      const returnObj = await Login();
      // returnObj : [name, email]
      if (returnObj[0] == "" && returnObj[1] == "") {
        setIsSignedIn(false);
      } else {
        setIsSignedIn(true);
        setName(returnObj[0]);
        setEmail(returnObj[1]);
      }
      setIsConnected(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignup = async () => {
    const response = await signUp(name, email);
    // response : [error, statusBoolean]
    if (response[1]) {
      setMessage("Successfully signed up!");
      setIsSignedIn(true);
    } else {
      alert("Signup failed!");
    }
  };

  const onDisconnect = () => {
    setIsConnected(false);
    setIsSignedIn(false);
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>React dApp authentication with React, We3.js and Metamask</h1>
      </div>
      <div className="app-wrapper">
        {!isConnected && (
          <div>
            <button className="app-button__login" onClick={onConnect}>
              Connect Wallet
            </button>
          </div>
        )}
        {isSignedIn && (
          <div className="app-profile">
            <h2>Welcome, {name}!</h2>
            <p>Email: {email}</p>
          </div>
        )}
        {!isSignedIn && isConnected && (
          <div className="app-signin">
            <h2>Sign In</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSignup}>Sign In</button>
            <p>{message}</p>
          </div>
        )}
      </div>
      {isConnected && (
        <div>
          <button className="app-buttons__logout" onClick={onDisconnect}>
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
