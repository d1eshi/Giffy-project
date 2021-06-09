import React, { useState } from 'react'

function SearchForm({ onSubmit }) {
  const [keyword, setKeyword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({ keyword })
  }

  const handleChange = e => {
    setKeyword(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='submit' value='Buscar' />
      <input
        placeholder='Search a gif here...'
        onChange={handleChange}
        type='text'
        value={keyword}
      />
    </form>
  )
}

export default React.memo(SearchForm)
