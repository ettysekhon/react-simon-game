/** @jsx React.DOM */
'use strict';

// third-party libraries
var React = require('react');

// components
var LeaderboardForm = require('./leaderboardForm.js');
var LeaderboardTable = require('./leaderboardTable.js');
var LeaderboardScore = require('./leaderboardScore.js');
var LeaderboardGameOver = require('./leaderboardGameOver.js');
var PlayButton = require('./playButton.js');

var LeaderboardView = React.createClass({
  render: function() {
    return (
        <div className="view">
        
            <div className="row">
                <LeaderboardGameOver />
            </div>
            
            <div className="row">
              <LeaderboardScore leaderboardScore={this.props.player.currentLevel}/>
            </div>
            
            <div className="row">          
                <LeaderboardForm updateLeaderboard={this.props.updateLeaderboard} player={this.props.player}/>
            </div>

            <div className="row">
                <PlayButton handlePlayButton={this.props.handlePlayButton} />
            </div>

            <div className="row">
                <LeaderboardTable leaderboardItems={this.props.leaderboardItems} />			
            </div>

        </div>

    );
  }
});

module.exports = LeaderboardView;