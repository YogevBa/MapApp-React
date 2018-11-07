import React, { Component } from 'react';
import { googleMaps, loadVenues} from './API'
import Header from './Components/Header'
import Footer from './Components/Footer'

import './App.css';

class App extends Component {

  state = {
    venues: [],
    showedVenues: [],
    query: ''
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
    this.infowindow = new google.maps.InfoWindow();
    this.markers = [];
    this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: venues[0].location.lat, lng: venues[0].location.lng},
            zoom: 10
          });

    venues.forEach(venue => {
      let marker = new google.maps.Marker({
      position: { lat: venue.location.lat, lng: venue.location.lng},
      map: this.map,
      venue: venue,
      id: venue.id,
      name: venue.name,
      animation: google.maps.Animation.DROP
    });

      let infoBox = '<div class="infoBox">' +
         '<h2>' + venue.name + '</h2>' +
         '<p>' + 'City: '+ venue.location.city + '</p>' +
         '<p>' + 'Address: '+ venue.location.address + '</p>' +
         '</div>';

         //infoWindow on click event
         marker.addListener('click', () => {
           if (marker.getAnimation() !== null) { marker.setAnimation(null); }
           else { marker.setAnimation(google.maps.Animation.BOUNCE); }
           setTimeout(() => { marker.setAnimation(null) }, 2000)
         });

         google.maps.event.addListener(marker, 'click', () => {
           this.infowindow.setContent(infoBox);
           this.infowindow.open(this.map, marker);
           this.map.setCenter(marker.position);
           this.map.setZoom(13);
         });

         this.markers.push(marker);
         this.setState({ showedVenues : this.state.venues })
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
