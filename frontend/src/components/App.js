import React,{Children} from "react";
import { ReactDOM } from "react";
import PropTypes from "prop-types";
const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.any.isRequired,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  store: PropTypes.shape({
    subscribe: PropTypes.any.isRequired,
    dispatch: PropTypes.any.isRequired,
    getState: PropTypes.any.isRequired,
  }).isRequired,
  // Apollo Client
  client: PropTypes.object.isRequired,
};
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