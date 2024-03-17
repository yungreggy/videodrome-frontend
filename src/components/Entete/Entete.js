import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../App/App';
import './Entete.css';

const Entete = () => {
    const { estLog, login, logout } = useAuth();

    const handleAuthOption = useCallback(() => estLog ? logout() : login("admin"), [estLog, logout, login]);

    const authOptions = estLog ? "Déconnexion" : "Connexion";
    const authText = estLog ? "Bonjour, Admin !" : null;

    return (
        <header>
            <nav>
                <NavLink to="/accueil">
                    <img src={`${process.env.PUBLIC_URL}/img/svg/logo.svg`} alt="logo" title="logo" />
                </NavLink>
                <ul>
                    <li><NavLink to="/liste-films">Films</NavLink></li>
                    {estLog && <li><NavLink to="/admin">Admin</NavLink></li>}
                </ul>
            </nav>
            <div>
                {authText && <span>{authText}</span>}
                <button onClick={handleAuthOption} className="multi-line-link">{authOptions}</button>
            </div>
        </header>
    );
}

export default Entete;



