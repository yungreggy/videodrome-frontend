import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListeFilms from './ListeFilms';


const mockFilms = [
  {
    id: '1',
    titre: 'Alien - Le 8ème passager',
    genres: ['Horreur', 'Science-fiction'],
    description: 'Un vaisseau spatial perçoit une transmission non-identifiée...',
    titreVignette: 'alienle8emepassager.jpg',
    realisation: 'Ridley Scott',
    annee: 1979,
    notes: [3, 4, 5, 2, 1],
    commentaires: [{ commentaire: 'Super film', auteur: 'admin' }]
  },

];

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockFilms),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Composant ListeFilms', () => {
  test('affiche les films après chargement des données', async () => {
    render(<ListeFilms />);

    for (const film of mockFilms) {
      await screen.findByText(film.titre);
      expect(screen.getByText(film.titre)).toBeInTheDocument();
      expect(screen.getByText(film.genres.join(', '))).toBeInTheDocument();
      expect(screen.getByText(film.description)).toBeInTheDocument();
      expect(screen.getByText(film.realisation)).toBeInTheDocument();
      expect(screen.getByText(String(film.annee))).toBeInTheDocument();
    }
  });
});



