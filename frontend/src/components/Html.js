import React from "react";
import PropTypes from "prop-types";
// import serialize from 'serialize-javascript';
// import { analytics } from '../config';
// import { isRTL } from '../helpers/formatLocale';
class Html extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }
  render() {
    const { title, description, styles, scripts, state, lang, children, image } = this.props;
    return (
      <html className="no-js" lang={lang}>
        <head>
          <meta charSet="utf-8" />
        </head>
        <body>
          <div
            id="app"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: children }}
          />
        </body>
      </html>
    );
  }
}

export default Html;
