import React, { useState } from 'react';
import Web3 from 'web3';
import { contract } from '../utils/web3';
import { getAccount } from '../utils/utils';

const Auth = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [ethBalance, setEthBalance] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [message, setMessage] = useState('');

    const onConnect = async () => {
        try {
            const account = await getAccount();
            const returnObj = await contract.methods.getUser(account).call();
            if (returnObj[0] === "" && returnObj[1] === "") {
                setIsSignedIn(false);
            }
            else {
                setIsSignedIn(true);
                setName(returnObj[0]);
                setEmail(returnObj[1]);
            }
            setIsConnected(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSignup = async () => {
        try {
            const account = await getAccount();
            await contract.methods.setUser(name, email).send({ from: account });
            setMessage('Successfully signed up!');
            setIsSignedIn(true);
        } catch (error) {
            console.error(error);
            alert('Signup failed!');
        }
    };

    const onDisconnect = () => {
        setIsConnected(false);
        setIsSignedIn(false);
    };

    return (
        <div className="app">
            <div className="app-header">
                <h1>React dApp authentication with React, We3.js and Metamask</h1>
            </div>
            <div className="app-wrapper">
                {!isConnected && (
                    <div>
                        <button className="app-button__login" onClick={onConnect}>
                            Connect Wallet
                        </button>
                    </div>
                )}
                {isSignedIn && (
                    <div className="app-profile">
                        <h2>Welcome, {name}!</h2>
                        <p>Email: {email}</p>
                    </div>
                )}
                {!isSignedIn && isConnected && (
                    <div className="app-signin">
                        <h2>Sign In</h2>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button onClick={handleSignup}>Sign In</button>
                        <p>{message}</p>
                    </div>
                )}
            </div>
            {isConnected && (
                <div>
                    <button className="app-buttons__logout" onClick={onDisconnect}>
                        Disconnect
                    </button>
                </div>
            )}
        </div>
    );
}

export default Auth;