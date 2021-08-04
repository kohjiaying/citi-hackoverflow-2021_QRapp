import React from "react";
import MyVouchersScrollView from "../MyVouchersScrollView";
import {render} from '@testing-library/react-native';


describe('list', () => { //run npm test
  it('shows purchased vouchers', () => {
    const {getByTestId} = render(<MyVouchersScrollView/>)
    expect(getByTestId('filled'))}
    )
  });