import { useCallback, useEffect, useState } from 'react'
import SearchResults from './components/SearchResults'
import SearchBar from './components/SearchBar'
import Tracklist from './components/Tracklist'
import Spotify from './util/spotify'
import Playlist from './components/Playlist'

function App() {

  const [info, setInfo] = useState([]);
  const [tracklist, setTracklist] = useState([]);
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [title, setTitle] = useState('Playlist');
  const [edit, setEdit] = useState(false);
  const [uriList, setUriList] = useState([]);

  useEffect(()=>{
    setUriList(playlist.map(song => song.uri));
  }, [playlist]);
  const addToPlaylist = (trackId) => {
    let exists;
    playlist.forEach(e=>{
      if(tracklist[trackId].uri == e.uri) exists=true;
    })

    if(exists) return;
    setPlaylist(prev => [tracklist[trackId], ...prev]);
    
    

  }

  const deleteFromPlaylist = (songId) =>{
    setPlaylist(playlist=> playlist.filter((song, id) => id !== songId));
    
    
  }

  const handleSearch = async() =>{
     const result = await Spotify.search(search);
     setTracklist(result);
     
  };

  const saveToSpotify = async() =>
  {
      await Spotify.savePlaylist(title, uriList);
      setPlaylist([]);
      setTitle('Playlist');
      setUriList([]);
  }

  return (
    <>
        <header>
          <h1>JAM<span>MM</span>ING</h1>
          <SearchBar search={search} setSearch={setSearch} onSearch ={handleSearch} />
        </header>
        <main>
          <SearchResults tracklist={tracklist} handlerFunction={addToPlaylist}/>
          <Playlist title={title} handleTitle={setTitle} edit={edit} enableEdit={setEdit} playlist={playlist} setPlaylist={setPlaylist} handlerFunction={deleteFromPlaylist} handleSave={saveToSpotify}/>
        </main>
        
      
    </>
  )
}

export default App
