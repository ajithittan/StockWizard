import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react"
import CardHeader from '@mui/material/CardHeader'
import Link from "next/link"; 
import WaitingForResonse from '../../components/WaitingForResponse'
import Chip from '@mui/material/Chip';

const SingleNewsCard = (props) => {

    const [newsContent,setNewsContent] = useState(null)
    const [selected,setSelected] = useState(false)

    useEffect(() =>{
        if (props.newscontent){
            setNewsContent(props.newscontent)
        }
    },[props.newscontent])

    useEffect(() =>{
        if (props.selStock && props.newscontent){
            if (props.selStock === props.newscontent.stock){
                setSelected(true)
            }else{
                setSelected(false)
            }
        }
    },[props.selStock])

    let cardStyle = {
        transitionDuration: '0.3s',
        transitionDuration: '0.3s',
        margin:"5px",
        color:'text.secondary',
        alignItems:"center",
    }

    const selectOneStock = (stock) => {
        if (selected){
            setSelected(false)
            props.onShowAll(stock)
        }else
        {
            props.onSelectSingleStk(stock)
            setSelected(true)
        }
    }

    const getTitle = (title,stock) =>{
        return(
            <>
                    <Typography sx={{fontSize:"14px"}}>
                        <Link href={newsContent?.link || '/'} target="_blank">{title}</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Chip
                        variant={selected ? "filled" : "outlined"}
                        label={stock}
                        onClick={() => selectOneStock(stock)}
                        color= {"success"}
                        sx={{ color: selected ? "none" : props?.color}}
                        size="small"
                    />
                    </Typography>
            </>    
        )
    }

    const getHeader = () => 
    {
        return(
            <> 
                <Typography sx={{fontSize:"11px"}}>{newsContent?.date}</Typography>
                <Divider></Divider>
                <Typography sx={{fontSize:"14px"}}>
                <Link href={newsContent?.link || '/'} target="_blank">
                    {newsContent?.summary?.substring(0,250-newsContent?.title?.length) + "..."}
                </Link>
                </Typography>
                
            </>
        )
    }

   
    return (
        <>
        {
            newsContent?.link ?         
            <Card style={cardStyle}>
                    <CardHeader title={getTitle(newsContent?.title,newsContent?.stock)}
                        titleTypographyProps={{variant:'h9' }}
                        subheader = {getHeader()}
                        style={{cursor:"pointer"}}/>
            </Card> : <WaitingForResonse height={25} width={25}/>
        }
        </>
    )
}

export default SingleNewsCard
