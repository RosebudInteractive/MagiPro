import React, { Component } from 'react'

import PropTypes from 'prop-types'
const colors = require('colors');
import Courses from './Courses';
import qs from 'query-string';

import { renderRoutes, matchRoutes } from 'react-router-config'

class CoursesWrapper extends React.Component {
  constructor(props) {
    super(props);
    // console.log('CoursesWrapper')
    // console.log(props);
  }
  render() {
    const { courses, route, location, languages } = this.props
    const matchedRoute = matchRoutes(route.routes, location.pathname);
    const queryString = qs.parse(location.search);
    const filterLang = queryString.filterLang !== undefined ? parseInt(queryString.filterLang) : 0;
    const filterType = queryString.filterType !== undefined ? queryString.filterType : 'ALL';

    queryString.filterLang = filterLang
    queryString.filterType = filterType

    let courses_filtered = courses.courses.filter(course => {
      if (filterLang === 0) {
        if (filterType === 'ALL') {
          if (course.state === 'A') return false;
          else return true;
        } else {
          if (course.state === filterType) return true;
          else return false;
        }
      } else {
        if (filterType === 'ALL') {
          if (course.state === 'A') return false;
          else if (course.language_id === filterLang) return true;
        } else {
          if (course.state === filterType && course.language_id === filterLang) return true;
          else return false;
        }
      }
    });
    return <Courses {...this.props} courses={{ courses: [...courses_filtered] }} queryString={queryString} />
  }
}

CoursesWrapper.propTypes = {
  courses: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        author: PropTypes.string,
        price: PropTypes.string,
        image: PropTypes.image
      })
    )
  )
}

export default CoursesWrapper