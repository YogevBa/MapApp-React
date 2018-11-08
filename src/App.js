import React, { Component } from 'react';
import { googleMaps, loadVenues} from './API'
import Header from './Components/Header'
import Footer from './Components/Footer'
import SideBar from './Components/SideBar'

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
    this.setState({venues: data[1].response.venues})

    this.google = google
    this.infowindow = new google.maps.InfoWindow();
    this.markers = [];
    this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: this.state.venues[0].location.lat, lng: this.state.venues[0].location.lng},
            zoom: 10
          });

    this.state.venues.forEach(venue => {

      let infoBox = `<div class="infoBox">
         <h2>${venue.name}</h2>
         <p>City: ${venue.location.city}</p>
         <p>Address: ${venue.location.address}</p>
         </div>`;


      let marker = new google.maps.Marker({
      position: { lat: venue.location.lat, lng: venue.location.lng},
      map: this.map,
      venue: venue,
      id: venue.id,
      name: venue.name,
      content: infoBox,
      animation: google.maps.Animation.DROP
    });



         //infoWindow on click event
         marker.addListener('click', () => {
           if (marker.getAnimation() !== null) { marker.setAnimation(null); }
           else { marker.setAnimation(google.maps.Animation.BOUNCE); }
           setTimeout(() => { marker.setAnimation(null) }, 2000)
         });

         google.maps.event.addListener(marker, 'click', () => {
         this.infowindow.setContent(marker.content);
         this.infowindow.open(this.map, marker);
         this.map.setCenter(marker.position);
         this.map.setZoom(13);
         });

         this.markers.push(marker);
         this.setState({ showedVenues : this.state.venues })
    })
  })
}

filterVenues = (query) => {
  let filtered = this.state.venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));
  this.markers.forEach(marker => {
  marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
  marker.setVisible(true) : marker.setVisible(false)
  })

  this.setState({showedVenues : filtered, query});
}

listItemClick = (venue) => {
  let marker = this.markers.filter(m => m.id === venue.id)[0]
  this.infowindow.setContent(marker.content)
  this.infowindow.open(this.map, marker)
  this.map.setCenter(marker.position);
  this.map.setZoom(13);
  if (marker.getAnimation() !== null) { marker.setAnimation(null); }
  else { marker.setAnimation(this.google.maps.Animation.BOUNCE); }
  setTimeout(() => { marker.setAnimation(null) }, 2000)
}

  render() {
    return (
      <div className="App">
      <Header/>
        <div id="map"></div>
        <SideBar
        showedVenues={this.state.showedVenues}
        query={this.state.query}
        listItemClick={this.listItemClick}
        filterVenues={this.filterVenues}
        />
        <Footer/>
      </div>
    );
  }
}







export default App;
