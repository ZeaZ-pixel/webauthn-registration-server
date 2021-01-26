import React, {useState, useEffect} from "react";
import Autn from "./authentication/Autn";
import Home from "./Home";
import "./App.css";
import axios from "axios";

const App = () => {
    const [user, setUser] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [second_pass, setSecond_pass] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [second_passError, setSecond_passError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);


    const clearInputs = () => {
        setUsername('')
        setEmail('');
        setPassword('');
        setSecond_pass('');
    }

    const clearErrors = () => {
        setUsernameError('')
        setEmailError('')
        setPasswordError('');
    }

    const handleLogin = () => {
        clearErrors();
        let formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("login_user"," ");
        axios.post("http://iqos.kz/", formData)
            .then(res => {
                if(res.status === 200){
                    setUser(true);
                }else{
                    console.log('error');
                }
            })
            .catch(error => console.log(error));
            // .auth()
            // .signInWithEmailAndPassword(email,password)
            // .catch(err => {
            //     // eslint-disable-next-line default-case
            //     switch (err.code){
            //         case 'auth/invalid-email':
            //         case 'auth/user-disabled':
            //         case 'auth/user-not-found':
            //             setEmailError(err.message);
            //             break;
            //         case 'auth/wrong-password':
            //             setPasswordError(err.message);
            //             break;
            //     }
            // });
    };

    const handleSignup = () => {
        clearErrors();

        if (username.length === 0 ){
            setUsernameError("Invalid user name")
        }else if (password.length < 6){
            setPasswordError("Passwords must contain at least 8 characters")
        }else if (password !== second_pass){
            setSecond_passError("Passwords don't match");
        }

        let formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("reg_user"," ");
        axios.post("http://iqos.kz/", formData)
            .then(res => {
                console.log(res.data);
                switch (res.data){
                    case 'email-error':
                        console.log("cook");
                        break;

                }

            })
            .catch(error => console.log(error));
        // fetch('http://iqos.kz/', {
        //     method : 'POST',
        //     headers : {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then(response => response.json())
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(error => console.log(error));
        // fire
        //     .auth()
        //     .createUserWithEmailAndPassword(email,password)
        //     .catch(err => {
        //         // eslint-disable-next-line default-case
        //         switch (err.code){
        //             case 'auth/email-already-in-use':
        //             case 'auth/invalid-email':
        //                 setEmailError(err.message);
        //                 break;
        //             case 'auth/weak-password':
        //                 setPasswordError(err.message);
        //                 break;
        //         }
        //     });
    };

    const handleLogout = () => {
        setUser(false);
    }

    const authListener = () => {
        // fire.auth().onAuthStateChanged(user => {
        //     if(user) {
        //         clearInputs();
        //         setUser(user);
        //     }else {
        //         setUser('');
        //     }
        // });
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
                     setUser = {setUser}
                     username = {username}
                     setUsername = {setUsername}
                     email={email}
                     setEmail={setEmail}
                     password={password}
                     setPassword={setPassword}
                     second_pass={second_pass}
                     setSecond_pass={setSecond_pass}
                     handleLogin={handleLogin}
                     handleSignup={handleSignup}
                     hasAccount={hasAccount}
                     setHasAccount={setHasAccount}
                     usernameError={usernameError}
                     emailError={emailError}
                     passwordError={passwordError}
                     second_passError = {second_passError}
              />
          )}


      </div>
    );



};

export default App;
