import React, {useState} from 'react';
import ModalWindow from "../ModalWindow/ModalWindow";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFingerprint} from "@fortawesome/free-solid-svg-icons";

const Login = (props) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        hasAccount,
        setHasAccount,
        error
    } = props;



const [modalShow, setModalShow] = useState(false);
    return(
        <div className="registration-box">
            <h2>Login</h2>
            <form action="">
                <div className="user-box">
                    <input
                        className="input-box"
                        type="text"
                        required=" "
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label className="label-box">E-mail</label>
                </div>
                <div className="user-box">
                    <input
                        className="input-box"
                        type="password"
                        required=" "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="label-box">Password</label>
                    <p className="errorMsg">{error}</p>
                </div>
            </form>

            <button className="btn-box" onClick={handleLogin}>
                <span/>
                <span/>
                <span/>
                <span/>
                Sign in
            </button>

            <button className="btn-box" onClick={() =>{setModalShow(true)}}
                >
                <span/>
                <span/>
                <span/>
                <span/>
                <FontAwesomeIcon icon={faFingerprint} />
            </button>
            <p className="transition">Don't have an account?
                <span onClick={() => setHasAccount(!hasAccount)}> Sing up</span>
            </p>

            <ModalWindow
                email={email}
                setEmail={setEmail}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

        </div>
    )
}

export default Login;

