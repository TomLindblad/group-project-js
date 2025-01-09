import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../startmenu.css';

function Startmenu(){

    const navigate = useNavigate();

    const goStart = () => {
        navigate('/gamepage');
    };


    const goOptions = () => {
        navigate('/gamepage');
    };

    const goExit = () => {
        navigate('/gamepage');
    };
    
    const goChangeAcc = () => {
        navigate('/');
    };




    return(
    <>
        <div className="mainmenu-container">
            <h2 className="title title-silly">SILLYWILLY</h2>
            <h2 className="title title-snake"><span className="bigger-letter letter-left">S</span>NAK<span className="bigger-letter letter-right">E</span></h2>
            <div className="mainMenu-buttons">
                <button id="start-btn" type="submit" className="menuBtn" onClick={goStart}>START GAME <i className="fa-solid fa-play"></i></button>
                <button id="options-btn" type="submit" className="menuBtn" onClick={goOptions}>OPTIONS <i className="fa-solid fa-gear"></i></button>
                <div>
                    <button id="exit-btn" type="submit" className="menuBtn" onClick={goExit}>EXIT <i class="fa-solid fa-person-running"></i></button>
                    <button id="change-btn" type="submit" className="menuBtn" onClick={goChangeAcc}>CHANGE ACCOUNT <i className="fa-solid fa-repeat"></i></button>
                </div>
            </div>
        </div>
    </>
    )
};



export default Startmenu;