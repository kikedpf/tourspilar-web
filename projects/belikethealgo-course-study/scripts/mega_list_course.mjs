import { File } from 'megajs'
import fs from 'node:fs/promises'

const url = process.env.MEGA_PUBLIC_LINK
if (!url) throw new Error('MEGA_PUBLIC_LINK is required')

const root = File.fromURL(url)
root.api.userAgent = 'ChatGPT-course-inventory/1.0'
const selected = await root.loadAttributes()

function serialize(node, depth = 0) {
  const out = {
    name: node.name || '(unnamed)',
    directory: Boolean(node.directory),
    size: Number(node.size || 0),
  }
  if (node.directory) {
    out.children = (node.children || []).map(child => serialize(child, depth + 1))
  }
  return out
}

function lines(node, prefix = '') {
  const here = prefix ? `${prefix}/${node.name || '(unnamed)'}` : (node.name || '(unnamed)')
  const marker = node.directory ? '[DIR]' : '[FILE]'
  let result = [`${marker} ${here}${node.directory ? '' : ` (${Number(node.size || 0)} bytes)`}`]
  if (node.directory) {
    for (const child of node.children || []) result = result.concat(lines(child, here))
  }
  return result
}

const tree = serialize(selected)
await fs.mkdir('projects/belikethealgo-course-study/inventory', { recursive: true })
await fs.writeFile('projects/belikethealgo-course-study/inventory/course_tree.json', JSON.stringify(tree, null, 2))
const txt = lines(selected).join('\n') + '\n'
await fs.writeFile('projects/belikethealgo-course-study/inventory/course_tree.txt', txt)
console.log(txt)
