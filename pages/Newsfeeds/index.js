import { useEffect,useState } from 'react'
import {BasicNewsFeeds} from '../../modules/api/Newsfeed'
//import useSWR from 'swr'


const index = (props) =>{

    const [feedData,setfeedData] = useState(null)

    useEffect(async () =>{
        if (props.feedtype){
            let retval = await BasicNewsFeeds(props.feedtype) 
            setfeedData(retval)
        }
    },[props.feedtype])

    //const fetcher = (url) => fetch(url).then((res) => res.json())
    //const address = '/newsfeed/' + props.feedtype
    //const { data, error } = useSWR(address, fetcher,{revalidateIfStale:false})

    return(
        <>
            {
                feedData ? feedData.map(item => (
                    <a href={item.link} target="_blank"><p>{item.title}</p></a>
                )): null
            }
        </>
    )
}

export default index
