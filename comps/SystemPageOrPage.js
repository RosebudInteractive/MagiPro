import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';
import { Route, Link, Redirect } from 'react-router-dom'
import { renderRoutes, matchRoutes } from 'react-router-config'
import colors from 'colors';

import CoursesWrapper from '../containers/CoursesWrapper';

class SystemPageOrPage extends React.PureComponent {
  constructor(props) {
    super(props);

    console.log('SystemPageOrPage'.inverse)
    console.log(props);
  }
  render() {
    const { route, location, match, history, mRoute, routeObject } = this.props
    console.log('SystemPageOrPage=====================')
    console.log(mRoute);
    if (mRoute.route.reservedPath.systemNames.indexOf(mRoute.match.params.system_page_or_page.toUpperCase()) !== -1) {
      if (mRoute.match.params.system_page_or_page.toUpperCase() === 'COURSES') {
        return (
          <CoursesWrapper {...this.props} />
        )
      }
      if (mRoute.match.params.system_page_or_page.toUpperCase() === 'COURSE') {
        return (
          <div>COURSE
            {renderRoutes(route.routes, { ...this.props })}
          </div>
        )
      }
      return (
        <div>SystemPageOrPage:system page:{mRoute.match.params.system_page_or_page}{renderRoutes(route.routes, { mRoute, routeObject })}</div>
      )
    } else {
      console.log('page(coursename)')
      // return (
      //   <Route exact to={location.pathname} render={() => renderRoutes(route.routes, { mRoute, routeObject })} />
      // )
    }
    return (
      <Route exact to={location.pathname} render={() => renderRoutes(route.routes, { mRoute, routeObject })} />
    )
  }
}


export default SystemPageOrPage