import { Popup } from 'semantic-ui-react';
import React from 'react';

// eslint-disable-next-line react/prop-types
function MyPopup({ content, children }) {
  return <Popup inverted content={content} trigger={children} />;
}

export default MyPopup;
