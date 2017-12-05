import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ACTIONS } from './index';

const StyledInput = styled.input`
  font-size: 16px;
  color: #323232;
  padding: 12px 24px;
  border: none;
  border-bottom: 1px solid #323232;
  width: 100%;
  display: block;
  outline: none;
  margin-bottom: 12px;
`;

const StyledTextArea = styled.textarea`
  font-size: 16px;
  color: #323232;
  padding: 12px 24px;
  border: none;
  border-bottom: 1px solid #323232;
  width: 100%;
  display: block;
  outline: none;
  margin-bottom: 12px;
  resize: none;
  min-height: 96px;
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
    const { editTitle, editBody, edit, multiline } = this.props;
    const { value } = target;
    multiline
    ? editBody({ body: value })
    : editTitle({ title: value })

    const height = multiline ? this.textarea.scrollHeight - 1 : 'auto';
    this.setState({ height });
  };
  render() {
    const {  height } = this.state;
    const { multiline, edit } = this.props;
    return (
      <div>
        {multiline ? (
          <StyledTextArea
            height={edit.body&&height}
            innerRef={textarea => (this.textarea = textarea)}
            onChange={this.onChange}
            value={edit.body}
          />
        ) : (
          <StyledInput onChange={this.onChange} value={edit.title} />
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
    editBody: ({ body }) => dispatch(ACTIONS.editTask({ body })),
    editTitle: ({ title }) => dispatch(ACTIONS.editTask({ title }))
  })
)(TextInputApp);
