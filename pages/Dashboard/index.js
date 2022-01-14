import { useEffect,useState } from 'react'
import DashboardSetUp from './dashboardsetup'
import DashBoard from './dashboard'

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
            dashboard ? <DashBoard data={["a","b","c"]}/> : <DashboardSetUp />
        }
        </>
    )

}

export default index