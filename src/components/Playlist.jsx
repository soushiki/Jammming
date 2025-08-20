import React from 'react'
import Tracklist from './Tracklist'

export default function Playlist(props) {
    const {playlist, handlerFunction, title, enableEdit, edit, handleTitle, handleSave } = props;
    const icon = (<i className="fa-solid fa-trash"></i>);
     return (
        <div className="playlist">
            <div className='playlist-header'>
            {!edit?
                <div className='playlist-title'>
                    <h2>{title}</h2><button onClick={()=>{enableEdit(true)}}>
                    <i className="fa-solid fa-pen-to-square"></i></button>
                </div>
                :
                <div className='playlist-title'>
                    <input  value = {title} onChange={(e)=> {handleTitle(e.target.value)}}/>
                    <button onClick={()=>{enableEdit(false)}}>
                        <i className="fa-solid fa-floppy-disk"></i>
                    </button>
                </div>}
                <button onClick={handleSave}>Save to spotify</button>
                </div>
                
            <Tracklist tracklist={playlist} icon={icon} handlerFunction={handlerFunction}/>
        </div>
    )
}
