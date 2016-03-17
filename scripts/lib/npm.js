import { spawn, execFileSync } from 'child_process'

export function npm(cwd, cmd = [], { stdio = 'inherit', async = false } = {}) {
  const args = [].concat(cmd)
  const exec = async ? spawn : execFileSync
  return exec('npm', args, { cwd, stdio })
}
