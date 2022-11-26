import path from 'path'
import { existsSync, mkdirSync } from 'fs'

const dbDir = path.join(process.cwd(), '/src/db')

if (!existsSync(dbDir)) {
  mkdirSync(dbDir)
}
global.print = console.log