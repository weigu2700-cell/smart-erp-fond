import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { setLocalStorage, getLocalStorage } from '@/utils/storage'

export type ThemeMode = 'light' | 'dark'
export type ColorScheme = 'office' | 'blue' | 'teal' | 'violet' | 'orange'

const colorSchemes: Record<ColorScheme, {
  name: string
  primary: string
  hover: string
  light3: string
  light5: string
  light7: string
  light8: string
  light9: string
  dark: string
}> = {
  office: { name: 'Office 蓝', primary: '#0078d4', hover: '#106ebe', light3: '#5aa9e6', light5: '#8fc7ef', light7: '#b9ddf5', light8: '#d2eafa', light9: '#eaf5fc', dark: '#005a9e' },
  blue: { name: '湖水蓝', primary: '#1a73e8', hover: '#1557b0', light3: '#669df0', light5: '#9fc1f6', light7: '#c8dcfb', light8: '#d9e7fc', light9: '#e8f0fe', dark: '#1557b0' },
  teal: { name: '商务青', primary: '#0f766e', hover: '#0b5f59', light3: '#5aa9a3', light5: '#8fc3bf', light7: '#b9dcd9', light8: '#d2eae8', light9: '#eaf6f5', dark: '#0b5f59' },
  violet: { name: '雅致紫', primary: '#6750a4', hover: '#50398d', light3: '#9b8bc5', light5: '#bdb2db', light7: '#d6d0e9', light8: '#e3dff0', light9: '#f1eff8', dark: '#50398d' },
  orange: { name: '活力橙', primary: '#c2410c', hover: '#9a3412', light3: '#df8a66', light5: '#ebb19a', light7: '#f3cfc0', light8: '#f7ddd2', light9: '#fdf1ed', dark: '#9a3412' },
}

function mixHex(foreground: string, background: string, foregroundWeight: number) {
  const parse = (value: string) => value.replace('#', '').match(/.{2}/g)?.map(part => parseInt(part, 16)) ?? [0, 0, 0]
  const fg = parse(foreground)
  const bg = parse(background)
  const channels = fg.map((channel, index) => Math.round(channel * foregroundWeight + bg[index]! * (1 - foregroundWeight)))
  return `#${channels.map(channel => channel.toString(16).padStart(2, '0')).join('')}`
}

function rgbaHex(value: string, alpha: number) {
  const channels = value.replace('#', '').match(/.{2}/g)?.map(part => parseInt(part, 16)) ?? [0, 0, 0]
  return `rgb(${channels.join(' ')} / ${alpha})`
}

function applyTheme(mode: ThemeMode, scheme: ColorScheme) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  const palette = colorSchemes[scheme]
  root.classList.toggle('dark', mode === 'dark')
  root.dataset.theme = scheme
  root.style.setProperty('--color-primary', palette.primary)
  root.style.setProperty('--color-primary-soft', palette.light9)
  root.style.setProperty('--el-color-primary', palette.primary)
  root.style.setProperty('--el-color-primary-light-3', palette.light3)
  root.style.setProperty('--el-color-primary-light-5', palette.light5)
  root.style.setProperty('--el-color-primary-light-7', palette.light7)
  root.style.setProperty('--el-color-primary-light-8', palette.light8)
  root.style.setProperty('--el-color-primary-light-9', palette.light9)
  root.style.setProperty('--el-color-primary-dark-2', palette.dark)
  const menuSurface = mode === 'dark' ? mixHex(palette.primary, '#0f172a', 0.18) : mixHex(palette.primary, '#1f2937', 0.2)
  const menuHover = mode === 'dark' ? mixHex(palette.primary, '#1f2937', 0.24) : mixHex(palette.primary, '#334155', 0.28)
  const menuSub = mode === 'dark' ? mixHex(palette.primary, '#020617', 0.1) : mixHex(palette.primary, '#111827', 0.12)
  root.style.setProperty('--menu-surface', menuSurface)
  root.style.setProperty('--menu-text', mode === 'dark' ? '#cbd5e1' : '#d8e0ea')
  root.style.setProperty('--menu-hover', menuHover)
  root.style.setProperty('--menu-active', mode === 'dark' ? palette.dark : palette.primary)
  root.style.setProperty('--menu-hover-bg', rgbaHex(palette.primary, mode === 'dark' ? 0.12 : 0.1))
  root.style.setProperty('--menu-active-bg', rgbaHex(palette.primary, mode === 'dark' ? 0.2 : 0.16))
  root.style.setProperty('--menu-sub', menuSub)
  root.style.setProperty('--menu-brand-text', mode === 'dark' ? '#f8fafc' : '#ffffff')
  root.style.setProperty('--menu-brand-muted', mode === 'dark' ? '#94a3b8' : '#a8b3c4')
}

const useAppStore = defineStore('app',()=>{
  const isFold = ref<boolean>(getLocalStorage('isFold') === 'true')
  const themeMode = ref<ThemeMode>(getLocalStorage('themeMode') === 'dark' ? 'dark' : 'light')
  const storedScheme = getLocalStorage('colorScheme')
  const colorScheme = ref<ColorScheme>(storedScheme && storedScheme in colorSchemes ? storedScheme as ColorScheme : 'office')

  const toggleCollapse = () => {
    isFold.value = !isFold.value
    setLocalStorage('isFold', isFold.value.toString())
  }

  const setThemeMode = (mode: ThemeMode) => {
    themeMode.value = mode
  }

  const toggleTheme = () => setThemeMode(themeMode.value === 'light' ? 'dark' : 'light')

  const setColorScheme = (scheme: ColorScheme) => {
    if (colorSchemes[scheme]) colorScheme.value = scheme
  }

  watch([themeMode, colorScheme], ([mode, scheme]) => {
    setLocalStorage('themeMode', mode)
    setLocalStorage('colorScheme', scheme)
    applyTheme(mode, scheme)
  }, { immediate: true })

  return {
    isFold,
    toggleCollapse,
    themeMode,
    colorScheme,
    colorSchemes,
    setThemeMode,
    toggleTheme,
    setColorScheme,
  }
})


export default useAppStore
