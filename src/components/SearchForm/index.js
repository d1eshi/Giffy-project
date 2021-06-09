import React from 'react'
import { useLocation } from 'wouter'
import useForm from './hook.js'

const RATINGS = ['g', 'pg', 'pg-13', 'r']
const LANGUAGES = ['en', 'es', 'pt', 'ja', 'fr', 'de']

function SearchForm({ initialKeyword = '', initialRating = 'g', initialLang }) {
  // eslint-disable-next-line
  const [path, pushLocation] = useLocation()

  const { keyword, rating, lang, updateKeyword, updateRating, updateLang } = useForm({ initialKeyword, initialRating, initialLang })

  const handleSubmit = e => {
    e.preventDefault()
    // navegar a otra ruta
    pushLocation(`/search/${keyword}/${rating}/${lang}`)
  }

  const handleChange = e => updateKeyword(e.target.value)
  const handleChangeRating = e => updateRating(e.target.value)
  const handleChangeLang = e => updateLang(e.target.value)

  return (
    <form onSubmit={handleSubmit}>
      <input type='submit' value='Buscar' />
      <input placeholder='Search a gif here...' onChange={handleChange} type='text' value={keyword} />
      {/* Rating */}
      <select onChange={handleChangeRating} value={rating}>
        <option disabled>Rating type</option>
        {RATINGS.map(rating => (
          <option key={rating}>{rating}</option>
        ))}
      </select>
      {/* Languages */}
      <select onChange={handleChangeLang} value={lang}>
        <option disabled>Rating type</option>
        {LANGUAGES.map(lang => (
          <option key={lang}>{lang}</option>
        ))}
      </select>

      {/* <small>{times}</small> */}
    </form>
  )
}

export default React.memo(SearchForm)
