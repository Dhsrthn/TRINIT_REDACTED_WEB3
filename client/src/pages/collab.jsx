import { useState, useEffect } from 'react';
import { proposeAgreement, getAllProposedAgreements, requestCollaboration, getMyCollaborations } from '../api/methods/methods';
import Header from '../components/Header';
import { getAccount } from '../utils/utils';

function AgreementPage() {
    const [terms, setTerms] = useState('');
    const [skillsRequired, setSkillsRequired] = useState('');
    const [name, setName] = useState('Akhshay');
    const [account, setAccount] = useState('');
    const [proposedAgreements, setProposedAgreements] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getAllProposedAgreements();
            setProposedAgreements(result);
        }
        fetchData();

        const get = async () => {
            const account = await getAccount();
            const collabs = await getMyCollaborations();
            console.log(collabs);
            console.log(account);
            setAccount(account);
        }
        get();
    }, []);

    const handleProposeAgreement = async () => {
        const [, success] = await proposeAgreement(terms, skillsRequired);
        if (success) {
            const result = await getAllProposedAgreements();
            setProposedAgreements(result);
            console.log(proposedAgreements)
        }
    };

    const handleRequestCollab = async (agreementId) => {
        const account = await getAccount();
        const [, success] = await requestCollaboration(agreementId, account, 'userSkills');
        if (success) {
            const result = await getAllProposedAgreements();
            setProposedAgreements(result);
        }
    };

    return (
        <div className="font-clashDisplay font-bold h-screen w-full flex flex-col justify-center items-center bg-black text-white relative overflow-hidden transition-all duration-100 ease-in-out">
            <div className="h-[10%] w-full items-center justify-center flex p-1">
                <Header />
            </div>
            <div className='h-[90%] flex w-full items-center justify-around'>
                <div className=' w-[25%] flex flex-col items-center gap-10'>
                    <h2 className=' text-4xl text-[#C19E66]'>CREATE AGREEMENT</h2>
                    <div className=' bg-[#222] p-10 w-[95%] '>
                        <label htmlFor="name">Name</label><br />
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
                        <label htmlFor="terms">Terms</label><br />
                        <input type="text" placeholder="Terms" value={terms} onChange={(e) => setTerms(e.target.value)} /><br /><br />
                        <label htmlFor="skillsRequired">Skills Required</label><br />
                        <input type="text" placeholder="Skills Required" value={skillsRequired} onChange={(e) => setSkillsRequired(e.target.value)} /><br /><br />
                        <button onClick={handleProposeAgreement} className=' w-full text-2xl bg-black p-4 transition-all duration-200 hover:bg-[#C19E66]'>Create</button>
                    </div>
                </div>
                <div className=' w-[1px] h-[80%] bg-[#C19E66]'></div>
                <div className=' w-[50%] flex flex-col items-center overflow-hidden' >
                    <h2 className=' text-4xl text-[#C19E66]'>PROPOSED AGREEMENTS</h2><br />
                    <div className=' bg-[#222] p-10 gap-10 flex flex-col items-center w-[80%] overflow-y-scroll'>
                        {proposedAgreements.length != 0 ?
                            <>
                                {proposedAgreements.map((agreement, index) => (
                                    <div key={index} className=' w-[80%] text-xl'>
                                        <p><span className=' text-[#C19E66]'>TERMS :</span> {agreement.terms}</p>
                                        <p><span className=' text-[#C19E66]'>DEADLINE :</span> {agreement.deadline.length ? agreement.deadline : "NIL"}</p>
                                        <p><span className=' text-[#C19E66]'>SKILL :</span> {agreement.skillsRequired}</p>
                                        {account != agreement.creator ? (
                                            <button onClick={() => handleRequestCollab(index)} className=' bg-black w-full mt-4 p-2 hover:bg-[#C19E66] transition-all duration-200'>Request Collaboration</button>
                                        ) : <p className=' text-gray-500 mt-5'>Proposed by you!</p>}

                                        <div className="h-[1px] bg-[#C19E66] mt-10 w-full"></div>
                                    </div>
                                ))}
                            </>: "No Agreements to display"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgreementPage;
