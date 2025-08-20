import React from 'react'
import SearchBar from './SearchBar'
import Tracklist from './Tracklist'

export default function SearchResults({tracklist, handlerFunction}) {

    


    const addIcon = (<i className="fa-solid fa-plus"></i>);
    return (
        <div className='search-results-container'>
            <h2>Results</h2>
            <Tracklist tracklist={tracklist} icon={addIcon} handlerFunction={handlerFunction}/>
            
        </ div>
    )
}
