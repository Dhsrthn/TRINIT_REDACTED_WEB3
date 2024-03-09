import Header from "../components/Header";
import styles from "./styles.module.css";
import Upload from "../components/upload";
import { useState } from "react";

const Profile = () => {
  const [name, setName] = useState("akhsaymnwdjkfwajfhd@gmail.com ");
  const [talents, setTalents] = useState(["drawing", "painting", "cooking"]);
  const [bio] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.");
  let arr = [{
    name: "John",
    description: "The best",
    src: 'https://cloudflare-ipfs.com/ipfs/bafybeigetj4wnvszvheel7vs3mxgqsf3ne5etun3smddasi3ux2sbqc3jm/Screenshot from 2024-03-09 18-22-31.png',
    user: 'Akhshay'
  },
  {
    name: "John2",
    description: "The best",
    src: 'https://cloudflare-ipfs.com/ipfs/bafybeigetj4wnvszvheel7vs3mxgqsf3ne5etun3smddasi3ux2sbqc3jm/Screenshot from 2024-03-09 18-22-31.png',
    user: 'Akhshay'
  },
  {
    name: "John3",
    description: "The best",
    src: 'https://cloudflare-ipfs.com/ipfs/bafybeigetj4wnvszvheel7vs3mxgqsf3ne5etun3smddasi3ux2sbqc3jm/Screenshot from 2024-03-09 18-22-31.png',
    user: 'Akhshay'
  },
  {
    name: "John",
    description: "The best",
    src: 'https://cloudflare-ipfs.com/ipfs/bafybeigetj4wnvszvheel7vs3mxgqsf3ne5etun3smddasi3ux2sbqc3jm/Screenshot from 2024-03-09 18-22-31.png',
    user: 'Akhshay'
  },
  {
    name: "John2",
    description: "The best",
    src: 'https://cloudflare-ipfs.com/ipfs/bafybeigetj4wnvszvheel7vs3mxgqsf3ne5etun3smddasi3ux2sbqc3jm/Screenshot from 2024-03-09 18-22-31.png',
    user: 'Akhshay'
  },
  {
    name: "John3",
    description: "The best",
    src: 'https://cloudflare-ipfs.com/ipfs/bafybeigetj4wnvszvheel7vs3mxgqsf3ne5etun3smddasi3ux2sbqc3jm/Screenshot from 2024-03-09 18-22-31.png',
    user: 'Akhshay'
  }]
  return (
    <>
      <div className="font-clashDisplay font-bold h-screen w-full flex flex-col justify-center items-center bg-black text-white relative overflow-hidden transition-all duration-100 ease-in-out">
        <div className="h-[10%] w-full items-center justify-center flex p-1">
          <Header />
        </div>
        <div className=" h-[90%] flex gap-10">
          <div className=" w-[50vw] flex-col flex items-center p-10">
            <div className=" flex items-center flex-col w-full h-[98%] rounded-lg bg-[#1f1e1e] p-20 gap-[8%]">
              <img src="/assets/logos_ethereum.svg" className=" rounded-[50%] w-[15vmin] h-[15vmin] border-[#C19E66] border p-6"></img>
              <div className=" flex flex-col items-center">
              <p className=" font-archivo text-3xl">AKHSHAY</p>
              <p className=" font-archivo font-extralight text-gray-400 text-2xl right-0">{`${name}`}</p>
              </div>
              <div className=" w-full flex gap-10">
                <div className=" w-[65%] text-justify flex flex-col items-center" >
                  <span className=" text-3xl">BIO </span> <br />
                  {bio}
                </div>
                <div className=" w-[35%] flex flex-col items-center">
                  <span className=" text-3xl">TALENTS</span>
                  <br />

                  {talents.map(element => {
                    return (
                      <li className=" bg-[#C19E66] text-black p-2 rounded-sm m-2 list-none text-center w-[70%]">{element.toUpperCase()}</li>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>
          <div className=" overflow-y-scroll overflow-x-hidden w-[30vw] flex flex-col items-center p-10 gap-5 bg-[#111111]">
            {
              arr.map((item, index) => {
                return (
                  <div key={index} className="p-5 flex flex-col gap-5 rounded-xl w-[50vmin] relative" >
                    <div className="h-[30vmin] flex items-center justify-center z-10">
                      <img src={item.src} alt="alt" />
                    </div>
                    <p className=" font-extralight text-xl w-full text-gray-400"><span className=" font-bold text-white text-xl">{item.name.toUpperCase()}</span>{"  " + item.description}</p>
                    <div className="h-[1px] bg-[#C19E66] mt-10"></div>
                  </div>
                )
              })
            }
          </div>
        </div>

        <Upload />
      </div>
    </>
  )
}

export default Profile;