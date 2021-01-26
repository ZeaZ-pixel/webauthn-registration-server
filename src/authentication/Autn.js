import React from 'react';
import Registration from "./Registration";
import Login from "./Login";
const Autn = (props) => {
    const {
        setUser,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        second_pass,
        setSecond_pass,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        usernameError,
        emailError,
        passwordError,
        second_passError
    } = props;

    return(
        <section className="login">
            <div className="login-box">
                <div className="btnContainer">
                    {hasAccount?(
                        <>
                            <Login
                                setUser = {setUser}
                                username = {username}
                                setUsername = {setUsername}
                                password={password}
                                setPassword={setPassword}
                                handleLogin={handleLogin}
                                hasAccount={hasAccount}
                                setHasAccount={setHasAccount}
                                usernameError={usernameError}
                                passwordError={passwordError}
                            />

                        </>
                    ):(
                        <>
                            <Registration
                                setUser = {setUser}
                                username={username}
                                setUsername = {setUsername}
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                second_pass={second_pass}
                                setSecond_pass={setSecond_pass}
                                handleSignup={handleSignup}
                                hasAccount={hasAccount}
                                setHasAccount={setHasAccount}
                                usernameError={usernameError}
                                emailError={emailError}
                                passwordError={passwordError}
                                second_passError={second_passError}
                            />


                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Autn;
