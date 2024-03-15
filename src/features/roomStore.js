import toast from "react-hot-toast";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const createRoom = createAsyncThunk(
  '/createRoom',
  async (id) => {
    const url = `http://localhost:5000/createRoom/${id}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }), 
        mode: 'cors',
      });

      const responseData = await response.json();

      return { status: response.status, data: responseData };

    } catch (error) {
      return { status: error.status }; 
    }
  }
);

const roomSlice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createRoom.rejected, (state, action) => {
      console.log("Rej", action.error);
    });
    builder.addCase(createRoom.pending, (state,action) => {
      console.log("Pending",action);

    });
    builder.addCase(createRoom.fulfilled, (state, action) => {

      if (action.payload.status === 200) {
        toast.success("Room created successfully");
      } else if (action.payload.status === 400) {
        toast.error("Room already exists");
      } 
      else {
        toast.error("Internal server error")
      }
    });
  },
});

export default roomSlice.reducer;
