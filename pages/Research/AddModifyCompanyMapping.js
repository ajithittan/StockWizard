import { useEffect,useState } from "react"
import {getMasterListOfCompanyFacts,updMasterListOfCompanyFacts} from '../../modules/api/StockDetails'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

const AddModifyCompanyMapping = (props) =>{

    const [allFacts,setAllFacts] = useState(null)
    const [mainTypes,setMainTypes] = useState(null)
    const [selType,setSelType] = useState(null)
    const [currMaps,setCurrMaps] = useState(null)

    useEffect(() =>{
        getMasterListOfCompanyFacts().then(retval => {
                setAllFacts(retval)
                setMainTypes(Object.keys(retval))
            }
        )
    },[])

    const handleChange = (event) => {
      setSelType(event.target.value);
      setCurrMaps([...allFacts[event.target.value].DataKey])
    };

    const updSection = () =>{
      let objSection = {}
      allFacts[selType].DataKey.push(props.selType)
      objSection[selType] = allFacts[selType]
      updMasterListOfCompanyFacts(objSection)
    }

    const deleteMapping = (delitem) =>{
      let objSection = {}
      let delIndx = allFacts[selType].DataKey.indexOf(delitem);
      allFacts[selType].DataKey.splice(delIndx, 1)
      objSection[selType] = allFacts[selType]
      console.log("allFacts[selType]",objSection)
      updMasterListOfCompanyFacts(objSection)
    }

    return (
        <>
        {
            <Box sx={{ minWidth: 120 }}>
                <Grid direction="row" alignItems="stretch" container spacing={{ xs: 1, md: 1 }}>
                    <Grid item  xs={6} sm={6} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Select</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selType}
                            label="Age"
                            onChange={handleChange}
                          >
                            {
                              mainTypes?.map(item => <MenuItem value={item}>{item}</MenuItem>)
                            }
                          </Select>
                        </FormControl>   
                    </Grid>        
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4} >
                      <Button variant="contained" onClick={updSection}>Save</Button>
                    </Grid>        
                </Grid>
                <br></br>
                <Grid
                  container
                  wrap='wrap'
                  >
                  {currMaps?.map((data) => {
                      return (
                          <div style={{marginRight:"5px"}}>
                          <Chip
                          variant={"outlined"}
                          key={data}
                          label={data}
                          color= {"primary"}
                          size="small"
                          cursor="pointer"
                          onDelete={() => deleteMapping(data)} 
                          />
                          </div>
                      );
                  })}
                </Grid>
              </Box>
        }
        </>
    )
}

export default AddModifyCompanyMapping