import { useEffect,useState } from 'react'
import {BasicNewsFeeds,StockNewsFeeds} from '../../modules/api/Newsfeed'
import Image from 'next/image';
import myGif from '../../public/loading-loading-forever.gif'

const index = (props) =>{

    const [feedData,setfeedData] = useState(null)


    useEffect(async () =>{
        if (props.feedtype){
            let retval = await BasicNewsFeeds(props.feedtype) 
            setfeedData(retval)
        }
    },[props.feedtype])

    useEffect(async () =>{
        if (props.stock){
            let retval = await StockNewsFeeds(props.stock) 
            setfeedData(retval)
        }
    },[props.stock])

    return(
        <div>
            <fieldset>
                <legend>{props.stock ? props.stock + " in the News"  : "Latest News"}</legend>
                <div className="newsHeader">
                    {
                        feedData ? feedData.map((item,indx) => (
                            <div className={indx%2===0 ? "news0" : "news1" }><a href={item.link} target="_blank">{item.title}</a></div>
                        )): <Image src={myGif} alt="wait" height={30} width={30} />
                    }
                </div>    
            </fieldset>
        </div>
    )
}

export default index
