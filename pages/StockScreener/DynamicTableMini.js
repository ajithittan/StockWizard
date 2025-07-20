import Button from '@mui/material/Button';

const DynamicTableMini = ({ jsonData, actions }) =>{

    const handleClick = (val) => {
        const actionval = {action:'showAllPattrns'}
        actions(actionval)
      }

    return(
        <Button size="small" variant="contained" onClick={handleClick}>Back to List</Button>
    )
}

export default DynamicTableMini