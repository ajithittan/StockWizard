import {AppSkinWrapper} from '../modules/state/GlobalSkinState'
import {AuthWrapper} from '../modules/state/authState'
import {AppWrapper} from '../modules/state/stockstate'
import '../styles/globals.css'
import '../styles/sectormaint.css'
import Header from './Header/Index'

function MyApp({ Component, pageProps }) {
  return (  
          <AppWrapper>
          <AuthWrapper>
            <AppSkinWrapper>
                  <Header />
                  <Component {...pageProps} />   
            </AppSkinWrapper>
          </AuthWrapper>
          </AppWrapper>
  )
}

export default MyApp