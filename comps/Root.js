import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import MenuLink, { MenuLinkLi } from './MenuLink';
import { FormattedMessage } from 'react-intl';
import Footer from './Footer';
import colors from 'colors';
import { renderRoutes, matchRoutes } from 'react-router-config'

class Root extends React.Component {

  constructor(props) {
    super(props);

    console.log('ROOT'.inverse)
    console.log(props);

    //TODO MOVE HEADER TO DEDICATED COMPONENT
    let scrlY = 0;
    if (typeof process === 'object' && process + '' === '[object process]') {
      scrlY = 0;
    } else {
      scrlY = window.scrollY;
    }

    // this.mRoutes = matchRoutes(this.props.route.routes, this.props.location.pathname);
    this.routeObject = {};

    this.state = {
      scrollY: scrlY,
    }
  }

  scrollListener = (e) => {
    if (window) this.setState({ scrollY: window.scrollY })
  }

  componentDidMount() {
    if (window) {
      (function (scrollListener) {
        window.addEventListener('scroll', scrollListener, false)
      })(this.scrollListener)
      this.setState({ scrollY: window.scrollY })
    }
  }

  componentWillUnmount() {
    if (window) {
      (function (scrollListener) {
        window.removeEventListener('scroll', scrollListener, false)
      })(this.scrollListener)
    }
  }

  // toggleSelect = (e) => {
  //   this.setState({languageSelect: !this.state.languageSelect});
  // }

  //   var routeObject = {};


  render() {
    var headerStyle = classNames({
      'header': true,
      '_fixed': this.state.scrollY > 0 ? true : false,
    })
    // console.log('ROOT::::::')
    // console.log(this.props)
    const mRoutes = matchRoutes(this.props.route.routes, this.props.location.pathname);

    return (
      <div className="global-wrapper">
        <div className={headerStyle}>
          <div className="layout-positioner clearfix">
            <div className="header__nav">
              <div className="header__logo">
                <a href="/"></a>
              </div>
              <div className="header__menu">
                <ul>
                  <li><MenuLink to="/courses/" menuLabel={<FormattedMessage id="links.header.courses" defaultMessage="Courses" />} /></li>
                  <li><MenuLink to="/participants" menuLabel={<FormattedMessage id="links.header.participants" defaultMessage="Participants" />} /></li>
                </ul>
              </div>
              <div className="header__profile">
                <div className="header__profile-name">
                  <div className="name-inner">
                    <span>Алексей Константинопольский</span>
                  </div>
                </div>
                <div className="header__profile-avatar">
                  <img src="/assets/images/avatar.png" alt="" />
                </div>
                <div className="header__profile-menu">
                  <ul>
                    <li><FormattedMessage id="text.headers.profile.settings" defaultMessage="Settings" /></li>
                    <li className="_exit"><FormattedMessage id="text.headers.profile.exit" defaultMessage="Settings" /></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* main */}
        {renderRoutes(this.props.route.routes, {
          ...this.props,
          scrollY: this.state.scrollY,
          mRoute: mRoutes[mRoutes.length - 1],
          routeObject: this.routeObject,
          languages: this.props.languages
        })}
        <Footer setInterfaceLang={this.props.setInterfaceLang} currentLocale={this.props.intl.locale} />
      </div>
    )
  }
}

// activeLanguageId: this.props.activeLanguageId,
// account: {
//   leadingCourse: this.props.account.leadingCourse,
//   visCourses: this.props.account.visCourses,
//   visShowcase: this.props.account.visShowcase,
//   id: this.props.account.id
// }
Root.propTypes = {
  setInterfaceLang: PropTypes.func.isRequired,
  setActiveLanguageId: PropTypes.func.isRequired,
  toggleLanguageSelect: PropTypes.func.isRequired
}

export default Root