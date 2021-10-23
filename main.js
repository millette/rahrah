// npm
import fg from "fast-glob"
import { writeFile, readFile } from "fs/promises"
import { loadConfig, optimize } from 'svgo'

// self
import getViewBox from "./viewbox.js"

async function enums(sex) {
  const cwd = `layer/${sex}/body_front_swaying/`
  const names = await fg(`*.svg`, { cwd })
  const oy = names.map((x) => {
    const [p] = x.split("_")
    return p
  })

  return [...new Set(oy)]
}

const config = await loadConfig("svgo-config.js")

const sex = "male"

const s = await enums("male")

s.forEach(async (t) => {
  const cwd = `layer/${sex}/body_front_swaying/`
  const names = await fg(`${t}_*.svg`, { cwd })

  let first
  const parts = []
  for await (const x of names) {
    const d = x.slice(t.length + 1, -4)
    const a = getViewBox(sex[0], t, d)
    const fn = `${t}_${d}.svg`
    const cnt = await readFile(`${cwd}${fn}`, "utf8")
    const id = `i${d}`  
    if ((id.indexOf("_of_") === -1) && (!first)) first = id

    const cnt2 = cnt.replace(` id="${t}_${d}"`, "")
    parts.push(`<symbol id="${id}" viewBox="${a}">${cnt2}</symbol>\n`)
  }

  const whole = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  ${parts.join("")}
  </svg>`

  const result = optimize(whole, config)
  await writeFile(`whole-${t}.svg`, result.data)
  console.log("FIRST", t, first)
})
