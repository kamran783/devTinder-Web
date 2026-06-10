import {createSlice} from "@reduxjs/toolkit"
const connectionSlice = createSlice({
    name : "connections",
    initialState : null,
    reducers : {
        addConnection : (state,action) => action.payload,
        removeRequest : () => null,
    }
})

export const{addConnection, removeRequest} =  connectionSlice.actions;

export default connectionSlice.reducer;