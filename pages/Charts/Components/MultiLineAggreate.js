import {nest} from 'd3-collection'

const MultiLineAggregate = (charData) =>{
        return (nest()
            .key(d => d.symbol)
            .entries(charData));  
}

export default MultiLineAggregate