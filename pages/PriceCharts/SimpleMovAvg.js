import { useEffect, useState } from 'react' 

const SimpleMovAvg = (props) =>{

    const [selSma,setselSma] = useState(props.initalsma)
    
    return(
        <> 
            <select className="SMA_DROP" id="SMA" onChange={e => props.onsmachange(e.target.value)}>
                <option value="0">Simple Moving Avg</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="200">200</option>
            </select> 
            {
                selSma ? selSma.map(item => <><br></br><span className="SMA_TEXT">{item.sma} - SMA</span></>) : null
            }
        </>
    )
    
}

export default SimpleMovAvg