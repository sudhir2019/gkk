// types.js (or any other file)
import { store } from './store'; // import your store to get types

export const RootState = () => store.getState();
export const AppDispatch = () => store.dispatch();
