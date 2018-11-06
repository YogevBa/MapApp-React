import React, { Component } from 'react';
import { googleMaps, loadVenues} from './API'
import Header from './Components/Header'
import Footer from './Components/Footer'

import './App.css';

class App extends Component {

  state = {
    venues: []
  }

  componentDidMount() {
    let googleMapsPromise = googleMaps();
    let fourSquareVenues = loadVenues();

    Promise.all([
      googleMapsPromise,
      fourSquareVenues
  ])
  .then((data) => {
    let google = data[0]
    let venues = data[1].response.venues;

    this.google = google
    this.markers = [];
    this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: venues[0].location.lat, lng: venues[0].location.lng},
            zoom: 10
          });

          venues.forEach(venue => {
            let marker = new google.maps.Marker({
              position: { lat: venue.location.lat, lng: venue.location.lng},
              map: this.map
      });
    })
  })
}
  render() {
    return (
      <div className="App">
      <Header/>
        <div id="map"></div>
        <Footer/>
      </div>
    );
  }
}







export default App;
