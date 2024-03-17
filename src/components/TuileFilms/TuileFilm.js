import './TuileFilm.css';
import React from 'react';

function TuileFilm({ data, filtreActif }) {
  let infoSupplementaire;

  if (filtreActif.includes('real')) {
    infoSupplementaire = <p>Réalisation: {data.realisation}</p>;
  } else if (filtreActif.includes('annee')) {
    infoSupplementaire = <p>Année: {data.annee}</p>;
  }

  return (
    <article className="interactif film-hover" title={data.titre}>

      <svg width="245" height="369" viewBox="0 0 245 369" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 355.209L14.7743 368H243.639V13.7909M1 355.209H229.865V1M1 355.209V1H229.865M1 355.209L15.1489 367.652M1 355.209L229.166 354.849M243.639 13.7909L229.865 1M243.639 13.7909H229.865V212.542L229.166 354.849M229.166 354.849L244 367.639" stroke="#636161"/>

        <image href={`${process.env.PUBLIC_URL}/img/${data.titreVignette}`} alt={data.titre} x="2" y="1" width="226.812" height="352.848" />
      </svg>

      <div className="film-info">

        <h2>{data.titre}<span className="info-supplementaire">{infoSupplementaire}</span></h2>
      </div>
      
    </article>
  );
}

export default TuileFilm;


