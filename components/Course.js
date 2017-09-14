import React, { Component } from 'react'

import PropTypes from 'prop-types'
const colors = require('colors');
import classNames from 'classnames'

import { renderRoutes, matchRoutes } from 'react-router-config'

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabindex: 0, scrollDirection: 'UP', toggleSelectLessonId: 0 }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scrollY !== this.props.scrollY) {
      if (nextProps.scrollY > this.props.scrollY) this.setState({ scrollDirection: 'UP' })
      else this.setState({ scrollDirection: 'DOWN' })
    }
  }

  _getLessonStatus = (lessonId, status) => {

    var lessonSelectStyle = classNames({
      'js-select': true,
      'select-lesson': true,
      'select-hidden': true, //(status === 'P' || status === 'A') ? true : false,
      'public-lesson': status === 'P' ? true : false,
      'lesson-draft': status === 'D' ? true : false,
      'lesson-date': status === 'A' ? true : false,
    })

    var lessonSelectDivStyle = classNames({
      'select-styled': true,
      'active': lessonId === this.state.toggleSelectLessonId ? true : false
    })

    var lessonLockStyle = classNames({
      'lesson__lock': true,
      'locked': status === 'A' ? true : false,
    })

    return (
      <div className="lesson__status">
        <div className="select">
          <select className={lessonSelectStyle}>
          </select>
          <div className={lessonSelectDivStyle} onClick={() => this.setState({ toggleSelectLessonId: lessonId === this.state.toggleSelectLessonId ? 0 : lessonId })}>Закрытый</div>
          <ul className="select-options" style={{ display: lessonId === this.state.toggleSelectLessonId ? 'block' : 'none' }}>
            <li rel="public">Публичный</li>
            <li rel="private">Закрытый</li>
          </ul>
        </div>
        <div className={lessonLockStyle} tabindex="0">Lock</div>
      </div>
    )

    //   <div className="lesson__status">
    //   <select className="js-select select-lesson lesson-draft" id="lesson4">
    //     {/* <!-- <option value="hide">Статус урока</option> --> */}
    //     <option value="draft" selected>Черновик</option>
    //   </select>
    //   <div className="lesson__lock" tabindex="0">Lock</div>
    // </div>
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
              <h1 className="intro__title"><span>Классические техники игры на гитаре</span></h1>
            </div>
            <div className="intro__col _right">
              <div className="intro__authors">
                <h2><span>Авторы:</span></h2>
                <p><span>Борис Авокадов, Федор Позеленицкий, Марксим Первомайский</span></p>
              </div>
              <p className="intro__text"><span>Выбор слишком мелкого модуля приводит к тому, что размерные шаги становятся непринципиальными. Любой более-менее крупный элемент должен составляться из большого числа мелких модулей, в результате чего теряется визуальная связь размеров внутри композиции. Кроме того, чрезмерно расширяется выбор размеров, что приводит к чрезмерной индивидуализации композиции — то есть теряется основное достоинство сетки.</span></p>
            </div>
          </div>
        </div>
        <div className={tabControlsStyle} ref={(tabControls) => this.tabControls = tabControls}>
          <div className="layout-positioner clearfix">
            <div className="plus-btn show" tabindex="0" onClick={() => { console.log(this.tabControls.getBoundingClientRect()) }}><span>+</span></div>
            <ul className="tab-controls js-tab-controls">
              {/* className="current" */}
              <li onClick={() => this.setState({ tabindex: 0 })} className={this.state.tabindex === 0 ? 'current' : ''}><span>Уроки</span></li>
              <li onClick={() => this.setState({ tabindex: 1 })} className={this.state.tabindex === 1 ? 'current' : ''}><span>Доп.материалы</span></li>
              <li onClick={() => this.setState({ tabindex: 2 })} className={this.state.tabindex === 2 ? 'current' : ''}><span>Свойства</span></li>
              <li className="archive">
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
                <div className="lesson _drag">
                  <div className="layout-positioner">
                    <div className="lesson__drag">Drag</div>
                    <span className="lesson__number">1.</span>
                    <div className="lesson__play-block">
                      <div className="lesson__play" tabindex="0">Play</div>
                      <div className="lesson__duration"><span>43:07</span></div>
                    </div>
                    <div className="lesson__title">
                      <h3><span className="lesson__type">Лекция. </span><a href="#">Backend-разработка на PHP</a></h3>
                    </div>
                    {this._getLessonStatus(1, 'P')}
                  </div>
                </div>
                <div className="lesson">
                  <div className="layout-positioner">
                    <div className="lesson__drag">Drag</div>
                    <span className="lesson__number">2.</span>
                    <div className="lesson__play-block">
                      <div className="lesson__play" tabindex="0">Play</div>
                      <div className="lesson__duration">43:07</div>
                    </div>
                    <div className="lesson__title">
                      <h3><span className="lesson__type">Лекция. </span><a href="#">Управление финансовыми рисками</a></h3>
                    </div>
                    {this._getLessonStatus(2, 'A')}
                  </div>
                </div>
                <div className="lesson">
                  <div className="layout-positioner">
                    <div className="lesson__drag">Drag</div>
                    <span className="lesson__number">2.</span>
                    <div className="lesson__play-block">
                      <div className="lesson__play" tabindex="0">Play</div>
                      <div className="lesson__duration">43:07</div>
                    </div>
                    <div className="lesson__title">
                      <h3><span className="lesson__type">Лекция. </span><a href="#">Управление финансовыми рисками</a></h3>
                    </div>
                    {this._getLessonStatus(3, 'D')}
                  </div>
                </div>
                <div className="lesson">
                  <div className="layout-positioner">
                    <div className="lesson__drag">Drag</div>
                    <span className="lesson__number">3.</span>
                    <div className="lesson__play-block">
                      <div className="lesson__play" tabindex="0">Play</div>
                      <div className="lesson__duration">43:07</div>
                    </div>
                    <div className="lesson__title">
                      <h3><span className="lesson__type">Лекция. </span><a href="#">Backend-разработка на PHP</a></h3>
                    </div>
                    {this._getLessonStatus(4, 'P')}
                  </div>
                </div>
                <div className="lesson">
                  <div className="layout-positioner">
                    <div className="lesson__drag">Drag</div>
                    <span className="lesson__number">4.</span>
                    <div className="lesson__play-block">
                      <div className="lesson__play" tabindex="0">Play</div>
                      <div className="lesson__duration">43:07</div>
                    </div>
                    <div className="lesson__title">
                      <h3><span className="lesson__type">Лекция. </span><a href="#">Зачем государства помогают иностранным стартапам</a></h3>
                    </div>
                    {this._getLessonStatus(5, 'D')}
                  </div>
                </div>
              </div>
            </li>
            <li></li>
            <li className={this.state.tabindex === 1 ? 'current' : ''}>
              <form action="#" className="settings-form">
                <div className="settings">
                  <div className="layout-positioner">
                    <div className="settings-form__wrapper">
                      <div className="settings__col _left">
                        <div className="settings__col-row">
                          <div className="settings__image">
                            <input type="file" className="settings-form__upload" />
                            <div className="settings__image-wrapper">
                              <img src="../assets/images/bg-pre.png" alt="" />
                            </div>
                            <div className="settings__image-btn">...</div>
                          </div>
                          <div className="settings__image-name settings-form__field-wrapper">
                            <label for="image" className="settings-form__label">Картинка обложки</label>
                            <input type="text" id="image" className="settings-form__field" value="background.jpg" />
                            <div className="settings-form__delete">x</div>
                          </div>
                        </div>
                        <div className="settings__authors">
                          <p className="settings__authors-title">Автор(ы) курса</p>
                          <ul>
                            <li>
                              <span>Борис Авокадов</span>
                              <div className="settings-form__delete">x</div>
                            </li>
                            <li>
                              <span>Марксим Первомайский</span>
                              <div className="settings-form__delete">x</div>
                            </li>
                            <li>
                              <span>Федор Позеленицкий</span>
                              <div className="settings-form__delete">x</div>
                            </li>
                          </ul>
                          <p className="settings__add-author">+ Добавить автора</p>
                        </div>
                        <div className="settings-form__field-wrapper">
                          <label for="visibility" className="settings-form__label">Курс виден</label>
                          <select className="js-select" id="visibility">
                            <option value="hide">Всем</option>
                            <option value="visible">Всем</option>
                            <option value="private">Не всем</option>
                          </select>
                        </div>
                        <div className="settings-form__field-wrapper">
                          <label for="course-lang" className="settings-form__label">Язык курса</label>
                          <select className="js-select" id="course-lang">
                            <option value="ru">Русский</option>
                            <option value="en">Английский</option>
                          </select>
                        </div>
                      </div>
                      <div className="settings__col">
                        <div className="settings-form__field-wrapper empty">
                          <label for="title" className="settings-form__label">Название курса</label>
                          <input type="text" id="title" className="settings-form__field" placeholder="Название курса" />
                          <div className="settings-form__delete">x</div>
                        </div>
                        <div className="settings-form__field-wrapper">
                          <label for="description" className="settings-form__label">Описание</label>
                          <textarea id="description" className="settings-form__textarea">Выбор слишком мелкого модуля приводит к тому, что размерные шаги становятся непринципиальными. Любой более-менее крупный элемент должен составляться из большого числа мелких модулей, в результате чего теряется визуальная связь размеров внутри композиции. Кроме того, чрезмерно расширяется выбор размеров, что приводит к чрезмерной индивидуализации композиции — то есть теряется основное достоинство сетки.</textarea>
                        </div>
                        <div className="settings-form__field-wrapper">
                          <label for="course-status" className="settings-form__label">Статус</label>
                          <select className="js-select" id="course-status">
                            <option value="published">Опубликован</option>
                            <option value="inprocess">Публикуется</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="settings-form__btns">
                      <button className="btn btn--red btn-save"><span>Сохранить</span></button>
                      <input type="reset" className="btn btn-reset" value="Отмена" />
                    </div>
                  </div>
                </div>
              </form>
            </li>
            <li className={this.state.tabindex === 2 ? 'current' : ''}>
              <div className="lessons archive">
                <div className="lesson">
                  <div className="layout-positioner">
                    <div className="lesson__play-block">
                      <div className="lesson__play" tabindex="0">Play</div>
                      <div className="lesson__duration">43:07</div>
                    </div>
                    <div className="lesson__title">
                      <h3><span className="lesson__type">Лекция. </span><a href="#">Управление финансовыми рисками</a></h3>
                    </div>
                    <div className="lesson__status">
                      <div className="lesson__info">
                        <div className="lesson__reset"><span>Восстановить</span></div>
                        <p className="_status"><span>Архивирована</span></p>
                        <p className="date"><span>28 июля</span></p>
                        <p><span>2017</span></p>
                      </div>
                      <div className="lesson__del" tabindex="0">Удалить</div>
                    </div>
                  </div>
                </div>
                <div className="lesson">
                  <div className="layout-positioner">
                    <div className="lesson__play-block">
                      <div className="lesson__play" tabindex="0">Play</div>
                      <div className="lesson__duration">43:07</div>
                    </div>
                    <div className="lesson__title">
                      <h3><span className="lesson__type">Лекция. </span><a href="#">Управление финансовыми рисками</a></h3>
                    </div>
                    <div className="lesson__status">
                      <div className="lesson__info">
                        <div className="lesson__reset"><span>Восстановить</span></div>
                        <p className="_status"><span>Архивирована</span></p>
                        <p className="date"><span>28 июля</span></p>
                        <p><span>2017</span></p>
                      </div>
                      <div className="lesson__del" tabindex="0">Удалить</div>
                    </div>
                  </div>
                </div>
                <div className="lesson">
                  <div className="layout-positioner">
                    <div className="lesson__play-block">
                      <div className="lesson__play" tabindex="0">Play</div>
                      <div className="lesson__duration">43:07</div>
                    </div>
                    <div className="lesson__title">
                      <h3><span className="lesson__type">Лекция. </span><a href="#">Управление финансовыми рисками</a></h3>
                    </div>
                    <div className="lesson__status">
                      <div className="lesson__info">
                        <div className="lesson__reset"><span>Восстановить</span></div>
                        <p className="_status"><span>Архивирована</span></p>
                        <p className="date"><span>28 июля</span></p>
                        <p><span>2017</span></p>
                      </div>
                      <div className="lesson__del" tabindex="0">Удалить</div>
                    </div>
                  </div>
                </div>
                <div className="lesson">
                  <div className="layout-positioner">
                    <div className="lesson__play-block">
                      <div className="lesson__play" tabindex="0">Play</div>
                      <div className="lesson__duration">43:07</div>
                    </div>
                    <div className="lesson__title">
                      <h3><span className="lesson__type">Лекция. </span><a href="#">Управление финансовыми рисками</a></h3>
                    </div>
                    <div className="lesson__status">
                      <div className="lesson__info">
                        <div className="lesson__reset"><span>Восстановить</span></div>
                        <p className="_status"><span>Архивирована</span></p>
                        <p className="date"><span>28 июля</span></p>
                        <p><span>2017</span></p>
                      </div>
                      <div className="lesson__del" tabindex="0">Удалить</div>
                    </div>
                  </div>
                </div>
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