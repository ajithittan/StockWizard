import { useEffect, useState } from 'react' 

const SimpleMovAvg = (props) =>{

    const [selSma,setselSma] = useState(null)

    const updateChart = (e) =>{
        if (e.key === 'Enter') {
            if (!isNaN(selSma)){
                props.onsmachange(selSma)
            }
        }
    }
    
    return(
        <> 
            <input className="SMA_DROP" type="text" name="city" list="smalist" value={selSma || "Simple Moving Avg"}
                                onClick={ (e) => e.target.value = null} 
                                onChange={e => setselSma(e.target.value)}
                                onKeyDown={updateChart}></input>

                <datalist id="smalist" onChange={() => console.log("selected here?")}>
                    <option value={20} />
                    <option value={50} />
                    <option value={100} />
                    <option value={200} />
                </datalist>
        </>
    )
}

export default SimpleMovAvg