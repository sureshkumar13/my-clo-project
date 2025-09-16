
import { Provider } from 'react-redux';
import {store} from './store/store'; // adjust path if needed
import { JSX } from 'react/jsx-runtime';
import { render as rtlRender } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

function render(element: JSX.Element) {
  return rtlRender(
    <Provider store={store}>
      {element}
    </Provider>
  );
}

