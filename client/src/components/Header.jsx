const Header = () => {
  return (
    <div className="h-full w-[80%] rounded-xl flex items-center p-2 portrait:w-[98%]">
      <div className="w-1/2 items-center flex ">
        <span className="text-2xl portrait:text-sm">CryptoConnect</span>
      </div>
      <div className="w-1/6 portrait:hidden"></div>
      <div className="w-1/3 text-xl portrait:text-sm flex justify-around font-normal text-right font-archivo  portrait:w-1/2">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffe3b7]/[0.47] to-[#ffe3b7] hover:text-white hover:cursor-pointer">
          Home
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffe3b7]/[0.47] to-[#ffe3b7] hover:text-white hover:cursor-pointer">
          About
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffe3b7]/[0.47] to-[#ffe3b7] hover:text-white hover:cursor-pointer">
          Contact
        </span>
      </div>
    </div>
  );
};

export default Header;
