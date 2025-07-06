export async function fetchAddressByCep(cep: string) {
  const cleanCep = cep.replace(/\D/g, '')

  const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
  const data = await res.json()

  if ('erro' in data) {
    throw new Error('CEP não encontrado')
  }

  return {
    address: data.logradouro,
    city: data.localidade,
    state: data.uf,
  }
}
