import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {startPasswordlessEnrolment, getMakeCredentialChallenge,
makeCredentialResponse} from "./localServer/localServer";
import {preformatMakeCredReq, publicKeyCredentialToJSON} from "./localServer/helper";

const Home = (props) => {
    const {handleLogout, name, email} = props;
    let username = email;
    let displayName = name;
    let newRegistration = () => {
        startPasswordlessEnrolment({username, displayName})
            .then((serverResponse) => {
                if(serverResponse.status !== 'startFIDOEnrolmentPasswordless')
                    throw new Error('Error registering user! Server returned: ' + serverResponse.errorMessage);

                return getMakeCredentialChallenge({'uv': true})
            })
            .then((makeCredChallenge) => {
                makeCredChallenge = preformatMakeCredReq(makeCredChallenge);
                console.log(makeCredChallenge)
                return navigator.credentials.create({ 'publicKey': makeCredChallenge })
            })
            .then((newCredentialInfo) => {
                newCredentialInfo = publicKeyCredentialToJSON(newCredentialInfo)

                return makeCredentialResponse(newCredentialInfo)
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
        <section className="home">
            <nav>
                <h2 className="greeting">Welcome {name}</h2>
                <button className="Logout" onClick={handleLogout}>Logout</button>
                <button className="Logout" onClick={() => {
                    newRegistration();
                }
                }>Add fingerprint</button>
                <section>
                    <div id="list"/>
                </section>
            </nav>
        </section>
    )
}
export default Home;
