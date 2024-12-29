import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import JobStatus from './JobStatus'
import Chip from '@mui/material/Chip';

const Options = () =>{
    const router = useRouter()
    const [options,setOptions] = useState([{'tp':'Sector Set Up','link':'SectorSetUp'},
                                           {'tp':'Jobs Statuses','comp': <JobStatus />}])
                                           
    const [compDisp,setCompDisp] = useState(<JobStatus />)                                           

    const action = (actlink,actcomp) =>{
        if (actlink){
            router.push({pathname: actlink})
        }else if (actcomp) {
            setCompDisp(actcomp)
        }
    }

    return (
        <>
        {
            options.map(eachitem => 
                <Chip
                    variant="filled"
                    label={eachitem['tp']}
                    onClick={() => action(eachitem['link'],eachitem['comp'])}
                    color= {"success"}
                    size="medium"
                />
                )
        }
        {compDisp}
        </>
    )

}

export default Options