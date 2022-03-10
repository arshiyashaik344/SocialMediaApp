/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import TestRenderer from 'react-test-renderer';
import React from 'react';

import Login from '../pages/Login';
import { render } from 'react-dom';

const mocks = [];

describe('Login Component', () => {
  it('rendered input', () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Login />
      </MockedProvider>
    );

    const tree = component.toJSON();
    console.log(tree);
    expect(tree).toMatchSnapshot();
    const instance = component.root;
    expect(instance.findByProps({ htmlFor: 'user-name' }).children).toEqual([
      'Username'
    ]);
    // instance.findByProps({ placeholder: 'Username..' }, 'arshiyas');
    // instance.findByProps({ placeholder: 'Password..' }, 'arshi');
    // const username = instance.findByProps({ className: 'ui form' }).children[1];
    // username.findByProps({ value: '' }, 'arshiyas');
    // console.log(username);

    // expect(instance.findByProps({ className: 'ui primary button' }).click);
    // console.log(instance.type);
  });

  // test('DOM testing', () => {
  //   const login = render(
  //     <MockedProvider>
  //       <Login />
  //     </MockedProvider>
  //   );
  //   screen.debug();
  // });
});

// test('Login Component', () => {
//   render(<Login />);
//   const buttonElement = screen.getByTestId('input');
//   expect(buttonElement).toBeInTheDocument();
//   // expect(buttonElement).toHaveTextContent('Clear');
// });

// ******* Generic Testing **********

// render(<Login />);
// const { getByTestId } = render(<Login />);
// const heading = screen.getByText('Login');
// expect(heading).toBeInTheDocument();
// const input = getByTestId('input');
// expect(input).toBeTruthy();
// screen.debug();

// userEvent.type(screen.getByPlaceHolderText(/Username../i), 'arshiyas');
// userEvent.type(screen.getByPlaceHolderText(/Password../i), 'arshi');

// expect(screen.findByRole('button', { type: 'submit' })).toBeEnabled();
