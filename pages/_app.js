import { AppWrapper } from '../modules/state/stockstate'
import {AppSkinWrapper} from '../modules/state/GlobalSkinState'
import {AuthWrapper} from '../modules/state/authState'
import '../styles/globals.css'
import '../styles/sectormaint.css'
import Header from './Header/Index'

function MyApp({ Component, pageProps }) {
  return (  
        <AuthWrapper>
          <AppSkinWrapper>
            <AppWrapper>
                <Header />
                <Component {...pageProps} />
            </AppWrapper>    
          </AppSkinWrapper>
        </AuthWrapper>
  )
}

export default MyApp