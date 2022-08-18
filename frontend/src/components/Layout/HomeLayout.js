import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
// import HomeHeader from '../Header/HomeHeader';
// import Feedback from '../Feedback';
// import FooterToggle from '../FooterToggle';
// import Footer from '../Footer';
import cx from 'classnames';
// import CookiesDisclaimer from '../CookiesDisclaimer';

class HomeLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { layoutType } = this.props;

    return (
      <div>
        <h1>Header</h1>
        {/* <HomeHeader borderLess={true} layoutType={layoutType} /> */}
        {this.props.children}
        {/* <Feedback />
         <div className={cx('hidden-xs hidden-sm')}>
          <FooterToggle />
        </div>
        <div className={cx('hidden-lg', 'hidden-md')}> 
        <Footer />
        </div> 
    <CookiesDisclaimer />*/}
      </div>
    );
  }
}

export default withStyles(s)(HomeLayout);
