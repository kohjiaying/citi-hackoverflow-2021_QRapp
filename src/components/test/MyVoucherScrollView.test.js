import { JestEnvironment } from '@jest/environment';
import React from 'react';
import renderer from 'react-test-renderer';

import MyVouchersScrollView from '../MyVouchersScrollView';


describe('<MyVoucherScrollView />', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<MyVouchersScrollView />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  test('No vouchers shown', async () => {
    const { getByTestId } = renderer.create(<PostList userid={'1234'}/>).toJSON;

    await waitForElement(() => {
      return getByTestId('empty');
    });

    expect(getByTestId('empty'));
  });
