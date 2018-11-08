//get GoogleMaps
export function googleMaps() {
  return new Promise(function(resolve, reject) {
    window.resolveGoogleMapsPromise = function() {
      resolve(window.google);
      delete window.resolveGoogleMapsPromise;
    }

    const script = document.createElement("script");
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCmXX__nvLYo85WFMr-wcEnLPbBsehHkQg&callback=resolveGoogleMapsPromise';
    script.async = true;
    document.body.appendChild(script);
  });
}


//get FourSquare
export function loadVenues(){
return fetch('https://api.foursquare.com/v2/venues/search?client_id=F3JNOFTHGUG15MCCRNI0XUCFTFKD25QZXFLHWLG3MRM3YWPQ&client_secret=BFDK1YJX1MV4FQGN20X40FZI3UVDEMA5MMLQPR0DNSBVN3VA&v=20180511&limit=30&near=tel-aviv&query=pizza')
  .then(res => res.json())
  .catch((e) => alert(`${e} couldn't load places`))
}
