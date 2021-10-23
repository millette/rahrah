// npm
import fg from "fast-glob"
import { writeFile, readFile } from "fs/promises"

import { loadConfig, optimize } from 'svgo'

/*
const result = optimize(svgString, {
  // optional but recommended field
  path: 'path-to.svg',
  // all config fields are also available here
  multipass: true,
});

const optimizedSvgString = result.data;
*/


// self
import getViewBox from "./viewbox.js"


const config = await loadConfig("svgo-config.js")


const sex = "male"

// const t = "vest"
const t = "pants"

const cwd = `layer/${sex}/body_front_swaying/`
const names = await fg(`${t}_*`, { cwd })

const parts = []
for await (const x of names) {
  const d = x.slice(t.length + 1, -4)
  const a = getViewBox(sex[0], t, d)
  const fn = `${t}_${d}.svg`
  const cnt = await readFile(`${cwd}${fn}`, "utf8")
  const id = `i${d}`  
  const cnt2 = cnt.replace(` id="${t}_${d}"`, "")
  parts.push(`<symbol id="${id}" viewBox="${a}">${cnt2}</symbol>\n`)
}

const whole = `<svg xmlns="http://www.w3.org/2000/svg">
${parts.join("")}
</svg>`

const result = optimize(whole, config)

// console.log("REZ", result)
await writeFile(`whole-${t}.svg`, result.data)
