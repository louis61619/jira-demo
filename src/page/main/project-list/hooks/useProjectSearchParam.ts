import { useMemo } from 'react'
import { useUrlQueryParam } from '@/hooks'

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])

  return [
    useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
    setParam
  ] as const
}

// export const useProjectModal = () => {
//   const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate'])

//   const open = () => setProjectCreate({ projectCreate: true })
//   const close = () => setProjectCreate({ projectCreate: false })

//   // 返回的參數在兩到三個以內就用tupple
//   return { projectModalOpen: projectCreate === 'true', open, close }
// }
