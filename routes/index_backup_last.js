import React from 'react'
import { Route, Link } from 'react-router-dom'
import { renderRoutes, matchRoutes } from 'react-router-config'
// import { set as setCounter, increment, decrement, incrementAsync } from '../actions';
import { fetchCourses2, setCourses } from '../actions/courses'
import { fetchParticipants } from '../actions/participants'
import { fetchAccount } from '../actions/root'
import fetch from 'isomorphic-fetch';

import Root from '../containers/Root';
import CourseWrapper from '../containers/CourseWrapper'
import CoursesWrapper from '../containers/CoursesWrapper';
import Participants from '../components/Participants'
import ParticipantsWrapper from '../components/ParticipantsWrapper'
import Course from '../components/Course';
import Courses from '../components/Courses';


// const Home = ({ route }) => (
//   <div>
//     <h2>Home</h2>
//   </div>
// )

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
      // { path: '/',
      //   exact: true,
      //   component: App,
      //   loadData: (dispatch) => new Promise((resolve, reject) => {
      //     dispatch(setCounter(44));
      //     resolve('loadData set counter');
      //   })
      // },
      // {
      //   path: '/users',
      //   components: Wrapper,
      //   routes: [
      //     {
      //       path: '/users',
      //       component: Users
      //     }
      //   ]
      // },
      {
        path: '/course',
        component: CourseWrapper,
        loadData: (dispatch) => new Promise((resolve, reject) => {
          // dispatch(fetchCourses2(() => {
            resolve('loadData set cours')
          // }))
        }),
        routes: [
          {
            path: '/course',
            exact: true,
            component: Course
          }
        ]
      },
      {
        path: '/courses',
        component: CoursesWrapper,
        loadData: (dispatch) => new Promise((resolve, reject) => {
          dispatch(fetchCourses2(() => {
            resolve('loadData set courses2')
          }))
        }),
        routes: [
          {
            path: '/courses',
            exact: true,
            component: Courses,
            filterData: () => 'ALL'
          },
          {
            path: '/courses/public',
            component: Courses,
            filterData: () => 'P'
          },
          {
            path: '/courses/draft',
            component: Courses,
            filterData: () => 'D'
          },
          {
            path: '/courses/archive',
            component: Courses,
            filterData: () => 'A'
          }
        ]
      },
      {
        path: '/participants',
        component: ParticipantsWrapper,
        loadData: (dispatch) => new Promise((resolve, reject) => {
          // dispatch(fetchCourses(() => { // pass promise callback 
          //   resolve('loadData set courses');
          // }));
          dispatch(fetchParticipants(() => {
            resolve('loadData set ParticipantsWrapper')
          }))
        }),
        routes: [
          {
            path: '/participants',
            exact: true,
            component: Participants,
          },
        ]
      },
      // { path: '/courses',
      //   component: Courses,
      //   loadData: (dispatch) => new Promise((resolve, reject) => {
      //     dispatch(fetchCourses(() => { // pass promise callback 
      //       resolve('loadData set courses');
      //     }));
      //   })
      //   // routes: [
      //   //   { path: '/child/:id/grand-child',
      //   //     component: GrandChild
      //   //   }
      //   // ]
      // }, 

    ]
  }
]

module.exports = routes;