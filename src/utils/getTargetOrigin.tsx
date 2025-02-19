export function getTargetOrigin() {
  if (['dev', 'test'].includes(process.env.VITE_ENV as string)) return '*'
  return location.origin
}
