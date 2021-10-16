import React from 'react'
import type { User } from '@/types'

interface SearchPanelProps {
  param: {
    name: string
    personId: string
  }

  setParam: (param: SearchPanelProps['param']) => void
  users: User[]
}

const SearchPanel = (props: SearchPanelProps) => {
  const { param, setParam, users } = props

  // const [param, setParam] = useState({
  //   name: '',
  //   personId: ''
  // })

  // const [users, setUsers] = useState([])

  return (
    <form action="">
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(e) => {
            setParam({
              ...param,
              name: e.target.value
            })
          }}
        />
        <select
          onChange={(e) => {
            setParam({
              ...param,
              personId: e.target.value
            })
          }}
          value={param.personId}
        >
          <option value={''}>全部</option>
          {users.map((item) => {
            return (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            )
          })}
        </select>
      </div>
    </form>
  )
}

export default SearchPanel
