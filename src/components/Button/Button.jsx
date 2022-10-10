import { LoadMore, Container } from './Button.styled';

export const Button = ({ onButtonClick }) => {
  return (
    <Container>
      <LoadMore onClick={onButtonClick} type="button">
        Load more
      </LoadMore>
    </Container>
  );
};
