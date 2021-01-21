import React from 'react';
import Registration from "./Registration";
import Login from "./Login";
const Autn = (props) => {

    const {
        setUser,
        email,
        setEmail,
        password,
        setPassword,
        second_password,
        setSecond_password,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError
    } = props;

    return(
        <section className="login">
            <div className="login-box">
                <div className="btnContainer">
                    {hasAccount?(
                        <>
                            <Login
                                setUser = {setUser}
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                handleLogin={handleLogin}
                                hasAccount={hasAccount}
                                setHasAccount={setHasAccount}
                                emailError={emailError}
                                passwordError={passwordError}
                            />

                        </>
                    ):(
                        <>
                            <Registration
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                second_password={second_password}
                                setSecond_password={setSecond_password}
                                handleSignup={handleSignup}
                                hasAccount={hasAccount}
                                setHasAccount={setHasAccount}
                                emailError={emailError}
                                passwordError={passwordError}
                            />


                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Autn;
