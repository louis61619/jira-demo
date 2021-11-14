import React from 'react'
import { Divider, Button } from 'antd'

import { useDebounce, useProjectModal } from '@/hooks'
import { useProjects } from '@/service/projects'
import { useUsers } from '@/service/users'
import ErrorBox from '@/components/error-box'

import SearchPanel from './components/SearchPanel'
import List from './components/List'
import { ProjectListWrapper } from './style'

import { useProjectSearchParams } from '@/hooks'

const ProjectList = () => {
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
  const { isLoading, error, data: list } = useProjects(debounceParam)
  const { data: users } = useUsers()
  const { open } = useProjectModal()

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
    <ProjectListWrapper>
      <div className="top">
        <h2>項目列表</h2>
        <Button onClick={open}>創建項目</Button>
      </div>
      <SearchPanel param={param} setParam={setParam} />

      <Divider />
      <ErrorBox error={error} />
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </ProjectListWrapper>
  )
}

ProjectList.whyDidYouRender = false

export default ProjectList
