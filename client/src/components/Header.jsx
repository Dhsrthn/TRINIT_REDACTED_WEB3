import { useNavigate } from "react-router-dom";
import NotificationPage from "./notif";
import { getAccount } from "../utils/utils";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-[80%] rounded-xl flex items-center p-2 portrait:w-[98%]">
      <div className="w-1/2 items-center flex ">
        <span
          className="text-2xl portrait:text-sm hover:cursor-pointer font-clashDisplay font-bold hover:text-white/[0.6]"
          onClick={() => {
            navigate("/");
          }}
        >
          CryptoConnect
        </span>
      </div>
      <div className="w-1/6 portrait:hidden"></div>
      <div className="w-2/4 text-xl portrait:text-[0.7rem] flex justify-around font-normal text-right font-archivo  portrait:w-3/5">
        <span
          className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffe3b7]/[0.47] to-[#ffe3b7] hover:text-white hover:cursor-pointer"
          onClick={() => {
            navigate("/feed");
          }}
        >
          FEED
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffe3b7]/[0.47] to-[#ffe3b7] hover:text-white hover:cursor-pointer"
        onClick={async () => {
          const account= await getAccount();
          navigate("/profile/"+account);
        }}>
          PROFILE
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffe3b7]/[0.47] to-[#ffe3b7] hover:text-white hover:cursor-pointer"
        onClick={() => {
          navigate("/collab");
        }}>
          COLLOBORATIONS
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffe3b7]/[0.47] to-[#ffe3b7] hover:text-white hover:cursor-pointer">
          DAO
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffe3b7]/[0.47] to-[#ffe3b7] hover:text-white hover:cursor-pointer">
          <img src="/assets/notif.png" alt="" className="h-[2.5vmin]"
          onClick={() => {
            document.getElementById('notif').showModal();
          }}></img>
        </span>
      </div>
      <NotificationPage />
    </div>
  );
};

export default Header;

