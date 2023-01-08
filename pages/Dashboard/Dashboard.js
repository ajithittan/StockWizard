import Stocks from '../stocks' 
import Newsfeeds from '../Newsfeeds'
import ChartsForDashBoard from './ChartsForDashBoard'
import Container from './Container'
import { useState } from 'react'

const Dashboard = () =>{

    const feedtypes = [3,4,2,6]
    const [layoutType, setLayoutType] = useState(3)

    const getAllComponents = () =>{

        let arrComponents = []

        arrComponents.push(<ChartsForDashBoard/>)
        arrComponents.push(<Stocks />)
        arrComponents.push(<Newsfeeds feedtype={JSON.stringify(feedtypes)}/>)
 
        return arrComponents

    }

    return (
        <>
            <Container layout={layoutType} components={getAllComponents()}></Container>
        </>
    )
}

export default Dashboard