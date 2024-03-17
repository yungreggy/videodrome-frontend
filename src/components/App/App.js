import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Accueil from '../Accueil/Accueil';
import Entete from '../Entete/Entete';
import ListeFilms from '../ListeFilms/ListeFilms';
import Page404 from '../404/404';
import Admin from '../Admin/Admin';
import Film from '../Film/Film';
import Commentaires from '../Commentaires/Commentaires'; 
import './App.css';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function App() {
  const [estLog, setEstLog] = useState(localStorage.getItem('estLog') === 'true');

  const login = (usager) => {
    if (usager === "admin") {
      setEstLog(true);
      localStorage.setItem('estLog', 'true');
    }
  };

  const logout = () => {
    setEstLog(false);
    localStorage.removeItem('estLog');
  };

  async function envoyerDonnees(url, donnees) {
    const reponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donnees),
    });
    return reponse.json();
  }

  return (
    <AuthContext.Provider value={{ estLog, login, logout }}>
      <Router>
        <Entete />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/accueil" element={<Navigate replace to="/" />} />
          <Route path="/liste-films" element={<ListeFilms />} />
          <Route path="/films/:id" element={<Film envoyerDonnees={envoyerDonnees} />} />
          <Route path="/film/:id" element={<Film />} />
          <Route path="/admin" element={estLog ? <Admin /> : <Navigate to="/" />} />
          <Route path="/commentaires" element={<Commentaires envoyerDonnees={envoyerDonnees} />} />
          {/* Gérer toutes les autres routes non définies ci-dessus */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

