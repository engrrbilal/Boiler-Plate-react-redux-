import signReducer from '../reducers/signReducer';
import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () =>{
    const store = createStore(
        combineReducers({
            rootReducer:signReducer
        }),
        composeEnhancer(applyMiddleware(thunk))
    );
    return store
}