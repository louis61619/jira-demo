import React from 'react'
import { Divider, Spin } from 'antd'
import { useKanbans } from '@/service/kanban'
import { useTasks } from '@/service/task'
import { useDocumentTitle } from '@/hooks'

import {
  useProjectInUrl,
  useKanbanSearchParams,
  useTasksSearchParmas
} from './hooks/useKanbanSearchParams'
import KanbanColumn from './components/KanbanColumn'
import SearchPanel from './components/SearchPanel'
import { ColumnsWrapper, KanbanWrapper } from './style'

interface Props {}

const Kanban = (props: Props) => {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
  const [param] = useTasksSearchParmas()
  const { isLoading: taskIsLoading } = useTasks(param)
  const isLoading = taskIsLoading || kanbanIsLoading

  return (
    <KanbanWrapper>
      <h2>{currentProject?.name}看板</h2>
      <SearchPanel />
      <Divider />
      {isLoading ? (
        <Spin style={{ margin: '3rem 0' }} />
      ) : (
        <ColumnsWrapper className="column">
          {kanbans?.map((kanban) => {
            return (
              <KanbanColumn key={kanban.id} kanban={kanban}>
                {kanban.name}
              </KanbanColumn>
            )
          })}
        </ColumnsWrapper>
      )}
    </KanbanWrapper>
  )
}

export default Kanban
