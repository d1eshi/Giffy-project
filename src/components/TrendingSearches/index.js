import Spinner from 'components/Spinner'
import useNearScreen from 'hooks/useNearScreen'
import React, { Suspense } from 'react'

const TrendingSearches = React.lazy(() => import('./TrendingSearches'))

export default function LazyTrending() {
  const { isNearScreen, fromRef } = useNearScreen()

  return (
    <div ref={fromRef}>
      <Suspense fallback={<Spinner />}>
        {isNearScreen ? <TrendingSearches /> : <Spinner />}
      </Suspense>
    </div>
  )
}
