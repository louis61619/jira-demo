import React, { useEffect, useState } from 'react'
import Qs from 'qs'

import { cleanObject } from '@/utils/clean-object'
import { apiUrl } from '@/service'
import { useMount, useDebounce } from '@/hooks'

import SearchPanel from './components/SearchPanel'
import List from './components/List'

// import moduleName from ''

interface ProjectListProps {}

const ProjectList = (props: ProjectListProps) => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])

  const debounceParam = useDebounce(param, 1000)

  useEffect(() => {
    fetch(`${apiUrl}/projects?${Qs.stringify(cleanObject(debounceParam))}`).then(async (res) => {
      if (res.ok) setList(await res.json())
    })
  }, [debounceParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) setUsers(await res.json())
    })
  })

  useEffect(() => {
    console.log(debounceParam)
  }, [debounceParam])

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  )
}

export default ProjectList
