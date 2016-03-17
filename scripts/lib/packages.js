import { readdirSync } from 'fs'
import { join } from 'path'

import { PACKAGE_DIR } from './'

export function allPackageNames() {
  return readdirSync(PACKAGE_DIR).filter(name => !name.startsWith('.'))
}

export function allPackageDirs() {
  return allPackageNames().map(name => join(PACKAGE_DIR, name))
}
