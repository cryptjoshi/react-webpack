import React from 'react';
import PropTypes from 'prop-types';
import { FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles'
 import s from './Home.css'
import cx from 'classnames';
import Home from '../../components/Home/Home';

class Homepage extends React.Component {
  componentDidMount(){

  }
    render() {
        return (
          <div className={s.root}>
                <h1>Hello React Webpack5</h1>
                <p>It on SSR mode</p>
       
 
            </div>
        )
    }
}
export default withStyles(s)(Homepage)