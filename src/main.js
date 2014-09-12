/** @jsx React.DOM */
'use strict';

// third-party libraries
var attachFastClick = require('fastclick');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;

// enable fast click for some mobile browsers
attachFastClick(document.body);

// components
var App = require('./components/app.js');
var HomeView = require('./components/homeView.js');
var GameView = require('./components/gameView.js');
var LeaderboardView = require('./components/leaderboardView.js');

var routes = (
  <Routes>
    <Route handler={App}>
        <Route name="home" handler={HomeView}/>
        <Route name="game" handler={GameView}/>
        <Route name="leaderboard" handler={LeaderboardView}/>
        <DefaultRoute handler={HomeView}/>
    </Route>
  </Routes>
);

React.renderComponent(routes, document.getElementById('container'));