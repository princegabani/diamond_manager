import { createStore } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import localStorage from 'redux-persist/es/storage';
// import thunk from 'redux-thunk';
import reducers from './reducers';

const persistConfig = {
    key: 'root',
    storage: localStorage,
    whitelist: ['auth', 'company', 'employee'], // Only persist the 'auth' reducer
    timeout: 0, // Wait indefinitely for storage operations
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer)
export const persistor = persistStore(store);

export default store
