import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { BiSearchAlt } from 'react-icons/bi';
import {
  Search,
  Form,
  SubmitButton,
  Label,
  Input,
} from 'components/Searchbar/Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInput = event => {
    const input = event.target.value;
    this.setState({ query: input });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (!this.state.query.trim()) {
      Notify.warning("Make sure you've enterd the search query");
      return;
    }

    this.props.onFormSubmit(this.state.query);
  };

  render() {
    return (
      <Search>
        <Form onSubmit={this.handleSubmit}>
          <SubmitButton type="submit">
            <BiSearchAlt size="25px" />
            <Label>Search</Label>
          </SubmitButton>

          <Input
            onChange={this.handleInput}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Search>
    );
  }
}
