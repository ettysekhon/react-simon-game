/** @jsx React.DOM */
'use strict';

// third-party libraries
var React = require('react');

var LeaderboardTable = React.createClass({
	sortLevels: function(a, b) {
	  	return b.level - a.level;
	},
  	render: function() {
	    var item = function(item, index) {
	      return (      
	      		<tr key={index} className="leaderboard-table__row">
			        <td className="leaderboard-table__cell">{item.name}</td>
			        <td className="leaderboard-table__cell leaderboard-table__cell--center">{item.level}</td>
		      	</tr>
      		);
	    };
	    return (
			<div className="leaderboard-table__container">
			  	<table className="leaderboard-table">
			    	<caption className="leaderboard-table__caption">Best Overall Scores</caption>
		      		<col width="50%"/>
			      	<col width="50%"/>
				    <thead>
			      		<tr>
			            	<th className="leaderboard-table__cell leaderboard-table__header">Name</th>
				        	<th className="leaderboard-table__cell leaderboard-table__header leaderboard-table__cell--center">Score</th>
				      	</tr>
				    </thead>
			    	<tbody>
			    		{this.props.leaderboardItems.sort(this.sortLevels).map(item)}
		    		</tbody>
				</table>
			</div>
    	);
	}
});

module.exports = LeaderboardTable;