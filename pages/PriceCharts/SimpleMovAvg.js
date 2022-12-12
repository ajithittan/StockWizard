import { useEffect, useState } from 'react' 

const SimpleMovAvg = (props) =>{

    const [selSma,setselSma] = useState(null)

    useEffect(() =>{
        if (selSma){
            const timeOutId = setTimeout(() => updateChart(), 300)
            return () => clearTimeout(timeOutId)    
        }
    },[selSma])

    const updateChart = () =>{
            if (!isNaN(selSma)){
                console.log("selSma",selSma)
                props.onsmachange(selSma)
            }
    }
    
    return(
        <> 
            <input className="SMA_DROP" type="text" name="city" list="smalist" value={selSma || "Simple Moving Avg"}
                                onClick={ (e) => e.target.value = null} 
                                onChange={e => setselSma(e.target.value)}>
            </input>
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