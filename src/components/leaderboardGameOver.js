/** @jsx React.DOM */
'use strict';

// third-party libraries
var React = require('react');

var LeaderboardGameOver = React.createClass({
  	render: function() {
	    return (
			<div className="leaderboard__game-over">Game Over!</div>
    	);
	}
});

module.exports = LeaderboardGameOver;