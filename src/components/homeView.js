/** @jsx React.DOM */
'use strict';

// third-party libraries
var React = require('react');

// components
var PlayButton = require('./playButton.js');

var HomeView = React.createClass({
  render: function() {
    return (
        <div className="view">
            <div className="title row">
                <div>
                    <div className="title__text">Simon</div>
                    <div className="title__text">Game</div>
                </div>
            </div>
        
            <div className="row">
                <PlayButton
                    handlePlayButton={this.props.handlePlayButton} />
            </div>
        </div>
    );
  }
});

module.exports = HomeView;