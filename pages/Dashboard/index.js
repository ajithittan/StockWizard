import { useEffect,useState } from 'react'
import DashboardSetUp from './dashboardsetup'
import DashBoard from './dashboard'
import DashBoardv2 from './dashboardv2'

const index = () =>{

    const [dashboard,setDashboard] = useState(false)

    useEffect(() =>{
        if (!dashboard){
            if (localStorage.getItem("dashboard")){
                setDashboard(true)
            }
        }
    },[])

    return (
        <>
        {
            //dashboard ? <DashBoard data={["a","b","c"]}/> : <DashboardSetUp />
            <>
            <title>Home</title>
            <DashBoardv2 />
            </>
        }
        </>
    )

}

export default index