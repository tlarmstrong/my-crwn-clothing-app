import {
  DirectoryItemContainer,
  BackgroundImage,
  DirectoryItemBody
} from './directory-item.styles';

const DirectoryItem = ({category}) => {
  const { imageUrl, title } = category;

  return (
    <DirectoryItemContainer>
      <BackgroundImage imageurl={imageUrl} />
      <DirectoryItemBody>
        <h2>{ title }</h2>
        <p>Shop Now</p>
      </DirectoryItemBody>
    </DirectoryItemContainer>
  );
}

export default DirectoryItem;
