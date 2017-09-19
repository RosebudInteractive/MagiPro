import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';
import { Route, Link, Redirect } from 'react-router-dom'
import { renderRoutes, matchRoutes } from 'react-router-config'
import colors from 'colors';

class DomainOrLocale extends React.PureComponent {
  constructor(props) {
    super(props);

    console.log('DomainOrLocale'.inverse)
    console.log(props);
  }
  render() {
    const { route, location, match, history, mRoute, routeObject } = this.props;
    console.log('DomainOrLocale=====================');
    console.log(mRoute);
    if (mRoute.route.reservedPath.locales.indexOf(mRoute.match.params.domain_or_locale.toUpperCase()) !== -1) {
      console.log('locale')
      routeObject.locale = mRoute.match.params.domain_or_locale;
      // return (
      //   <div>DomainOrLocale:locale:{mRoute.match.params.domain_or_locale}{renderRoutes(route.routes, { mRoute, routeObject, domain: [] })}</div>
      // )
    } else if (Object.keys(mRoute.match.params).length > 1) {
      console.log('domain')
      routeObject.domain = mRoute.match.params.domain_or_locale;
      // return (
      //   <div>DomainOrLocale:domain:{mRoute.match.params.domain_or_locale}{renderRoutes(route.routes, { mRoute, routeObject })}</div>
      // )
    } else {
      console.log('redirect');
      routeObject.redirect = mRoute.match.params.domain_or_locale;
      // return (
      //   <div>DomainOrLocale:redirect</div>
      // )
    }
    return (
      <Route exact to={location.pathname} render={() => renderRoutes(route.routes, {...this.props})} />
    )
  }
}


export default DomainOrLocale