/** @jsx React.DOM */
'use strict';

// third-party libraries
var React = require('react');

var Level = React.createClass({
	render: function () {
		return (
        	<div className="level__container">
          		<div className="level">
            		{this.props.currentLevel}
          		</div>
        	</div>
		);
	}
});

module.exports = Level;