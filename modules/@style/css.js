export default function css(strings, ...args) {
  let result = ''
  for (let i = 0; i < strings.length; i++) {
    result += strings[i] + (args[i] || '')
  }
  return result
  // return args.map((arg, i) => `${strings[i]}${arg}`).join('')
}


/**-/

console.log(css`a {
background: blue;
}

b {
  display:flex;
  width: ${500}px;
}`) 

/**/