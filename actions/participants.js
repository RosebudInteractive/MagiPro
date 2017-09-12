import fetch from 'isomorphic-fetch';

import configuration from '../configuration'

export const fetchParticipants = (cb) => dispatch => {
  fetch(configuration.apiHost + '/api/domain/pmt').then(r=>r.json()).then(r=>{
    console.log('participants'.inverse)
    console.log(r);
    // dispatch(setCourses(r.account.courses));
    if (typeof cb === 'function') cb();
  })
}

export const setParticipants = (participants) => {
  return {
    type: SET_PARTICIPANTS,
    payload: participants
  }
}
