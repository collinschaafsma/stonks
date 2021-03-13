import { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home = () => {

  

  return (
    <div className={styles.container}>
      <Head>
        <title>Stonks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      STONKS
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  
  return {
    props: {
      
    }
  }
}

