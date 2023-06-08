import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { Flow } from 'flow-launcher-helper'
import open from 'open'
import { modify, config } from './config/config.js'
import { components, languageMap, versionMap } from './data.js'
import { camelToKebab, findVal } from './utils.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 配置参数
const configParams = ['version', 'language']

const { on, showResult, run } = new Flow('app.png')

on('query', params => {
  params = params.filter(Boolean)
  if (params) {
    const [first = ''] = params

    if (configParams.includes(first.toLowerCase())) {
      const map = { versionMap, languageMap }
      const currentMap = map[`${first}Map`]
      showResult(...getConfigResult(currentMap, first, config[first]))
      return
    }

    showResult(...getResults(first))
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
  return result.map(({ title, subtitle, name }) => ({
    title,
    subtitle,
    iconPath: `${join(__dirname, 'assets', 'icon', name)}.png`,
    method: 'open',
    params: [`${baseUrl}${camelToKebab(name)}${language}`]
  }))
}

function getConfigResult(currentMap, key, val) {
  return currentMap.map(({ title, label }) => {
    const isCurrent = val === label
    return {
      title,
      subtitle: isCurrent ? `${key} 的配置信息如上` : `点击修改 ${key} 为 ${title}`,
      score: isCurrent ? 100 : 0,
      method: 'modify',
      params: [key, label]
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
