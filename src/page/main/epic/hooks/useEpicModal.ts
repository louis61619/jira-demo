import { useUrlQueryParam, useSetUrlSearchParam } from '@/hooks'
import { useEpic } from '@/service/epic'

export const useEpicModal = () => {
  const [{ epicCreate }, setEpciCreate] = useUrlQueryParam(['epicCreate'])
  const setUrlParams = useSetUrlSearchParam()

  const [{ editingEpictId }, setEditingProjectId] = useUrlQueryParam(['editingEpictId'])
  const { data: editingEpic, isLoading } = useEpic(Number(editingEpictId))
  const startEdit = (id: number) => {
    // open()
    setEditingProjectId({ editingEpictId: id })
  }

  const open = () => setEpciCreate({ epicCreate: true })
  const close = () => {
    setUrlParams({ epicCreate: '', editingEpictId: '' })
  }

  // 返回的參數在兩到三個以內就用tupple
  return {
    epicModalOpen: epicCreate === 'true' || Boolean(editingEpictId),
    open,
    close,
    startEdit,
    editingEpic,
    isLoading
  }
}
