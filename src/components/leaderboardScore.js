/** @jsx React.DOM */
'use strict';

// third-party libraries
var React = require('react');

var LeaderboardScore = React.createClass({
  	render: function() {
	    return (
			<div className="leaderboard__score">{this.props.leaderboardScore}</div>
    	);
	}
});

module.exports = LeaderboardScore;