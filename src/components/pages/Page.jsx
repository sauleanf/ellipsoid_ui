import React from 'react';
import PropTypes from 'prop-types';
import './styles/page.css';

const Page = (props) => {
  const { children } = props;
  return (
    <div className="page fade-in">
      {children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node,
};

Page.defaultProps = {
  children: null,
};

export default Page;
