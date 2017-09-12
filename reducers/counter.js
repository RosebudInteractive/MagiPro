export default (state = 0, action) => {
  switch (action.type) {
    case 'SET_COUNTER': 
      return action.payload
    case 'INCREMENT_COUNTER':
      return state + 1;
    case 'DECREMENT_COUNTER':
      console.log('dec')
      return state - 1;
    default:
      return state
  }
}