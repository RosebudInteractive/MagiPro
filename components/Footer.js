import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';

class Footer extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  //       <FormattedMessage id="app.greeting" defaultMessage="Hi there?" />

  render() {
    const { setInterfaceLang, currentLocale } = this.props;
    return (
      <div className="footer">
        <div className="layout-positioner clearfix">
          <div className="footer__language-picker">
            <span className="footer__language-picker-title">
            <FormattedMessage id='text.language' defaultMessage="Language" />
            </span>
            <ul>
              <li className={currentLocale === 'ru' ? "picked" : ''}>
                <a href="#" onClick={() => setInterfaceLang('ru')}><span>Русский</span></a>
              </li>
              <li className={currentLocale === 'en' ? "picked" : ''}>
                <a href="#" onClick={() => setInterfaceLang('en')}><span>English</span></a>
              </li>
              <li className={currentLocale === 'fr' ? "picked" : ''}>
                <a href="#" onClick={() => setInterfaceLang('fr')}><span>Français</span></a>
              </li>
            </ul>
          </div>
          <div className="footer__copyright"><span>2017— 2026.  Магистерия</span></div>
          <div className="footer__logo">
            <a href="/"></a>
          </div>
        </div>
      </div>
    )
  }
}



// Courses.propTypes = {
//   fetchCourses: PropTypes.func.isRequired,
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

export default Footer