import React, {useState}from 'react'
import {getMakeCredentialChallenge, makeCredentialResponse, startUsernameLessEnrolment} from "../server/simple-server";
import {preformatMakeCredReq,publicKeyCredentialToJSON} from "../server/assistant";


const Registration = (props) => {
    const {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        second_pass,
        setSecond_pass,
        handleSignup,
        hasAccount,
        setHasAccount,
        usernameError,
        emailError,
        passwordError,
        second_passError
    } = props;

    return(
        <div className="registration-box">
            <h2>Registration</h2>

            <form action="http://iqos.kz/">
                <div className="user-box">
                    <input
                        type="text"
                        name="username"
                        required="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <label>Username</label>
                    <p className="errorMsg">{usernameError}</p>
                </div>
                <div className="user-box">
                    <input
                        type="text"
                        name="email"
                        required="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label>E-mail</label>
                    <p className="errorMsg">{emailError}</p>
                </div>

                <div className="user-box">
                    <input
                        type="password"
                        name="password_1"
                        required="password_1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label>Password</label>
                    <p className="errorMsg">{passwordError}</p>
                </div>

                <div className="user-box">
                    <input
                        type="password"
                        name="password_2"
                        required=" "
                        value={second_pass}
                        onChange={(e) => setSecond_pass(e.target.value)}
                    />
                    <label>Second Password</label>
                    <p className="errorMsg">{second_passError}</p>
                </div>
            </form>

            <button  name = "reg_user" onClick={() => {
                    handleSignup();
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
