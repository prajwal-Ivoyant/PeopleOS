import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../fetaures/employeeSlice"


export const store = configureStore({

    reducer: {
        employees: employeesReducer,
    }
})

// reducer{
//     employess : employeess rducer {
//         initialstate {
//             employee
//         }
//     }
// }


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;