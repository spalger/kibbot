import { allPackageDirs, npm } from './lib'

export function main() {
  for (const dir of allPackageDirs()) {
    npm(dir, 'prune')
    npm(dir, 'install')
  }
}
