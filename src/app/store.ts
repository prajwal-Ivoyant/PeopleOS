import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../fetaures/employeeSlice"

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "empployee",
    storage
}

const persistedReducer = persistReducer(persistConfig, employeesReducer)

export const store = configureStore({

    reducer: {
        employees: persistedReducer,
    }
})

// reducer{
//     employess : employeess rducer {
//         initialstate {
//             employee
//         }
//     }
// }


export const persistor  = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;