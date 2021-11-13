import styled from '@emotion/styled'

export const ProjectWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */

  width: 100%;
  height: 100%;

  .content {
    width: 100%;
  }

  @media (max-width: 767px) {
    flex-direction: column;

    .content {
      padding-top: 1.6rem;
      display: flex;
      flex: 1;
    }
  }

  @media (min-width: 768px) {
    .ant-menu {
      width: 16rem;
    }
    .content {
      box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
      display: flex;
      overflow: hidden;
      padding-left: 3.2rem;
    }
  }
`
