import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker,
} from 'react-simple-maps';

import ClickPulse from './ClickPulse';
import LocationMarker from './LocationMarker';
import './style/map-container.css';

const geoConfig = { scale: 100 };
const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const colors = {
  mapBackground: '#ffffff',
  countryColor: '#d0d0d0',
  borderColor: '#bbbbbb',
  lines: '#f8f8f8',
  markerColor: '#48b19c',
};

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pulsingClick: null,
    };
  }

  getCoordinates(e) {
    const svg = this.wrapper.querySelector('svg');
    const box = svg.getBoundingClientRect();

    this.setState({
      pulsingClick: (<ClickPulse
        key={`${e.clientX}-${e.clientY}`}
        x={e.clientX}
        y={e.clientY}
      />),
    });

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    this.timeout = setTimeout(() => {
      this.setState({
        pulsingClick: null,
      });
    }, 1000);

    const { height, width } = box;

    const xFactor = 180 / (height / 1.97);
    const yFactor = 360 / height;

    const latitude = yFactor * (e.clientY - height / 2);
    const longitude = xFactor * (e.clientX - width / 2);

    const coordinates = [
      longitude,
      -(180 / Math.PI) * Math.atan(Math.sinh((Math.PI / 180) * latitude)),
    ];

    const { onRetrieveCoordinates } = this.props;
    onRetrieveCoordinates(coordinates[0], coordinates[1]);
  }

  renderMarkers() {
    const { markers } = this.props;
    return _.map(
      markers,
      (marker) => (
        <Marker
          key={marker.id}
          coordinates={marker.coordinates}
        >
          <LocationMarker
            color={colors.markerColor}
          />
        </Marker>
      ),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderGeography({ geographies }) {
    return geographies.map(
      (geo) => (
        <Geography
          style={{
            default: {
              outline: 'none',
            },
            hover: {
              outline: 'none',
            },
            pressed: {
              outline: 'none',
            },
          }}
          key={geo.rsmKey}
          geography={geo}
          fill={colors.countryColor}
          stroke={colors.borderColor}
          strokeWidth=".5"
        />
      ),
    );
  }

  render() {
    const { pulsingClick } = this.state;
    return (
      <div ref={(wrapper) => {
        this.wrapper = wrapper;
      }}
      >
        <ComposableMap
          projection="geoMercator"
          className="fade-in map-container"
          style={{
            backgroundColor: colors.mapBackground,
          }}
          width={200}
          projectionConfig={geoConfig}
          onClick={(e) => this.getCoordinates(e)}
        >
          <Graticule
            stroke={colors.lines}
          />
          <Geographies geography={geoUrl}>
            {this.renderGeography}
          </Geographies>
          {this.renderMarkers()}
        </ComposableMap>
        {pulsingClick}
      </div>
    );
  }
}

MapContainer.propTypes = {
  onRetrieveCoordinates: PropTypes.func,
  markers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    coordinates: PropTypes.arrayOf(PropTypes.number),
  })),
};

MapContainer.defaultProps = {
  onRetrieveCoordinates: () => null,
  markers: [],
};

export default MapContainer;
