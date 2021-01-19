import React from 'react';
import RegisterPrint from "./authentication/fingerprint/RegisterPrint";

const Home = ({handleLogout}) => {
    return (
        <section className="home">
            <nav>
                <h2 className="greeting">Welcome</h2>
                <button className="Logout" onClick={handleLogout}>Logout</button>

                <p id="uvpa_unavailable" className="">
                    This device does not support User Verifying Platform Authenticator. You can't register a credential.
                </p>
                <h3 className="mdc-typography mdc-typography--headline6">
                    Your registered credentials:
                </h3>
                <section>
                    <div id="list"/>
                </section>
                <button onClick={RegisterPrint}>Fingerprint</button>
            </nav>
        </section>
    )
}
export default Home;