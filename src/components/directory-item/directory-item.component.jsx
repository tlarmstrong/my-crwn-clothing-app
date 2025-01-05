import { useNavigate } from 'react-router';

import {
  DirectoryItemContainer,
  BackgroundImage,
  DirectoryItemBody
} from './directory-item.styles';

const DirectoryItem = ({category}) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={ onNavigateHandler }>
      <BackgroundImage imageurl={imageUrl} />
      <DirectoryItemBody>
        <h2>{ title }</h2>
        <p>Shop Now</p>
      </DirectoryItemBody>
    </DirectoryItemContainer>
  );
}

export default DirectoryItem;
