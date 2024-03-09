import { useState } from "react";
import { Login, signUp } from "../api/methods/methods";
import Header from "../components/Header";

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
    <div className="font-clashDisplay font-bold  h-screen w-screen flex flex-col justify-center items-center bg-black text-white relative">
      <div className="h-[10%] w-full flex flex-col justify-center items-center">
        <Header />
      </div>
      <div className="h-[90%]">
        {!isConnected && (
          <div className="h-full w-full flex flex-col items-center justify-around ">
            <div className="h-[60%] w-[70%] flex flex-col justify-around items-center text-2xl portrait:text-sm">
              <span className="text-7xl portrait:text-3xl text-center fade-in-text">
                Begin by connecting you wallet!
              </span>

              <button
                className="h-20 w-[40%] border-4 rounded-3xl border-[#C19E66] hover:bg-[#c19e66] hover:text-black portrait:w-[75%] portrait:h-14 fade-in-text"
                onClick={onConnect}
              >
                CONNECT WALLET
              </button>
            </div>
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
        <div className="w-full text-2xl">
          <button
            className="h-20 w-[20%] border-4 rounded-3xl border-red-500 hover:bg-red-500 hover:text-black portrait:w-[75%] portrait:h-14 fade-in-text"
            onClick={onDisconnect}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
