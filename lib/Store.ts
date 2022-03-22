import { createState } from '@hookstate/core'

const store = createState({
  score:0,
  user: 'anon'
})

export default store