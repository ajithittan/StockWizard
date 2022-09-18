import useSWR from 'swr'
import React from "react";
import MovableList from './MovableList'

const fetcher = (url) => fetch(url).then((res) => res.json())

const index = (props) =>{
    const address = '/api/stocks/v2'
    const { data, error } = useSWR(address, fetcher,{revalidateIfStale:false})

    return (
      <>
        <MovableList stockdetails={data} key={data}>
        </MovableList>
      </>
  )
}

export default index

/*
export async function getServerSideProps (){
    //let data = await ListOfStocks()
    //console.log("data in getServerSideProps",data)

    console.log("am I getting called getServerSideProps?")
    let data = [{symbol:'AAPL'},{symbol:'MSFT'},{symbol:'GOOGL'}]

    return (
        {props:{data}}
    )
}
*/
