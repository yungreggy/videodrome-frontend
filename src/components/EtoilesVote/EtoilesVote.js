import React, { useState } from 'react';
import './EtoilesVote.css';

function EtoilesVote({ notes, onVote }) {
  const [hover, setHover] = useState(0); 
  const [vote, setVote] = useState(null); 

  // Calcul de la moyenne des votes
  const moyenneVotes = notes.length > 0
      ? (notes.reduce((acc, curr) => acc + curr, 0) / notes.length).toFixed(2)
      : 'Aucun vote enregistré';

  const handleVote = (ratingValue) => {
      onVote(ratingValue); 
      setVote(ratingValue); 
  };

  return (
    <div>
      {[...Array(5)].map((etoile, index) => {
          const ratingValue = index + 1;
          return (
              <span
                  key={index}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => handleVote(ratingValue)}
                  style={{
                      cursor: 'pointer',
                      color: ratingValue <= (hover || vote) ? '#da9100' : 'gray',
                      fontSize: '1.7rem',
                  }}>
                  ★
              </span>
          );
      })}
      <p className='nb-votes'>
        {notes.length > 0 ? 
          `${moyenneVotes} / 5 (${notes.length} ${notes.length > 1 ? 'votes' : 'vote'})` : 
          'Aucun vote enregistré'}
      </p>
    </div>
  );
        }  

/* Référence pour le composant de notation par étoiles :
   J'ai créé le composant de notation par étoiles en m'inspirant de quelques tutoriels :
   - Chez w3collective, j'ai trouvé un guide pour faire un composant d'étoiles en React (https://w3collective.com/react-star-rating-component/).
   - Sur DEV Community, il y avait un article cool sur comment dynamiser la notation par étoiles (https://dev.to/kartikbudhraja/creating-a-dynamic-star-rating-system-in-react-2c8).
   - Et Aleks Popovic a un blog où il explique comment personnaliser le composant d'étoiles (https://aleksandarpopovic.com/Easy-Customizable-Star-Rating-Component-in-React/).
*/




export default EtoilesVote;