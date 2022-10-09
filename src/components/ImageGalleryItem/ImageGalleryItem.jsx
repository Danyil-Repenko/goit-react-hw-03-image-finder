import { GalleryItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallImage, largeImage, tags }) => {
  return (
    <GalleryItem>
      <Image src={smallImage} alt={tags} full={largeImage} />
    </GalleryItem>
  );
};
