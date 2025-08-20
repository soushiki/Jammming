import React from 'react'

export default function SearchBar(props) {
    const {search, setSearch, onSearch} = props;
    const handleSubmit =  (e)=>{
        e.preventDefault();
        onSearch();
        
    }

    return (
        <>
            <form className="searchbar" onSubmit={handleSubmit}>
                <input  value={search} onChange={(e=>setSearch(e.target.value))} type="text" placeholder="“Cbat,” by Hudson Mohawke"/>
                <button type="submit">Go for it</button>
            </form>  
      
        </>
    )
}
