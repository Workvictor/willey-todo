import React from 'react';
import { connect } from 'react-redux';
import styled, { injectGlobal } from 'styled-components';
import { ACTIONS } from './store';
import { TextInput, Button, Task, ColorPicker } from './components';

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

  @media (max-width: 768px) {
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
  bottom: -42px;
  display: flex;
  align-content: start;
  align-items: center;
`;
const GroupTitle = styled.div`
  font-size: 12px;
  color: ${({ active }) => (active ? '#ac8aec' : '#dcdcdc')};
  padding: 6px;
  border-top: 1px dashed #dcdcdc;
  border-bottom: 1px dashed #dcdcdc;
  text-align: center;
  background: #fff;
  margin: 34px auto;
  & div {
    filter: opacity(${({ active }) => (active ? 1 : 0.5)});
  }
`;
const Group = styled.div`
  text-align: center;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  & div {
    filter: opacity(${({ active }) => (active ? 1 : 0.5)});
  }
`;
const InputForm = styled.div`
  position: relative;
  font-size: 16px;
  color: #000;
  padding: 24px;
  border: 2px solid #323232;
  box-shadow: 0 0 10px hsla(0, 0%, 0%, 0.2);
  max-width: 320px;
  margin: 34px auto;
  background: ${({ color }) => color};
`;
class MainApp extends React.Component {
  constructor() {
    super();
    this.state = {
      sorted: 0,
      sortedField: 'id'
    };
  }

  loadFromStorage = () => {
    const storage = window.localStorage;
    const { loadFromStorage, taskList } = this.props;
    const active = JSON.parse(storage.getItem('active')) || taskList;
    const completed = JSON.parse(storage.getItem('completed')) || [];
    loadFromStorage({ active, completed });
  };

  componentDidMount = () => {
    this.loadFromStorage();
  };

  setSortTitle = () => {
    this.setState({
      sortedField: 'title'
    });
    this.toggleSort();
  };
  setSortId = () => {
    this.setState({
      sortedField: 'id'
    });
    this.toggleSort();
  };

  toggleSort = () => {
    this.setState({
      sorted: this.state.sorted > 0 ? -1 : 1
    });
  };

  sort = (a, b) => {
    const { sorted, sortedField } = this.state;
    const valueA = a[sortedField].toString();
    const valueB = b[sortedField].toString();
    return valueA.toUpperCase() < valueB.toUpperCase()
      ? -1 * sorted
      : valueA.toUpperCase() > valueB.toUpperCase() ? 1 * sorted : 0 * sorted;
  };

  saveTask = () => {
    const { addTask, edit } = this.props;
    addTask(edit);
  };
  render() {
    const { sortedField } = this.state;
    const { taskList, edit, completedList } = this.props;
    return (
      <div>
        <InputForm color={edit.color}>
          <AppTitle>New Task</AppTitle>
          <TaskLabel>Title</TaskLabel>
          <TextInput active value={edit.title} />
          <TaskLabel>Task</TaskLabel>
          <TextInput multiline active value={edit.body} />
          <Controls>
            <Button text="Save" onClick={this.saveTask} />
            <ColorPicker />
          </Controls>
        </InputForm>
        <GroupTitle active>
          Active Tasks{' '}
          <Button
            active={sortedField === 'title'}
            text="Sort by title"
            onClick={this.setSortTitle}
          />{' '}
          <Button
            active={sortedField === 'id'}
            text="Sort by id"
            onClick={this.setSortId}
          />{' '}
        </GroupTitle>
        <Group active>
          {taskList
            .sort(this.sort)
            .map((task, id) => <Task key={id} {...{ task }} />)}
        </Group>
        <GroupTitle>Completed Tasks</GroupTitle>
        <Group>
          {completedList.map((task, id) => (
            <Task completed key={id} {...{ task }} />
          ))}
        </Group>
      </div>
    );
  }
}

export const App = connect(
  state => ({
    taskList: state.task,
    completedList: state.completed,
    edit: state.edit
  }),
  dispatch => ({
    addTask: task => dispatch(ACTIONS.addTask(task)),
    loadFromStorage: list => dispatch(ACTIONS.loadFromStorage(list))
  })
)(MainApp);
