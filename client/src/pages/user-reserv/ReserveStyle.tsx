import styled from 'styled-components';
import { InfoText, ListContainer } from '../../components/Liststyle';
export const Container = styled(ListContainer)`
  max-width: 1000px;
  margin: 0rem auto;
  padding: 1rem;
`;
export const Column = styled(InfoText)`
  flex: 0 0 20%;
`;
export const CheckBtn = styled.button`
  border: none;
  border-radius: 10px;
  padding: 0.5rem;
  color: white;
  background-color: ${(props) => props.theme.palette.orange};
  font-weight: bold;
  :hover {
    transform: scale(1.05);
  }
`;
