import Slider from '@mui/material/Slider';

const DurationSlider = (props) =>{

    const changeDuration = (e,val) =>{
        props.callBackOnChange(val)
    }

    const marks = [
        {
          value: -1,
          label: 'T',
        },
        {
          value: 0,
          label: 'W',
        },
        {
          value: 3,
          label: '3',
        },
        {
            value: 12,
            label: '12',
          },
          {
            value: 24,
            label: '24',
          },
          {
            value: 60,
            label: '60',
          },
          {
            value: 120,
            label: '120',
          },
          
      ];

    return (
        <Slider
                        size={props.size}
                        defaultValue={props.initialval}
                        aria-label="Small"
                        min={-1}
                        max={120}
                        marks={marks}
                        step={1} 
                        onChangeCommitted={changeDuration}
                        valueLabelDisplay="on"
                        colorPrimary={props.color}
                    />
    )

}

export default DurationSlider