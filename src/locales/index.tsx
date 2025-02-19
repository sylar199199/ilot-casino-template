import { createI18n } from "vue-i18n"
import { getCountryCode } from '@/utils/getCountryCode.tsx'
import ng from "./ng"
import ke from "./ke"
import gh from "./gh"

const messages = {
  ng,
  ke,
  gh
}

// i18n初始化时设置countryCode
const countryCode = getCountryCode()
const i18n = createI18n({
  legacy: false, // 不设置会报Uncaught SyntaxError: Not available in legacy mode 错误
  locale: countryCode || localStorage.getItem('countryCode') || 'ng', // 设置语言
  messages
})

export default i18n