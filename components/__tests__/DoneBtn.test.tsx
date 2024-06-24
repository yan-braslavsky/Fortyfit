import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import DoneBtn from '../DoneBtn';


describe('DoneBtn', () => {
  it('renders correctly', () => {
    const { getByText } = render(<DoneBtn />);
    expect(getByText('DONE')).toBeTruthy();
  });

  it('calls the pressHandler when pressed', () => {
    const pressHandlerMock = jest.fn();
    const { getByText } = render(<DoneBtn pressHandler={pressHandlerMock} />);

    fireEvent.press(getByText('DONE'));
    expect(pressHandlerMock).toHaveBeenCalled();
  });

  it('changes style when pressed', () => {
    const { getByText } = render(<DoneBtn />);
    const button = getByText('DONE');

    fireEvent(button, 'pressOut'); // Simulate press out
    // Assuming default style doesn't contain opacity, or it's different than 0.5
    expect(button.parent.props.style).not.toContainEqual(expect.objectContaining({ opacity: 0.5 }));
  });
});