import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';

const initialState = {
    isLoading : false,
    userName: '',
    userHash: ''
}

export const checkLogin = createAsyncThunk(
  '/checkLogin',
  async (data) => {
    const url = 'http://localhost:5000/checklogin';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        mode: 'cors',
      });

      const responseData = await response.json();
      return { status: response.status , message : responseData }
    } catch (error) {
      return { status: 'error' };
    }
  }
);

export const createUser = createAsyncThunk(
  '/createUser', 
  async (data) => {
    const url = 'http://localhost:5000/createuser';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        mode: 'cors', 
      });

      return { status: response.status };

    } catch (error) {
      console.error('Error during createUser:', error);

      return { status: 'error', error: error.message };
    }
  }
);

const userSlice = createSlice({
    name : 'user',
    initialState : initialState ,
    reducers : {},
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true;
          });
          builder.addCase(createUser.fulfilled, (state,action) => {
            action.payload.status === 200 && toast.success("User registered successfully")
            action.payload.status === 400 && toast.error("Name already exists")
            action.payload.status === 401 && toast.error("Email already exists")
            action.payload.status === 500 && toast.error("Internal error occured")
          });
          builder.addCase(createUser.rejected, (state,action) => {
            console.log("Create User rejected",action)
          });
          builder.addCase(checkLogin.pending, (state) => {
            state.isLoading = true;
          });
          builder.addCase(checkLogin.fulfilled, (state,action) => {
            state.userName = action.payload.message.userName;
            state.userHash = action.payload.message.userId;
            console.log(action)
            action.payload.status === 200 && toast.success("Login successful")
            action.payload.status === 400 && toast.error("Invalid Password")
            action.payload.status === 401 && toast.error("User not found")
            action.payload.status === 500 && toast.error("Internal error occured")
          });
          builder.addCase(checkLogin.rejected, (state,action) => {
            console.log("Login User rejected",action)
          });
    }
})

export default userSlice.reducer