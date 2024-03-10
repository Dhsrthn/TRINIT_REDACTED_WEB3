import { useState, useEffect } from 'react';
import { getPendingAgreements, approveCollaborator, getMyCollaborations } from '../api/methods/methods';

function NotificationPage() {
    const [pendingAgreements, setPendingAgreements] = useState([]);
    const [collaborations, setCollaborations] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result1 = await getPendingAgreements();
            setPendingAgreements(result1);

            const result2 = await getMyCollaborations();
            setCollaborations(result2);
        }
        fetchData();
    }, []);

    const handleAcceptCollab = async (agreementId) => {
        const [, success] = await approveCollaborator(agreementId);
        if (success) {
            // Refresh the list of pending agreements
            const result = await getPendingAgreements();
            setPendingAgreements(result);
        }
    };

    return (
        <dialog id='notif' className=' overflow-hidden rounded-xl z-10 bg-white w-[50%] h-[50%] p-10'>
            <div className='absolute top-0 left-0 p-2 font-archivo font-bold text-3xl cursor-pointer text-center hover:bg-gray-500'
                onClick={() => {
                    document.getElementById('notif').close();
                }}>X</div>

            {pendingAgreements.length != 0 && (
                <>
                    <h2 className=' text-4xl text-[#C19E66]'>ACCEPT THESE COLLABS</h2><br />
                    {pendingAgreements.map((agreement, index) => (
                        <div key={index}>
                            <p>Collaborator : {agreement.collaboratorName}</p>
                            <p>Terms : {agreement.terms}</p>
                            <p>Deadline : {agreement.deadline}</p>
                            <p>Skill : {agreement.skillsRequired}</p>
                            <button onClick={() => handleAcceptCollab(index)} className=' bg-black w-full mt-4 p-2 hover:bg-[#C19E66] transition-all duration-200 text-white border-none'>ACCEPT COLLAB</button>
                            <div className="h-[2px] bg-[#C19E66] mt-10 w-full"></div>

                        </div>
                    ))}
                </>
            )}

            {collaborations.length != 0 && (
                <>
                    <h2 className=' text-3xl text-[#C19E66]'>YOUR COLLABS</h2><br />
                    {collaborations.map((collab, index) => (
                        <div key={index}>
                            <p>Party 1 : {collab.party1}</p>
                            <p>Party 2 : {collab.party2}</p>
                            <p>Terms : {collab.terms}</p>
                            <p>Skill : {collab.skillsRequired}</p>
                            <div className="h-[2px] bg-[#C19E66] mt-10 w-full"></div>
                        </div>

                    ))}
                </>
            )}

        </dialog>
    );
}

export default NotificationPage;
