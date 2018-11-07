import  React, { Component } from 'react';

class SideBar extends Component {

  render() {
    return (
      <div className="sideBar">
        <input
          type="search"
          aria-label="search text"
          id={"search"}
          placeholder={"Search For Places"}
          tabIndex="0"
          value={this.props.query}
          onChange={(evt) => this.props.filterVenues(evt.target.value)}
           />

          <ol className="venueList">
              {this.props.showedVenues && this.props.showedVenues.length > 0 && this.props.showedVenues.map(venue => (
                <li key={venue.id}
                  onClick={() => { this.props.listItemClick(venue) }}
                  className="entry"
                  tabIndex="0"
                  role="option"
                  aria-selected="false"
                  id={venue.id}
                >
                <h2>{venue.name}</h2>
                </li>
              ))}
          </ol>

      </div>
    )
  }
}

export default SideBar;
