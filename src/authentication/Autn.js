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
        error
    } = props;

    return(
        <section className="login">
            <div className="login-box">
                <div className="btnContainer">
                    {hasAccount?(
                        <>
                            <Login
                                setUser = {setUser}
                                email = {email}
                                setEmail = {setEmail}
                                password={password}
                                setPassword={setPassword}
                                handleLogin={handleLogin}
                                hasAccount={hasAccount}
                                setHasAccount={setHasAccount}
                                error={error}

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
                                error={error}
                            />


                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Autn;
