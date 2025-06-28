import DeleteIcon from '@mui/icons-material/Delete';

const DynamicChartMini = ({ label, actions }) =>{

  const handleClick = (val) => {
      const actionval = {action:'focus'}
      actions('focus')
  }

  const removeFromList = () => {
    const actionval = {action:'remove'}
    actions('remove')
  }

  return(
      <>
      <button onClick={handleClick}>{label}</button>
      <DeleteIcon onClick={removeFromList} sx={{cursor:"pointer"}}></DeleteIcon>
      </>
  )
}

export default DynamicChartMini