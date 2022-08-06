// 6桁のPINを生成
export const generatePIN = () => {
  return Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
}

export const mapToObject = map =>
  [...map].reduce((l, [k, v]) => Object.assign(l, { [k]: v }), {})