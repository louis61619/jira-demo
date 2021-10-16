// 判斷值是否不存在 不存在返回true
// unknown嚴格版any
// unknown不能賦予給任何值，也不調用其中的方法
export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const cleanObject = (object: any) => {
  // 等同於Object.assign({}, object)
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}
