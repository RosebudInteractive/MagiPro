import React, { Component } from 'react'

import PropTypes from 'prop-types'
const colors = require('colors');
import classNames from 'classnames'

import { renderRoutes, matchRoutes } from 'react-router-config'
import { FormattedMessage } from 'react-intl';
import Dropdown_1_Course from './Dropdown_1_Course';

class Course extends React.Component {
  constructor(props) {
    super(props);

    //TODO MOVE TO REDUX STATE
    this.state = { tabindex: 0, scrollDirection: 'UP', toggleSelectLessonId: 0 }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scrollY !== this.props.scrollY) {
      if (nextProps.scrollY > this.props.scrollY) this.setState({ scrollDirection: 'UP' })
      else this.setState({ scrollDirection: 'DOWN' })
    }
  }

  _getLessonStatus = (lesson) => {

    var lessonSelectStyle = classNames({
      'js-select': true,
      'select-lesson': true,
      'select-hidden': true, //(status === 'P' || status === 'A') ? true : false,
      'public-lesson': lesson.state === 'P' ? true : false,
      'lesson-draft': lesson.state === 'D' ? true : false,
      'lesson-date': lesson.state === 'A' ? true : false,
    })

    var lessonSelectDivStyle = classNames({
      'select-styled': true,
      'active': lesson.id === this.state.toggleSelectLessonId ? true : false
    })

    var lessonLockStyle = classNames({
      'lesson__lock': true,
      'locked': lesson.state === 'A' ? true : false,
    })

    return (
      <div className="lesson__status">
        <div className="select">
          <select className={lessonSelectStyle}>
          </select>
          <div className={lessonSelectDivStyle} onClick={() => this.setState({ toggleSelectLessonId: lesson.id === this.state.toggleSelectLessonId ? 0 : lesson.id })}>
            <FormattedMessage id={this._getTextStatus(lesson.state)} />
          </div>
          <ul className="select-options" style={{ display: lesson.id === this.state.toggleSelectLessonId ? 'block' : 'none' }}>
            <li><FormattedMessage id={this._getTextStatus('A')} defaultMessage="Archive" /></li>
            <li><FormattedMessage id={this._getTextStatus('D')} defaultMessage="Draft" /></li>
            <li><FormattedMessage id={this._getTextStatus('P')} defaultMessage="Public" /></li>
          </ul>
        </div>
        <div className={lessonLockStyle} tabIndex="0">Lock</div>
      </div>
    )
  }

  _getTextStatus = (status) => {
    if (status === 'A') {
      return 'course.tab.properties.dropdown.status.a'
    }
    if (status === 'D') {
      return 'course.tab.properties.dropdown.status.d'
    }
    if (status === 'P') {
      return 'course.tab.properties.dropdown.status.p'
    }
    return null
  }

  _getCourseAuthors = (course) => {
    let authors = []
    course.authors.map((author, idx) => {
      author.AuthorIntl.map(a_intl => {
        if (a_intl.translation_language_id === course.language_id) {
          authors.push(<li key={idx}>
            <span>{a_intl.firstName + ' ' + a_intl.lastName}</span>
            <div className="settings-form__delete">x</div>
          </li>)
        }
      })
    })
    return authors;
  }

  _getHeadCourseAuthors = (course) => {
    let authors = ''
    course.authors.map((author, idx) => {
      author.AuthorIntl.map(a_intl => {
        if (a_intl.translation_language_id === course.language_id) {
          if (idx !== 0) authors += ", "
          authors += a_intl.firstName + ' ' + a_intl.lastName;
        }
      })
    })
    return authors;
  }

  render() {
    let _fixed = false;
    if (this.tabs && this.props.scrollY > this.tabs.offsetTop - 84 - (this.state.scrollDirection === 'UP' ? 72 : 20)) _fixed = true;
    var tabControlsStyle = classNames({
      'tab-controls-wrap': true,
      'js-tab-controls-wrap': true,
      '_fixed': _fixed,
    })

    return (
      <div className="main">
        <div className="intro">
          <div className="layout-positioner clearfix">
            <div className="intro__col">
              <h1 className="intro__title"><span>{this.props.course.name}</span></h1>
            </div>
            <div className="intro__col _right">
              <div className="intro__authors">
                <h2>
                  <FormattedMessage id="course.tab.properties.courseAuthorsLabel" defaultMessage="Author" values={{ authorCount: this.props.course.authors.length }} />
                </h2>
                <p><span>{this._getHeadCourseAuthors(this.props.course)}</span></p>
              </div>
              <p className="intro__text"><span>{this.props.course.description}</span></p>
            </div>
          </div>
        </div>
        <div className={tabControlsStyle} ref={(tabControls) => this.tabControls = tabControls}>
          <div className="layout-positioner clearfix">
            <div className="plus-btn show" tabIndex="0" onClick={() => { console.log(this.tabControls.getBoundingClientRect()) }}><span>+</span></div>
            <ul className="tab-controls js-tab-controls">
              {/* className="current" */}
              <li onClick={() => this.setState({ tabindex: 0 })} className={this.state.tabindex === 0 ? 'current' : ''}>
                <FormattedMessage id="course.tabs.lessons" defaultMessage="Lessons" />
              </li>
              <li onClick={() => this.setState({ tabindex: 1 })} className={this.state.tabindex === 1 ? 'current' : ''}>
                <FormattedMessage id="course.tabs.materials" defaultMessage="Additional materials" />
              </li>
              <li onClick={() => this.setState({ tabindex: 2 })} className={this.state.tabindex === 2 ? 'current' : ''}>
                <FormattedMessage id="course.tabs.properties" defaultMessage="Properties" />
              </li>
              <li onClick={() => this.setState({ tabindex: 3 })} className="archive">
                <svg width="20" height="20" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <title>Trash 2</title>
                  <desc>Created using Figma</desc>
                  <g id="Canvas" transform="translate(6863 3226)">
                    <g id="Trash 2">
                      <g id="Archive">
                        <g id="Vector">
                          <use xlinkHref="#path0_fill" transform="translate(-6862 -3225)" />
                        </g>
                        <g id="Vector">
                          <use xlinkHref="#path1_fill" transform="translate(-6861 -3221)" />
                        </g>
                      </g>
                    </g>
                  </g>
                  <defs>
                    <path id="path0_fill" d="M 18 3L 0 3L 0 2C 0 0.9 0.9 0 2 0L 16 0C 17.1 0 18 0.9 18 2L 18 3Z" />
                    <path id="path1_fill" d="M 0 0L 0 12C 0 13.1 0.9 14 2 14L 14 14C 15.1 14 16 13.1 16 12L 16 0L 0 0ZM 10 6L 6 6C 4.9 6 4 5.325 4 4.5C 4 3.675 4.9 3 6 3L 10 3C 11.1 3 12 3.675 12 4.5C 12 5.325 11.1 6 10 6Z" />
                  </defs>
                </svg>
              </li>
            </ul>
          </div>
        </div>
        <div className="tabs-wrap" ref={(tabs) => this.tabs = tabs}>
          <ul className="tabs js-tabs">
            <li className={this.state.tabindex === 0 ? 'current' : ''}>
              <div className="lessons">
                {this.props.course.lessons.map((lesson, idx) => (
                  <div key={idx} className="lesson">
                    <div className="layout-positioner">
                      <div className="lesson__drag">Drag</div>
                      <span className="lesson__number">{lesson.lessonToCourse.orderNum}</span>
                      <div className="lesson__play-block">
                        <div className="lesson__play" tabIndex="0">Play</div>
                        <div className="lesson__duration"><span>43:07</span></div>
                      </div>
                      <div className="lesson__title">
                        <h3><span className="lesson__type"><FormattedMessage id="course.tab.lessons.label.lection" defaultMessage="Lection" />. </span>
                          <a>{lesson.name}</a>
                        </h3>
                      </div>
                      {this._getLessonStatus(lesson)}
                    </div>
                  </div>
                ))}
              </div>
            </li>
            <li className={this.state.tabindex === 1 ? 'current' : ''}></li>
            <li className={this.state.tabindex === 2 ? 'current' : ''}>
              <form action="#" className="settings-form">
                <div className="settings">
                  <div className="layout-positioner">
                    <div className="settings-form__wrapper">
                      <div className="settings__col _left">
                        <div className="settings__col-row">
                          <div className="settings__image">
                            <input type="file" className="settings-form__upload" />
                            <div className="settings__image-wrapper">
                              <img src="/assets/images/bg-pre.png" alt="" />
                            </div>
                            <div className="settings__image-btn">...</div>
                          </div>
                          <div className="settings__image-name settings-form__field-wrapper">
                            <label htmlFor="image" className="settings-form__label">
                              <FormattedMessage id="course.tab.properties.courseCover" defaultMessage="Cover" />
                            </label>
                            <input type="text" id="image" className="settings-form__field" value="background.jpg" />
                            <div className="settings-form__delete">x</div>
                          </div>
                        </div>
                        <div className="settings__authors">
                          <p className="settings__authors-title">
                            <FormattedMessage id="course.tab.properties.courseAuthors" defaultMessage={'Course author'} values={{ authorCount: this.props.course.authors.length }} />
                          </p>
                          <ul>
                            {this._getCourseAuthors(this.props.course)}
                          </ul>
                          <p className="settings__add-author">+ <FormattedMessage id="course.tab.properties.button.addAuthor" defaultMessage="Add author" /></p>
                        </div>

                        <Dropdown_1_Course dropdownOptions={{
                          'A': 'course.tab.properties.dropdown.visible.a',
                          'U': 'course.tab.properties.dropdown.visible.u',
                          'R': 'course.tab.properties.dropdown.visible.r'
                        }}
                          currentDropdownOption={'A'}
                          callback={null}
                          labelIntlId={'course.tab.properties.dropdown.visible.label'}
                          labelIntlDefault={'Course is visible'} />
                        <Dropdown_1_Course dropdownOptions={{
                          'ALL': 'text.language.all',
                          'RU': 'text.language.ru',
                          'EN': 'text.language.en',
                          'FR': 'text.language.fr'
                        }}
                          currentDropdownOption={'ALL'}
                          callback={null}
                          labelIntlId={'course.tab.properties.dropdown.language.label'}
                          labelIntlDefault={'Course Language'} />
                      </div>
                      <div className="settings__col">
                        <div className="settings-form__field-wrapper empty">
                          <label htmlFor="title" className="settings-form__label">Название курса</label>
                          <input type="text" id="title" className="settings-form__field" placeholder="Название курса" value={this.props.course.name} />
                          <div className="settings-form__delete">x</div>
                        </div>
                        <div className="settings-form__field-wrapper">
                          <label htmlFor="description" className="settings-form__label">
                            <FormattedMessage id="course.tab.properties.courseDescription" defaultMessage="Description" />
                          </label>
                          <textarea id="description" className="settings-form__textarea" defaultValue={this.props.course.description}></textarea>
                        </div>
                        <Dropdown_1_Course dropdownOptions={{
                          'A': 'course.tab.properties.dropdown.status.a',
                          'D': 'course.tab.properties.dropdown.status.d',
                          'P': 'course.tab.properties.dropdown.status.p',
                        }}
                          currentDropdownOption={'A'}
                          callback={null}
                          labelIntlId={'course.tab.properties.dropdown.status.label'}
                          labelIntlDefault={'Status'} />
                      </div>
                    </div>
                    <div className="settings-form__btns">
                      <button className="btn btn--red btn-save">
                        <FormattedMessage id="course.tab.properties.button.save" defaultMessage="Save" />
                      </button>
                      <input type="reset" className="btn btn-reset" value="Отмена" />
                    </div>
                  </div>
                </div>
              </form>
            </li>
            <li className={this.state.tabindex === 3 ? 'current' : ''}>
              <div className="lessons archive">
                {this.props.course.lessons.map((lesson, idx) => {

                  if (lesson.state === 'A') {
                    return (
                      <div key={idx} className="lesson">
                        <div className="layout-positioner">
                          <div className="lesson__play-block">
                            <div className="lesson__play" tabIndex="0">Play</div>
                            <div className="lesson__duration">43:07</div>
                          </div>
                          <div className="lesson__title">
                            <h3>
                              <span className="lesson__type">
                                <FormattedMessage id="course.tab.lessons.label.lection" defaultMessage="Lection" />.
                              </span>
                              <a>{lesson.name}</a>
                            </h3>
                          </div>
                          <div className="lesson__status">
                            <div className="lesson__info">
                              <div className="lesson__reset">
                                <FormattedMessage id="course.tab.lessons.label.restore" defaultMessage="Restore" />
                              </div>
                              <p className="_status">
                                <FormattedMessage id="course.tab.lessons.label.archived" defaultMessage="Archived" />
                              </p>
                              <p className="date"><span>28 июля</span></p>
                              <p><span>2017</span></p>
                            </div>
                            <div className="lesson__del" tabIndex="0">
                              <FormattedMessage id="course.tab.lessons.label.remove" defaultMessage="Remove" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

// CoursesWrapper.propTypes = {
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

export default Course