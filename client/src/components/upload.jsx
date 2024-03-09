import { useState } from "react"
import IPFS from 'ipfs-mini'
const ipfs = new IPFS();
ipfs.setProvider({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
const Upload = () => {
    const [file, setFile] = useState()

    const handleFileChange = (e) => {
        e.preventDefault()
        const temp = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const buffer = Buffer.from(e.target.result)
            setFile(buffer)
        }
        reader.readAsArrayBuffer(temp);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("submitting..")
        try {
            const response = await ipfs.add(file)
            console.log(response)
        }
        catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange}></input>
                <input type="submit"></input>
            </form>
        </>
    )
}

export default Upload;