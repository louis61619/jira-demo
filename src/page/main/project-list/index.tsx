import React, { useEffect, useState } from 'react'

import { cleanObject } from '@/utils/clean-object'
import { useMount, useDebounce, useReuqest } from '@/hooks'

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

  const debounceParam = useDebounce(param, 200)
  const client = useReuqest()

  useEffect(() => {
    // fetch(`${apiUrl}/projects?${Qs.stringify(cleanObject(debounceParam))}`).then(async (res) => {
    //   if (res.ok) setList(await res.json())
    // })
    client('projects', { data: cleanObject(debounceParam) }).then(setList)
  }, [debounceParam, client])

  useMount(() => {
    // fetch(`${apiUrl}/users`).then(async (res) => {
    //   if (res.ok) setUsers(await res.json())
    // })
    client('users').then(setUsers)
  })

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  )
}

export default ProjectList
