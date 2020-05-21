import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Artist from './Artist';



const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com';

class App extends Component {
  state = {
    artistQuery:'',
    artist: null,
    track:[ ]
  };

  updateArtistQuery = event => {
  
    this.setState({artistQuery:event.target.value})
  }

  handleKeyPress = event => {
    if(event.key === 'Enter') {
      this.searchArtist();

    }
  }

  searchArtist =() => {
     
    fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
    .then(response => response.json())
    .then(json =>  {
    if(json.artists.total > 0){
      const artist =json.artists.items[0];

     
      this.setState({artist});

      fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
      .then(response => response.json())
      .then(json => this.setState({tracks: json.tracks}))
      .catch(error => alert(error.message));



    }
  })
      
    .catch(error => alert(error.message));
  
  
  }

  render(){
    console.log('this.state',this.state);
  return (
    <div className="container text-center">
      <hr></hr>
        <h1>Music App</h1> 
        <hr></hr>
        <input
         onChange={this.updateArtistQuery} 
         onKeyPress={this.handleKeyPress}
         placeholder='Search for an Artist'/>
        <button onClick={this.searchArtist}> Search</button>
        <hr></hr>
        <div> 
          <Artist artist={this.state.artist}/>
          
          </div>
    </div>
       
  );
}
}

export default App;
