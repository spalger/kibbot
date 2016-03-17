import { allPackageDirs, getPackageJson, npm } from './lib'

export function main() {
  for (const dir of allPackageDirs()) {
    const pkg = getPackageJson(dir)
    if (pkg.scripts && pkg.scripts.start) {
      npm(dir, 'start', { async: true })
    }
  }
}
