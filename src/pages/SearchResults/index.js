import React, { useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'
import Spinner from 'components/Spinner'
import ListOfGifs from 'components/ListOfGifs'
import useGifs from 'hooks/useGifs'
import useNearScreen from 'hooks/useNearScreen'
import { Helmet } from 'react-helmet'

export default function SearchResults({ params }) {
  const { keyword } = params
  const { loading, gifs, setPage } = useGifs({ keyword })
  const externalRef = useRef()
  const { isNearScreen } = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false,
  })
  const debounceNextPage = useCallback(() => {
    debounce(() => setPage(prevPage => prevPage + 1), 2000)
  }, [setPage])

  const title = gifs ? `${gifs.length} resultados de ${keyword}` : ''

  useEffect(function () {
    if (isNearScreen) debounceNextPage()
  })

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Helmet>
            <title>{title}</title>
            <meta name='description' content={title} />
          </Helmet>
          <h3 className='App-title'>{decodeURI(keyword)}</h3>
          <ListOfGifs gifs={gifs} />
          <div id='visor' ref={externalRef}></div>
        </>
      )}
    </>
  )
}
