import { useState } from 'react'
import SearchItems from './SearchItems'
import SearchResults from './SearchResults'
import SearchSpeedDial from './SearchSpeedDial'
import SavedSearchQueries from './SavedSearchQueries'
import SearchBottomContainer from './SearchBottomContainer'

const index = () =>{
    const [showBottom,setShowBottom] = useState(null)

    const getComponent = () =>{
      const mappingOfItems = {
        "SQ":<SavedSearchQueries/>
      }
      return mappingOfItems[showBottom]
    }

    return (
      <>
        <SearchItems></SearchItems>
        <SearchResults selected={showBottom}></SearchResults>
        <SearchSpeedDial selected={showBottom} onselect={setShowBottom}></SearchSpeedDial>
        <SearchBottomContainer component={getComponent()}/>
      </>
  )
}

export default index