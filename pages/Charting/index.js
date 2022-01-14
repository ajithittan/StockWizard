import MultiLineChart from './MultiLineChart';
import {CreateChartContext} from './ChartContext'

const index = () => {

    return (
        <CreateChartContext.Provider value={42}>
            <MultiLineChart />
        </CreateChartContext.Provider>
    )
}

export default index