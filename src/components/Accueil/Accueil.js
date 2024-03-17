import React, { useState, useEffect } from 'react';
import './Accueil.css';

function Accueil() {
  const [paragraphes, setParagraphes] = useState([]);

  useEffect(() => {
    fetch('/data/Accueil.json')
      .then(response => response.json())
      .then(data => setParagraphes(data.paragraphes))
      .catch(error => console.error('Erreur lors du chargement des données:', error));
  }, []);

  return (
    <main>
      <section className="accueil-section">

        <div className="paragraphes">

        {paragraphes.map((paragraphe, index) => (

          <p key={index} className='medium-text'>{paragraphe}</p>))}

        </div>
      </section>

      <img src={`${process.env.PUBLIC_URL}/img/svg/lignes-accueil.svg`} alt="lignes décoratives" className="lignes" />

      <img src={`${process.env.PUBLIC_URL}/img/svg/group-8.svg`} alt="Logo Videodrome" className="image-1" />

    </main>
  );
}

export default Accueil;
