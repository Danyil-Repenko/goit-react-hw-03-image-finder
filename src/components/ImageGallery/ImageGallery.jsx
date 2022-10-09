import React, { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import { imageFetch } from 'components/imageFetch';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
export class ImageGallery extends Component {
  state = {
    galleryData: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchInput;
    const currentQuery = this.props.searchInput;

    if (prevQuery !== currentQuery) {
      imageFetch(currentQuery)
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(new Error(`Couldn't find ${currentQuery}`));
        })
        .then(data => {
          if (data.total !== 0) {
            return this.setState({ galleryData: data.hits });
          } else {
            this.setState({ galleryData: [] });
            return Promise.reject(new Error(`Couldn't find ${currentQuery}`));
          }
        })
        .catch(error => Notify.failure(error.message));
    }
  }

  createListItems = () => {
    if (this.state.galleryData) {
      return this.state.galleryData.map(
        ({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              smallImage={webformatURL}
              largeImage={largeImageURL}
              tags={tags}
            />
          );
        }
      );
    }
  };

  render() {
    return <Gallery>{this.createListItems()}</Gallery>;
  }
}
