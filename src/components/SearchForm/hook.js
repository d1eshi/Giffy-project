import { useReducer, useCallback } from 'react'

const ACTIONS = {
  UPLOAD_KEYWORD: 'upload_keyword',
  UPLOAD_RATING: 'update_rating',
  UPLOAD_LANGUAGE: 'update_language',
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPLOAD_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
        times: state.times + 1,
      }

    case ACTIONS.UPLOAD_RATING:
      return {
        ...state,
        rating: action.payload,
      }

    case ACTIONS.UPLOAD_LANGUAGE:
      return {
        ...state,
        lang: action.payload,
      }

    default:
      return state
  }
}

export default function useForm({ initialKeyword = '', initialRating = 'g', initialLang = 'en' } = {}) {
  const [state, dispatch] = useReducer(reducer, {
    keyword: decodeURIComponent(initialKeyword),
    rating: initialRating,
    lang: initialLang,
    times: 0,
  })

  const { keyword, rating, lang, times } = state

  const updateKeyword = useCallback(keyword => {
    dispatch({ type: ACTIONS.UPLOAD_KEYWORD, payload: keyword })
  }, [])

  const updateRating = useCallback(rating => {
    dispatch({ type: ACTIONS.UPLOAD_RATING, payload: rating })
  }, [])

  const updateLang = useCallback(lang => {
    dispatch({ type: ACTIONS.UPLOAD_LANGUAGE, payload: lang })
  }, [])

  return { keyword, rating, lang, times, updateKeyword, updateRating, updateLang }
}
