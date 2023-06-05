import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { Flow } from 'flow-launcher-helper'
import open from 'open'
import { modify, config } from './config/config.js'
import { components, languageMap, versionMap } from './data.js'
import { camelToKebab, findVal } from './utils.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const { on, showResult, run } = new Flow('app.png')

on('query', params => {
  params = params.filter(Boolean)
  if (params) {
    showResult(...getResults(params[0]))
    return
  }
  showResult({
    title: 'Invalid input'
  })
})

function getResults(data = '') {
  data = data.toLowerCase()
  const result = components.reduce(
    (acc, item) => (item.keyWords.includes(data) ? acc.concat(item) : acc),
    []
  )
  const baseUrl = findVal(versionMap, config.version)
  const language = findVal(languageMap, config.language)
  return result.map(({ title, subtitle, name }) => {
    return {
      title,
      subtitle,
      iconPath: `${join(__dirname, 'assets', 'images', name)}.png`,
      method: 'open',
      params: [`${baseUrl}${camelToKebab(name)}${language}`]
    }
  })
}

on('open', params => {
  open(params[0])
})

on('modify', params => {
  modify(params[0], params[1])
})

run()
