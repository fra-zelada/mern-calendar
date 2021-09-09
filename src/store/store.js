import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/rootReducer";

//clase 311

//https://github.com/zalmoxisus/redux-devtools-extension#usage
//configuración necesaria para la herramienta de desarrollo
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//https://www.npmjs.com/package/redux-thunk
export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)
