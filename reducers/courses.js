const initialState = { 
  courses: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COURSES': 
      return Object.assign({}, state, { courses: action.payload });
    case 'SET_COURSE_STATE':
      return Object.assign({}, state, { courses: state.courses.map(course => {
        if (action.payload.id === course.id) course.state = action.payload.newState
        return course;
      }) })
    default:
      return state
  }
}