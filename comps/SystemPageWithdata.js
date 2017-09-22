import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';
import { Route, Link, Redirect } from 'react-router-dom'
import { renderRoutes, matchRoutes } from 'react-router-config'
import colors from 'colors';

class SystemPageWithdata extends React.PureComponent {
  constructor(props) {
    super(props);

    console.log('SystemPageWithdata'.inverse)
    console.log(props);
  }
  render() {
    // const { route, location, match, history, mRoute, routeObject } = this.props;
    console.log('SystemPageWithdata=====================')
    return (
      <div>SystemPageWithdata</div>
    )
    // console.log(mRoute);
    // if (mRoute.route.reservedPath.locales.indexOf(mRoute.match.params.system_page_or_locale.toUpperCase()) !== -1) {
    //   console.log('locale')
    //   routeObject.locale = mRoute.match.params.system_page_or_locale;
    //   // return (
    //   //   <div>SystemPageOrLocale:locale:{mRoute.match.params.system_page_or_locale}{renderRoutes(route.routes, { mRoute, routeObject })}</div>
    //   // )
    // } else if (mRoute.route.reservedPath.systemNames.indexOf(mRoute.match.params.system_page_or_locale.toUpperCase()) !== -1) {
    //   console.log('system page')
    //   return (
    //     <div>SystemPageOrLocale:system page:{mRoute.match.params.system_page_or_locale}{renderRoutes(route.routes, { mRoute, routeObject })}</div>
    //   )
    // } else if (routeObject.domain) {
    //   console.log('redirect')
    //   // return (
    //   //   <div>SystemPageOrLocale:redirect</div>
    //   // )
    // } else {
    //   console.log('coursename')
    // }
    // return (
    //   <Route exact to={location.pathname} render={() => renderRoutes(route.routes, { ...this.props })} />
    // )
  }
}


export default SystemPageWithdata