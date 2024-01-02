import Dashboard from './Dashboard'
import SpeedDialComp from './SpeedDialComp'
import BottomNav from './BottomNav'
import StreamStockPrice from '../../components/StreamStockPrice'

const index = () => {
    return (
        <>
        {
            <>
            <title>Home</title>
                <Dashboard />
                <SpeedDialComp></SpeedDialComp>
                <BottomNav></BottomNav>
                <StreamStockPrice></StreamStockPrice>
            </>
        }
        </>
    )

}

export default index