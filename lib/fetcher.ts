import axios from 'axios'
import { Fetcher } from 'swr'


export const fetcher= (url: any) => axios.get(url).then(res => res.data)