const initialState = { 
  device: 'PHONE'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DEVICE': 
      return Object.assign({}, state, { device: action.payload });
    default:
      return state
  }
}