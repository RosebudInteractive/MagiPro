import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames'

class Dropdown_1_Course extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      currentOption: this.props.currentDropdownOption
    };
  }

  _handleClick = (option) => {
    this.setState({ currentOption: option, open: false })
  }

  //       <FormattedMessage id="app.greeting" defaultMessage="Hi there?" />

  render() {
    const { dropdownOptions, callback, labelIntlId, labelIntlDefaul } = this.props;
    var selectStyle = classNames({
      'select-styled': true,
      'active': this.state.open,
    })

    const currentOptionText = <FormattedMessage id={dropdownOptions[this.state.currentOption]} defaultMessage="" />

    return (
      <div className="settings-form__field-wrapper">
        <label htmlFor="visibility" className="settings-form__label">
          <FormattedMessage id={labelIntlId} defaultMessage={labelIntlDefaul} />
        </label>
        <div className="select" onClick={() => this.setState({ open: !this.state.open })}>
          <div className={selectStyle}>{currentOptionText}</div>
          <ul className="select-options" style={{ 'display': this.state.open ? 'block' : 'none' }}>
            {Object.keys(dropdownOptions).map((option, idx) => (
              <li key={idx} onClick={() => this._handleClick(option)} className="">
                <FormattedMessage id={dropdownOptions[option]} defaultMessage={dropdownOptions[option]} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Dropdown_1_Course