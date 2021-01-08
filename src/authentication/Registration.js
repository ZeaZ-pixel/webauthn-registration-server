import React from 'react'

const Registration = (props) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError
    } = props;


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
                    <label>Username</label>
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

                <div className="user-box">
                    <input
                        type="password"
                        required=""
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Second Password</label>
                    <p className="errorMsg">{passwordError}</p>
                </div>
            </form>

            <button onClick={handleSignup}>
                <span/>
                <span/>
                <span/>
                <span/>
                Sing up
            </button>
            <p>Have an account?
                <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
            </p>
        </div>
    )
}

export default Registration;