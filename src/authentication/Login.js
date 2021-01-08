import React from 'react'

const Login = (props) => {
    const {
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
            </form>

            <button onClick={handleLogin}>
                <span/>
                <span/>
                <span/>
                <span/>
                Sign in
            </button>
            <p>Don't have an account ?
                <span onClick={() => setHasAccount(!hasAccount)}>Sing up</span>
            </p>
        </div>
    )
}

export default Login;