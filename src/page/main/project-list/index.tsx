import React from 'react'
import { Typography, Divider, Button } from 'antd'

import { useDebounce } from '@/hooks'
import { useProjects } from '@/service/projects'
import { useUsers } from '@/service/users'

import SearchPanel from './components/SearchPanel'
import List from './components/List'
import { ProjectListWrapper } from './style'

import { useProjectSearchParams } from './hooks'

interface ProjectListProps {
  setProjectModalOpen?: (isOpen: boolean) => void
}

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
    <ProjectListWrapper>
      <div className="top">
        <SearchPanel param={param} setParam={setParam} users={users || []} />
        <Button onClick={() => props.setProjectModalOpen?.(true)}>創建項目</Button>
      </div>

      <Divider />
      {error && <Typography.Text type="danger">{error.message}</Typography.Text>}
      <List
        setProjectModalOpen={props.setProjectModalOpen}
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </ProjectListWrapper>
  )
}

ProjectList.whyDidYouRender = false

export default ProjectList
