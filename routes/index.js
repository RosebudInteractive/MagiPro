import React from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import { renderRoutes, matchRoutes } from 'react-router-config'
// import { set as setCounter, increment, decrement, incrementAsync } from '../actions';
// import { fetchCourses2, setCourses } from '../actions/courses'
// import { fetchParticipants } from '../actions/participants'
import { fetchAccount } from '../actions/root'
import fetch from 'isomorphic-fetch';
import queryString from 'query-string';

import Root from '../conts/Root';
import DomainOrLocale from '../comps/DomainOrLocale'
import SystemPageOrLocale from '../comps/SystemPageOrLocale'
import SystemPageOrPage from '../comps/SystemPageOrPage'
import SystemPageWithdata from '../comps/SystemPageWithdata'

// import Root from '../containers/Root';
// import CourseWrapper from '../containers/CourseWrapper'
import CoursesWrapper from '../containers/CoursesWrapper';

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
//         if (!route.match.params.domain_or_locale) {
//           routeObject.redirect0 = '/ru'
//           return
//         }
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
//           if (systemNames.indexOf(locale_or_page) !== -1) routeObject.systemName1 = locale_or_page;
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

// const DomainOrLocale = ({ route, location, match, routeObject }) => {
//   if (!routeObject.domain) {
//     return (
//       <div>Main page
//         <ul>
//           <li>
//             <Link to={'/ptm/ru'}>Аккаунт</Link>
//           </li>
//         </ul>
//       </div>
//     )
//   } else {
//     if (routeObject.name || routeObject.page || routeObject.systemName2 || routeObject.systemName1) {
//       return (
//         <div>{renderRoutes(route.routes, { routeObject })}</div>
//       )
//     } else {
//       return (
//         <div>Domain:{match.params.domain_or_locale}, locale: {routeObject.locale}
//           <Link to={location.pathname + '/courses'}>Courses</Link></div>
//       )
//     }
//   }
// }

// const AccountOrLocale = ({ route, location, match, routeObject }) => {
//   if (routeObject.systemName2) {
//     return (
//       <div>systemName2:{routeObject.systemName2}</div>
//     )
//   }
//   return (
//     <div>Courses:{match.params.page}</div>
//   )
// }

// const PageOrSystemPage = ({ route, location, match, routeObject }) => {
//   if (routeObject.systemName2) {
//     return (
//       <div>systemName1:{routeObject.systemName2}{renderRoutes(route.routes, { routeObject })}</div>
//     )
//   }
//   return (
//     <div>CurrentPage:{match.params.page_or_system_page}{renderRoutes(route.routes, { routeObject })}</div>
//   )
// }

// const NameOrId = ({ route, location, match, routeObject }) => {
//   return (
//     <div>NameOrId:{match.params.name_or_id}{renderRoutes(route.routes, { routeObject })}</div>
//   )
// }

var locales = ['RU', 'EN', 'FR'];
var systemNames0 = ['SETTINGS'];
var systemNames2 = ['SETTINGS', 'COURSES', 'COURSE', 'LESSON', 'USERS', 'UNIT', 'AUTHORS', 'AUTHOR', 'MYCOURSE'];

// const Root = ({ route, location, match, history }) => {
//   var mRoutes = matchRoutes(route.routes, location.pathname);
//   var routeObject = {};
//   console.log(mRoutes);
//   console.log(location)
//   return (
//     <div>{renderRoutes(route.routes, { mRoute: mRoutes[mRoutes.length - 1], routeObject })}</div>
//   )
// }

// const DomainOrLocale = ({ route, location, match, history, mRoute, routeObject }) => {
//   console.log('DomainOrLocale=====================');
//   console.log(mRoute);
//   if (mRoute.route.reservedPath.locales.indexOf(mRoute.match.params.domain_or_locale.toUpperCase()) !== -1) {
//     console.log('locale')
//     routeObject.locale = mRoute.match.params.domain_or_locale;
//     // return (
//     //   <div>DomainOrLocale:locale:{mRoute.match.params.domain_or_locale}{renderRoutes(route.routes, { mRoute, routeObject, domain: [] })}</div>
//     // )
//   } else if (Object.keys(mRoute.match.params).length > 1) {
//     console.log('domain')
//     routeObject.domain = mRoute.match.params.domain_or_locale;
//     // return (
//     //   <div>DomainOrLocale:domain:{mRoute.match.params.domain_or_locale}{renderRoutes(route.routes, { mRoute, routeObject })}</div>
//     // )
//   } else {
//     console.log('redirect');
//     routeObject.redirect = mRoute.match.params.domain_or_locale;
//     // return (
//     //   <div>DomainOrLocale:redirect</div>
//     // )
//   }
//   return (
//     <Route exact to={location.pathname} render={() => renderRoutes(route.routes, { mRoute, routeObject })} />
//   )
// }

// const SystemPageOrLocale = ({ route, location, match, history, mRoute, routeObject }) => {
//   console.log('SystemPageOrLocale=====================')
//   console.log(mRoute);
//   if (mRoute.route.reservedPath.locales.indexOf(mRoute.match.params.system_page_or_locale.toUpperCase()) !== -1) {
//     console.log('locale')
//     // return (
//     //   <div>SystemPageOrLocale:locale:{mRoute.match.params.system_page_or_locale}{renderRoutes(route.routes, { mRoute, routeObject })}</div>
//     // )
//   } else if (mRoute.route.reservedPath.systemNames.indexOf(mRoute.match.params.system_page_or_locale.toUpperCase()) !== -1) {
//     console.log('system page')
//     return (
//       <div>SystemPageOrLocale:system page:{mRoute.match.params.system_page_or_locale}{renderRoutes(route.routes, { mRoute, routeObject })}</div>
//     )
//   } else if (routeObject.domain) {
//     console.log('redirect')
//     // return (
//     //   <div>SystemPageOrLocale:redirect</div>
//     // )
//   } else {
//     console.log('coursename')
//   }
//   return (
//     <Route exact to={location.pathname} render={() => renderRoutes(route.routes, { mRoute, routeObject })} />
//   )
// }
// {/* <div>SystemPageOrLocale:coursename:{mRoute.match.params.system_page_or_locale}{renderRoutes(route.routes, { mRoute, routeObject })}</div> */ }

// const SystemPageOrPage = ({ route, location, match, history, mRoute, routeObject, account, languages }) => {
//   console.log('SystemPageOrPage=====================')
//   console.log(mRoute);
//   if (mRoute.route.reservedPath.systemNames.indexOf(mRoute.match.params.system_page_or_page.toUpperCase()) !== -1) {
//     if (mRoute.match.params.system_page_or_page.toUpperCase() === 'COURSES') {
//      return (
//        <CoursesWrapper mRoute={mRoute} routeObject={routeObject} route={route} languages={languages} accout={account} />
//      ) 
//     }
//     return (
//       <div>SystemPageOrPage:system page:{mRoute.match.params.system_page_or_page}{renderRoutes(route.routes, { mRoute, routeObject })}</div>
//     )
//   } else {
//     console.log('page(coursename)')
//     // return (
//     //   <Route exact to={location.pathname} render={() => renderRoutes(route.routes, { mRoute, routeObject })} />
//     // )
//   }
//   return (
//     <Route exact to={location.pathname} render={() => renderRoutes(route.routes, { mRoute, routeObject })} />
//   )
// }
// {/* <div>SystemPageOrPage:page:{mRoute.match.params.system_page_or_page}{renderRoutes(route.routes, { mRoute, routeObject })}</div> */}

const NameOrId = ({ route, location, match, history, mRoute, routeObject }) => {

  return (
    <div>NameOrId:{mRoute.match.params.name_or_id}{renderRoutes(route.routes, { mRoute, routeObject })}</div>
  )
}

const routes = [
  {
    component: Root,
    loadData: (dispatch) => new Promise((resolve, reject) => {
      console.log('-------------ROOT_LOAD_DATA')
      dispatch(fetchAccount(() => {
        resolve()
      }));
    }),
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/:domain_or_locale',
        component: DomainOrLocale,
        reservedPath: {
          locales,
          systemNames: []
        },
        routes: [
          {
            path: '/:domain_or_locale/:system_page_or_locale',
            component: SystemPageOrLocale,
            reservedPath: {
              locales,
              systemNames: systemNames0,
            },
            routes: [
              {
                path: '/:domain_or_locale/:system_page_or_locale/:system_page_or_page',
                component: SystemPageOrPage,
                reservedPath: {
                  locales,
                  systemNames: systemNames2,
                },
                routes: [
                  {
                    path: '/:domain_or_locale/:system_page_or_locale/:system_page_or_page/:system_page_with_data',
                    component: SystemPageWithdata,
                    reservedPath: {
                      locales,
                      systemNames: systemNames2,
                    },
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]

// const routes = [
//   {
//     component: Root,
//     routes: [
//       {
//         path: '/:domain_or_locale',
//         component: DomainOrLocale
//       }
//     ]
//   }
// ]

// const routes = [
//   {
//     component: Root,
//     loadData: (dispatch) => new Promise((resolve, reject) => {
//       console.log('-------------ROOT_LOAD_DATA')
//       dispatch(fetchAccount(() => {
//         resolve()
//       }));
//     }),
//     routes: [
//       // { path: '/',
//       //   exact: true,
//       //   component: App,
//       //   loadData: (dispatch) => new Promise((resolve, reject) => {
//       //     dispatch(setCounter(44));
//       //     resolve('loadData set counter');
//       //   })
//       // },
//       // {
//       //   path: '/users',
//       //   components: Wrapper,
//       //   routes: [
//       //     {
//       //       path: '/users',
//       //       component: Users
//       //     }
//       //   ]
//       // },
//       {
//         path: '/course',
//         component: CourseWrapper,
//         loadData: (dispatch) => new Promise((resolve, reject) => {
//           // dispatch(fetchCourses2(() => {
//             resolve('loadData set cours')
//           // }))
//         }),
//         routes: [
//           {
//             path: '/course',
//             exact: true,
//             component: Course
//           }
//         ]
//       },
//       {
//         path: '/courses',
//         component: CoursesWrapper,
//         loadData: (dispatch) => new Promise((resolve, reject) => {
//           dispatch(fetchCourses2(() => {
//             resolve('loadData set courses2')
//           }))
//         }),
//         routes: [
//           {
//             path: '/courses',
//             exact: true,
//             component: Courses,
//             filterData: () => 'ALL'
//           },
//           {
//             path: '/courses/public',
//             component: Courses,
//             filterData: () => 'P'
//           },
//           {
//             path: '/courses/draft',
//             component: Courses,
//             filterData: () => 'D'
//           },
//           {
//             path: '/courses/archive',
//             component: Courses,
//             filterData: () => 'A'
//           }
//         ]
//       },
//       {
//         path: '/participants',
//         component: ParticipantsWrapper,
//         loadData: (dispatch) => new Promise((resolve, reject) => {
//           // dispatch(fetchCourses(() => { // pass promise callback 
//           //   resolve('loadData set courses');
//           // }));
//           dispatch(fetchParticipants(() => {
//             resolve('loadData set ParticipantsWrapper')
//           }))
//         }),
//         routes: [
//           {
//             path: '/participants',
//             exact: true,
//             component: Participants,
//           },
//         ]
//       },
//       // { path: '/courses',
//       //   component: Courses,
//       //   loadData: (dispatch) => new Promise((resolve, reject) => {
//       //     dispatch(fetchCourses(() => { // pass promise callback 
//       //       resolve('loadData set courses');
//       //     }));
//       //   })
//       //   // routes: [
//       //   //   { path: '/child/:id/grand-child',
//       //   //     component: GrandChild
//       //   //   }
//       //   // ]
//       // }, 

//     ]
//   }
// ]

module.exports = routes;