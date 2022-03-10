/* eslint-disable no-unused-vars */
import { screen } from '@testing-library/react';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';

import Home from '../pages/Home';

const mocks = [];

describe('Home Component', () => {
  test('rendered input', () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    const tree = component.toJSON();
    // console.log(tree);
    // console.log(component.root);
    expect(tree).toMatchSnapshot();
    const instance = component.root;
    instance.findByProps({ className: 'ui three column grid' }).exists;
    const heading = instance.findByProps({
      className: 'ui three column grid'
    }).children[0];
    expect(heading.findByProps({ className: 'heading' }).children).toEqual([
      'Recent Posts'
    ]);
  });
});

// **** Generic && tried tests ********
// expect(2 + 2).toBe(4);
// console.log(heading.findByProps({ className: 'heading' }).children);

// console.log(heading);
// console.log(instance);
// console.log(
//   instance.findByProps({ className: 'ui three column grid' }).children
// );

// expect(
//   instance.findByProps({ className: 'ui three column grid' }).children
// ).toEqual('Recent Posts');
// render(<Home />);
// jest.spyOn(window.localStorage.__proto__, 'setItem');
// window.localStorage.__proto__.setItem = jest.fn();
// assertions as usual:
// expect(localStorage.setItem).toHaveBeenCalled();

// const heading = screen.getByText('Recent Posts');
// expect(heading).toBeInTheDocument();
// screen.debug();
