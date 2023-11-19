import Dashboard from './Dashboard'
import SpeedDialComp from './SpeedDialComp'
import BottomNav from './BottomNav'

const index = () => {
    return (
        <>
        {
            <>
            <title>Home</title>
                <Dashboard />
                <SpeedDialComp></SpeedDialComp>
                <BottomNav></BottomNav>
            </>
        }
        </>
    )

}

export default index