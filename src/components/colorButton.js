/** @jsx React.DOM */
'use strict';

// third-party libraries
var React = require('react');

var ColorButton = React.createClass({
  handleColorButton: function() {
    this.props.handleColorButton(this.props.colorButton, this.props.key);
  },
  render: function() {
  	// set css class
    var colorButtonClassNames = "color-button";

    if (this.props.colorButton.isHighlighted) {
      colorButtonClassNames += " color-button--highlighted";
    }

    return (
      <div 
      	className={colorButtonClassNames} 
      	onClick={this.handleColorButton}>
    	</div>
    );
  }
});

module.exports = ColorButton;