﻿import fs from 'fs'
import PluginSojson from './plugin/sojson.js'
import PluginSojsonV7 from './plugin/sojsonv7.js'
import PluginObfuscator from './plugin/obfuscator.js'

// 读取参数
let type = 'obfuscator'
let encodeFile = 'input.js'
let decodeFile = 'output.js'
for (let i = 2; i < process.argv.length; i += 2) {
  if (process.argv[i] === '-t') {
    type = process.argv[i + 1]
  }
  if (process.argv[i] === '-i') {
    encodeFile = process.argv[i + 1]
  }
  if (process.argv[i] === '-o') {
    decodeFile = process.argv[i + 1]
  }
}
console.log(`类型: ${type}`)
console.log(`输入: ${encodeFile}`)
console.log(`输出: ${decodeFile}`)

// 读取源代码
const sourceCode = fs.readFileSync(encodeFile, { encoding: 'utf-8' })

// 净化源代码
let code
if (type === 'sojson') {
  code = PluginSojson(sourceCode)
} else if (type === 'sojsonv7') {
  code = PluginSojsonV7(sourceCode)
} else if (type === 'obfuscator') {
  code = PluginObfuscator(sourceCode)
}

// 输出代码
fs.writeFile(decodeFile, code, () => {})
