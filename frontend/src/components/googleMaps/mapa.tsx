import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

function MapContainer(props: any) {
    return (
        <Map google={props.google} zoom={15}>

            <Marker onClick={props.onMarkerClick}
            />

        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDN-yaeDDrjeAct-Y3mnCMwqiPG_kNLLPQ')
})(MapContainer)


















