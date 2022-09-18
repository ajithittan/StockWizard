import React from 'react';

const MainGrid = (props) => {

  return (
    <>
      <div className="flex-container2">
        {props.items ? props.items.map(item => 
            <div>
              <fieldset className="field_set_charts">
                <legend className="SecPerfHeader">{item.props.name}</legend>
                {item}
              </fieldset>
            </div>
        ):null}
       </div> 
    </>
  );
}

export default MainGrid 