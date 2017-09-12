import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CoursesWrapper from '../components/CoursesWrapper'
import * as CoursesActions from '../actions/courses'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
    intl: state.intl,
    device: state.device
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(CoursesActions, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoursesWrapper))