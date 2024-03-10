import Header from "../components/Header";
import styles from "./styles.module.css";
import Upload from "../components/upload";
import { getMyFeed, getOtherFeed, getTotalFeed } from "../api/methods/methods";
import { useEffect, useState     } from "react";
import { useNavigate } from "react-router-dom";
import { getAccount } from "../utils/utils";

const Feed = () => {
    const navigate =  useNavigate();
    const [fd, setFd] = useState([]);

    useEffect(() => {
        const fetchFeed = async () => {
            console.log("Fetching feed");
            try {
                const account = await getAccount();
                // const feedData = await getOtherFeed(account);
                const feedData = await getTotalFeed();
                console.log(feedData);
                setFd(feedData)
            } catch (error) {
                console.error("Error fetching feed:", error);
            }
        };

        fetchFeed();
    }, []);

    return (
        <>
            <div className="font-clashDisplay font-bold h-screen w-full flex flex-col justify-center items-center bg-black text-white relative overflow-hidden transition-all duration-100 ease-in-out">
                <div className="h-[10%] w-full items-center justify-center flex p-1">
                    <Header />
                </div>
                <div className=" h-[90%]">
                    <div className=" overflow-y-scroll overflow-x-hidden h-full w-[60vmin] flex flex-col items-center p-10 gap-5 bg-[#111111]">
                        {
                            fd.map((item, index) => {
                                return (
                                    <div key={index} className="p-5 flex flex-col gap-5 rounded-xl w-[50vmin] relative" >
                                        <h1 className=" text-3xl font-bold  text-white flex gap-5 h-[6vmin] w-[15%]"
                                        onClick={async()=>{
                                            const account = await getAccount();
                                            console.log(account, item.user);
                                            navigate('/profile/'+item.user)}}>
                                            <img src="/assets/logos_ethereum.svg" alt="" className=" h-[4vmin]"></img>
                                            {item.username.toUpperCase()}</h1>
                                        <div className="h-[30vmin] flex items-center justify-center z-10">
                                            <img src={item.cid} alt="alt" className=" h-full" />
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

export default Feed;