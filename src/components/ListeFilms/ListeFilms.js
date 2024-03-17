import { Link } from 'react-router-dom';
import './ListeFilms.css';
import TuileFilm from '../TuileFilms/TuileFilm';
import { useEffect, useState } from 'react';
import Filtres from '../Filtres/Filtres';

function ListeFilms() {
const urlListeFilms = "https://four1f-node-api.onrender.com/films";

 const [urlFiltre, setUrlFiltre] = useState(urlListeFilms);
 const [listeFilms, setListeFilms] = useState([]);
 const [filtreActif, setFiltreActif] = useState(""); // Ajout d'un état pour filtreActif
 const [isLoaded, setIsLoaded] = useState(false);

/**
 * Pour la transition des tuiles de films, je me suis basé sur la documentation de React sur les hooks useEffect.
   L'idée était de retarder l'affichage des films jusqu'à ce que tout soit chargé, en utilisant setTimeout dans useEffect.
   Cela permet d'avoir une transition plus fluide à l'affichage des données.
   Voici la doc qui m'a aidé : https://reactjs.org/docs/hooks-effect.html
 */
  
 
 useEffect(() => {
  let timer;
  fetch(urlFiltre)
    .then(response => response.json())
    .then(data => {
      setListeFilms(data);
      // Démarre le timer après avoir chargé les données
      timer = setTimeout(() => {
        setIsLoaded(true);
      }, 300); 
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données:', error);
    });

  // Fonction de nettoyage pour annuler le setTimeout
  return () => clearTimeout(timer);
}, [urlFiltre]);


const tuileFilm = listeFilms.map((film) => (
  <div key={film.id} className={`tuileFilm ${isLoaded ? 'loaded' : ''}`}>
    <Link to={`/films/${film.id}`}>
      <TuileFilm data={film} filtreActif={filtreActif} />
    </Link>
  </div>
));


function getDescriptionFiltre(filtre) {
  const baseText = 'Filtres > ';
  const detail = filtre.match(/(titre|annee|real)/); 
  const direction = filtre.endsWith('Asc') ? 'A - Z' : 'Z - A';

  let detailText = 'Inconnu';
  if (detail) {
    switch (detail[0]) { 
      case 'titre':
        detailText = 'Titre';
        break;
      case 'annee':
        detailText = 'Année';
        break;
      case 'real':
        detailText = 'Réalisation';
        break;
    
    }
  }

  return `${baseText}${detailText} > ${direction}`;
}


return (
  <main className='main-liste-films'>
    <aside>
      <Filtres setUrlFiltre={setUrlFiltre} setFiltreActif={setFiltreActif} />
    </aside>
    <section className="liste-films">
      {filtreActif && <h2> {getDescriptionFiltre(filtreActif)}</h2>}
      <div className="container">
        {tuileFilm}
      </div>
    </section>
  </main>
);

}

export default ListeFilms;
