import { JestEnvironment } from '@jest/environment';
import React from 'react';
import renderer from 'react-test-renderer';
import EventBannerScroll from '../EventBannerScroll';

describe('<EventBannerScroll />', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<EventBannerScroll />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });