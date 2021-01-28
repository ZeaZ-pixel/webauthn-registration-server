
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
                        type="text"
                        name="username"
                        required="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <label>Username</label>
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
                    <p className="errorMsg">{error}</p>
                </div>
            </form>

            <button onClick={handleSignup}>
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
