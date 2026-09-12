import { File } from 'megajs'
import fs from 'node:fs/promises'
import path from 'node:path'

const url = process.env.MEGA_PUBLIC_LINK
if (!url) throw new Error('MEGA_PUBLIC_LINK is required')
const outRoot = path.resolve('projects/belikethealgo-course-study/static-assets')
await fs.mkdir(outRoot, { recursive: true })

const root = File.fromURL(url)
root.api.userAgent = 'ChatGPT-course-analysis/1.0'
const selected = await root.loadAttributes()

const wanted = new Set(['.pdf', '.png', '.jpg', '.jpeg', '.webp'])
let count = 0
let bytes = 0

async function walk(node, parentPath = '') {
  const name = node.name || '(unnamed)'
  const rel = parentPath ? path.join(parentPath, name) : name
  if (node.directory) {
    for (const child of node.children || []) await walk(child, rel)
    return
  }
  const ext = path.extname(name).toLowerCase()
  if (!wanted.has(ext)) return
  const dest = path.join(outRoot, rel)
  await fs.mkdir(path.dirname(dest), { recursive: true })
  const data = await node.downloadBuffer()
  await fs.writeFile(dest, data)
  count += 1
  bytes += data.length
  console.log(`saved ${rel} (${data.length} bytes)`)
}

await walk(selected)
await fs.writeFile(path.join(outRoot, '_download_summary.json'), JSON.stringify({ count, bytes, generatedAt: new Date().toISOString() }, null, 2))
console.log(`Downloaded ${count} static assets, ${bytes} bytes`)
