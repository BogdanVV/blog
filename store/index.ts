import { createStore, AnyAction, Store, applyMiddleware } from 'redux';
import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import { rootReducer, RootState } from './reducers';
import thunk, { ThunkDispatch } from 'redux-thunk';

const makeStore = (context: Context) => createStore(reducer, applyMiddleware(thunk));

export const reducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }
        if (state.count) nextState.count = state.count // preserve count value on client side navigation
        return nextState
    } else {
        return rootReducer(state, action)
    }
}

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;

export const wrapper = createWrapper<RootState>(makeStore, {debug: true});
