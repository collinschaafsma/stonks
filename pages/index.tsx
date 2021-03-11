import { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { pushShift, Stonk } from '../utils/pushShift'

const Home = (props: {stonks: Stonk[]}) => {

  
  console.log(props.stonks)

  return (
    <div className={styles.container}>
      <Head>
        <title>Stonks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {props.stonks ? (
          <div>
            {props.stonks.map((stonk: Stonk) => (
              <p>{stonk.title}</p>
            ))}
          </div>
        ) : (
          <div className="loader">loading...</div>
        )}
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const stonks = await pushShift<Stonk[]>(
    `https://api.pushshift.io/reddit/submission/search?size=100&subreddit=wallstreetbets`
  )
  return {
    props: {
      stonks
    }
  }
}
