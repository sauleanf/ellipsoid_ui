import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MapContainer, SpinningIcon } from '../blocks';

import SideMenu from '../components/SideMenu';
import TopBar from '../components/TopBar';

import { Location } from '../schemas';
import { ArticlesActions, LocationsActions, NewsPapersActions } from '../actions';
import './styles/map-page.css';

class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterParam: '',
    };
  }

  componentDidMount() {
    const {
      fetchNewspapers,
      fetchLocations,
    } = this.props;

    fetchNewspapers();
    fetchLocations();
  }

  get locations() {
    const {
      locations,
      filteredLocations,
      filterParam,
    } = this.props;

    if (!_.isEmpty(filterParam)) {
      return filteredLocations;
    }

    return locations;
  }

  retrieveArticles(lng, lat, page) {
    const { fetchArticles } = this.props;
    const { filterParam } = this.state;
    const args = {
      lng,
      lat,
      page,
    };

    if (!_.isEmpty(filterParam)) args.name = filterParam;

    fetchArticles(args);
  }

  renderSideMenu() {
    const { coordinates } = this.props;
    const longitude = coordinates[0];
    const latitude = coordinates[1];

    return (
      <SideMenu
        onPageChange={(newPage) => this.retrieveArticles(longitude, latitude, newPage)}
      />
    );
  }

  render() {
    if (!this.locations) {
      return (
        <div className="map-loading-container">
          <SpinningIcon />
        </div>
      );
    }

    return (
      <div className="main-page-container">
        {this.renderSideMenu()}
        <TopBar />
        <MapContainer
          markers={this.locations}
          onRetrieveCoordinates={(lng, lat) => this.retrieveArticles(lng, lat, 1)}
        />
      </div>
    );
  }
}

MapPage.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape(Location.propType)),
  filteredLocations: PropTypes.arrayOf(PropTypes.shape(Location.propType)),
  filterParam: PropTypes.string,
  coordinates: PropTypes.arrayOf(PropTypes.number),
  fetchLocations: PropTypes.func.isRequired,
  fetchNewspapers: PropTypes.func.isRequired,
};

MapPage.defaultProps = {
  locations: [],
  coordinates: [0, 0],
  filteredLocations: [],
  filterParam: '',
};

const mapStateToProps = (state) => ({
  filterParam: state.locations.filtered.param,
  newspapers: state.newspapers.items,
  locations: state.locations.items,
  filteredLocations: state.locations.filtered.items,
  coordinates: state.articles.coordinates,
});

const mapDispatchToProps = (dispatch) => ({
  fetchArticles: (args) => dispatch(ArticlesActions.getAll(args)),
  fetchNewspapers: () => dispatch(NewsPapersActions.getAll()),
  fetchLocations: () => dispatch(LocationsActions.getAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
