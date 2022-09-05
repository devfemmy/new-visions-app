import { createSlice } from '@reduxjs/toolkit'
import { getTeachers } from '../action'

const initialState = {
    teachersData: null,
}

const teachersPageSlice = createSlice({
    name: 'teachersPageSlice',
    initialState,
    reducers: {},
    extraReducers: {
        [getTeachers.fulfilled]: (state, { payload }) => {
            state.teachersData = payload.data
        },
    },
})

const { reducer } = teachersPageSlice

export default reducer
