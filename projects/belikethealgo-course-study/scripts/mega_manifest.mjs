import { File } from 'megajs'
import fs from 'node:fs/promises'
import path from 'node:path'

const url = process.env.MEGA_PUBLIC_LINK
if (!url) throw new Error('MEGA_PUBLIC_LINK is required')

const outDir = path.resolve('projects/belikethealgo-course-study/output')
await fs.mkdir(outDir, { recursive: true })

const root = File.fromURL(url)
root.api.userAgent = 'ChatGPT-course-analysis/1.0'
const selected = await root.loadAttributes()

const rows = []
function walk(node, parentPath = '') {
  const name = node.name || '(unnamed)'
  const currentPath = parentPath ? `${parentPath}/${name}` : name
  rows.push({
    path: currentPath,
    name,
    type: node.directory ? 'folder' : 'file',
    size: Number(node.size || 0),
    timestamp: node.timestamp || null,
    nodeId: node.nodeId || null,
    extension: node.directory ? '' : path.extname(name).toLowerCase()
  })
  if (node.directory && Array.isArray(node.children)) {
    for (const child of node.children) walk(child, currentPath)
  }
}
walk(selected)

rows.sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true, sensitivity: 'base' }))
const files = rows.filter(r => r.type === 'file')
const folders = rows.filter(r => r.type === 'folder')
const totalBytes = files.reduce((s, r) => s + r.size, 0)
const byExt = {}
for (const r of files) byExt[r.extension || '(none)'] = (byExt[r.extension || '(none)'] || 0) + 1

const manifest = {
  generatedAt: new Date().toISOString(),
  source: 'MEGA public shared folder',
  rootName: selected.name || null,
  summary: { files: files.length, folders: folders.length, totalBytes, byExtension: byExt },
  entries: rows
}
await fs.writeFile(path.join(outDir, 'mega_manifest.json'), JSON.stringify(manifest, null, 2))

const esc = v => `"${String(v ?? '').replaceAll('"', '""')}"`
const csv = [
  ['path','name','type','size','timestamp','nodeId','extension'].map(esc).join(','),
  ...rows.map(r => [r.path,r.name,r.type,r.size,r.timestamp,r.nodeId,r.extension].map(esc).join(','))
].join('\n')
await fs.writeFile(path.join(outDir, 'mega_manifest.csv'), csv)

const gib = totalBytes / (1024 ** 3)
const lines = [
  '# BeLikeTheAlgo MEGA discovery',
  '',
  `Root: ${selected.name || '(unnamed)'}`,
  `Files: ${files.length}`,
  `Folders: ${folders.length}`,
  `Total size: ${gib.toFixed(3)} GiB (${totalBytes} bytes)`,
  '',
  '## Extensions',
  ...Object.entries(byExt).sort((a,b) => b[1]-a[1]).map(([ext,n]) => `- ${ext}: ${n}`),
  '',
  '## Tree',
  ...rows.map(r => `${r.type === 'folder' ? '[D]' : '[F]'} ${r.path}${r.type === 'file' ? ` (${r.size} bytes)` : ''}`)
]
await fs.writeFile(path.join(outDir, 'SUMMARY.md'), lines.join('\n'))
console.log(lines.slice(0, 10).join('\n'))
