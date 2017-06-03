import axios from 'axios';
import React from 'react';

import RestoreSession from '../components/restoreSession.jsx';

function openSessionTabs() {
  axios.get('/pageviews/active')
  .then((res) => {
    res.data.forEach((page) => {
      window.open(page.url, '_blank');
    });
  })
  .catch((err) => {
    console.log(err);
  });
}

const RestoreSessionContainer = () => (
  <RestoreSession openSessionTabs={openSessionTabs} />
);

export default RestoreSessionContainer;
