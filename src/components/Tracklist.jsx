import React from 'react'
import Track from './Track'

export default function Tracklist({tracklist, icon, handlerFunction}) {
    return (
        <div className='tracklist'>
            {tracklist.map( (song, id) => 
                <div className="song-container" key={id}>
                    
                        <Track song={song} id={id} icon={icon} actionFunction={handlerFunction}/>
                    
                </div>
            )}
        </div>  
       
    )
}
