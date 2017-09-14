import React, { Component } from 'react'

import PropTypes from 'prop-types'
const colors = require('colors');

import { renderRoutes, matchRoutes } from 'react-router-config'

class CourseWrapper extends React.Component {
  constructor(props) {
    super(props);
    // console.log('CoursesWrapper')
    // console.log(props);
  }
  render() {
    const { courses, route, location, activeLanguageId, scrollY } = this.props
    // const matchedRoute = matchRoutes(route.routes, location.pathname);

    // if (matchedRoute.length > 0) {
    //   let filter = matchedRoute[0].route.filterData();
    //   let courses_filtered = courses.courses.filter(course => {

    //     if (activeLanguageId === 0) {
    //       if (filter === 'ALL') {
    //         if (course.state === 'A') return false;
    //         else return true;
    //       } else {
    //         if (course.state === filter) return true;
    //         else return false;
    //       }
    //     } else {
    //       if (filter === 'ALL') {
    //         if (course.state === 'A') return false;
    //         else if (course.language_id === activeLanguageId) return true;
    //       } else {
    //         if (course.state === filter && course.language_id === activeLanguageId) return true;
    //         else return false;
    //       }
    //     }

    //   });
    //   return <div>{renderRoutes(route.routes, { ...this.props, courses: { courses:[...courses_filtered]} })}</div>
    // } else {
    return (
      <div>
        {renderRoutes(route.routes, { ...this.props, scrollY })}
      </div>
    )
    // }
  }
}

// CourseWrapper.propTypes = {
//   course: PropTypes.objectOf(
//     PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number,
//         name: PropTypes.string,
//         author: PropTypes.string,
//         price: PropTypes.string,
//         image: PropTypes.image
//       })
//     )
//   )
// }

export default CourseWrapper