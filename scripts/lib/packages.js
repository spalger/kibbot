import { readdirSync } from 'fs'
import { join } from 'path'

import { PACKAGE_DIR } from './'

export function allPackageNames() {
  return readdirSync(PACKAGE_DIR).filter(name =>
    !(name.startsWith('.') || name === 'node_modules')
  )
}

export function allPackageDirs() {
  return allPackageNames().map(name => join(PACKAGE_DIR, name))
}

export function getPackageJson(dir) {
  return require(join(dir, 'package.json'))
}
