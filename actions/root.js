import fetch from 'isomorphic-fetch';

import { updateIntl } from 'react-intl-redux'
import translations from '../translations';
import configuration from '../configuration'

import { setCourses } from './courses'

export const setInterfaceLang = (locale) => (dispatch, getState) => {
  console.log('setInterfaceLang:locale: ' + locale + ''.inverse);
  console.log(translations[locale]);
  dispatch(updateIntl({
    locale,
    messages: translations[locale]
  }))
}

export const fetchAccount = (cb) => (dispatch, getState) => {
  const prevState = getState()
  if (!prevState.root.isLoaded) {
    fetch('http://localhost:4000/api/domain/pmt').then(r => r.json()).then(r => {
      dispatch(setAccount(r.account));
      dispatch(setCourses(r.account.courses))
      dispatch(setLanguages(r.languages));
      dispatch(setIsLoaded(true));
      if (typeof cb === 'function') cb();
    })
  } else if (typeof cb === 'function') cb();
}

export const setIsLoaded = (type) => {
  return {
    type: 'SET_IS_LOADED',
    payload: type
  }
}

export const setAccount = (account) => {
  return {
    type: 'SET_ACCOUNT',
    payload: account
  }
}

export const setAccountLeadingCourse = (courseId) => {
  return {
    type: 'SET_ACCOUNT_LEADING_COURSE',
    payload: courseId
  }
}

export const setLanguages = (languages) => {
  return {
    type: 'SET_LANGUAGES',
    payload: languages
  }
}

export const setActiveLanguageId = (languageId) => {
  return {
    type: 'SET_ACTIVE_LANGUAGE',
    payload: languageId
  }
}

export const toggleLanguageSelect = () => {
  return {
    type: 'TOGGLE_LANGUAGE_SELECT',
  }
}

