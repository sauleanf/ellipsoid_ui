/* eslint-disable */
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PagesActions from '../actions/pages.actions';

import PageSets from './set/PageSets';
import { Button, Icon } from '../blocks';
import './styles/page-frame.css';

class PageFrame extends React.Component {
  renderActions() {
    const { setPage, pageSet } = this.props;
    return PageSets.mapPageSet(pageSet, (pageData, pageKey) => {
      const { icon, text } = pageData;
      return (
        <Button
          id="open-user-menu-btn"
          type="transparent"
          color="light"
          onClick={() => setPage(pageKey)}
        >
          <Icon icon={icon} theme="dark" />
          {text}
        </Button>
      );
    })
  }

  renderFooter() {
    const { pageSet } = this.props;
    if (PageSets.isFooterPresent(pageSet)) {
      return (
        <div className="bottom-bar-container fade-in">
          <div className="bottom-bar">
            {this.renderActions()}
          </div>
        </div>
      );
    }
    return null;
  }

  renderPage() {
    const { page, pageSet } = this.props;
    const PageComponent = PageSets.getComponent(pageSet, page);
    return  <PageComponent />;
  }

  render() {


    return (
      <div className="page-frame-container">
        {this.renderPage()}
        {this.renderFooter()}
      </div>
    );
  }
}

PageFrame.propTypes = {
  page: PropTypes.string.isRequired,
  pageSet: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  page: _.last(state.pages.pages),
  pageSet: state.pages.pageSet,
});

const mapDispatchToProps = (dispatch) => ({
  setPage: (page) => dispatch(PagesActions.clearAndPush(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageFrame);
