import React from 'react'

export default function Track(props) {
    const {song, id, icon,  actionFunction} = props;
    return (
        <div className='track'>
            {song?<div className="song-info">
                <h3>{song.name}</h3>
                <p>By {song.artist}</p>
                <p>Album: {song.album}</p>
            </div>:null}
            <button onClick={()=>{actionFunction(id)}}>
                {icon}
            </button>
            
        </div>
    )
}
