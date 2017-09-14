import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CourseWrapper from '../components/CourseWrapper'
import * as CourseActions from '../actions/courses'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
    // intl: state.intl,
    // device: state.device
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(CourseActions, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseWrapper))