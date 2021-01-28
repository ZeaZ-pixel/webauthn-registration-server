import React from "react";
import Modal from 'react-bootstrap/Modal'
import {Button} from "react-bootstrap";
import {faFingerprint} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    getAssertionResponse,
    getGetAssertionChallenge,
    startAuthenticationPasswordless
} from "../localServer/localServer";
import {preformatGetAssertReq, publicKeyCredentialToJSON} from "../localServer/helper";

function ModalWindow(props) {
    const {email, setEmail,onHide, show} = props;
    let username = email;
    let startLogin = () => {
        startAuthenticationPasswordless({username})
            .then((serverResponse) => {
                if(serverResponse.status !== 'startFIDOAuthentication')
                    throw new Error('Error logging in! Server returned: ' + serverResponse.errorMessage);

                return getGetAssertionChallenge()
            })
            .then((getAssertionChallenge) => {
                getAssertionChallenge = preformatGetAssertReq(getAssertionChallenge);
                return navigator.credentials.get({ 'publicKey': getAssertionChallenge })
            })
            .then((newCredentialInfo) => {
                newCredentialInfo = publicKeyCredentialToJSON(newCredentialInfo)

                return getAssertionResponse(newCredentialInfo)
            })
            .then((serverResponse) => {
                if(serverResponse.status !== 'ok')
                    throw new Error('Error registering user! Server returned: ' + serverResponse.errorMessage);

                alert('Success!');
            })
            .catch((error) => {
                alert('FAIL' + error)
                console.log('FAIL', error)
            })
    }

    return (
        <Modal
            onHide={onHide}
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    type="text"
                    name=""
                    required=""
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label>E-mail</label>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={() => {
                    startLogin();
                }}>
                    <FontAwesomeIcon icon={faFingerprint} />
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalWindow;