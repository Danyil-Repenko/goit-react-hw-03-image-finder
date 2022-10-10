import { GalleryItem, Image } from './ImageGalleryItem.styled';
import React, { Component } from 'react';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    const { smallImage, largeImage, tags } = this.props;
    return (
      <GalleryItem>
        <Image onClick={this.toggleModal} src={smallImage} alt={tags} />
        {this.state.showModal && (
          <Modal
            image={largeImage}
            altText={tags}
            closeModal={this.toggleModal}
          />
        )}
      </GalleryItem>
    );
  }
}
