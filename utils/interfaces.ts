//title,id,created_utc,full_link,retrieved_on
export interface Submission {
  title: string
  id: string
  created_utc: number
  full_link: string
  retrieved_on: number
}

//body,created_utc,author,id,parent_id,retrieved_on
export interface Comment {
  body: string
  author: string
  id: string
  parent_id: string
  retrieved_on: number
  created_utc: number
}