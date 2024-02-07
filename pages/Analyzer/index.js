import React, { useEffect, useState } from "react";
import Sectors from './Sectors'
import Grid from '@mui/material/Grid';
import axios from "axios";

const index = ({sectors}) =>{

    return (
        <Grid
            container
            direction="row"
            justify="space-evenly"
            align="stretch"
        >
        {

            sectors?.map(item => <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                                    <Sectors key={item.sector} sector={item.sector} stocks={item.stocks}></Sectors>
                                </Grid>
                        ) 
        }
      </Grid>
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

