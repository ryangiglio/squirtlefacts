// React
import React from 'react';
import { PropTypes } from 'prop-types';

// Assets
import eggImg from '../assets/egg.png';
import squirtleImg from '../assets/squirtle.png';
import wartortleImg from '../assets/wartortle.png';
import blastoiseImg from '../assets/blastoise.png';

function Portrait(props) {
  const { name, species, level, hueRotate } = props;

  let pokeImg = squirtleImg,
    spriteScale = 1;

  if ( level >= 1 ) {
    if (species === 'Squirtle') {
      spriteScale = 0.5 + ((level / 15) / 2);
    } else if (species === 'Wartortle') {
      pokeImg = wartortleImg;
      spriteScale = 0.5 + (((level - 15) / 20) / 2);
    } else if (species === 'Blastoise') {
      pokeImg = blastoiseImg;
    }
  }

  return (
    <div className="Portrait">
      { level === 0 ? (
          <div className="Portrait__content">
            <p className="Portrait__name">{ name }</p>
            <img className="Portrait__img--egg" src={ eggImg } alt="Squirtle Egg" />
          </div>
        ) : (
          <div className="Portrait__content">
            <p className="Portrait__level">Level: { level }</p>
            <p className="Portrait__name">{ name }</p>
            <img
              className="Portrait__img"
              src={ pokeImg }
              alt={ `My ${species}` }
              style={{
                filter: `hue-rotate(${hueRotate})`,
                transform: `scale(${spriteScale})`,
              }} />
          </div>
        )
      }
    </div>
  );
}

Portrait.propTypes = {
  name: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  hueRotate: PropTypes.string.isRequired,
};

export default Portrait;
