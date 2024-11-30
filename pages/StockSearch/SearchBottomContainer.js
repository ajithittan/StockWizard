import {Box} from '@mui/material';

const SearchBottomContainer = (props) =>{

    return (
        <Box marginLeft={10} marginBottom={2} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth:"90%", backgroundColor:"white" }}>
            {props.component}
        </Box>
    )

}

export default SearchBottomContainer