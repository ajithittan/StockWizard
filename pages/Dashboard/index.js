import { useEffect,useState } from 'react'
import Dashboard from './Dashboard'
import {getTopStockMovers} from '../../modules/api/StockDetails'

const index = () => {

    const [dashboard,setDashboard] = useState(false)

    useEffect(() =>{
        if (!dashboard){
            if (localStorage.getItem("dashboard")){
                setDashboard(true)
            }
        }
        //getTopStockMovers().then(retval => console.log("top movers",retval))
    },[])

    return (
        <>
        {
            //dashboard ? <DashBoard data={["a","b","c"]}/> : <DashboardSetUp />
            <>
            <title>Home</title>
                <Dashboard />
            </>
        }
        </>
    )

}

export default index