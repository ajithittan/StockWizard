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


export default function StockSymbolSelector(props) {

  const LISTBOX_PADDING = 8; // px
  const [allStks,setAllStks] = useState(null)
  let [initialSetUp,setInitialSetUp] = useState(props.initialset)

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

  const onTagsChange = (event,values) => props.updates(values.map(item => item.split("-")[0].trim()))
  

  return (
    <Autocomplete
      multiple
      limitTags={props.limitToShow}
      id="virtualize-demo"
      sx={{ width: props.width }}
      disableListWrap
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      filterSelectedOptions
      //options={initialSetUp}
      defaultValue={initialSetUp}
      options={allStks ? allStks : []}
      //groupBy={(option) => option[0].toUpperCase()}
      renderInput={(params) => <TextField {...params} disabled={props.disable}/>}
      renderOption={(props, option, state) => [props, option, state.index]}
      // TODO: Post React 18 update - validate this conversion, look like a hidden bug
      renderGroup={(params) => params}
      onChange={onTagsChange}
    />
  );
}