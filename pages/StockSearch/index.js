import {useState} from 'react'
import SearchItems from './SearchItems'
import SearchResults from './SearchResults'

const index = () =>{

    const [searchQuery,setSearchQuery] = useState(null)

    return (
      <>
        <SearchItems onsetquery={setSearchQuery}></SearchItems>
        <SearchResults key={searchQuery} query={searchQuery}></SearchResults>
      </>
  )
}

export default index