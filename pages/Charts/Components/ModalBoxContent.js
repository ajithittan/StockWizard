import {useContext} from 'react'
//import {CreateChartContext} from './ChartContext'

const ModalBoxContent = (props) =>{
    
    //const value = useContext(CreateChartContext)
    props.action()

    console.log("comntext value")

    return(        
        <div>
            <p>This is the modal box, {value}</p>
            <input type="button" name="chart" value="chart" onClick={() => props.action}></input>
        </div>
    )

};

export default ModalBoxContent;