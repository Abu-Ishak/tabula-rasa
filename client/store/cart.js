import axios from 'axios'

//ACTION TYPES

const GET_CART = 'GET_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const ADD_TO_ORDER = 'ADD_TO_ORDER'

//INITIAL STATE

const initialState = {
  cart: []
}

//ACTION CREATORS

const gotCart = cart => ({
  type: GET_CART,
  cart
})

const deletedFromCart = artworkId => ({
  type: REMOVE_FROM_CART,
  artworkId
})

const addedArtworkToOrder = artwork => ({
  type: ADD_TO_ORDER,
  artwork
})

//THUNK CREATORS

export const getCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart`)
      dispatch(gotCart(data))
    } catch (error) {
      console.log('Something went wrong: ', error)
    }
  }
}

export const deleteFromCart = artworkId => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/cart/${artworkId}`)
      dispatch(deletedFromCart(artworkId))
    } catch (err) {
      console.error(err)
    }
  }
}

export const addArtworkToOrder = artworkId => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/cart/`, {artworkId: artworkId})
      dispatch(addedArtworkToOrder(data))
    } catch (error) {
      console.log('Something went wrong: ', error)
    }
  }
}

//REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {...state, cart: [...action.cart]}
    case REMOVE_FROM_CART:
      let newCart = state.cart.filter(
        cartItem => cartItem.id !== action.artworkId
      )
      return {...state, cart: [...newCart]}
    case ADD_TO_ORDER:
      return {...state, cart: [...state.cart, action.artwork]}
    default:
      return state
  }
}
