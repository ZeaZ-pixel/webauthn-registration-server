import React from 'react';

const Home = ({handleLogout}) => {
    return (
        <section className="home">
            <nav>
                <h2 className="greeting">Welcome</h2>
                <button className="Logout" onClick={handleLogout}>Logout</button>
                <section>
                    <div id="list"/>
                </section>
            </nav>
        </section>
    )
}
export default Home;
