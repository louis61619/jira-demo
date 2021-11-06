import ErrorBox from '@/components/error-box'
import { FullPageWrapper } from './style'

const PageError = ({ error }: { error: Error | null }) => {
  return (
    <FullPageWrapper>
      <ErrorBox error={error} />
    </FullPageWrapper>
  )
}

export default PageError
