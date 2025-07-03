export function getPrice(id: number): number {
  const base = 9
  const extra = (id * 37) % 100
  const final = base + (extra % 10) + 0.99

  return final
}
