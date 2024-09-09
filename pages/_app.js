import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import Layout from '../components/layout'
import Navbar from '@/components/navbar';

export default function App({ Component, pageProps }) {

    useEffect(() => {
        import('bootstrap/dist/js/bootstrap')
    }, [])

    return(
        <Layout>
            <Component {...pageProps} />
        </Layout>

    )
     
}