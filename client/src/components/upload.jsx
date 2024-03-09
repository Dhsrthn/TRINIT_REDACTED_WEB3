import { useState } from 'react';
import { NFTStorage } from 'nft.storage';
import styles from './style.module.css';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [open, setOpen] = useState(false)


    const handleUpload = () => {
        setOpen(true)
        document.getElementById('upload').showModal();
    }

    const handleFileChange = (e) => {
        e.preventDefault();
        const temp = e.target.files[0];
        setFile(temp);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!file) {
                console.error('No file selected');
                return;
            }

            const name = 'akhshay';
            const description = 'the';
            const ipfs = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDUyZjczMUI4QjA2N0UzMzBhNTRiQ0QwNDFGYjQ0NjU0OTExOTI0MzMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwOTk2NDAyMTkyMywibmFtZSI6IlRyaW5pdCJ9.s-v-trfgaUFk9m1exEBgVs8JxKfX7nfe3Hhfk_DeiYg" });

            const meta = await ipfs.store({
                name,
                description,
                image: file,
            });

            const metadataURL = `https://cloudflare-ipfs.com/ipfs/${meta.ipnft}/metadata.json`;

            try {
                const metadataResponse = await fetch(metadataURL);
                // document.getElementById('upload').close();

                if (metadataResponse.ok) {
                    const metadata = await metadataResponse.json();
                    console.log(metadata.image);

                    const imageUrl = `https://cloudflare-ipfs.com/ipfs/${metadata.image.split("ipfs://")[1]}`;

                    const imgElement = document.createElement("img");
                    imgElement.src = imageUrl;
                    imgElement.alt = "Uploaded image";
                    imgElement.style.width = '100px'
                    imgElement.style.height = '100px'

                    document.getElementById("mass").append(imgElement);
                } else {
                    console.error('Failed to fetch metadata. Status:', metadataResponse.status);
                }
            } catch (error) {
                console.error('Error fetching metadata:', error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <dialog id='upload' className="overflow-hidden rounded-2 z-10">
                <div className=' absolute mt-0 ml-0 w-10 h-10 p-5 font-archivo font-bold text-3xl cursor-pointer' 
                onClick={()=>{
                    document.getElementById('upload').close();
                }}>X</div>
                <div className="bg-black rounded-2 flex flex-col items-center justify-center">
                    <div className="w-[420px] bg-white p-8 rounded-2xl flex flex-col gap-12 rounded-2">
                        <div className="text-center">
                            <p className="text-gray-600">Upload your file here</p>
                        </div>
                        <input
                            type="file"
                            className="w-full p-12 border-2 rounded-2xl text-xl cursor-pointer group flex flex-col items-center justify-center border-dashed border-[#c19e66] text-center"
                            onChange={handleFileChange}
                        />
                        <button type="submit" className="bg-black h-[4.5vmin] text-2xl font-archivo rounded-md text-white" onClick={handleSubmit}>
                            SUBMIT
                        </button>

                        <div id="mass"></div>
                    </div>
                </div>
            </dialog>


            <button className=" text-6xl rounded-[50%]  bg-[#c19e66] text-black absolute bottom-10 right-10 h-[10vmin] w-[10vmin] flex justify-center items-center text-center cursor-pointer hover:scale-[90%] hover:bg-[#ffcf81] transition-all duration-200"
                onClick={handleUpload}
            > + </button>

        </>
    );
};

export default Upload;
