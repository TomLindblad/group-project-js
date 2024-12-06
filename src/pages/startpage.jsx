import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../startpage.css';


function Startpage(){
    const navigate = useNavigate();

    const startGame = () => {
        navigate('/gamepage');
    };

    const username = "DiscoDevil69";       //Change to an array of usernames with password? 
    const password = "1234";

    const [userSignin, setUserSignin] = useState();
    const [passSignin, setPassSignin] = useState();

    function checkSignin(){
        console.log(userSignin);
        console.log(passSignin);

        if(userSignin === username && passSignin === password)  {
            startGame();
        }

        else{
            alert("wrong username and/or password.");
        }

    }
    return(
        <>
            <form className="login-container">
                <label htmlFor="username">Username:</label>
                <input 
                    className="inputfield" 
                    id="input-username" 
                    type="text" 
                    placeholder="Input username..." 
                    name="username" 
                    required
                    onChange={(e) => setUserSignin(e.target.value)}></input>
                <br/>
                <label htmlFor="password">Password:</label>
                <input 
                    className="inputfield" 
                    id="input-password" 
                    type="password" 
                    placeholder="Input password..." 
                    name="password" 
                    required
                    onChange={(e) => setPassSignin(e.target.value)}></input>
                <button id="login-btn" type="" onClick={checkSignin}>PLAY <i className="fa-solid fa-play"></i></button>
                <Link to="/gamepage"><p>Fast startgame</p></Link>    {/*For faster start*/}
            </form>
            
        </>
    );
};

export default Startpage;