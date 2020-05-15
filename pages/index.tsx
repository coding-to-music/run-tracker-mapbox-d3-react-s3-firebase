import React from 'react';
import { NextPage } from 'next';

import Map from '../src/features/Map/Map';
import Notifications from '../src/features/Map/Notifications';

const Home: NextPage<{}> = () => {
  return (
    <>
      <Map />
      <Notifications />
    </>
  );
};

export default Home;
