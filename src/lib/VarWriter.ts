import esRules from './es.json'
import phpRules from './php.json'

const traverse = (data:any, rules:any, depth:number) => {
  if (data === undefined) {
    return ''
  }
  let result = depth ? '' : rules.start

  switch (data.constructor) {
    case Array:
      result += rules.arrStart
      result += data
        .map(
          (data:any) => {
            return traverse(data, rules, depth + 1)
          },
          rules,
          depth,
        )
        .join(rules.arrDivider)
      result += rules.arrEnd
      break

    case Object:
      result += rules.objStart
      for (const key in data) {
        if (!data.hasOwnProperty(key)) {
          continue
        }
        result +=
          rules.objKeyDelim +
          key +
          rules.objKeyDelim +
          rules.objMid +
          traverse(data[key], rules, depth + 1) +
          rules.objDivider
      }
      result += rules.objEnd
      break

    case String:
      result += rules.strDelim + data + rules.strDelim
      break

    case Number:
    default:
      result += rules.intDelim + data + rules.intDelim
      break
  }

  result += depth ? '' : rules.end
  return result
}

const php = (data:any) => {
  return traverse(data, phpRules, 0)
}

const es = (data:any) => {
  return traverse(data, esRules, 0)
}

export { es, php }
