import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
// eslint-disable-next-line camelcase
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';

import ClickPulse from './ClickPulse';

import './styles/map-container.css';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pulsingClick: null,
    };
  }

  componentDidMount() {
    this.createMap();
  }

  componentWillUnmount() {
    this.deleteMap();
  }

  onRetrieveCoordinates(e) {
    if (_.isUndefined(e.event)) return;

    const { longitude, latitude } = this.map.svgPointToGeo(e.svgPoint);
    const { clientX, clientY } = e.event;

    this.setState({
      pulsingClick: (<ClickPulse
        key={`${clientX}-${clientY}`}
        x={clientX}
        y={clientY}
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

    const { onRetrieveCoordinates } = this.props;
    onRetrieveCoordinates(longitude, latitude);
  }

  createMapMarkerTemplate() {
    this.mapImage = this.imageSeries.mapImages.template;
    this.mapMarker = this.mapImage.createChild(am4core.Sprite);
    this.mapMarker.path = 'M4 12 A12 12 0 0 1 28 12 C28 20, 16 32, 16 32 C16 32, 4 20 4 12 M11 12 A5 5 0 0 0 21 12 A5 5 0 0 0 11 12 Z';
    this.mapMarker.width = 32;
    this.mapMarker.height = 32;
    this.mapMarker.scale = 0.7;
    this.mapMarker.fill = am4core.color('#3F4B3B');
    this.mapMarker.fillOpacity = 0.8;
    this.mapMarker.horizontalCenter = 'middle';
    this.mapMarker.verticalCenter = 'bottom';
  }

  createMap() {
    this.map = am4core.create('mapchart', am4maps.MapChart);
    // eslint-disable-next-line camelcase
    this.map.geodata = am4geodata_worldLow;

    this.map.projection = new am4maps.projections.Eckert6();
    this.polygonSeries = this.map.series.push(new am4maps.MapPolygonSeries());
    this.polygonSeries.useGeodata = true;

    this.map.seriesContainer.draggable = false;
    this.map.seriesContainer.resizable = false;

    // creates an event that grabs the coordinates when clicked
    this.map.seriesContainer.events.on('hit', (e) => {
      this.onRetrieveCoordinates(e);
    });

    this.renderLocations();
  }

  deleteMap() {
    this.map.dispose();
  }

  renderLocations() {
    this.imageSeries = this.map.series.push(
      new am4maps.MapImageSeries(),
    );

    this.createMapMarkerTemplate();

    const { markers } = this.props;
    _.each(markers, (location) => {
      const marker = this.imageSeries.mapImages.create();
      const [longitude, latitude] = location.coordinates;

      marker.latitude = latitude;
      marker.longitude = longitude;
    });
  }

  render() {
    const { pulsingClick } = this.state;

    return (
      <div className="map-container">
        {pulsingClick}
        <div id="mapchart" />
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
