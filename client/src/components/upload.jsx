import { useState } from 'react';
import { uploadToFeed } from '../api/methods/methods';
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
    pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxNmY3NmQ0YS1lZWZhLTQ3OWYtOTAwNy1jODk3ZTAwNjVmZTgiLCJlbWFpbCI6ImFudmlhazAwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlZGYyN2Y0NTJiYzJiMDNhOTQ1MyIsInNjb3BlZEtleVNlY3JldCI6ImIzMjgwYjg2MDY0YTIxYjg5MzgxMTI5MmM4YjUzYjY3YTNlNjk2ZTE0OTZhMzhkY2ZhYTQzM2RmOTdhZTM4ZTciLCJleHAiOjE3OTM5NDM4NTJ9.eQSPNhDcY0xvfU8x0r0ks_ZnpOimiCsBwsFLJDbvqH8",
    pinataGateway: "sapphire-biological-vole-164.mypinata.cloud"
});

const Upload = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    const handleUpload = () => {
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

            document.getElementById('kya').innerHTML = "UPLOADING...";

            const urlResponse = await fetch('http://localhost:8787/presigned_url', {
                method: "GET",
                headers: {
                }
            });
            const data = await urlResponse.json();

            const upload = await pinata.upload.public
                .file(file)
                .url(data.url);

            if (upload.cid) {
                const imageUrl = await pinata.gateways.public.convert(upload.cid);

                await uploadToFeed(imageUrl, name, desc).then((res) => {
                    console.log(res);
                    document.getElementById('kya').innerHTML = "SUBMIT";
                    document.getElementById('upload').close();

                    setFile(null);
                    setName('');
                    setDesc('');
                });
            } else {
                console.error('Upload failed');
                document.getElementById('kya').innerHTML = "SUBMIT";
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            document.getElementById('kya').innerHTML = "SUBMIT";
        }
    };
    return (
        <>
            <dialog id='upload' className="overflow-hidden rounded-2 z-10">
                <div className=' absolute mt-0 ml-0 w-10 h-10 p-5 font-archivo font-bold text-3xl cursor-pointer'
                    onClick={() => {
                        document.getElementById('upload').close();
                    }}>X</div>
                <div className="bg-black rounded-2 flex flex-col items-center justify-center">
                    <div className="w-[420px] bg-white p-8 rounded-2xl flex flex-col gap-5 rounded-2">
                        <div className="text-center">
                            <p className="text-gray-600">Upload your file here</p>
                        </div>
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="desc">Description</label>
                        <input type="text" placeholder="Desc" value={desc} onChange={(e) => setDesc(e.target.value)} />
                        {/* <label htmlFor="skillsRequired">Skills Required</label><br /> */}
                        <input
                            type="file"
                            className="w-full p-12 border-2 rounded-2xl text-xl cursor-pointer group flex flex-col items-center justify-center border-dashed border-[#c19e66] text-center"
                            onChange={handleFileChange}
                        />
                        <button type="submit" id="kya" className="bg-black h-[4.5vmin] text-2xl font-archivo rounded-md text-white" onClick={handleSubmit}>
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
