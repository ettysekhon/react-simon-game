/** @jsx React.DOM */
'use strict';

// third-party libraries
var React = require('react');
var Router = require('react-router');

var PlayButton = React.createClass({
	render: function () {
		return (
			<div  
				className="play-button" 
				onClick={this.props.handlePlayButton}>
					PLAY
			</div>
		);
	}
});

module.exports = PlayButton;