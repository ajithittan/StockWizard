import useSWR from 'swr'

const index = (props) =>{

    const fetcher = (url) => fetch(url).then((res) => res.json())

    const address = 'http://0.0.0.0:5100/newsfeed/' + props.feedtype
    const { data, error } = useSWR(address, fetcher,{revalidateIfStale:false})

    return(
        <>
            {
                data ? data.map(item => (
                    <a href={item.link} target="_blank"><p>{item.title}</p></a>
                )): null
            }
        </>
    )
}

export default index
