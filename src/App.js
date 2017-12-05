import React from 'react';
import { connect } from 'react-redux';
import styled, { injectGlobal } from 'styled-components';
import { ACTIONS } from './store';
import { TextInput, Button, Task } from './components';

injectGlobal`
  body{
    margin:0;
    padding:0;
    font-family: Arial, sans-serif;
  }
  body *{
    box-sizing: border-box;
  }
`;

const TaskLabel = styled.div`
  font-size: 10px;
  color: #082490;
`;

const AppTitle = styled.div`
  position: absolute;
  top: -10px;
  left: -40px;
  transform: rotate(-45deg);
  background: #fff;
  border: 2px solid #000;
  color: #082490;
  padding: 4px 8px;
  font-weight: 700;

  @media (max-width: 768px){
    position: relative;
    top: -40px;
    text-align: center;
    left: initial;
    transform: rotate(0);
    background: #fff;
    border: 2px solid #000;
    color: #082490;
    padding: 4px 8px;
    font-weight: 700;
  }
`;

const Controls = styled.div`
  text-align: center;
  position: relative;
  bottom: -32px;
`;
const GroupTitle = styled.div`
  font-size: 12px;
  color: ${({active})=>active? '#ac8aec' : '#dcdcdc'};
  padding: 6px;
  border-top: 1px dashed #dcdcdc;
  border-bottom: 1px dashed #dcdcdc;
  text-align: center;
  background: #fff;
  margin: 34px auto;
`;
const Group = styled.div`
  text-align: center;
`;
const InputForm = styled.div`
  position: relative;
  font-size: 16px;
  color: #000;
  padding: 24px;
  border: 2px solid #323232;
  box-shadow: 0 0 10px hsla(0, 0%, 0%, 0.2);
  max-width: 320px;
  background: #fff;
  margin: 34px auto;
`;
class MainApp extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      height: 'auto'
    };
  }

  saveTask = () => {
    const { addTask, edit } = this.props;
    addTask(edit);
  };
  render() {
    return (
      <div>
        <InputForm>
          <AppTitle>New Task</AppTitle>
          <TaskLabel>Title</TaskLabel>
          <TextInput />
          <TaskLabel>Task</TaskLabel>
          <TextInput multiline />
          <Controls>
            <Button text="Save" onClick={this.saveTask} />
          </Controls>
        </InputForm>
        <GroupTitle active>Active Tasks</GroupTitle>
        <Group>
          <Task id={0} />
          <Task id={0} />
          <Task id={0} />
          <Task id={0} />
        </Group>
        <GroupTitle>Completed Tasks</GroupTitle>
      </div>
    );
  }
}

export const App = connect(
  state => ({
    taskList: state.task,
    edit: state.edit
  }),
  dispatch => ({
    addTask: task => dispatch(ACTIONS.addTask(task))
  })
)(MainApp);
