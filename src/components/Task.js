import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ACTIONS, Button, TextInput } from './index';

const StyledTask = styled.div`
  font-size: 14px;
  text-align: left;
  color: #323232;
  padding: 16px;
  border: 2px solid #323232;
  display: inline-block;
  background: ${({ color }) => color};
  margin: 16px;
  width: calc(25% - 32px);
  & button {
    font-size: 12px;
    padding: 4px 6px;
    margin: 0 6px 0 0;
    position: relative;
  }
  @media (max-width: 768px) {
    width: calc(50% - 32px);
  }
  @media (max-width: 465px) {
    width: calc(100% - 32px);
  }
`;

const Body = styled.div`
  margin: 0 0 8px 0;
  font-size: 16px;
  padding: 0 0 4px 0;
`;

export const TaskApp = ({ task, completeTask, removeTask, completed }) => (
  <StyledTask color={task.color}>
    {!completed ? (
      <TextInput id={task.id} value={task.title} active={false}>
        {task.title}
      </TextInput>
    ) : (
      <Body>{task.title}</Body>
    )}
    {!completed ? (
      <TextInput id={task.id} value={task.body} multiline active={false}>
        {task.body}
      </TextInput>
    ) : (
      <Body>{task.body}</Body>
    )}
    {!completed && (
      <Button onClick={() => completeTask(task)} text="Complete task" />
    )}
    {!completed && (
      <Button onClick={() => removeTask(task)} text="Remove task" />
    )}
  </StyledTask>
);

export const Task = connect(
  state => ({}),
  dispatch => ({
    editBody: ({ body }) => dispatch(ACTIONS.editTask({ body })),
    editTitle: ({ title }) => dispatch(ACTIONS.editTask({ title })),
    completeTask: task => dispatch(ACTIONS.completeTask(task)),
    removeTask: task => dispatch(ACTIONS.removeTask(task))
  })
)(TaskApp);
