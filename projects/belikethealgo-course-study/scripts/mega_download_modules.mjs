import { File } from 'megajs'
import fs from 'node:fs/promises'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import path from 'node:path'

const url = process.env.MEGA_PUBLIC_LINK
if (!url) throw new Error('MEGA_PUBLIC_LINK is required')
const modules = new Set((process.env.MODULES || '').split(',').map(s => Number(s.trim())).filter(Number.isFinite))
if (!modules.size) throw new Error('MODULES must contain comma-separated module numbers')

const outRoot = path.resolve('projects/belikethealgo-course-study/work/raw')
await fs.mkdir(outRoot, { recursive: true })

const root = File.fromURL(url)
root.api.userAgent = 'ChatGPT-course-analysis/1.0'
const selected = await root.loadAttributes()

let count = 0
let bytes = 0
async function walk(node, parts = []) {
  const name = node.name || '(unnamed)'
  const next = [...parts, name]
  if (node.directory) {
    for (const child of node.children || []) await walk(child, next)
    return
  }
  if (path.extname(name).toLowerCase() !== '.mp4') return
  const moduleName = next.length >= 2 ? next[1] : ''
  const m = moduleName.match(/^(\d+)\)/)
  if (!m || !modules.has(Number(m[1]))) return
  const rel = path.join(moduleName, name)
  const dest = path.join(outRoot, rel)
  await fs.mkdir(path.dirname(dest), { recursive: true })
  console.log(`Downloading ${rel} (${node.size || 0} bytes)`)
  await pipeline(node.download(), createWriteStream(dest))
  count += 1
  bytes += Number(node.size || 0)
}

await walk(selected)
await fs.writeFile(path.join(outRoot, '_download_summary.json'), JSON.stringify({ modules: [...modules], count, bytes, generatedAt: new Date().toISOString() }, null, 2))
console.log(`Downloaded ${count} videos, ${bytes} bytes`)
