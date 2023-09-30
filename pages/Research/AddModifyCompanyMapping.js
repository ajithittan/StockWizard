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
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const AddModifyCompanyMapping = (props) =>{

    const [allFacts,setAllFacts] = useState(null)
    const [mainTypes,setMainTypes] = useState(null)
    const [selType,setSelType] = useState(null)
    const [currMaps,setCurrMaps] = useState(null)
    const [showFilter,setShowFilter] = useState(false)
    const [filterVals,setFilterVals] = useState(["USD","USD/shares"])
    const [selFilterVal,setSelFilterVal] = useState(null)
    
    useEffect(() =>{
        getMasterListOfCompanyFacts().then(retval => {
                setAllFacts(retval)
                setMainTypes(Object.keys(retval))
            }
        )
    },[])

    const handleChange = (event,data) => {
      if (data){
        setSelType(data);
        setCurrMaps([...allFacts[data].DataKey.sort()])  
        setShowFilter(true)
      }else{
        setSelType(null);
        setCurrMaps(null)  
        setShowFilter(false)
      }
    };

    const handleChangesInField = (e,d) => {
      if (e.target.value !== ""){
        setShowFilter(true)
        setSelType(e.target.value )
      }else{
        setShowFilter(false)
      }
    }

    const updSection = () =>{
      let objSection = {}
      if (props.selType && allFacts[selType]){
        allFacts[selType].DataKey.push(props.selType)
        objSection[selType] = allFacts[selType]  
      }else{
        let tempvals = {}
        tempvals["DataKey"] = [props.selType]
        tempvals["FilterKeyLevel1"] = selFilterVal
        objSection[selType] = tempvals
      }
      updMasterListOfCompanyFacts(objSection).then(retval => {
        currMaps ? (currMaps.push(props.selType),setCurrMaps([...currMaps])) : setCurrMaps([props.selType])
      })
    }

    const deleteMapping = (delitem) =>{
      let objSection = {}
      let delIndx = allFacts[selType].DataKey.indexOf(delitem);
      allFacts[selType].DataKey.splice(delIndx, 1)
      setAllFacts(allFacts)
      objSection[selType] = allFacts[selType]
      updMasterListOfCompanyFacts(objSection).then(retval => {
        setCurrMaps([...currMaps.filter(item => item !== delitem)])
      })
    }

    return (
        <>
        {
            <Box sx={{ minWidth: 120 }}>
                <Grid direction="row" alignItems="stretch" container spacing={{ xs: 1, md: 1 }}>
                    <Grid item  xs={6} sm={6} md={4} lg={4} xl={4}>
                      <Autocomplete
                        freeSolo
                        id="autocompletetypes"
                        value={selType}
                        options={mainTypes?.map((option) => option)}
                        onChange={handleChange}
                          renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Find Types"
                            InputProps={{
                              ...params.InputProps,
                              type: 'search'
                            }}
                            onChange={handleChangesInField}
                          />
                        )}
                      />
                    </Grid>        
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4} >
                      {showFilter ?  <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Select</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Filter"
                            value = {allFacts ? allFacts[selType]?.FilterKeyLevel1 : null}
                            onChange={(d) => setSelFilterVal(d.target.value)}
                          >
                            {
                              filterVals?.map(item => <MenuItem value={item}>{item}</MenuItem>)
                            }
                          </Select>
                        </FormControl> : null}
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