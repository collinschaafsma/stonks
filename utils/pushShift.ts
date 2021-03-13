import fetch from 'node-fetch'

export async function pushShift<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request)
  const body = await response.json()
  return body.data
}


