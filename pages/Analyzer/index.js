import React, { useEffect, useState } from "react";
import Sectors from './Sectors'
import Grid from '@mui/material/Grid';
import axios from "axios";

const index = ({sectors}) =>{

    return (
        <div style={{marginLeft:"20px"}}>
        <Grid
            container
            direction="row"
            justify="space-evenly"
            align="stretch"
            style={{height:"100%"}}
        >
        {

            sectors?.map(item => <Grid xs={12} sm={12} md={6} lg={5.5} xl={5.5} marginLeft={0.5}>
                                    <Sectors key={item.sector} sector={item.sector} stocks={item.stocks}></Sectors>
                                </Grid>
                        ) 
        }
      </Grid>
      </div>
  )
}

export async function getServerSideProps({ req, res }) {
    const returnval = await axios.get(process.env.SECTORS_URL, {
      withCredentials: true,
      headers: {
          Cookie: req.headers.cookie
      }
    });
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=360, stale-while-revalidate=59'
    )
    const data = await returnval.data;
    return {props: { sectors:data }}
  }

export default index

