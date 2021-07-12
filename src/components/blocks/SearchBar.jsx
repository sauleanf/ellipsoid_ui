import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './styles/search-bar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  onChange(value) {
    const { filter } = this.props;
    filter(value);
    this.setState({
      value,
    });
  }

  render() {
    const { value } = this.state;
    return (
      <div className={`search-bar-container ${_.isEmpty(value) ? null : 'search-bar-container-filled'}`}>
        <i className="search-bar-icon fas fa-search" />
        <input
          className={`search-bar-container-input ${_.isEmpty(value) ? null : 'search-bar-input-filled'}`}
          type="text"
          value={value}
          placeholder="Enter a location"
          onChange={(e) => this.onChange(e.target.value)}
        />
        <button
          className={`search-bar-clear-btn ${_.isEmpty(value) ? null : 'search-bar-input-filled'}`}
          type="button"
          onClick={() => this.onChange('')}
        >
          <i className="fas fa-times" />
        </button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  filter: PropTypes.func.isRequired,
};

export default SearchBar;
