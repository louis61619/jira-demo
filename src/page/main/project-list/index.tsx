import React from 'react'

import { useDebounce } from '@/hooks'
import { useProjects } from '@/service/projects'
import { useUsers } from '@/service/users'
import { Typography, Divider } from 'antd'

import SearchPanel from './components/SearchPanel'
import List from './components/List'

import { useProjectSearchParams } from './hooks'

interface ProjectListProps {}

const ProjectList = (props: ProjectListProps) => {
  // const [param, setParam] = useState<SearchPanelProps['param']>({
  //   name: '',
  //   personId: ''
  // })

  // const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  // const [list, setList] = useState([])
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState<null | Error>(null)
  // const { run, isLoading, error, data: list } = useAsync<Project[]>()
  // const projectParam = { ...param, personId: Number(param.personId) || undefined }

  const [param, setParam] = useProjectSearchParams()
  const debounceParam = useDebounce(param, 200)
  const { isLoading, error, data: list, retry } = useProjects(debounceParam)
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
      <Divider />
      {error && <Typography.Text type="danger">{error.message}</Typography.Text>}
      <button onClick={retry}>retry</button>
      <List refresh={retry} loading={isLoading} dataSource={list || []} users={users || []} />
    </div>
  )
}

ProjectList.whyDidYouRender = false

export default ProjectList
