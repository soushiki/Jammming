import {Buffer} from 'buffer';
const clientId = 'c65340153118417ebb7f66877ea75177';
const client_secret = process.env.CLIENT_SECRET; // Insert client ID here.
const redirectUri = 'http://127.0.0.1:5174'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
const TOKEN = 'https://accounts.spotify.com/api/token';
let accessToken;

const Spotify = {
  getAccessToken() {

    const authorize = 'https://accounts.spotify.com/authorize?';
    let endpointurl = '';
    endpointurl += authorize;
    let params = `client_id=${clientId}&response_type=code&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    endpointurl += params;
    window.location.href=endpointurl;
    
    
  },

  onLoad(){
    
    let code = null;
    const queryString = window.location.search;
    if(queryString.length > 0){
      const urlParams = new URLSearchParams(queryString);
      code = urlParams.get('code');
      console.log(code);
      Spotify.callAuthApi(code);
      window.history.pushState("","",redirectUri);
    }

  },
  callAuthApi(code){
  
    let body = `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${client_secret}`;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN,  true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + (new Buffer.from(clientId + ':' + client_secret).toString('base64')));
    xhr.send(body);
    xhr.onload = Spotify.handleAuthorizationResponse;


  },
  handleAuthorizationResponse(){

    
    if ( this.status == 200){
      let data = JSON.parse(this.responseText);
      
      if(data.access_token != undefined){
        let access_token = data.access_token;
        localStorage.setItem('access_token', access_token)
        accessToken = access_token;
      }
      if( data.refresh_token != undefined){
        let refresh_token = data.refresh_token;
        localStorage.setItem('refresh_token', refresh_token);
        
      }
      return accessToken;
      
    }
    else {
      console.log(this.responseText);
      alert(this.responseText);
    }

  },

  async search(term) {
    
    Spotify.onLoad();
    
    console.log("let's look for a song")
    try{
      accessToken = localStorage.getItem('access_token');
    }
    catch(err){
      console.log(err);
    }
    
    console.log(accessToken);
    return await fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        console.log('didnt find shit');
        return [];
      }

      console.log('did find');
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
    
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
};

export default Spotify;
