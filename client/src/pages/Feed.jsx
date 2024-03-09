import Header from "../components/Header";
import styles from "./styles.module.css";
import Upload from "../components/upload";

const Feed = () => {
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
                <div className=" h-[90%]">
                    <div className=" overflow-y-scroll overflow-x-hidden h-full w-[60vmin] flex flex-col items-center p-10 gap-5 bg-[#111111]">
                        {
                            arr.map((item, index) => {
                                return (
                                    <div key={index} className="p-5 flex flex-col gap-5 rounded-xl w-[50vmin] relative" >
                                        <h1 className=" text-3xl font-bold  text-white flex gap-5 h-[6vmin] w-[15%]">
                                            <img src="/assets/logos_ethereum.svg" alt="" className=" h-[4vmin]"></img>
                                            {item.user.toUpperCase()}</h1>
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

export default Feed;