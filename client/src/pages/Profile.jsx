import { Login, Show, getOtherFeed } from "../api/methods/methods";
import Header from "../components/Header";
import Upload from "../components/upload";
import { useEffect, useState } from "react";
import { getMyFeed } from "../api/methods/methods";
import { useParams } from "react-router-dom";
import { getAccount } from "../utils/utils";

const Profile = () => {
  const {id} =useParams();
  const [fd, setFd] = useState([]); // [1]
  useEffect(() => {
    console.log(id)
    const fetchUser = async () => {
      try {
        const userData = await Show(id);
        setName(userData[0]);
        setTalents(userData[3]);
        setBio(userData[2]);
        setEmail(userData[1]);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUser();

    const fetchFeed = async () => {
      try {
        const feedData = await getOtherFeed(id);
        console.log(feedData);
        setFd(feedData);
      } catch (error) {
        console.error("Error fetching feed:", error);
      }
    }
    fetchFeed();
  }, []);

  const [name, setName] = useState(" ");
  const [email, setEmail] = useState("");
  const [talents, setTalents] = useState([]);
  const [bio, setBio] = useState("Loading...");
  
  return (
    <>
      <div className="font-clashDisplay font-bold h-screen w-full flex flex-col justify-center items-center bg-black text-white relative overflow-hidden transition-all duration-100 ease-in-out">
        <div className="h-[10%] w-full items-center justify-center flex p-1">
          <Header />
        </div>
        <div className=" h-[90%] flex gap-10">
          <div className=" w-[50vw] flex-col flex items-center p-10">
            <div className=" flex items-center flex-col w-full h-[98%] rounded-lg bg-[#1f1e1e] p-20 gap-[8%]">
              <img
                src="/assets/logos_ethereum.svg"
                className=" rounded-[50%] w-[15vmin] h-[15vmin] border-[#C19E66] border p-6"
              ></img>
              <div className=" flex flex-col items-center">
                <p className=" font-archivo text-3xl">{email}</p>
                <p className=" font-archivo font-extralight text-gray-400 text-2xl right-0">
                  {name}
                </p>
              </div>
              <div className=" w-full flex gap-10">
                <div className=" w-[65%] text-justify flex flex-col items-center">
                  <span className=" text-3xl">BIO </span> <br />
                  {bio}
                </div>
                <div className=" w-[35%] flex flex-col items-center">
                  <span className=" text-3xl">TALENTS</span>
                  <br />

                  {talents.map((element, index) => {
                    return (
                      <li
                        key={index}
                        className=" bg-[#C19E66] text-black p-2 rounded-sm m-2 list-none text-center w-[70%]"
                      >
                        {element.toUpperCase()}
                      </li>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className=" overflow-y-scroll overflow-x-hidden w-[30vw] flex flex-col items-center p-10 gap-5 bg-[#111111]">
            {fd.map((item, index) => {
              return (
                <div
                  key={index}
                  className="p-5 flex flex-col gap-5 rounded-xl w-[50vmin] relative"
                >
                  <div className="h-[30vmin] flex items-center justify-center z-10">
                    <img src={item.cid} alt="alt" className="h-full" />
                  </div>
                  <p className=" font-extralight text-xl w-full text-gray-400">
                    <span className=" font-bold text-white text-xl">
                      {item.name.toUpperCase()}
                    </span>
                    {"  " + item.description}
                  </p>
                  <div className="h-[1px] bg-[#C19E66] mt-10"></div>
                </div>
              );
            })}
          </div>
        </div>

        <Upload />
      </div>
    </>
  );
};

export default Profile;