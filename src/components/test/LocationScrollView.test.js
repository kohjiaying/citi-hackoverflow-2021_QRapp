import { JestEnvironment } from '@jest/environment';
import React from 'react';
import renderer from 'react-test-renderer';
import LocationScrollView from '../LocationScrollView';


describe('<MyLocationScrollView />', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<LocationScrollView />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });