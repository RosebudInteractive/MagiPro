import { intlReducer } from 'react-intl-redux'
import counter from './counter';
import courses from './courses';
import device from './device';
import root from './root';

module.exports = { 
  counter,
  courses,
  device,
  root,
  intl: intlReducer
}