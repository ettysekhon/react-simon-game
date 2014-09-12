/** @jsx React.DOM */
'use strict';

// third-party libraries
var React = require('react');

// components
var ColorButton = require('./colorButton.js');
var Level = require('./level.js');

var GameWheel = React.createClass({
  componentDidMount: function() {
    this.props.startGame();
  },
  render: function() {
    var gameWheelStyle, diameter = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
    diameter = (diameter*0.9).toString() + 'px';

    gameWheelStyle = {
        width: diameter,
        height: diameter
    };

    return (
      <div className="game-wheel" style={gameWheelStyle}>
        <div className="game-wheel__color-buttons">
          {this.props.colorButtons.map(function(colorButton, index) {
            return (
              <ColorButton
              	key={index}
                colorButton={colorButton}
                handleColorButton={this.props.handleColorButton}/>
            );
          }.bind(this))}
        </div>
        <div className="game-wheel__level">
          <Level 
              currentLevel={this.props.player.currentLevel}/> 
        </div>
      </div>
    );
  }
});

module.exports = GameWheel;