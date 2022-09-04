import Link from "next/link";
import { useEffect, useState } from "react";
import {useAppSkinContext} from '../../modules/state/GlobalSkinState'
import HeaderThemes from '../../modules/themes/HeaderThemes'
import StockPriceSyncer from '../../components/StockPriceSyncer'

const Header = () =>{

    const [skinVal,changeSkinVal] = useAppSkinContext()
    const [hdThemes, sethdThemes] = useState({})
    console.log("hdThemes",hdThemes)

    useEffect(() =>{
        console.log("value has changed",skinVal.id)
        sethdThemes(HeaderThemes[skinVal.header])
    },[skinVal])

    return (
        <ul className={hdThemes.ul_head}>
          <li className={hdThemes.li_head}>
            <Link href="/">
              <a>Stock Wizard!</a>
            </Link>
          </li>
          <li className={hdThemes.li_head}>
            <Link href="/Charting">
              <a>Performance</a>
            </Link>
          </li>
          <li className={hdThemes.li_head}>
            <Link href="/SectorPerformance">
              <a>Sector Performance</a>
            </Link>
          </li>
          <li className={hdThemes.li_head}>
            <Link href="/SectorSetUp">
              <a>Sector SetUp</a>
            </Link>
          </li>
          <li className="li_head_rt">
              <select className='li_head_rt' onChange={(e) => changeSkinVal(e.target.value)} key={skinVal.id}  defaultValue={skinVal.id}>
                <option value={0}>Black</option>
                <option value={1}>Blue</option>
                <option value={2}>Purple</option>
              </select>  
              <StockPriceSyncer></StockPriceSyncer>
          </li>
        </ul>
      );
}

export default Header