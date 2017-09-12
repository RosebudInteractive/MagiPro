import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'

class PendingNavDataLoader extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log('PendingNavDataLoader'.inverse);
    console.log(props);
    this.state = {
      previousLocation: null
    }
  }

  componentWillReceiveProps(nextProps) {
    const navigated = nextProps.location !== this.props.location
    const { routes, store } = this.props

    if (navigated) {
      // save the location so we can render the old screen
      this.setState({
        previousLocation: this.props.location
      })

      // load data while the old screen remains
      // console.log('loadNextData: ');
      // console.log(this.props);
      // console.log(nextProps.location);

      const loadBranchData = (location) => {
        const branch = matchRoutes(routes, location)
        const promises = branch.map(({ route, match }) => {
          return route.loadData
            // ? route.loadData(match)
            ? route.loadData(store.dispatch)
            : Promise.resolve(null)
        })
        return Promise.all(promises)
      }

      loadBranchData(nextProps.location.pathname).then(data => {
        console.log('data==');
        console.log(data);
        this.setState({
          previousLocation: null
        })
      })

      // loadNextData(routes, nextProps.location).then((data) => {
      //   putTheDataSomewhereRoutesCanFindIt(data)
      //   // clear previousLocation so the next screen renders
      //   this.setState({
      //     previousLocation: null
      //   })
      // })
    }
  }

  render() {
    const { children, location } = this.props
    const { previousLocation } = this.state
    
    // use a controlled <Route> to trick all descendants into 
    // rendering the old location
    return (
      <Route 
        location={previousLocation || location} 
        render={() => children}
      />
    )
  }
}


export default withRouter(PendingNavDataLoader)