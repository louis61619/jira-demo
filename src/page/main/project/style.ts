import styled from '@emotion/styled'

// type RouteType = 'epic' | 'kanban'

export const ProjectWrapper = styled.div<{ routeType: string }>`
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
      /* overflow: hidden; */
      overflow: ${(props) => (props.routeType !== 'epic' ? 'hidden' : '')};
      padding-left: 3.2rem;
    }
  }
`
