// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { pushShift, Stonk } from '../../utils/pushShift'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  //https://api.pushshift.io/reddit/comment/search?html_decode=true&after=1615359600&before=1615532400&q=amc&size=10
  const filter = "body,created_utc,author,id,parent_id,retrieved_on"
  const after = Math.round(new Date().setDate(((new Date()).getDate() - 1)) / 1000)
  const query = `https://api.pushshift.io/reddit/comment/search?size=100&subreddit=wallstreetbets&filter=${filter}&after=${after}`
  
  const comments = await pushShift<Stonk[]>(
    query
  )
  res.status(200).json({ comments, after, query, "length": comments.length })
}
