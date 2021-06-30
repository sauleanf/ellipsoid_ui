import React from 'react';
import PropTypes from 'prop-types';
import './style/location-marker.css';

const LocationMarker = (props) => {
  const { color, onClick } = props;
  return (
    <g
      className="fade-in location-marker-g"
      color="#FF5533"
      onClick={(e) => onClick(e)}
    >
      <circle
        cx="1"
        cy="1"
        r="1"
        fill={color}
      />
    </g>
  );
};

LocationMarker.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
};

LocationMarker.defaultProps = {
  onClick: () => null,
  color: '#3c9ba1',
};

export default LocationMarker;
