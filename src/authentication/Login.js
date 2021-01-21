import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFingerprint} from "@fortawesome/free-solid-svg-icons";
import {getGetAssertionChallenge, getAssertionResponse} from "../server/simple-server";
import {publicKeyCredentialToJSON,preformatGetAssertReq} from "../server/assistant";

const Login = (props) => {
    const {
        setUser,
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError
    } = props;


    return(
        <div className="registration-box">
            <h2>Login</h2>
            <form action="">
                <div className="user-box">
                    <input
                        type="text"
                        name=""
                        required=""
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label>E-mail</label>
                    <p className="errorMsg">{emailError}</p>
                </div>
                <div className="user-box">
                    <input
                        type="password"
                        required=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Password</label>
                    <p className="errorMsg">{passwordError}</p>
                </div>
            </form>


            <button onClick={handleLogin}>
                <span/>
                <span/>
                <span/>
                <span/>
                Sign in
            </button>

            <button onClick={() => {
                getGetAssertionChallenge()
                    .then((getAssertionChallenge) => {

                        getAssertionChallenge = preformatGetAssertReq(getAssertionChallenge);
                        return navigator.credentials.get({ 'publicKey': getAssertionChallenge })
                    })
                    .then((newCredentialInfo) => {
                        newCredentialInfo = publicKeyCredentialToJSON(newCredentialInfo)

                        return getAssertionResponse(newCredentialInfo)
                    })
                    .then((serverResponse) => {
                        if(serverResponse.status !== 'ok')
                            throw new Error('Error registering user! Server returned: ' + serverResponse.errorMessage);
                        setUser(true);
                    })
                    .catch((error) => {
                        alert('FAIL' + error)
                        console.log('FAIL', error)
                    })
                }}
                >
                <span/>
                <span/>
                <span/>
                <span/>
                <FontAwesomeIcon icon={faFingerprint} />
            </button>
            <p className="transition">Don't have an account ?
                <span onClick={() => setHasAccount(!hasAccount)}>Sing up</span>
            </p>


        </div>
    )
}

export default Login;
