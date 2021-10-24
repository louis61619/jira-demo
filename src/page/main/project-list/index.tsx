import React from 'react'

import { useDebounce, useUrlQueryParam } from '@/hooks'
import { useProjects } from '@/service/projects'
import { useUsers } from '@/service/users'
import { Typography } from 'antd'

import SearchPanel from './components/SearchPanel'
import List from './components/List'

interface ProjectListProps {}

const ProjectList = (props: ProjectListProps) => {
  // const [param, setParam] = useState<SearchPanelProps['param']>({
  //   name: '',
  //   personId: ''
  // })

  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  // const [list, setList] = useState([])
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState<null | Error>(null)
  // const { run, isLoading, error, data: list } = useAsync<Project[]>()

  const debounceParam = useDebounce(param, 200)
  const { isLoading, error, data: list } = useProjects(debounceParam)
  const { data: users } = useUsers()

  // useEffect(() => {
  //   // 1. 使用原始的fetch
  //   // fetch(`${apiUrl}/projects?${Qs.stringify(cleanObject(debounceParam))}`).then(async (res) => {
  //   //   if (res.ok) setList(await res.json())
  //   // })

  //   // 2. 封裝請求
  //   // setLoading(true)
  //   // client('projects', { data: cleanObject(debounceParam) })
  //   //   .then(setList)
  //   //   .catch((err) => {
  //   //     setList([])
  //   //     // console.log(err)
  //   //     setError(err)
  //   //   })
  //   //   .finally(() => setLoading(false))

  //   // 3. 封裝成hook
  //   run(client('projects', { data: cleanObject(debounceParam) }))
  // }, [debounceParam, client])

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error && <Typography.Text type="danger">{error.message}</Typography.Text>}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </div>
  )
}

ProjectList.whyDidYouRender = false

export default ProjectList
