import Slider from '@mui/material/Slider';

const DurationSlider = (props) =>{

    const changeDuration = (e,val) =>{
        props.callBackOnChange(val)
    }

    return (
        <Slider
                        size={props.size}
                        defaultValue={props.initialval}
                        aria-label="Small"
                        min={1}
                        max={120}
                        onChangeCommitted={changeDuration}
                        valueLabelDisplay="on"
                        colorPrimary={props.color}
                    />
    )

}

export default DurationSlider