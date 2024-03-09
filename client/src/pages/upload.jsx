import React, { useState } from 'react';
import { NFTStorage } from 'nft.storage';

const Upload = () => {
    const [file, setFile] = useState(null);

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

            console.log("submitting...")

            const name = 'akhshay';
            const description = 'the';
            const ipfs = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDUyZjczMUI4QjA2N0UzMzBhNTRiQ0QwNDFGYjQ0NjU0OTExOTI0MzMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwOTk2NDAyMTkyMywibmFtZSI6IlRyaW5pdCJ9.s-v-trfgaUFk9m1exEBgVs8JxKfX7nfe3Hhfk_DeiYg" });

            const { ipnft } = await ipfs.store({
                name,
                description,
                image: file,
            });

            console.log(ipnft)

            // Assuming the metadata JSON contains an 'image' property pointing to the actual image file
            const metadataURL = `ipfs://${ipnft}`;
            const metadataResponse = await fetch(metadataURL);
            console.log(metadataResponse)
            const metadata = await metadataResponse.metadata.json.json();
            console.log(metadata)

            // Assuming the 'image' property in the metadata points directly to the image file
            const imageUrl = metadata.image;

            // Create an img element and set its src attribute to the image URL
            const imgElement = document.createElement("img");
            imgElement.src = imageUrl;

            // Append the img element to an element with the ID "mass"
            document.getElementById("mass").appendChild(imgElement);
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange}></input>
                <input type="submit"></input>
            </form>
            <div id="mass"></div>
        </>
    );
};

export default Upload;
