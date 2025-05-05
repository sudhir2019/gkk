import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from '../slices/themeSlice';
import appReducer from '../slices/appSlice';
import authReducer from '../slices/authSlice';
import gamesReducer from '../slices/gameSlice';

import superadminReducer from '../slices/superadminSlice';
import adminReducer from '../slices/adminSlice';
import superReducer from '../slices/superSlice';
import superDistributorReducer from '../slices/superDistributorSlice';
import distributorReducer from '../slices/distributorSlice';
import retailerReducer from '../slices/retailerSlice';
import usersReducer from '../slices/usersSlice';
import percentageReducer from '../slices/percentageSlice';
import usersLogsReducer from '../slices/logSlice';

import otcReducer from '../slices/otcSlice';
import loanReducer from '../slices/loanSlice';
import giftReducer from '../slices/giftSlice';

import complaintReducer from '../slices/complaintSlice';

import onlinePlayerReducer from '../slices/onlineplayerSlice';

import timeReducer from '../slices/timeSlice';
import creditReducer from '../slices/creditSlice';
import reportSlice from '../slices/reportSlice';
import liveReducer from '../slices/liveSlice';

// Combine all reducers into a single root reducer
const newRed = combineReducers({
  app: appReducer,
  theme: themeReducer,
  auth: authReducer,
  supers: superReducer,
  games: gamesReducer,
  reports: reportSlice,

  onlinePlayer: onlinePlayerReducer,

  superadmins: superadminReducer,
  admins: adminReducer,
  superdistributor: superDistributorReducer,
  distributor: distributorReducer,
  retailer: retailerReducer,
  user: usersReducer,
  logs: usersLogsReducer,

  otc: otcReducer,
  loan: loanReducer,
  gift: giftReducer,

  complaint: complaintReducer,

  percentage: percentageReducer,
  times: timeReducer,
  credit: creditReducer,
  live: liveReducer,


});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    state = undefined; // Reset the store by setting state to undefined
  }
  return newRed(state, action);
};

export default rootReducer;
