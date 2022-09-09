import { AppWrapper } from '../modules/state/stockstate'
import {AppSkinWrapper} from '../modules/state/GlobalSkinState'
import {AuthWrapper} from '../modules/state/authState'
import '../styles/globals.css'
import '../styles/sectormaint.css'
import Header from './Header/Index'

function MyApp({ Component, pageProps }) {
  return (  
    <AuthWrapper>
    <AppWrapper>
      <AppSkinWrapper>
        <Header />
          <Component {...pageProps} />
      </AppSkinWrapper>
    </AppWrapper>
    </AuthWrapper>
  )
}

export default MyApp