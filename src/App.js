import React, {useState, useEffect} from "react";
import fire from "./fire";
import Autn from "./authentication/Autn";
import Home from "./Home";
import "./App.css";

const App = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [second_password, setSecond_password] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);


    const clearInputs = () => {
        setEmail('');
        setPassword('');
        setSecond_password('');
    }

    const clearErrors = () => {
        setEmailError('')
        setPasswordError('');
    }

    const handleLogin = () => {
        clearErrors();
        fire
            .auth()
            .signInWithEmailAndPassword(email,password)
            .catch(err => {
                // eslint-disable-next-line default-case
                switch (err.code){
                    case 'auth/invalid-email':
                    case 'auth/user-disabled':
                    case 'auth/user-not-found':
                        setEmailError(err.message);
                        break;
                    case 'auth/wrong-password':
                        setPasswordError(err.message);
                        break;
                }
            });
    };

    const handleSignup = () => {
        clearErrors();
        fire
            .auth()
            .createUserWithEmailAndPassword(email,password)
            .catch(err => {
                // eslint-disable-next-line default-case
                switch (err.code){
                    case 'auth/email-already-in-use':
                    case 'auth/invalid-email':
                        setEmailError(err.message);
                        break;
                    case 'auth/weak-password':
                        setPasswordError(err.message);
                        break;
                }
            });
    };

    const handleLogout = () => {
        fire.auth().signOut();
    }

    const authListener = () => {
        fire.auth().onAuthStateChanged(user => {
            if(user) {
                clearInputs();
                setUser(user);
            }else {
                setUser('');
            }
        });
    };

    useEffect(() => {
        authListener();
    }, [])

    return(
      <div className="App">
          {user ? (
              <Home handleLogout={handleLogout} email = {email}/>
          ) : (
              <Autn
                     setUser={setUser}
                     email={email}
                     setEmail={setEmail}
                     password={password}
                     setPassword={setPassword}
                     second_password={second_password}
                     setSecond_password={setSecond_password}
                     handleLogin={handleLogin}
                     handleSignup={handleSignup}
                     hasAccount={hasAccount}
                     setHasAccount={setHasAccount}
                     emailError={emailError}
                     passwordError={passwordError}
              />
          )}


      </div>
    );



};

export default App;
