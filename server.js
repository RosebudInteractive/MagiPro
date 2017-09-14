import qs from 'qs' // Add this at the top of the file
import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLocaleMiddleware from 'express-locale';
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
// import { Provider } from 'react-redux'
import { Provider } from 'react-intl-redux'

import appReducer from './reducers'
import { renderToString } from 'react-dom/server'
import { fetchCounter } from './api/counter'
import { StaticRouter } from 'react-router-dom'

import ru from 'react-intl/locale-data/ru';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

import { addLocaleData } from 'react-intl';
import { renderRoutes, matchRoutes } from 'react-router-config'

import db from './database/models';
import colors from 'colors';

var bodyParser = require('body-parser');

const routes = require('./routes');
const translations = require('./translations');
const geoip = require('geoip-lite');
const loggerMiddleware = createLogger()

const app = Express()
const port = 4000

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

addLocaleData([...ru, ...en, ...fr]);
const device = require('express-device');
app.use(device.capture());
app.use(createLocaleMiddleware({
  priority: 'custom',
  lookups: {
    custom: (req) => {
      // console.log(geoip.lookup("37.1.29.102"))
      return "ru_RU";
      // req.ip === '127.0.0.1' ? 'ru_RU' : undefined
    }
  }
}));

// app.get('/api/device', function(req, res) {
//   let html = `
//   <!doctype html>
//   <html lang="ru-RU">`;
//   // console.log('req.locale')
//   console.log(req.locale);
//   res.send(html + "Hi to " + req.device.type.toUpperCase() + " User: Locale: ");
// });

//Serve static files
app.post('/api/course/main', function(req, res, next) {
  db.Account.findOne({ where: { id : req.body.accountId }}).then(account => {
    account.leadingCourse = req.body.courseId;
    account.save().then(() => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ 
        account: account.get({plain:true}),
      }));
    })
  })
});

app.post('/api/course/:id', function(req, res, next) {
  if (req.params.id) {
    db.Course.findOne({ where: {
      id: req.params.id,
    }}).then(course => {
      course.state = req.body.state;
      course.save().then(() => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ 
          course: course.get({plain:true}),
        }));
      })
    });
  }
})
app.get('/api/domain/:name', function (req, res, next) {
  db.Account.findAll({
    where: {
      domain: req.params.name
    },
    include: [ {
        model: db.Course,
        include: [ {
            model: db.Author,
            include: [ {
                model: db.Author_i18n,
                as: 'AuthorIntl'
              }
            ]
          }, {
            model: db.Lesson
          }
        ]
      },
    ]
  }).then(accounts => {
    db.Language.findAll({ // TODO Promise.all
      include: [{ model: db.Language_i18n }]
    }).then(languages => {
      let langs = languages.map(language => {
        return language.get({plain:true})
      })
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ 
        account: accounts[0].get({plain:true}),
        languages: langs
      }));
    })
  });
});

app.get('/api/courses', function (req, res, next) {
  db.Account.findOne({
    where: {
      domain: 'pmt'
    },
    include: [
      {
        model: db.Language,
        include: [
          {
            model: db.Language_i18n,
            // as: 'LangIntl'
          }
        ]
      }, {
        model: db.Course,
        // where: {
        //   language_id: 1
        // }
      }
    ]
  }).then(account => {
    let courses = [];

    account.courses.map(course => {
      courses.push({ ...course.dataValues });
    });
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ courses, account }));
    // })
  });
})
app.use('/assets', Express.static('assets'))
app.use('/static', Express.static('static'))

// This is fired every time the server side receives a request
app.use(handleRender)

function handleRender(req, res) {
  // Read the counter from the request, if provided
  const params = qs.parse(req.query)
  // const counter = parseInt(params.counter, 10) || apiResult || 0
  const counter = parseInt(params.counter, 10) || 0

  // Compile an initial state
  let preloadedState = {
    counter: counter,
    device: req.device.type.toUpperCase(),
    // locale: [],
    intl: {
      locale: 'ru',
      locale_ip: req.locale.language,
      messages: translations[req.locale.language],
      translations
      // messages: {
      //   'app.greeting': 'Привет!',
      // },
    },
  }

  const reducer = combineReducers({
    ...appReducer
  })

  // Create a new Redux store instance
  const store = createStore(reducer, preloadedState, applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  ))

  // TODO LOAD DATA ORDER

  const loadBranchData = (location) => {
    const branch = matchRoutes(routes, location)
    const promises = branch.map(({ route, match }) => {
      return route.loadData
        ? route.loadData(store.dispatch)
        : Promise.resolve(null)
    })
    return Promise.all(promises)
  }

  // useful on the server for preloading data
  loadBranchData(req.url).then(data => {

    let context = {}

    // Render the component to a string
    const html = renderToString(
      <Provider store={store} locale={preloadedState.intl.locale} messages={preloadedState.intl.messages}>
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    )
    // Grab the initial state from our Redux store
    const finalState = store.getState()

    // Send the rendered page back to the client
    res.send(renderFullPage(html, finalState))

  })
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html lang="ru-RU">
      <head>
        <title>Magisteria</title>
        <!-- link type="text/css" rel="stylesheet" href="/static/style.css" -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="chrome=1">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="format-detection" content="telephone=no">
        <link rel="stylesheet" href="/assets/css/main.min.css" type="text/css" />
        <link rel="stylesheet" href="/assets/css/fix.css" type="text/css" />
        </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

console.log('server started at http://localhost:' + port);

app.listen(port)