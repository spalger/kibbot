import { readdirSync } from 'fs'
import { join } from 'path'
import { execFileSync } from 'child_process'

const root = join(__dirname, '..')
process.chdir(root)

for (const file of readdirSync('packages')) {
  if (file.startsWith('.')) continue

  const cwd = join(root, 'packages', file)
  const stdio = 'inherit'
  const npm = (cmd) =>
    execFileSync('npm', [cmd], { cwd, stdio })

  npm('prune')
  npm('install')
}
