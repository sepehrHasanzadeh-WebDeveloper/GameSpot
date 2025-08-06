import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const UserInfoSlice = createSlice({
  name: "user",
  initialState: {
    userLogin: false,
    userInfo: {},
    adminState: false,
    favoritProduct: [],
  },
  reducers: {
    getUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    userState: (state, action) => {
      state.userLogin = true;
    },
    userExit: (state, action) => {
      state.userLogin = false;
    },
    adminState: (state) => {
      state.adminState = true;
    },
    isAdmin: (state) => {
      state.adminState = false;
    },
    addFavorit: (state, action) => {
      const exists = state.favoritProduct.find(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.favoritProduct.push(action.payload);

        toast.success("محصول به علاقه مندی های شما اضافه شد ✅ ");
      } else {
        toast("کالا به لیست دلخواه اضافه شده است !", {
          icon: "⚠️⚠️",
        });
      }
    },
    removeFavorite: (state, action) => {
      state.favoritProduct = state.favoritProduct.filter(
        (item) => item.id !== action.payload
      );
      toast.success("محصول از لیست دلخواه حذف شد");
    },
  },
});
export const {
  getUserInfo,
  userState,
  userExit,
  adminState,
  isAdmin,
  addFavorit,
  removeFavorite,
} = UserInfoSlice.actions;
export default UserInfoSlice.reducer;
