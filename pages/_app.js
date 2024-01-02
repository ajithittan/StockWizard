import {AuthWrapper} from '../modules/state/authState'
import '../styles/globals.css'
import '../styles/sectormaint.css'
import Header from './Header/Index'
import {Provider} from 'react-redux'
import store from '../redux/store'

function MyApp({ Component, pageProps }) {
  return (  
           <AuthWrapper>
            <Provider store={store}>
                    <Header />
                    <Component {...pageProps} />   
            </Provider>
          </AuthWrapper>
  )
}

export default MyApp