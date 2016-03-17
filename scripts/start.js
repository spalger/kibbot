import { join } from 'path'

import { allPackageDirs, npm } from './lib'

export function main() {
  for (const dir of allPackageDirs()) {
    const pkg = require(join(dir, 'package.json'))
    if (pkg.scripts && pkg.scripts.start) {
      npm(dir, 'start', { async: true })
    }
  }
}
