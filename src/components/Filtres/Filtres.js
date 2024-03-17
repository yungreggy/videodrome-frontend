import { useState } from 'react';
import './Filtres.css';

function Filtres({ setUrlFiltre, setFiltreActif }) {
  const [filtreActif, setFiltreLocalActif] = useState("");

  const changerFiltre = (typeFiltre, direction) => {
    const url = `https://four1f-node-api.onrender.com/films?orderBy=${typeFiltre}&orderDirection=${direction}`;
    setUrlFiltre(url); 
    setFiltreActif(`${typeFiltre}${direction}`); 
    setFiltreLocalActif(`${typeFiltre}${direction}`); 
  };

  const elementsFiltre = [
    {
      categorie: "Titre",
      typeFiltre: "titre",
      options: [
        { nom: "A-Z", direction: "asc" },
        { nom: "Z-A", direction: "desc" },
      ],
    },
    {
      categorie: "Année",
      typeFiltre: "annee",
      options: [
        { nom: "Plus récent", direction: "desc" },
        { nom: "Plus ancien", direction: "asc" },
      ],
    },
    {
      categorie: "Ralisateur",
      typeFiltre: "realisation",
      options: [
        { nom: "A-Z", direction: "asc" },
        { nom: "Z-A", direction: "desc" },
      ],
    },
  ];

  return (
    <ul className="menu-filtres">
      {elementsFiltre.map(({ categorie, typeFiltre, options }) => (
        <li key={categorie} className="menu-item">
          {categorie}
          <ul className="sous-menu">
            {options.map(({ nom, direction }) => (
              <li
                key={nom}
                className={filtreActif === `${typeFiltre}${direction}` ? "active" : ""}
                onClick={() => changerFiltre(typeFiltre, direction)}
              >
                <button>{nom}</button>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default Filtres;




