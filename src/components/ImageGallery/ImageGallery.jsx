import React, { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import { imageFetch } from 'components/imageFetch';
import { Button } from 'components/Button/Button';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { MagnifyingGlass } from 'react-loader-spinner';

export class ImageGallery extends Component {
  state = {
    galleryData: null,
    nextPage: 2,
    status: 'idle',
  };

  componentDidUpdate(prevProps) {
    const prevQuery = prevProps.searchInput;
    const currentQuery = this.props.searchInput;

    if (prevQuery !== currentQuery) {
      this.setState({ status: 'searching' });
      imageFetch(currentQuery)
        .then(response => {
          if (response.data.total !== 0) {
            return this.setState({
              galleryData: response.data.hits,
              nextPage: 2,
              status: 'loaded',
            });
          } else {
            this.setState({ galleryData: [] });
            return Promise.reject(new Error(`Couldn't find ${currentQuery}`));
          }
        })
        .catch(error => {
          Notify.failure(error.message);
          this.setState({ status: 'idle' });
        });
    }
  }

  handleLoadMore = () => {
    this.setState({ status: 'searching' });
    const currentQuery = this.props.searchInput;
    imageFetch(currentQuery, this.state.nextPage)
      .then(response => {
        this.setState(prevState => {
          return {
            galleryData: [...this.state.galleryData, ...response.data.hits],
            nextPage: prevState.nextPage + 1,
            status: 'loaded',
          };
        });
        const total = response.data.total;
        const imagesLoaded = this.state.galleryData.length + 12;
        if (imagesLoaded >= total) {
          return Promise.reject();
        }
      })
      .catch(() => this.setState({ status: 'idle' }));
  };

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
    const status = this.state.status;
    const gallery = <Gallery>{this.createListItems()}</Gallery>;

    if (status === 'searching') {
      return (
        <>
          {gallery}
          <MagnifyingGlass
            visible={true}
            height="100"
            width="100"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{ marginRight: 'auto', marginLeft: 'auto' }}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#ffffff"
            color="#000000"
          />
        </>
      );
    }

    if (status === 'loaded') {
      return (
        <>
          {gallery}
          <Button onButtonClick={this.handleLoadMore} />;
        </>
      );
    }

    return gallery;
  }
}
