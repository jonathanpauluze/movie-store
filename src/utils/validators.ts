export function isValidCPF(cpf: string): boolean {
  const cleaned = cpf.replace(/[^\d]+/g, '')

  if (cleaned.length !== 11 || /^(\d)\1+$/.test(cleaned)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) sum += parseInt(cleaned.charAt(i)) * (10 - i)
  let rev = 11 - (sum % 11)
  if (rev === 10 || rev === 11) rev = 0
  if (rev !== parseInt(cleaned.charAt(9))) return false

  sum = 0
  for (let i = 0; i < 10; i++) sum += parseInt(cleaned.charAt(i)) * (11 - i)
  rev = 11 - (sum % 11)
  if (rev === 10 || rev === 11) rev = 0

  return rev === parseInt(cleaned.charAt(10))
}

export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')

  return /^(\d{10,11})$/.test(cleaned)
}

export function isValidCEP(cep: string): boolean {
  const cleaned = cep.replace(/\D/g, '')

  return /^\d{8}$/.test(cleaned)
}
