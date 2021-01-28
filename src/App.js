import React, {useState} from "react";
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
    const [error, setError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);


    const clearInputs = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setSecond_pass('');
    }

    const clearErrors = () => {
        setError('');
    }

    const handleLogin = () => {
        clearErrors();

        axios.post("http://iqos.kz/login.php",{
            email : email,
            password : password
        }).then(res => {
            if(res.data.success === 1){
                clearInputs();
                setUsername(res.data.param.username);
                setEmail(res.data.param.email);
                setUser(true);
            }else{
                setError(res.data.message);
            }

        })
            .catch(error => console.log(error));
    };

    const handleSignup = () => {
        clearErrors();

        axios.post("http://iqos.kz/register.php", {
            name : username,
            email :email,
            password : password,
            second_pass : second_pass
        })
            .then(res => {
                if(res.data.success === 1){
                    clearInputs();
                    setUsername(res.data.param.username);
                    setEmail(res.data.param.email)
                    setUser(true);
                }else{
                    setError(res.data.message);
                }
            })
            .catch(error => console.log(error));
    };

    const handleLogout = () => {
        setUser(false);
    }




    return(
      <div className="App">
          {user ? (
              <Home handleLogout={handleLogout} name={username} email={email}/>
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
                     error={error}

              />
          )}


      </div>
    );


};

export default App;
