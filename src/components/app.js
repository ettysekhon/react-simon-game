/** @jsx React.DOM */
'use strict';

// third-party libraries
var React = require('react');
var Router = require('react-router');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var Q = require('q');
var _ = require('lodash');

var localStorageService = require('../services/localStorageService.js');

var RUNSEQUENCE = [],
POSITIONINRUNSEQUENCE = 0,
HIGHLIGHTDURATION = 500,
SELECTEDHIGHLIGHTDURATION = 100;

var App = React.createClass({
	mixins: [ReactFireMixin],
	getInitialState: function() {
		return {
		  	colorButtons:  [
				{name: 'blue', isHighlighted: false},
				{name: 'green', isHighlighted: false},
				{name: 'yellow', isHighlighted: false},
				{name: 'red', isHighlighted: false}
			],
			player: {
				name: '',
				currentLevel: 0,
				hasUpdatedLeaderboard: false
			},
			leaderboardItems: []
		};
	},
	componentWillMount: function() {
		var state = this.state,
		firebaseRef = new Firebase("https://simon-leaderboard.firebaseio.com/items");
		this.bindAsArray(firebaseRef.limit(100), "leaderboardItems");

		var player = localStorageService.get('player');

		if (player) {
			state.player = player;
			this.setState(state);
		}
	},
	createNextRunSequence: function() {
		var nextIndex = Math.floor((Math.random() * this.state.colorButtons.length - 1) + 1),
		runSequence = _.pluck(RUNSEQUENCE, 'runSequenceIndex');
		runSequence.push(nextIndex);
		
		RUNSEQUENCE = _.map(runSequence, function(runSequenceIndex) {
			return {
				hightlightColorFn: this.createHighlightColorFn(runSequenceIndex, HIGHLIGHTDURATION),
				runSequenceIndex: runSequenceIndex
			};
		}.bind(this));
	},
	renderRunSequence: function () {
		var funcs = _.pluck(RUNSEQUENCE, 'hightlightColorFn');
		return funcs.reduce(Q.when, Q());
	},
	addHighlightColorFn: function (index) {
		return function () {
			var state = this.state;
			state.colorButtons[index].isHighlighted = true;
			this.setState(state);
			console.log('highlighted ' + this.state.colorButtons[index].name)
		}.bind(this);
	},
	removeHighlightColorFn: function (index) {
		return function () {
			var state = this.state;
			state.colorButtons[index].isHighlighted = false;
			this.setState(state);
			console.log('removed ' + this.state.colorButtons[index].name + ' highlight')
		}.bind(this);
	},
	doHighlightColorFn: function (addColorFn, removeColorFn, highlightColorDuration) {
		return function () {
			var deferred = Q.defer();
			// nested timeouts handle same color highlighted in sequence
			setTimeout(function() {
				addColorFn();
				setTimeout(function () {
					removeColorFn();
					deferred.resolve();
				}, highlightColorDuration);
			}, highlightColorDuration);

			return deferred.promise;
		}.bind(this);
	},
	createHighlightColorFn: function (index, highlightDuration) {
		return this.doHighlightColorFn(
			this.addHighlightColorFn(index), 
			this.removeHighlightColorFn(index), 
			highlightDuration
		);
	},
	resetGame: function () {
		var state = this.state;
		state.player.name = '';
		state.player.currentLevel = 0;
		state.player.hasUpdatedLeaderboard = false;
		
		localStorageService.set('player', this.state.player);

		this.setState(state);

		RUNSEQUENCE = [];
	},
	playNextLevel: function(startGame) {
		var state = this.state;
		POSITIONINRUNSEQUENCE = 0;
		if (!startGame) {
			state.player.currentLevel++;
			this.setState(state);
		}
		this.createNextRunSequence();
		this.renderRunSequence();
	},
	startGame: function() {
		this.resetGame();
		this.playNextLevel(true);
	},
	handlePlayButton: function () {
		// play game changes route!
		Router.transitionTo('game');
	},
	handleColorButton: function(color, key) {
		var highlightSelectedColorButton = this.createHighlightColorFn(key, SELECTEDHIGHLIGHTDURATION);

		highlightSelectedColorButton().then(function () {
				var value = RUNSEQUENCE[POSITIONINRUNSEQUENCE] && RUNSEQUENCE[POSITIONINRUNSEQUENCE].runSequenceIndex;
				if (_.isUndefined(value)) {
					// do nothing
					return;
				}
				
				if (key === value) {
					if (RUNSEQUENCE.length === POSITIONINRUNSEQUENCE+1) {
						this.playNextLevel();
					} else {
						POSITIONINRUNSEQUENCE++;
					}
				} else {
					// game over now change route!
					Router.transitionTo('leaderboard');
				}
		}.bind(this));
	},
	updateLeaderboard: function (text) {
		this.state.player.name = text;

		this.firebaseRefs["leaderboardItems"].push({
			name: this.state.player.name,
			level: this.state.player.currentLevel
		});

		this.state.player.hasUpdatedLeaderboard = true;

		localStorageService.set('player', this.state.player);
	},
	render: function () {
		return (
	      	<div className="content">
	      		{this.props.activeRouteHandler({ 
	      			colorButtons: this.state.colorButtons,
	      			handleColorButton: this.handleColorButton,
	      			handlePlayButton: this.handlePlayButton,
	      			startGame: this.startGame,
	      			player: this.state.player,
	      			updateLeaderboard: this.updateLeaderboard,
	      			leaderboardItems: this.state.leaderboardItems
	      		})}	        	
	      	</div>
		);
	}
});

module.exports = App;