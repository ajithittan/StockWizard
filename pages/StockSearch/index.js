import {useState} from 'react'
import SearchItems from './SearchItems'
import SearchResults from './SearchResults'

const index = () =>{

    const [searchQuery,setSearchQuery] = useState(null)
    const [qryFromRes,setQryFromRes] = useState(null)

    return (
      <>
        <SearchItems onsetquery={setSearchQuery} qryfrmres={qryFromRes} ></SearchItems>
        <SearchResults key={searchQuery} query={searchQuery} addToQuery={setQryFromRes}></SearchResults>
      </>
  )
}

export default index