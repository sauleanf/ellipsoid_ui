import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PagesActions from '../../actions/pages.actions';

import PageSets from './config';
import { Button, FAB, Icon } from '../blocks';
import './styles/page-frame.css';

class PageFrame extends React.Component {
  renderActions() {
    const { setPage, pageGroup } = this.props;
    return PageSets.mapPageSet(pageGroup, (pageData, pageKey) => {
      const { icon, text } = pageData;
      return (
        <Button
          key={text}
          id="open-user-menu-btn"
          type="transparent"
          color="light"
          onClick={() => setPage(pageKey)}
        >
          <Icon icon={icon} theme="dark" />
          {text}
        </Button>
      );
    });
  }

  renderFooter() {
    const { pageGroup } = this.props;
    if (PageSets.isFooterPresent(pageGroup)) {
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

  renderFAB() {
    const { pages } = this.props;
    if (pages.length < 2) {
      return null;
    }
    const { popPage } = this.props;
    return <FAB onClick={() => popPage()} text="Go back" icon="fas fa-arrow-left" />;
  }

  renderPage() {
    const { pages, pageGroup } = this.props;
    const page = _.last(pages);

    const PageComponent = PageSets.getComponent(pageGroup, page);

    return <PageComponent />;
  }

  render() {
    return (
      <div className="page-frame-container">
        {this.renderPage()}
        {this.renderFAB()}
        {this.renderFooter()}
      </div>
    );
  }
}

PageFrame.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.string).isRequired,
  pageGroup: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
  popPage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pages: state.pages.pages,
  pageGroup: state.pages.group,
});

const mapDispatchToProps = (dispatch) => ({
  setPage: (page) => dispatch(PagesActions.clearAndPushPage(page)),
  popPage: () => dispatch(PagesActions.popPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageFrame);
