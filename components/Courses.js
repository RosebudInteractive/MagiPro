import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';

var colors = require('colors')
class Courses extends React.PureComponent {
  constructor(props) {
    super(props);
    // console.log('Courses:::::'.inverse)
    // console.log(props);
    this.state = {
      contextMenuCourse: 0
    };
  }

  _handleContextMenu = (e, course) => {
    e.preventDefault();
    this.setState({ contextMenuCourse: this.state.contextMenuCourse === 0 ? course.id : 0 });
    return false;
  }

  _getContextMenuPosition = () => {
    var windowScrollY = window ? window.scrollY : 0;
    // console.log(windowScrollY)
    return {
      top: (this.state.contextMenuPos.y + windowScrollY) + 'px',
      left: this.state.contextMenuPos.x + 'px'
    }
  }

  _getCourseAuthors = (course) => {
    let authors = '';
    course.authors.map((author, idx) => {
      author.AuthorIntl.map((author_intl, idx2) => {
        if (author_intl.translation_language_id === course.language_id) {
          authors += idx2 === 0 ? '' : ', ';
          authors += author_intl.firstName + ' ' + author_intl.lastName
        }
      })
    });
    return authors;
  }

  //       <FormattedMessage id="app.greeting" defaultMessage="Hi there?" />
  _setCourseState(id, state) {
    this.setState({ contextMenuCourse: 0 });
    fetch('/api/course/' + id, {
      method: 'post',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        state
      })
    }).then(course => {
      this.props.setCourseState(id, state)
      console.log(course)
    });
  }

  _setLeadingCourse = (accountId, courseId) =>{
    console.log('_setLeadingCourse ' + accountId + ' : ' + courseId);
    fetch('/api/course/main', {
      method: 'post',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ accountId, courseId })
    }).then(account => {
      console.log('_setLeadingCourse: ' + accountId + ' : ' + courseId);
      console.log(account)
    });
  }

  render() {
    const { courses, account } = this.props
    // console.log('Courses:')
    // console.log(this.props);
    return (
      <div className="courses">
        <div className="layout-positioner">
          {courses.courses.map((course, idx) => (
            <div key={idx} className="courses__course js-course" onContextMenu={(e) => this._handleContextMenu(e, course)}>
              <div className="courses__course-img">
                <img src={'/static/images' + course.cover} alt="" />
                {course.state === 'P' ? (
                  <div className="watch">
                    <span>
                      {course.id === account.leadingCourse ? '#1' : ''}
                    </span>
                  </div>
                ) : ''}
              </div>
              <div className="courses__course-descr">{course.name}
                <span className="author">
                  {this._getCourseAuthors(course)}
                </span>
              </div>
              <div className="courses__course-price">{course.price}</div>
              {this.state.contextMenuCourse === course.id ? (
                <div className="courses__course-context js-context show">
                  <ul>
                    <li className="_num" onClick={() => this._setLeadingCourse(account.id, course.id)}><span>#1</span> <FormattedMessage id="text.contextMenu.main" defaultMessage="Main" /></li>
                    <li onClick={() => this._setLeadingCourse(account.id, course.id)}><FormattedMessage id="text.contextMenu.copy" defaultMessage="Copy" /></li>
                    {course.state === 'D' ? (
                      <li className="_public" onClick={() => this._setCourseState(course.id, 'P')}><FormattedMessage id="text.contextMenu.publish" defaultMessage="Publish" /></li>
                    ) : ''}
                    {course.state !== 'D' ? (
                      <li className="_public" onClick={() => this._setCourseState(course.id, 'D')}><FormattedMessage id="text.contextMenu.draft" defaultMessage="Draft" /></li>
                    ) : ''}
                    <li><FormattedMessage id="text.contextMenu.preview" defaultMessage="Preview" /></li>
                    <li className="_archive" onClick={() => this._setCourseState(course.id, 'A')}><FormattedMessage id="text.contextMenu.archive" defaultMessage="Archive" /></li>
                  </ul>
                </div>
              ) : ('')}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

Courses.propTypes = {
  fetchCourses2: PropTypes.func.isRequired,
  setCourseState: PropTypes.func.isRequired,
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

export default Courses