#!/usr/bin/env node
const filePath = process.argv[2]
require('fs').readFile(filePath, 'utf8', (err, file) => {
  if (err) {
    console.error(`Cannot Read file : ${process.filePath}`)
    return
  }
  var stack = []
  var skipFlag = false
  for (let i = 0; i < file.length; i++) {
    if (skipFlag === true) {
      skipFlag = false
      continue
    }
    const c = file.substr(i, 1)
    const top = stack.length > 0 ? stack.length - 1 : null
    if (c === '규') {
      stack.push(0)
    } else if (c === '귯') {
      if (top === null) {
        console.error(`\nInvalid stack pointer on offset ${i} : ${c}`)
        break
      } else {
        stack[top] += 1
      }
    } else if (c === '류') {
      if (top === null) {
        console.error(`\nInvalid stack pointer on offset ${i} : ${c}`)
        break
      } else {
        stack[top] = stack[top] << 1
      }
    } else if (c === '륫') {
      if (top === null) {
        console.error(`\nInvalid stack pointer on offset ${i} : ${c}`)
        break
      } else {
        stack[top] -= 1
      }
    } else if (c === '\n' || c === '\r') {
      if (c === '\r') {
        skipFlag = true
      }
      const revStack = stack.reverse()
      for (data of revStack) {
        process.stdout.write(String.fromCharCode(data))
      }
      stack = []
    } else {
      console.error(`\nUnknown character on offset ${i} : ${c}`)
      break
    }
  }
})
