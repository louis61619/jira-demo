import { Typography } from 'antd'
import { FullPageWrapper } from './style'

const PageError = ({ error }: { error: Error | null }) => {
  return (
    <FullPageWrapper>
      <Typography.Text type="danger">{error?.message}</Typography.Text>
    </FullPageWrapper>
  )
}

export default PageError
