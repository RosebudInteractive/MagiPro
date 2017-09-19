import React from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import { renderRoutes, matchRoutes } from 'react-router-config'
// import { set as setCounter, increment, decrement, incrementAsync } from '../actions';
// import { fetchCourses2, setCourses } from '../actions/courses'
// import { fetchParticipants } from '../actions/participants'
// import { fetchAccount } from '../actions/root'
import fetch from 'isomorphic-fetch';
import queryString from 'query-string';

// import Root from '../conts/Root';
// import CourseWrapper from '../containers/CourseWrapper'
// import CoursesWrapper from '../containers/CoursesWrapper';
// import Participants from '../components/Participants'
// import ParticipantsWrapper from '../components/ParticipantsWrapper'
// import Course from '../components/Course';
// import Courses from '../components/Courses';


const Home = ({ route }) => (
  <div>
    <h2>Home</h2>
  </div>
)

// const Child = ({ route }) => (
//   <div>
//     <h2>Child</h2>
//     {/* child routes won't render without this */}
//     {renderRoutes(route.routes, { someProp: 'these extra props are optional' })}
//   </div>
// )

// const GrandChild = ({ someProp }) => (
//   <div>
//     <h3>Grand Child</h3>
//     <div>{someProp}</div>
//   </div>
// )

// const Wrapper = ({ route }) => (
//   <div>
//     {renderRoutes(route.routes, { someProp: 'these extra props are optional' })}
//   </div>
// )

// const CoursesWrapper = ({ route }) => (
//   <div>
//     {renderRoutes(route.routes, { someProp: 'these extra props are optional' })}
//   </div>
// )

// const Root = ({ route, location, match, history }) => {
//   console.log('Root')
//   console.log(route)
//   console.log(location)
//   console.log(match)
//   var qs = queryString.parse(location.search);
//   console.log(qs);

//   var currentRoute = matchRoutes(route.routes, location.pathname);
//   console.log(currentRoute);

//   var routeObject = {};

//   var locales = ['RU', 'EN', 'FR'];
//   var systemNames0 = ['SETTINGS'];
//   var systemNames2 = ['SETTINGS', 'COURSES', 'COURSE', 'LESSON', 'USERS', 'UNIT', 'AUTHORS', 'AUTHOR', 'MYCOURSE'];

//   currentRoute.map((route, idx) => {
//     switch (idx) {
//       case 0:
//         var domain_or_locale = route.match.params.domain_or_locale.toUpperCase();
//         console.log('ffffff')
//         console.log(locales.indexOf(domain_or_locale));
//         if (locales.indexOf(domain_or_locale) === -1) {
//           if (currentRoute.length === 1) routeObject.redirect0 = '/' + route.match.params.domain_or_locale + '/ru'
//           else routeObject.domain = domain_or_locale;
//         } else routeObject.locale = domain_or_locale;
//         return;
//       case 1:
//         var locale_or_page = route.match.params.locale_or_page.toUpperCase();
//         if (routeObject.locale) {
//           if (systemNames.indexOf(locale_or_page) !== -1) routeObject.systemName0 = locale_or_page;
//           else routeObject.redirect1 = routeObject.locale;
//         } else {
//           if (locales.indexOf(locale_or_page) !== -1) routeObject.locale = locale_or_page
//           else routeObject.redirect1 = '/notfound'
//         }
//         return
//       case 2:
//         var page_or_system_page = route.match.params.page_or_system_page.toUpperCase();
//         if (systemNames2.indexOf(page_or_system_page) !== -1) routeObject.systemName2 = page_or_system_page;
//         else routeObject.page = page_or_system_page;
//         return
//       case 3:
//         var name_or_id = route.match.params.name_or_id.toUpperCase();
//         if (routeObject.systemName2) routeObject.redirect2 = '/notfound'
//         else routeObject.name = name_or_id;
//         return
//       default:
//         return;
//     }
//   });

//   console.log('routeObject::::');
//   console.log(routeObject);
//   console.log(history)

//   if (routeObject.redirect0) return (<Redirect to={routeObject.redirect0} />);
//   if (routeObject.redirect1) return (<Redirect to={routeObject.redirect1} />);
//   if (routeObject.redirect2) return (<Redirect to={routeObject.redirect2} />);

//   return (
//     <div>{renderRoutes(route.routes, { routeObject })}</div>
//   )
// }

const Root = ({ route, location, match, history }) => {
  console.log('Root')
  console.log(matchRoutes(routes, location.pathname));
  return (
    <div>Root:{renderRoutes(route.routes, {})}</div>
  )
}

const Account = ({ route, location, match, history }) => {
  console.log('Account')
  console.log(matchRoutes(routes, location.pathname));
  return (
    <div>Account:{renderRoutes(route.routes, {})}</div>
  )
}
const LocaleOrSettings = ({ route, location, match, history }) => {
  console.log('LocaleOrSettings')
  console.log(matchRoutes(routes, location.pathname));
  return (
    <div>LocaleOrSettings</div>
  )
}
const CoursesWrapper = ({ route, location, match, history }) => {
  console.log('CoursesWrapper')
  console.log(matchRoutes(routes, location.pathname));
  return (
    <div>CoursesWrapper</div>
  )
}
const CourseWrapper = ({ route, location, match, history }) => {
  console.log('CourseWrapper')
  console.log(matchRoutes(routes, location.pathname));
  return (
    <div>CourseWrapper</div>
  )
}

const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/:accout',
        component: Account
      },
      {
        path: '/:account/:locale_or_settings',
        component: LocaleOrSettings
      },
      {
        path: '/:account/:locale/courses',
        component: CoursesWrapper
      },
      {
        path: '/:account/:locale/course/:courseId',
        component: CourseWrapper
      }
    ]
  }
]

module.exports = routes;