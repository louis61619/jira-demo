import React from 'react'

interface Props {
  name: string
  keyword: string
}

const Mark = ({ name, keyword }: Props) => {
  if (!keyword) return <>{name}</>

  // 用關鍵字進行切割
  // 然後再用map將關鍵字染色塞回去
  const arr = name.split(keyword)

  return (
    <>
      {arr.map((str, index) => {
        return (
          <span key={index}>
            {str}
            {index === arr.length - 1 ? null : <span style={{ color: '#257afd' }}>{keyword}</span>}
          </span>
        )
      })}
    </>
  )
}

export default Mark
