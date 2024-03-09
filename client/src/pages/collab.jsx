import { useState, useEffect } from 'react';
import { proposeAgreement, getAllProposedAgreements, requestCollaboration } from '../api/methods/methods';

function AgreementPage() {
    const [terms, setTerms] = useState('');
    const [skillsRequired, setSkillsRequired] = useState('');
    const [proposedAgreements, setProposedAgreements] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getAllProposedAgreements();
            setProposedAgreements(result);
        }
        fetchData();
    }, []);

    const handleProposeAgreement = async () => {
        const [, success] = await proposeAgreement(terms, skillsRequired);
        if (success) {
            // Refresh the list of proposed agreements
            const result = await getAllProposedAgreements();
            setProposedAgreements(result);
        }
    };

    const handleRequestCollab = async (agreementId) => {
        const [, success] = await requestCollaboration(agreementId, 'userAddress', 'userSkills');
        if (success) {
            // Refresh the list of proposed agreements
            const result = await getAllProposedAgreements();
            setProposedAgreements(result);
        }
    };

    return (
        <div>
            <h2>Create Agreement</h2>
            <input type="text" placeholder="Terms" value={terms} onChange={(e) => setTerms(e.target.value)} />
            <input type="text" placeholder="Skills Required" value={skillsRequired} onChange={(e) => setSkillsRequired(e.target.value)} />
            <button onClick={handleProposeAgreement}>Create Agreement</button>
            <h2>Proposed Agreements</h2>
            {proposedAgreements.map((agreement, index) => (
                <div key={index}>
                    <p>Terms: {agreement.terms}</p>
                    <p>Deadline: {agreement.deadline}</p>
                    <p>Skills Required: {agreement.skillsRequired}</p>
                    <button onClick={() => handleRequestCollab(index)}>Request Collab</button>
                </div>
            ))}
        </div>
    );
}

export default AgreementPage;
