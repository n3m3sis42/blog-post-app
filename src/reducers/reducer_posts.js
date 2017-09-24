import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      return _.omit(state, action.payload)
    case FETCH_POST:
      // NOTE commented out code below is the ES5 way
      // const post = action.payload.data
      // const newState = { ...state }
      // newState[post.id] = post
      // return newState
      return { ...state, [action.payload.data.id]: action.payload.data }
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id')
    default:
      return state
  }
}