import { Modal } from './index';
import { Container } from './styles';

function ModalWrap({ children }) {
  return (
    <Container>
      <Modal />
      {children}
    </Container>
  );
}

export default ModalWrap;
