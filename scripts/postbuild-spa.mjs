import { copyFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const index = join(dist, 'index.html')
const fallback = join(dist, '404.html')

copyFileSync(index, fallback)
console.log('SPA fallback: copied index.html -> 404.html')
