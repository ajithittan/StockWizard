import {useContext} from 'react'
import {CreateChartContext} from './ChartContext'

const ModalBoxContent = (props) =>{
    
    const value = useContext(CreateChartContext)
    //props.action()

    console.log("comntext value")

    const openChart = () => {
        console.log("ModalBoxContent....click open chart")
        props.action()
    }

    return(        
        <div>
            <p>This is the modal box, {value}</p>
            <input type="button" name="chart" value="chart" onClick={() => openChart()}></input>
        </div>
    )

};

export default ModalBoxContent;