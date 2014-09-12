/** @jsx React.DOM */
'use strict';

// third-party libraries
var React = require('react');

// components
var GameWheel = require('./gameWheel.js'); 

var GameView = React.createClass({
  render: function() {
    return (
      <div className="view">
        <div className="game-wheel__container">
          <GameWheel
          	colorButtons={this.props.colorButtons}
            handleColorButton={this.props.handleColorButton}
            startGame={this.props.startGame}
            player={this.props.player}/>
        </div>
      </div>
    );
  }
});

module.exports = GameView;