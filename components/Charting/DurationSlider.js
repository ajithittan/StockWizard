import Slider from '@mui/material/Slider';

const DurationSlider = (props) =>{

    const marks = [
      {
        value: {type:"D",val:1},
        label: 'T',
      },
      {
        value: {type:"M",val:3},
        label: '3',
      },
      {
          value: {type:"M",val:12},
          label: '12',
        },
        {
          value: {type:"M",val:24},
          label: '24',
        },
        {
          value: {type:"M",val:60},
          label: '60',
        },
        {
          value: {type:"M",val:120},
          label: '120',
        },
        
    ];

    const changeDuration = (e,val) =>{
        let obj={}
        if (val === -1){
          obj.type="D"
          obj.val=1
        }else{
          obj.type="M"
          obj.val=val
        }
        props.callBackOnChange(obj)
    }

    return (
        <Slider
                        size={props.size}
                        defaultValue={props.initialval.val}
                        aria-label="Small"
                        min={-1}
                        max={120}
                        marks={marks?.map(item => item.value.val)}
                        step={1} 
                        onChangeCommitted={changeDuration}
                        valueLabelDisplay="on"
                        colorPrimary={props.color}
                    />
    )

}

export default DurationSlider