// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { pushShift } from '../../utils/pushShift'
import { Submission } from '../../utils/interfaces'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  //https://api.pushshift.io/reddit/comment/search?html_decode=true&after=1615359600&before=1615532400&q=amc&size=10
  const filter = "title,id,created_utc,full_link,retrieved_on"
  const after = Math.round(new Date().setDate(((new Date()).getDate() - 1)) / 1000)
  const query = `https://api.pushshift.io/reddit/submission/search?size=100&subreddit=wallstreetbets&filter=${filter}&after=${after}`
  
  const submissions = await pushShift<Submission[]>(
    query
  )

  //map through subissions

  //loop through all stock tickers and check indexOf for the title 

  
  res.status(200).json({ submissions, after, query, "length": submissions.length })
}
