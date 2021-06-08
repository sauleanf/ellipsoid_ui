import React from 'react';
import PropTypes from 'prop-types';
import './style/navbar.css';

const Navbar = (props) => {
  const { children } = props;
  return (
    <div className="navbar">
      {children}
    </div>
  );
};

Navbar.propTypes = {
  children: PropTypes.node,
};

Navbar.defaultProps = {
  children: null,
};

export default Navbar;
