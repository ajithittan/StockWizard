import { useEffect,useState,createContext,forwardRef,useRef,useContext } from "react"
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList } from 'react-window';
import Typography from '@mui/material/Typography';
import getFullStockList from '../modules/cache/cachestocklist'
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';

export default function StockSymbolSelector(props) {

  const LISTBOX_PADDING = 8; // px
  const [allStks,setAllStks] = useState(null)
  let [initialSetUp,setInitialSetUp] = useState(props.initialset)
  let [newlyAdded,setNewlyAdded] = useState([])

  useEffect(() =>{
      if (!allStks){
          getFullStockList().then(res => {
            setAllStks(res.map(item => item.symbol + " - " + item.companyname))
          })
      }
  },[])
  /*
  useEffect(() =>{
    if(props.initialset && allStks){
      let tempArr = []
      props.initialset.map(item =>{
        if(allStks){
          tempArr.push(allStks[allStks.findIndex(element => element.includes(item))])
        }
      })
      setInitialSetUp([...tempArr])
    }
  },[props.initialset,allStks])
  */

  const StyledPopper = styled(Popper)({
    [`& .${autocompleteClasses.listbox}`]: {
      boxSizing: 'border-box',
      '& ul': {
        padding: 0,
        margin: 0,
      },
    },
  });

  function renderRow(props) {
    const { data, index, style } = props;
    const dataSet = data[index];
    const inlineStyle = {
      ...style,
      top: style.top + LISTBOX_PADDING,
    };

    //only if its grouped.
    if (dataSet.hasOwnProperty('group')) {
      return (
        <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
          {dataSet.group}
        </ListSubheader>
      );
    }

    return (
      <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
        {`${dataSet[1]}`}
      </Typography>
    );
  }

  const OuterElementContext = createContext({});

  const OuterElementType = forwardRef((props, ref) => {
    const outerProps = useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
  });

  function useResetCache(data) {
    const ref = useRef(null);
    useEffect(() => {
      if (ref.current != null) {
        ref.current.resetAfterIndex(0, true);
      }
    }, [data]);
    return ref;
  }

  // Adapter for react-window
  const ListboxComponent = forwardRef(function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData = [];
    children.forEach((item) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    });

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
      noSsr: true,
    });
    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child) => {
      if (child.hasOwnProperty('group')) {
        return 48;
      }

      return itemSize;
    };

    const getHeight = () => {
      if (itemCount > 8) {
        return 8 * itemSize;
      }
      return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={other}>
          <VariableSizeList
            itemData={itemData}
            height={getHeight() + 2 * LISTBOX_PADDING}
            width="100%"
            ref={gridRef}
            outerElementType={OuterElementType}
            innerElementType="ul"
            itemSize={(index) => getChildSize(itemData[index])}
            overscanCount={5}
            itemCount={itemCount}
          >
            {renderRow}
          </VariableSizeList>
        </OuterElementContext.Provider>
      </div>
    );
  });

  ListboxComponent.propTypes = {
    children: PropTypes.node,
  };

  const onTagsChange = (event,item) => {
    if (item){
      let itemClipped = item.split("-")[0].trim()
      newlyAdded.push(itemClipped)
      setNewlyAdded([...newlyAdded])
      initialSetUp && initialSetUp.length > 0 ? initialSetUp.unshift(itemClipped) : initialSetUp = [itemClipped]
      setInitialSetUp([...initialSetUp])
      props.onlyNewOnes ? props.updates(newlyAdded) :props.updates(initialSetUp)  
    }
  }

  const handleDelete = (chipToDelete) => () => {
    let filArr = initialSetUp.filter(item => item !== chipToDelete)
    setInitialSetUp([...filArr])
    props.updates(filArr)
  };

  return (
    <>
      
      <Grid
          container
          wrap='wrap'
          sx={{
            ...props.dispProps
          }}
        >
          {initialSetUp?.map((data) => {
            return (
                <div style={{marginRight:"5px"}}>
                <Chip
                  variant={newlyAdded.includes(data) ? "filled" : "outlined"}
                  label={data}
                  onDelete={handleDelete(data)}
                  color= {newlyAdded.includes(data) ? "success" : "primary"}
                  disabled={props.nodelete}
                  size="small"
                />
                </div>
            );
          })}
      </Grid>
      <Autocomplete
        limitTags={props.limitToShow}
        id="virtualize-stockpicker"
        sx={{ width: props.width > 300? 300 : props.width ,marginTop:"10px" }}
        disableListWrap
        PopperComponent={StyledPopper}
        ListboxComponent={ListboxComponent}
        filterSelectedOptions
        //options={initialSetUp}
        //defaultValue={initialSetUp}
        options={allStks ? allStks : []}
        //groupBy={(option) => option[0].toUpperCase()}
        renderInput={(params) => <TextField label="Stock" {...params} disabled={props.disable}/>}
        renderOption={(props, option, state) => [props, option, state.index]}
        renderGroup={(params) => params}
        onChange={onTagsChange}
    />
    </>
    
  );
}
