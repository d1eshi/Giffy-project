import React from 'react'
import { Redirect } from 'wouter'
import Gif from 'components/Gif'
import useSingleGif from 'hooks/useSingleGif'
import Spinner from 'components/Spinner'
import { Helmet } from 'react-helmet'

export default function Detail({ params }) {
  // recuperar el estado
  const { gif, isLoading, isError } = useSingleGif({ id: params.id })
  const title = gif ? gif.title : ''

  if (isLoading)
    return (
      <>
        <Helmet>
          <title>Cargando...</title>
          <Spinner />
        </Helmet>
      </>
    )

  if (isError) return <Redirect to='/404' />
  if (!gif) return null

  // Mostrar los detalles del fig
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <h3 className='App-title'>{gif.title}</h3>
      <Gif {...gif} />
    </>
  )
}
