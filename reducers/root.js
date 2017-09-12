const initialState = {
  account: {},
  languages: {},
  activeLanguageId: 0,
  languageSelect: false,
  isLoaded: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IS_LOADED':
      return Object.assign({}, state, { isLoaded: action.payload });
    case 'SET_ACCOUNT':
      return Object.assign({}, state, { account: action.payload });
    case 'SET_LANGUAGES':
      return Object.assign({}, state, { languages: action.payload });
    case 'SET_ACTIVE_LANGUAGE':
      return Object.assign({}, state, { activeLanguageId: action.payload })
    case 'TOGGLE_LANGUAGE_SELECT':
      return Object.assign({}, state, { languageSelect: !state.languageSelect })
    default:
      return state
  }
}