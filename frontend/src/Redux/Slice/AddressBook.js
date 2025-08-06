import { createSlice } from "@reduxjs/toolkit";

const AddressBookslice = createSlice({
  name: "Address",
  initialState: {
    isAddressAdd: false,
    userAddress: {},
  },
  reducers: {
    addAddress: (state) => {
      state.isAddressAdd = !state.isAddressAdd;
    },
    getAddressinfo: (state, action) => {
      state.userAddress = action.payload;
    },
  },
});

export const { addAddress, getAddressinfo } = AddressBookslice.actions;
export default AddressBookslice.reducer;
