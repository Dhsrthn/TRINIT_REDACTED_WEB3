import { useState } from "react";
import { Login, signUp } from "../api/methods/methods";
import Header from "../components/Header";
import MultipleSelect from "../components/DropDown";

const options = [
  "1",
  "2",
  "2",
  "3",
  "2",
  "2",
  "2",
  "2",
  "4",
  "2",
  "2",
  "2",
  "2",
  "2",
];

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [message, setMessage] = useState("");

  const [selected, setSelected] = useState([]);

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
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] scale-150 opacity-50 z-0">
        <img src="/assets/logos_ethereum.svg" alt="" />
      </div>
      <div className="h-[10%] w-full flex flex-col justify-center items-center">
        <Header />
      </div>
      <div className="h-[90%] w-full">
        {!isConnected && (
          <div className="h-full w-full flex flex-col items-center justify-around ">
            <div className="h-[60%] w-[70%] flex flex-col justify-around items-center text-2xl portrait:text-sm">
              <span className="text-7xl portrait:text-3xl text-center fade-in-text">
                Begin by connecting you wallet!
              </span>

              <button
                className="h-20 w-[40%] border-4 rounded-3xl border-[#C19E66] hover:bg-[#c19e66] hover:text-black portrait:w-[75%] portrait:h-14 fade-in-text z-20"
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
          <div className="h-full w-full flex flex-col text-center text-2xl items-center justify-around font-clashDisplay fade-in-text">
            <div className="flex flex-col h-[15%] justify-around ">
              <span className="text-5xl">Wallet connected successfully!</span>
              <span className="font-light bg-clip-text text-transparent bg-gradient-to-r from-[#ffe3b7]/[0.47] to-[#ffe3b7]">
                Create an account in CryptoConnect to continue
              </span>
            </div>
            <div className="w-full h-[80%]">
              <div className="w-full h-1/2 grid grid-cols-3">
                <div className="flex flex-col justify-around text-left items-center text-4xl">
                  <div className="flex flex-col w-[80%] h-[80%] justify-around ">
                    <span className="font-archivo font-light">Name</span>
                    <input
                      className="text-2xl font-clashDisplay font-normal bg-clip-text text-transparent bg-gradient-to-r from-[#ffe3b7]/[0.47] to-[#ffe3b7] border-b-2 focus:border-[#ffc05b] focus:outline-none caret-slate-100"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-around text-left items-center text-4xl">
                  <div className="flex flex-col w-[80%] h-[80%] justify-around ">
                    <span className="font-archivo font-light">Email</span>
                    <input
                      className="text-2xl font-clashDisplay font-normal bg-clip-text text-transparent bg-gradient-to-r from-[#ffe3b7]/[0.47] to-[#ffe3b7] border-b-2 focus:border-[#ffc05b] focus:outline-none caret-slate-100 z-10"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-around text-left items-center text-4xl">
                  <div className="flex flex-col w-[80%] h-full justify-around ">
                    <span className="font-archivo font-light">Talents</span>
                  </div>
                  <MultipleSelect options={options} onChange={setSelected} />
                </div>
              </div>
              <div className="h-1/2 flex flex-col items-center justify-around z-50">
                <div className="h-full w-[80%] text-left flex flex-col justify-around ">
                  <span className="h-[8%] font-archivo font-light text-4xl">
                    {" "}
                    Bio
                  </span>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Write about yourself shortly :)"
                    className="z-40  h-[60%] w-full p-2 rounded-xl bg-transparent text-white"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex w-full h-[10%]">
              <button
                className="hover:cursor-pointer w-[50%] hover:bg-red-500"
                onClick={onDisconnect}
              >
                Disconnect
              </button>
              <button
                onClick={handleSignup}
                className="hover:cursor-pointer w-[50%] hover:bg-[#ffc05b]  hover:text-black"
              >
                Sign In
              </button>
            </div>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
