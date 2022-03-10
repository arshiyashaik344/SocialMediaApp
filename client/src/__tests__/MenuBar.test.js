/* eslint-disable no-unused-vars */
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from 'react-dom';
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter as Router } from 'react-router-dom';

import MenuBar from '../components/MenuBar';

describe('MenuBar Component', () => {
  test('rendered input', () => {
    const component = TestRenderer.create(
      <MockedProvider>
        <Router>
          <MenuBar />
        </Router>
      </MockedProvider>
    );
    const tree = component.toJSON();
    // console.log(tree);
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="ui teal massive pointing secondary menu"
      >
        <a
          className="active item"
          href="/"
          onClick={[Function]}
        >
          Home
        </a>
        <div
          className="right menu"
        >
          <a
            className="item"
            href="/login"
            id="login"
            onClick={[Function]}
          >
            Login
          </a>
          <a
            className="item"
            href="/register"
            onClick={[Function]}
          >
            Register
          </a>
        </div>
      </div>
    `);

    const instance = component.root;
    // console.log(instance);
    instance.findByProps({
      className: 'ui teal massive pointing secondary menu'
    }).exists;

    const home = instance.findByProps({ href: '/' });
    expect(home).exists;
    expect(instance.findByProps({ href: '/login' }).exists);
    expect(instance.findByProps({ href: '/register' }).exists);
  });
});
