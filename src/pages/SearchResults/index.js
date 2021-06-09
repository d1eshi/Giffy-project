import React, { useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'
import Spinner from 'components/Spinner'
import ListOfGifs from 'components/ListOfGifs'
import useGifs from 'hooks/useGifs'
import useNearScreen from 'hooks/useNearScreen'
import SearchForm from 'components/SearchForm'
import { Helmet } from 'react-helmet'

export default function SearchResults({ params }) {
  const { keyword, rating = 'g', lang } = params
  const { loading, gifs, setPage } = useGifs({ keyword, rating, lang })
  const visorRef = useRef()
  const { isNearScreen } = useNearScreen({ externalRef: !loading && visorRef, once: false })

  // eslint-disable-next-line
  const debounceNextPage = useCallback(
    debounce(() => setPage(prevPage => prevPage + 1), 2000),
    []
  )

  useEffect(function () {
    if (isNearScreen) debounceNextPage()
  })

  const title = gifs ? `${gifs.length} resultados de ${keyword}` : ''

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Helmet>
            <title>{decodeURI(title)}</title>
            <meta name='description' content={title} />}
          </Helmet>
          <SearchForm initialKeyword={keyword} initialRating={rating} initialLang={lang} />
          <h3 className='App-title'>{decodeURI(keyword)}</h3>
          <ListOfGifs gifs={gifs} />
          <div id='visor' ref={visorRef}></div>
        </>
      )}
    </>
  )
}
