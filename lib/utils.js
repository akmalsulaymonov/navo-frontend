import { IMG_POOLS, AD_POOLS } from './constants'

export function getImgId(seed, pool) {
  let h = 0
  const s = seed || 'news'
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  const arr = IMG_POOLS[pool] || IMG_POOLS.default
  return arr[h % arr.length]
}

export function adSeed(label) {
  let h = 0
  for (let i = 0; i < label.length; i++) h = (h * 31 + label.charCodeAt(i)) >>> 0
  return h
}

export function getAdItem(w, h, label) {
  const numH = typeof h === 'number' ? h : 250
  const numW = typeof w === 'number' ? w : 300
  let format = 'rectangle'
  if (numH <= 100) format = numW >= 600 ? 'leaderboard' : 'infeed'
  else if (numH >= 500) format = 'halfpage'
  const pool = AD_POOLS[format] || AD_POOLS.rectangle
  const idx = adSeed(label || format) % pool.length
  return { ad: pool[idx], format, numH, numW }
}
