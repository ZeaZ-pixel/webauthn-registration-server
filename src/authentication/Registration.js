import React from "react";

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
        error
    } = props;

    return(
        <div className="registration-box">
            <h2>Registration</h2>

            <form action="http://iqos.kz/">
                <div className="user-box">
                    <input
                        className="input-box"
                        type="text"
                        required="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <label className="label-box">Username</label>
                </div>
                <div className="user-box">
                    <input
                        className="input-box"
                        type="text"
                        required="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label className="label-box">E-mail</label>
                </div>

                <div className="user-box">
                    <input
                        className="input-box"
                        type="password"
                        required="password_1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label className="label-box">Password</label>
                </div>

                <div className="user-box">
                    <input
                        className="input-box"
                        type="password"
                        required=" "
                        value={second_pass}
                        onChange={(e) => setSecond_pass(e.target.value)}
                    />
                    <label className="label-box">Second Password</label>
                    <p className="errorMsg">{error}</p>
                </div>
            </form>

            <button className="btn-box" onClick={handleSignup}>
                <span/>
                <span/>
                <span/>
                <span/>
                Sing up
            </button>
            <p className="transition">Have an account?
                <span onClick={() => setHasAccount(!hasAccount)}> Sign in</span>
            </p>
        </div>
    )
}

export default Registration;
