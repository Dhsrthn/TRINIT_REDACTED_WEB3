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
        <div>
            <h2>Accept Collabs</h2>
            {pendingAgreements.map((agreement, index) => (
                <div key={index}>
                    <p>Terms: {agreement.terms}</p>
                    <p>Deadline: {agreement.deadline}</p>
                    <p>Skills Required: {agreement.skillsRequired}</p>
                    <button onClick={() => handleAcceptCollab(index)}>Accept Collab</button>
                </div>
            ))}
            <h2>View Your Collabs</h2>
            {collaborations.map((collab, index) => (
                <div key={index}>
                    <p>Party 1: {collab.party1}</p>
                    <p>Party 2: {collab.party2}</p>
                    <p>Terms: {collab.terms}</p>
                    <p>Skills Required: {collab.skillsRequired}</p>
                </div>
            ))}
        </div>
    );
}

export default NotificationPage;
