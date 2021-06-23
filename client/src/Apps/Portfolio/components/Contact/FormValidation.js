export const validInputs = () => {
  const inputs = document.querySelectorAll('input')
  const textArea = document.querySelector('textarea')

  for (const input of inputs) {
    if (!validate(input.value)) return false
  }

  return validate(textArea.value)
}

const validate = string => {
  if (string.length === 0) return false
  if (string.includes('<script>') || string.includes('</stript>')) return false
  return true
}
