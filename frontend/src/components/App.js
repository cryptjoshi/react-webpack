import React from "react";
import { ReactDOM } from "react";
import PropTypes from "prop-types";
const ContextType = {}
class App extends React.PureComponent {
    static propTypes = {
        context: PropTypes.shape(ContextType).isRequired,
        children: PropTypes.element.isRequired,
      };
    
      static childContextTypes = ContextType;
    
      constructor(props) {
        super(props);
      }
      getChildContext() {
        return this.props.context;
      }
      render(){
        return(
            <>
            {Children.only(this.props.children)}
            </>
        )
      }
}

export default App