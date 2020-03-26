import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const App = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={"pk.eyJ1Ijoic3VuZGVlcHAyOSIsImEiOiJjazg4ejY3NWwwMWppM2VxbHEwdjR6ZTQ2In0.J85AQOG_ClfZ_RE1UKgU0Q"}
      onViewportChange={setViewport}
    />
  );
}


export default App