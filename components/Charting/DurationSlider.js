import Slider from '@mui/material/Slider';

const DurationSlider = (props) =>{

    const changeDuration = (e,val) =>{
        props.callBackOnChange(val)
    }

    const marks = [
        {
          value: 1,
          label: '1 M',
        },
        {
            value: 6,
            label: '6 M',
          },
          {
            value: 12,
            label: '12 M',
          },
          {
            value: 24,
            label: '24 M',
          },
          {
            value: 60,
            label: '60 M',
          },
          {
            value: 120,
            label: '120 M',
          },
          
      ];

    return (
        <Slider
                        size={props.size}
                        defaultValue={props.initialval}
                        aria-label="Small"
                        min={1}
                        max={120}
                        marks={marks}
                        step={1} 
                        onChangeCommitted={changeDuration}
                        valueLabelDisplay="auto"
                        colorPrimary={props.color}
                    />
    )

}

export default DurationSlider