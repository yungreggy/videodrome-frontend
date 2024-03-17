import React from 'react';
import { Link } from 'react-router-dom';
import './404.css';

function Page404() {
  return (
    <main>
      <section>
        <img src={`${process.env.PUBLIC_URL}/img/svg/lignes-accueil.svg`} alt="lignes" />
        <div className='not-found'>
          <h1>404</h1>
          <p>Page non trouvée :(</p>
          <Link to="/" className="retour-accueil">Retourner à l'accueil</Link> 
        </div>
      </section>
    </main>
  );
}

export default Page404;
