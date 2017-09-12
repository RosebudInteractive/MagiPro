import fetch from 'isomorphic-fetch';

export const SET_COURSES = 'SET_COURSES'
export const SET_COURSE_STATE = 'SET_COURSE_STATE'
import configuration from '../configuration'

// export const fetchCourses = (cb) => dispatch => {
//   fetch(configuration.apiHost + '/api/courses').then(r=>r.json()).then(r=>{
//     dispatch(setCourses(r.courses));
//     if (typeof cb === 'function') cb();
//   })
// }

export const fetchCourses2 = (cb) => (dispatch, getState) => {
  const prevState = getState();
  dispatch(setCourses(prevState.root.account.courses || []));
  if (typeof cb === 'function') cb();
}

export const setCourseState = (id, newState) => {
  return {
    type: SET_COURSE_STATE,
    payload: {
      id,
      newState
    }
  }
}

export const setCourses = (courses) => {
  return {
    type: SET_COURSES,
    payload: courses
  }
}

// export const foo = () => (dispatch, getState) => {
//   const { counter } = getState()

//   if (counter % 2 === 0) {
//     return
//   }

//   dispatch(increment())
// }

// export const fooAsync = (delay = 1000) => dispatch => {
//   setTimeout(() => {
//     dispatch(increment())
//   }, delay)
// }