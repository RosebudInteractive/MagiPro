import React, { Component } from 'react'

import PropTypes from 'prop-types'
const colors = require('colors');

import { renderRoutes, matchRoutes } from 'react-router-config'

class ParticipantsWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { route, activeLanguageId, intl } = this.props
    return <div>{renderRoutes(route.routes, { intl, activeLanguageId })}</div>
  }
}

// ParticipantsWrapper.propTypes = {
//   fetchCourses: PropTypes.func.isRequired,
//   setCourseState: PropTypes.func.isRequired,
//   courses: PropTypes.objectOf(
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

export default ParticipantsWrapper