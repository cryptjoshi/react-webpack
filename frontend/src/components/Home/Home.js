import React, { Component } from 'react'
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

class HomeComponent extends React.Component {
  render() {
    return(
       <div>
        <h1>Home Component</h1>
       </div>
  )
}
  }


export default withStyles(s)(HomeComponent);