// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { pushShift } from '../../utils/pushShift'
import { Submission } from '../../utils/interfaces'
//import tickers from '../../utils/tickers'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  //https://api.pushshift.io/reddit/comment/search?html_decode=true&after=1615359600&before=1615532400&q=amc&size=10
  const filter = "title,id,created_utc,full_link,retrieved_on"
  const after = Math.round(new Date().setDate(((new Date()).getDate() - 1)) / 1000)
  const query = `https://api.pushshift.io/reddit/submission/search?size=100&subreddit=wallstreetbets&filter=${filter}&after=${after}`
  
  const submissions = await pushShift<Submission[]>(
    query
  )

  //const regex = tickers.map((ticker: Ticker) => "(?=.*\\b" + ticker.symbol + "\\b)").join('');
  
  const searchReg = new RegExp(/\b[A-Z]{2,6}\b/g)
  //map through subissions
  const matches = submissions.filter((submission: Submission) => {
    return searchReg.test(submission.title)
  })

  res.status(200).json({ submissions, after, query, "length": submissions.length, matches })
}

// const checkForTicker = (title: string) => {
//   let matched: boolean = false
//   tickers.forEach((ticker: Ticker) => {
//     const searchExp = new RegExp("(?=.*\\b" + ticker.symbol + "\\b)","g");
//     if(searchExp.test(title)) {
//       matched = true
//     }
//   })
//   return matched
//}
