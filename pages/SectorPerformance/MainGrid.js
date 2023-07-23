import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  margin:"15px",
  color: theme.palette.text.secondary,
  height: "100%",
}));

const MainGrid = (props) => {

  return (
    <Box sx={{ flexGrow: 1,margin:"40px" }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {props.items?.map((chart, index) => ( 
          <Grid item xs={12} sm={6} md={4} lg={3-props.adjust} xl={3-props.adjust} key={index}>
            <Item>
            <Typography variant="h10">{chart.props.name}</Typography>
            {chart}</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MainGrid 