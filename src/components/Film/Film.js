import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import EtoilesVote from '../EtoilesVote/EtoilesVote'
import Commentaires from '../Commentaires/Commentaires'
import './Film.css'

function Film ({ estLog, handleLogin, handleLogout }) {
  const { id } = useParams()
  const urlFilm = `https://four1f-node-api.onrender.com/films/${id}`
  const navigate = useNavigate()

  const [film, setFilm] = useState({})

  const [loaded, setLoaded] = useState(false)

  useEffect(
		() => {
  fetch(urlFilm)
				.then(response => {
  if (!response.ok) {
    navigate('/404')
    return
  }
  return response.json()
})
				.then(data => {
  setFilm(data)
  setLoaded(true)
})
				.catch(error => {
  console.error('Erreur lors de la récupération des données:', error)
  navigate('/404')
})
},
		[urlFilm, navigate]
	)

  const soumettreVote = async note => {
    const nouvellesNotes = film.notes ? [...film.notes, note] : [note]
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: nouvellesNotes })
    }

    try {
      await fetch(urlFilm, options)
      const response = await fetch(urlFilm)
      const updatedFilm = await response.json()
      setFilm(updatedFilm)
    } catch (error) {
      console.error('Erreur lors de la soumission de la note', error)
    }
  }

  return (
    <main>
      <section className='film-section'>
        <div className={`poster-container ${loaded ? 'loaded' : ''}`}>
          <img
            src={`${process.env.PUBLIC_URL}/img/${film.titreVignette}`}
            alt={film.titre}
            className='poster'
            width='400px'
            title={film.titre}
            onLoad={() => setLoaded(true)}
					/>
        </div>

        <div className={`info-container ${loaded ? 'loaded' : ''}`}>
          <div className='card'>
            <div className='card-header'>
              <h1>
                {film.titre}
              </h1>
              <img
                src={`${process.env.PUBLIC_URL}/img/svg/lignes.svg`}
                alt='lignes'
							/>
              <h2>
                {film.annee}
              </h2>
            </div>

            <div className='card-body'>
              <p>
								réalisé par <strong>{film.realisation}</strong>
              </p>

              <p>
                {film.genres && film.genres.join(', ')}
              </p>
              <p>
                {film.description}
              </p>
            </div>

            <div className='votes'>
              {film.notes &&
              <EtoilesVote notes={film.notes} onVote={soumettreVote} />}
            </div>

            <div className='card-footer'>
              <img
                src={`${process.env.PUBLIC_URL}/img/svg/rectangle.svg`}
                alt='rectangle'
							/>
            </div>
          </div>
        </div>
      </section>

      <section className='commentaires-section'>
        <Commentaires estLog={estLog} film={{ id: id, ...film }} />
      </section>
    </main>
  )
}

export default Film
