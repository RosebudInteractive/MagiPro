import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';

class Footer extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  //       <FormattedMessage id="app.greeting" defaultMessage="Hi there?" />

  render() {
    const { changeLang } = this.props;
    return (
      <div className="footer">
        <div className="layout-positioner clearfix">
          <div className="footer__copyright">2017— 2026.  Магистерия | <button onClick={() => changeLang('ru')}>ru</button> | <button onClick={() => changeLang('en')}>en</button> | <button onClick={() => changeLang('fr')}>fr</button></div>
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