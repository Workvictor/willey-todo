import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ACTIONS } from './index';

const StyledInput = styled.input`
  font-size: 16px;
  color: #323232;
  padding: 12px 24px;
  border: none;
  border-bottom: 1px solid
    ${({ active }) => (active ? '#323232' : 'transparent')};
  width: 100%;
  display: block;
  outline: none;
  margin-bottom: 12px;
  background: transparent;
`;

const StyledTextArea = styled.textarea`
  font-size: 16px;
  color: #323232;
  padding: 12px 24px;
  border: none;
  border-bottom: 1px solid
    ${({ active }) => (active ? '#323232' : 'transparent')};
  width: 100%;
  display: block;
  outline: none;
  margin-bottom: 12px;
  resize: none;
  min-height: 96px;
  background: transparent;
  height: ${({ height }) =>
    typeof height === 'number' ? `${height + 2}px` : height};
`;

class TextInputApp extends React.Component {
  constructor() {
    super();
    this.state = {
      height: 'auto'
    };
  }
  onChange = ({ target }) => {
    const { editTitle, editBody, multiline, id } = this.props;
    const { value } = target;
    multiline
    ? editBody({ body: value, id })
    : editTitle({ title: value, id });

    const height = multiline ? this.textarea.scrollHeight - 1 : 'auto';
    this.setState({ height });
  };
  render() {
    const { height } = this.state;
    const { multiline, active, value } = this.props;
    return (
      <div>
        {multiline ? (
          <StyledTextArea
            active={active}
            height={value && height}
            innerRef={textarea => (this.textarea = textarea)}
            onChange={this.onChange}
            value={value}
          />
        ) : (
          <StyledInput
            active={active}
            onChange={this.onChange}
            value={value}
          />
        )}
      </div>
    );
  }
}

export const TextInput = connect(
  state => ({
    edit: state.edit
  }),
  dispatch => ({
    editBody: ({ body, id }) => dispatch(ACTIONS.editTask({ body, id })),
    editTitle: ({ title, id }) => dispatch(ACTIONS.editTask({ title, id }))
  })
)(TextInputApp);
