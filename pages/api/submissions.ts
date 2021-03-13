// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { pushShift } from '../../utils/pushShift'
import { Submission, Ticker } from '../../utils/interfaces'
import tickers from '../../utils/tickers'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  //https://api.pushshift.io/reddit/comment/search?html_decode=true&after=1615359600&before=1615532400&q=amc&size=10
  const filter = "title,id,created_utc,full_link,retrieved_on"
  const after = Math.round(new Date().setDate(((new Date()).getDate() - 1)) / 1000)
  const query = `https://api.pushshift.io/reddit/submission/search?size=100&subreddit=wallstreetbets&filter=${filter}&after=${after}`
  
  const submissions = await pushShift<Submission[]>(
    query
  )

  //loop through subissions and pull out suspect stock symbols
  const suspectSymbols: Array<string> = [];
  submissions.forEach((submission: Submission) => {
    let matches = submission.title.match(/\b[A-Z]{2,6}\b/g)
    if (matches) {
      suspectSymbols.push(...matches)
    }
  })

  //validate symbols with cross reference
  const validatedSymbols: Array<string> = [];
  suspectSymbols.forEach((symbol: string) => {
    if(tickers.find((ticker: Ticker) => ticker.symbol === symbol)) {
      validatedSymbols.push(symbol)
    }
  })

  res.status(200).json({ submissions, 
    after, 
    query, 
    "submissionCount": submissions.length, 
    suspectSymbols, 
    "suspectCount": suspectSymbols.length,
    validatedSymbols,
    "validatedCount": validatedSymbols.length
  })
}
