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
    let usersArray = [ 
        {username: 'admin', password: 'password'},
        {username: 'discodevil69', password: '1234'},
        {username: '1337_assblaster', password: 'asdf'}];

    const [newUsersArray, setNewUsersArray] = useState(usersArray);

    // Input for SIGN IN. 
    const [userInput, setUserInput] = useState();
    const [passInput, setPassInput] = useState();

    // Input for NEW USER.
    const [newUserInput, setNewUserInput] = useState("");
    const [newPassInput, setNewPassInput] = useState("");

    const [showInput, setShowInput] = useState(false);
    let showNewUserInput = 'createNewUserContainer ';
    showNewUserInput += showInput === false ? 'hidden' : '';

    const [showSignin, setShowSignin] = useState(!false);
    let showSigninInput = "";
    showSigninInput += showSignin === false ? 'hidden' : '';

    //Stuff for making Smileys turn green/red:
    let [usernameOk, setUsernameOk] = useState(false);
    let [passwordOk, setPasswordOk] = useState(false);

    let smileyuser = 'input-face fa-regular ';
    smileyuser += usernameOk === true ? 'fa-face-smile' : 'fa-face-frown';

    let smileypass = 'input-face fa-regular ';
    smileypass += passwordOk === true ? 'fa-face-smile' : 'fa-face-frown';


    // --------   FUNCTIONS ---------- 
    function checkInput(input){ //Changes smilyface to green if username is in the newUsersArray.
        setUserInput(input);

        if (newUsersArray.find(e => e.username === input)){
            setUsernameOk(true);
        }

        else{
            setUsernameOk(false);
            setPasswordOk(!true);
        }
    }

    function checkPassInput(input){ //Changes smilyface to green if password is correct.
        setPassInput(input);

        if (newUsersArray.find(e => e.username === userInput)){
            
            const isUser = (newUsersArray.find(e => e.username === userInput));
            let password = isUser.password;

            if(password === input){
                setPasswordOk(true);
            }

            else{
                setPasswordOk(!true);
            }
        }

        else{
            setPasswordOk(!true);
        }
    }

    function checkSignin(){ //Starts game if username & password is correct. 

        let username = "username";
        let password = "password";

        if (newUsersArray.find(e => e.username === userInput)){
            const isUser = (newUsersArray.find(e => e.username === userInput));
            
            username = isUser.username;
            password = isUser.password;

            if (username === userInput && password === passInput)  {
                startGame();
            }

            else { alert("Wrong password."); }
        }

        else {alert(`${userInput} is not a username.`)}
    }

    function createNewUser(){ // FUNCTION FOR CREATING A NEW USER!
        
        const nameTaken = newUsersArray.some(e => e.username === newUserInput)

        if (!nameTaken){//Checks if username is not used. 
            const newUser = {username: newUserInput,
                             password: newPassInput};
            
            if (newUser.password === undefined || newUser.password === ""){
                alert("Choose a password.")
            }

            else {
            setNewUsersArray(newUsersArray => [...newUsersArray, newUser]);
            setNewPassInput("");
            setNewUserInput("");
            }
        }

        else{alert("Username is not available. Choose another one.")}
        
    }

    function openCreateUserTab(){
        setShowSignin(!showSignin);        
        setShowInput(!showInput);

    }      // SHOW THE NEW USER INPUTS


    function openForgotPasswordTab(){}  // SHOW THE FORGOT PASSWORD INPUT

    async function randomPassword(){ //ADD RANDOM PASSWORD

        try{
            const response = await fetch(`https://api.genratr.com/?length=6&uppercase&lowercase&special&numbers`);

            if(!response.ok){
                throw new Error("Could not fetch resource");
            }
        
            const data = await response.json();
            setNewPassInput(data.password);
        }
        
        catch(error){
            console.error(error);
        }
    }        

    async function generateRandomUsername(){ //ADD RANDOM USERNAME
        
        try{
            const response = await fetch(`https://usernameapiv1.vercel.app/api/random-usernames`);

            if(!response.ok){
                throw new Error("Could not fetch resource");
            }
        
            const data = await response.json();
            setNewUserInput(data.usernames[0]);
        }
        
        catch(error){
            console.error(error);
        }
    }         

    function checkarray(){
        console.log(usersArray);
        console.log(newUsersArray);
    }

    return(
        <>
            <div className="login-container">
                <form className={showSigninInput}>
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
                                onChange={(e) => checkInput(e.target.value)}></input><i className={smileyuser}></i>
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
                                onChange={(e) => checkPassInput(e.target.value)}></input><i className={smileypass}></i>
                        </div>
                        <button id="login-btn" type="submit" onClick={checkSignin}>PLAY <i className="fa-solid fa-play"></i></button>
                    </div>
                </form>
                <div className={showNewUserInput}>
                <div className="inputs-container">
                    <label htmlFor="new-username">New username:</label>
                    <div className="input-bar">
                        <input 
                            className="inputfield" 
                            id="input-new-username" 
                            type="text" 
                            placeholder="Input new username..." 
                            name="new-username" 
                            required
                            value={newUserInput}
                            onChange={(e) => setNewUserInput(e.target.value)}>
                        </input><i className="fa-solid fa-dice" onClick={() => generateRandomUsername()}></i>
                    </div>
                    <br/>
                    <label htmlFor="new-password">New password:</label>
                    <div className="input-bar">
                        <input 
                            className="inputfield" 
                            id="input-new-password" 
                            type="text" 
                            placeholder="Input new password..." 
                            name="new-password" 
                            required
                            value={newPassInput}                        
                            onChange={(e) => setNewPassInput(e.target.value)}>
                        </input><i className="fa-solid fa-dice" onClick={() => randomPassword()}></i>
                    </div>
                    <button id="login-btn" type="submit" onClick={createNewUser}>CREATE <i className="fa-solid fa-user-plus"></i></button>
                </div>
            </div>
                <div className="bottom-container">
                    <button className="bottom-link" onClick={() => openCreateUserTab()}>Create new user</button>
                    <Link to="/gamepage"><p className="bottom-link">Play as Guest</p></Link>{/*For faster start*/}
                    <p className="bottom-link">Forgot password?</p>
                </div>
            </div>
            <button onClick={checkarray}>check array</button>
        </>
    );
};

export default Startpage;