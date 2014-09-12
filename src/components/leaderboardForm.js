/** @jsx React.DOM */
'use strict';

// third-party libraries
var React = require('react');

var leaderboardForm = React.createClass({
	getInitialState: function() {
		return {name: this.props.player.name};
	},
	onChange: function(e) {
		this.setState({name: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		if (this.state.name && this.state.name.trim().length !== 0) {
			this.props.updateLeaderboard(this.state.name);
		}
	},
	render: function() {
	    // set css class
    	var leaderboardFormClassNames = "leaderboard__form";

	    if (this.props.player.hasUpdatedLeaderboard) {
	      leaderboardFormClassNames += " leaderboard__form--updated";
	    }

		return (
			<div className={leaderboardFormClassNames}>
			  	<form onSubmit={this.handleSubmit}>
					<input className="leaderboard__name-input" onChange={this.onChange} value={this.state.name} />
					<button className="leaderboard__add-button inline-control">Add Score</button>
			    </form>
		    </div>
		);
	}
});

module.exports = leaderboardForm;