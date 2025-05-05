import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default to localStorage
import rootReducer from './reducers';  // Import combined reducers

// Redux Persist configuration
const persistConfig = {
    key: 'auth',
    storage, // Using localStorage for persistence
    whitelist: ['auth', 'users'], // List slices to persist
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store with persisted reducer
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST', // Ignore the PERSIST action
                    'persist/PURGE',    // Ignore the PURGE action
                ],
            },
        }),
});


// Create persistor
const persistor = persistStore(store);

export { store, persistor };


