import { useEffect, useState } from "react"
import CompanyRevenue from './CompanyRevenue'
import { useRouter } from 'next/router'
import WaitingForResonse from '../../components/WaitingForResponse'

const index = (props) =>{
    const router = useRouter()
    const stock = router.query.stock
    const [initialSetUp,setinitialSetUp] = useState({duration:router.query.dur})
    return (
        <div style={{margin:"5%"}}>
            {stock ? <CompanyRevenue stock={stock} period={"A"}></CompanyRevenue> : <WaitingForResonse></WaitingForResonse>}
            {stock ? <CompanyRevenue stock={stock} period={"Q"}></CompanyRevenue> : <WaitingForResonse></WaitingForResonse>}
        </div>
    )
}

export default index