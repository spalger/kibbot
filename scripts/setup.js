import { ROOT, allPackageDirs, npm } from './lib'
import { main as update } from './update'

export function main() {
  for (const dir of allPackageDirs()) {
    npm(ROOT, ['link', dir])
  }

  update()
}
