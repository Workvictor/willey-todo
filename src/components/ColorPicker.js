import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ACTIONS, HSLA } from './index';

const ColorGroup = styled.div`
  text-align: left;
  color: #323232;
  background: transparent;
  display: flex;
  align-content: start;
  align-items: start;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Color = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin: 2px;
  text-align: left;
  color: #323232;
  border: 2px solid #323232;
  border-radius: 50%;
  display: block;
  background: ${({color})=>color};
  &:hover{
    transform: scale(1.2);
  }
`;


export const ColorPickerApp = ({ edit, editColor }) => (
  <ColorGroup>
    {
      Array(4).fill(0)
        .map((elem, id, array)=>{
          const color = HSLA(Math.floor(360/array.length*id), 65, 80).css;
          return <Color onClick={()=>editColor({color})} key={id} color={color}/>
        })
    }
  </ColorGroup>
);

export const ColorPicker = connect(
  state => ({
    edit: state.edit
  }),
  dispatch => ({
    editColor: ({ color }) => dispatch(ACTIONS.editTask({ color })),
  })
)(ColorPickerApp);