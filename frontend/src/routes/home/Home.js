import React, { Component } from 'react'
import PropTypes from 'prop-types';
// import {
//         Button, 
//         Form, 
//         Grid,
//         Row, FormGroup,
//         Col,
//         ControlLabel,
//         FormControl,
//         FieldGroup,
//         ButtonGroup,
//         Radio,
//         ButtonToolbar,
//         DropdownButton,
//         MenuItem,
//         ProgressBar
//         } 

//         from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';



class Home extends React.Component {
    static propTypes = { layoutType:PropTypes.string.isRequired}
    render(){
    const {layoutType} = this.props
    
    return(
       <div>
        {{layoutType}}
       </div>
  )
    }
}
  


export default withStyles(s)(Home);