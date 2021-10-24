import { Spin } from 'antd'
import { FullPageWrapper } from './style'

const PageLoading = () => {
  return (
    <FullPageWrapper>
      <Spin size="large" />
    </FullPageWrapper>
  )
}

export default PageLoading
