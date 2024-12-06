import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../startpage.css';


function Startpage(){
    
    const navigate = useNavigate();
    const startGame = () => {
        navigate('/gamepage');
    };

    // created users-array. 
    const users = [ 
        {username: 'admin', password: 'password'},
        {username: 'discodevil69', password: '1234'},
        {username: '1337_assblaster', password: 'asdf'}]

    const [userInput, setUserInput] = useState();
    const [passInput, setPassInput] = useState();

    //////////////////// Shizzle to make the smileyface SMILE when username is OK and password is OK.//////////////
    // will fix. Maybe. Maybe not. 

    let usernameOk = false;
    let passwordOk = false;

    let smileyclass = 'input-face fa-regular ';
    smileyclass += usernameOk === true ? 'fa-face-smile' : 'fa-face-frown';

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function checkSignin(){

        let username = "username";
        let password = "password";

        if (users.find(e => e.username === userInput)){
            const isUser = (users.find(e => e.username === userInput));
            
            username = isUser.username;
            password = isUser.password;

            if (username === userInput && password === passInput)  {
                startGame();
            }

            else { alert("Wrong password."); }
        }

        else {alert(`${userInput} is not a username.`)}
    }

    function createUser(){
            // HERE IS A FUNCTION TO MAKE A NEW USER. Push username + password to users-array.
    }

    return(
        <>
            <form className="login-container">
                <div className="inputs-container">
                    <label htmlFor="username">Username:</label>
                    <div className="input-bar">
                    <input 
                        className="inputfield" 
                        id="input-username" 
                        type="text" 
                        placeholder="Input username..." 
                        name="username" 
                        required
                        onChange={(e) => setUserInput(e.target.value)}></input><i className={smileyclass}></i>
                    </div>
                    <br/>
                    <label htmlFor="password">Password:</label>
                    <div className="input-bar">
                    <input 
                        className="inputfield" 
                        id="input-password" 
                        type="password" 
                        placeholder="Input password..." 
                        name="password" 
                        required
                        onChange={(e) => setPassInput(e.target.value)}></input><i className={smileyclass}></i>
                    </div>
                    <button id="login-btn" type="" onClick={checkSignin}>PLAY <i className="fa-solid fa-play"></i></button>
                </div>
                <div className="bottom-container">
                    <p className="bottom-link">Create new user</p>
                    <Link to="/gamepage"><p className="bottom-link">Play as Guest</p></Link>{/*For faster start*/}
                    <p className="bottom-link">Forgot password?</p>
                </div>
            </form>
            
        </>
    );
};

export default Startpage;