import { useEffect,useState } from 'react'
import Dashboard from './Dashboard'

const index = () => {

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
                <Dashboard />
            </>
        }
        </>
    )

}

export default index