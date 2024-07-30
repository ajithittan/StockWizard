import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem,treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { useEffect,  useState } from "react"
import WaitingForResonse from '../../components/WaitingForResponse'
import { styled, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ListView = (props) =>{
    const sm = useMediaQuery("(max-width: 700px)");
    const [treeData,setTreeData] = useState(null)
    const [showActions,setShowActions] = useState(null)

    const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[800]
            : theme.palette.grey[200],
        [`& .${treeItemClasses.content}`]: {
          borderRadius: theme.spacing(0.5),
          padding: theme.spacing(0.5, 1),
          margin: theme.spacing(0.2, 0),
          [`& .${treeItemClasses.label}`]: {
            fontSize: '0.8rem',
            fontWeight: 500,
          },
        },
        [`& .${treeItemClasses.iconContainer}`]: {
          borderRadius: '50%',
          backgroundColor:
            theme.palette.mode === 'light'
              ? alpha(theme.palette.primary.main, 0.25)
              : theme.palette.primary.dark,
          color: theme.palette.mode === 'dark' && theme.palette.primary.contrastText,
          padding: theme.spacing(0, 1.2),
        },
        [`& .${treeItemClasses.groupTransition}`]: {
          marginLeft: 15,
          paddingLeft: 18,
          borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
        },
      }));

    useEffect(() =>{
        if(!treeData){
            setTreeData(props.inputvals)
        }
    },[props.inputvals])

    const analyzeSet = (inpStks) => props.onselect(inpStks)

    const GetAnalyzeBtn = (inpStks, label) =>{
      if (inpStks === showActions){
        return (
          <>{label}<a onClick={() => analyzeSet(inpStks)} style={{color:"blue"}}>&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;Analyze</a></>
        )   
      }else{
        return (
          <a>{label}</a>
        )    
      }
    }

    const getAllTrees = () => {
        let trees = treeData?.map(item =>
            <CustomTreeItem itemId={item[0].stock} label={GetAnalyzeBtn(item,item[0].stock)}  onClick={(e) => setShowActions(item)}>
                {item.map(leaf => 
                    <CustomTreeItem itemId={leaf.stock + "-" + leaf.value} label={leaf.stock + "-" + leaf.value} 
                        onClick={() => addToList(leaf.stock)}/>)}
            </CustomTreeItem>
        )
        return trees
    }

    return(
        <>
            <Box sx={{ minHeight:"85vh", maxHeight: "85vh", borderRadius: 1,overflow: "auto"
                    ,scrollbarWidth: "none", // Hide the scrollbar for firefox
                    '&::-webkit-scrollbar': {
                        display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
                    },}} >
              <SimpleTreeView>
                {
                    treeData ? getAllTrees() : <WaitingForResonse></WaitingForResonse>
                }
              </SimpleTreeView>
          </Box>
      </>
    )
}

export default ListView