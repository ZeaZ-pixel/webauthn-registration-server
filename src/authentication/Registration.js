import React, {useState}from 'react'
import {getMakeCredentialChallenge, makeCredentialResponse, startUsernameLessEnrolment} from "../server/simple-server";
import {preformatMakeCredReq,publicKeyCredentialToJSON} from "../server/assistant";


const Registration = (props) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        second_password,
        setSecond_password,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError
    } = props;



    const [error, setError] = useState('');

    return(
        <div className="registration-box">
            <h2>Registration</h2>

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

                <div className="user-box">transition
                    <input
                        type="password"
                        required=""
                        value={second_password}
                        onChange={(e) => setSecond_password(e.target.value)}
                    />
                    <label>Second Password</label>
                    <p className="errorMsg">{passwordError}</p>
                    <p className="errorMsg">{error}</p>
                </div>
            </form>

            <button onClick={() => {
                if(password !== second_password){
                    setError("Passwords don't match");
                } else {
                    handleSignup();
                    let username = email;
                    let displayName = email + "display";


                    startUsernameLessEnrolment({username, displayName})
                        .then((serverResponse) => {
                            if(serverResponse.status !== 'startFIDOEnrolmentRK')
                                throw new Error('Error registering user! Server returned: ' + serverResponse.errorMessage);

                            return getMakeCredentialChallenge()
                        })
                        .then((makeCredChallenge) => {
                            makeCredChallenge = preformatMakeCredReq(makeCredChallenge);
                            return navigator.credentials.create({ 'publicKey': makeCredChallenge })
                        })
                        .then((newCredentialInfo) => {
                            newCredentialInfo = publicKeyCredentialToJSON(newCredentialInfo)

                            return makeCredentialResponse(newCredentialInfo)
                        })
                        .then((serverResponse) => {
                            if(serverResponse.status !== 'ok')
                                throw new Error('Error registering user! Server returned: ' + serverResponse.errorMessage);

                        })
                        .catch((error) => {
                            alert('FAIL' + error)
                            console.log('FAIL', error)
                        })

                }
                }

            }>
                <span/>
                <span/>
                <span/>
                <span/>
                Sing up
            </button>
            <p className="transition">Have an account?
                <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
            </p>
        </div>
    )
}

export default Registration;
