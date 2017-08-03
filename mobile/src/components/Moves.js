// React
import React from 'react';
import { PropTypes } from 'prop-types';

function Moves(props) {
  const { moves } = props;

  return (
    <div className="Moves">
      <p>Moves:</p>
      <ul>
        { moves.map((move, index) => (
          <li key={index}>{ move }</li>
        ))}
      </ul>
    </div>
  );
}

Moves.propTypes = {
  // State
  // Squirtle
  moves: PropTypes.array.isRequired,
};

export default Moves;
