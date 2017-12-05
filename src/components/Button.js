import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  font-size: 14px;
  color: #323232;
  padding: 8px 16px;
  border: 2px solid #323232;
  display: inline-block;
  cursor: pointer;
  background: #fff;
  text-transform: uppercase;
  outline: none;
  margin: 0 16px;
  &:active,
  &:hover{
    background: #f7f6f6;
  }
`

export const Button =({
  onClick,
  text
})=> <StyledButton onClick={onClick}>{text}</StyledButton>