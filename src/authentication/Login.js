import React, {useState} from 'react';
import ModalWindow from "../ModalWindow/ModalWindow";
import {startAuthenticationPasswordless, getGetAssertionChallenge, getAssertionResponse} from "../localServer/localServer";
import {preformatGetAssertReq,publicKeyCredentialToJSON} from "../localServer/helper";
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
                        type="text"
                        name=""
                        required=""
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label>E-mail</label>
                </div>
                <div className="user-box">
                    <input
                        type="password"
                        required=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Password</label>
                    <p className="errorMsg">{error}</p>
                </div>
            </form>

            <button onClick={handleLogin}>
                <span/>
                <span/>
                <span/>
                <span/>
                Sign in
            </button>

            <button onClick={() =>{setModalShow(true)}}
                >
                <span/>
                <span/>
                <span/>
                <span/>
                <FontAwesomeIcon icon={faFingerprint} />
            </button>
            <p className="transition">Don't have an account ?
                <span onClick={() => setHasAccount(!hasAccount)}>Sing up</span>
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

