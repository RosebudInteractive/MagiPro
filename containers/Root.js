import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Root from '../components/Root'
import * as RootActions from '../actions/root'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => {
  return {
    intl: state.intl,
    device: state.device,
    account: state.root.account,
    ...(state.root)
    // languages: state.root.languages,
    // languageSelect: state.root.languageSelect,

  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(RootActions, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root))
