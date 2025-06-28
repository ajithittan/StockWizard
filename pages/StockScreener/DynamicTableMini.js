const DynamicTableMini = ({ jsonData, actions }) =>{

    const handleClick = (val) => {
        const actionval = {action:'showAllPattrns'}
        actions(actionval)
      }

    return(
        <button onClick={handleClick}>Click Me</button>
    )
}

export default DynamicTableMini