export const findVal = (data, key, label = 'label', value = 'value') => {
  if (!isObject(data)) return
  let target
  if (Array.isArray(data)) {
    data.some(item => {
      if (!isObject(item)) return false
      if (item[label] === key) {
        target = item[value]
        return true
      } else {
        return false
      }
    })
  } else {
    for (const iterator of data) {
      if (data[iterator] === key) {
        target = iterator
      }
    }
  }
  return target
}

export const isObject = obj => {
  return typeof obj === 'object' && obj != null
}

export const camelToKebab = str => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
