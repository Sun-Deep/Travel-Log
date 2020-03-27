import React, { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {listLogEntries} from './API'
import LogEntryForm from './LogEntryForm'


const App = () => {
  const [logEntries, setLogEntries] = useState([])
  const [showPopup, setShowPopup] = useState({})
  const [addEntryLocation, setAddEntryLocation] = useState(null)
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 2
  });

  const getEntries = async () => {
      const logEntries = await listLogEntries()
      setLogEntries(logEntries)
  }

  useEffect(() => {
    getEntries()
  }, [])

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat
    setAddEntryLocation({
      latitude,
      longitude
    })
  }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/sundeepp29/ck89s673b0e081irsrj2bhdym"
      mapboxApiAccessToken={"pk.eyJ1Ijoic3VuZGVlcHAyOSIsImEiOiJjazg4ejY3NWwwMWppM2VxbHEwdjR6ZTQ2In0.J85AQOG_ClfZ_RE1UKgU0Q"}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(entry => (
          <React.Fragment key = {entry._id}>
            <Marker 
              
              latitude={entry.latitude} 
              longitude={entry.longitude} 
            >
              <div
                 onClick = {() => setShowPopup({
                  [entry._id]: true
                })}
              >
                <img 
                  style={{
                    height:`${6 * viewport.zoom}px`,
                    width:`${6 * viewport.zoom}`
                  }}
                  className="marker" 
                  src="https://i.imgur.com/y0G5YTX.png" 
                  alt="marker"/>
              </div>
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                latitude={entry.latitude} 
                longitude={entry.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setShowPopup({
                  
                  [entry._id]: false
                })}
                  anchor="top" >
                  <div className="popup">
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
                    
                    <small>Visited on: {new Date(entry.visitDate).toLocaleString()}</small>
                    {entry.image ? <img src={entry.image} alt={entry.title} />: null}
                  </div>
                </Popup>
              ) : null
            }
          </React.Fragment>
        ))
      }
      {
        addEntryLocation ? (
          <>
          <Marker 
              
              latitude={addEntryLocation.latitude} 
              longitude={addEntryLocation.longitude} 
            >
              <div>
                <img 
                  style={{
                    height:`${6 * viewport.zoom}px`,
                    width:`${6 * viewport.zoom}`
                  }}
                  className="marker" 
                  src="https://i.imgur.com/y0G5YTX.png" 
                  alt="marker"/>
              </div>
            </Marker>
            <Popup
                latitude={addEntryLocation.latitude} 
                longitude={addEntryLocation.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setAddEntryLocation(null)}
                  anchor="top" >
                  <div className="popup">
                   <LogEntryForm 
                    onClose={() => {
                      setAddEntryLocation(null)
                      getEntries()
                    }}
                    location={addEntryLocation}/>
                  </div>
            </Popup>
          </>
        ) : null
      }
    </ReactMapGL>
  );
}


export default App