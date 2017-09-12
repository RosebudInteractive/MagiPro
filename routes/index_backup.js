import React from 'react'
import { Route, Link } from 'react-router-dom'

import App from '../containers/App';

const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => {
    // pass the sub-routes down to keep nesting
    // console.log('routes:::::::');
    // console.log(route.routes);
    return <route.component {...props} routes={route.routes}/>
  }}/>
)
const Home = ({ match }) => {
  // console.log('Home:match: ' + match.url);
  return (
    <div>
      <h2>Home</h2>
    </div>
  )
}

const About = ({ match }) => {
  // console.log('about:match: ' + match.url);
  return (
    <div>
      <h2>About</h2>
    </div>
  )
}

const Topic = ({ match }) => {
  // console.log('match:::: ' + match.url)
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  )
}

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Navigation = ({ match, routes }) => {
  // console.log("routes=========")
  // console.log(routes);
  // console.log('match=====')
  // console.log(match);
  return (
    <div>Navigation
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/app" component={App} />
      <Route path="/topics" component={Topics} />
    </div>
  )
};

const routes = [
  { component: Navigation,
    routes: [
      { path: '/',
        component: Home
      },
      { path: '/about',
        component: About
      },
      { path: '/app',
        component: App
      },
      { path: '/topics/:id',
        component: Topics,
        // routes: [
        //   { path: '//:id/grand-child',
        //     component: GrandChild
        //   }
        // ]
      }
    ]
  }
]

module.exports = routes;