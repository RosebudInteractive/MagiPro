import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import MenuLink, { MenuLinkLi } from './MenuLink';
import { renderRoutes } from 'react-router-config'
import { FormattedMessage } from 'react-intl';
import Footer from './Footer';
import colors from 'colors';

class Root extends React.Component {

  constructor(props) {
    super(props);

    console.log('ROOT'.inverse)
    console.log(props);

    let scrlY = 0;
    if (typeof process === 'object' && process + '' === '[object process]') {
      scrlY = 0;
    } else {
      scrlY = window.scrollY;
    }

    this.state = {
      scrollY: scrlY,
      // languageSelect: false,
      // languageSelectValue: 'ALL',
      // languages: {
      //   'ALL': { name: <FormattedMessage id="text.language.all" defaultMessage="All" />, id: 0 },
      //   'RU': { name: <FormattedMessage id="text.language.ru" defaultMessage="Russian" />, id: 1 },
      //   'EN': { name: <FormattedMessage id="text.language.en" defaultMessage="English" />, id: 2 }
      // }
    }
  }

  getLanguageText = (language) => {
    let langs = 0//;
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

  _getActiveLanguageText = () => {
    var nextId = 'text.language.all';
    if (this.props.activeLanguageId !== 0) {
      this.props.languages.map(language => {
        if (language.id === this.props.activeLanguageId) {
          nextId = 'text.language.' + language.code.toLowerCase();
        }
      })
    }
    return <FormattedMessage id={nextId} defaultMessage="All" />
  }

  _getLanguageOptions = () => {

    var langs = [];

    if (this.props.activeLanguageId !== 0) {
      langs.push(<li key={-1} onClick={() => this.props.setActiveLanguageId(0)}>
        <FormattedMessage id='text.language.all' defaultMessage="All" />
      </li>)
    }

    this.props.languages.map((language, idx) => {
      if (this.props.activeLanguageId !== language.id) {
        langs.push(<li key={idx} onClick={() => this.props.setActiveLanguageId(language.id)}>
          <FormattedMessage id={'text.language.' + language.code.toLowerCase()} defaultMessage={language.code} />
        </li>)
      }
    })

    return langs;
  }

  render() {
    var headerStyle = classNames({
      'header': true,
      '_fixed': this.state.scrollY > 0 ? true : false,
    })
    var selectStyle = classNames({
      'select-styled': true,
      'active': this.props.languageSelect,
    })
    // console.log('ROOT::::::')
    // console.log(this.props)

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
        <div className="main">
          <div className="filters">
            <div className="layout-positioner">
              <div className="filters__course">
                <FormattedMessage id="text.navigation.label" defaultMessage="Courses" /> <span>+</span>
              </div>
              <div className="filters__list-wrap clearfix">
                <ul className="filters__list clearfix">
                  <MenuLinkLi to="/courses" activeOnlyWhenExact={true} menuLabel={<FormattedMessage id="links.navigation.all" defaultMessage="All" />} />
                  <MenuLinkLi to="/courses/public" menuLabel={<FormattedMessage id="links.navigation.public" defaultMessage="Public" />} />
                  <MenuLinkLi to="/courses/draft" menuLabel={<FormattedMessage id="links.navigation.draft" defaultMessage="Draft" />} />
                  <li className="filters__item filter-select">
                    <div className="select" onClick={this.props.toggleLanguageSelect}>
                      <div className={selectStyle}>{this._getActiveLanguageText()}</div>
                      <ul className="select-options" style={{ display: this.props.languageSelect ? 'block' : 'none' }}>
                        {this._getLanguageOptions()}
                      </ul>
                    </div>
                  </li>
                </ul>
                <div className="filters__archive" onClick={() => this.props.history.push('/courses/archive')}></div>
              </div>
            </div>
          </div>
          {renderRoutes(this.props.route.routes, {
            ...this.props
          })}
        </div>
        <Footer changeLang={this.props.setInterfaceLang} />
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