import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import CardHeader from '@mui/material/CardHeader'


const SingleNewsCard = (props) => {

    const [newsContent,setNewsContent] = useState(null)

    useEffect(() =>{
        if (props.newscontent){
            setNewsContent(props.newscontent)
        }

    },[props.newscontent])

    let cardStyle = {
        //height:"100%",
        //width: '10vw',
        transitionDuration: '0.3s',
        //height: '20vw',
        //display: 'block',
        //height: sm ? "80%" : "300px",
        //width: sm ? "80%" : "300px", 
        transitionDuration: '0.3s',
        margin:"5px",
        //marginLeft: sm ? "10px" : "15px",
        //marginTop: sm ? "10px" : "15px",
        //paddingLeft: sm ? "5%" : "1px",
        //backgroundColor: "#FAF9F6",
        color:'text.secondary',
        alignItems:"center",
    }

    const getHeader = () => <> <hr></hr> {newsContent?.summary?.substring(0,400-newsContent?.title?.length) + "..."} </>

    return (
        <Card style={cardStyle}>
            <CardHeader title={newsContent?.title + "  (" + newsContent?.stock + ")"}
                        titleTypographyProps={{variant:'h9' }}
                        subheader = {getHeader()}
                        onClick={() => router.push({pathname: newsContent?.link})}
                        style={{cursor:"pointer"}}/>
                <CardContent>
                    <div height="90%" style={{fontSize:"12px",position:"relative",bottom:0}}>
                        {newsContent?.source}<br></br>
                        {newsContent?.date}
                    </div>
            </CardContent>
        </Card>
    )
}

export default SingleNewsCard
