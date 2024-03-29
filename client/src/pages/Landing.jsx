import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Typewriter from "../components/TypeWriter";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="font-clashDisplay font-bold  h-screen w-screen flex flex-col justify-center items-center bg-black text-white relative">
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] scale-150">
        <img src="/assets/logos_ethereum.svg" alt="" />
      </div>

      <div className="h-[10%] w-full items-center justify-center flex p-1">
        <Header />
      </div>
      <div className="h-[90%] w-full flex flex-col justify-around items-center text-center">
        <div className="h-[60%] w-full flex flex-col justify-around items-center portrait:h-[50%]">
          <span className="text-8xl portrait:text-4xl">
            <Typewriter text="CONNECT WITH TALENTS" />
          </span>
          <div className="flex w-[60%] justify-around items-center mb-12 text-4xl font-archivo font-semibold portrait:text-lg ">
            <button
              className="h-20 w-[30%] border-2 transition-all duration-500 rounded-xl border-[#C19E66] hover:bg-[#c19e66] hover:text-black portrait:w-[45%] portrait:h-12 "
              onClick={() => {
                navigate("/auth");
              }}
            >
              LOGIN
            </button>
            <button className="h-20 w-[30%] border-2 transition-all duration-400 rounded-xl border-[#C19E66] hover:bg-[#c19e66] hover:text-black portrait:w-[45%] portrait:h-12">
              GET STARTED
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
