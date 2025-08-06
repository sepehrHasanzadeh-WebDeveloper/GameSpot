import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [], 
    countofProduct: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.products.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.products.push({
          id: product.id,
          quantity: 1,
          title: product.name,
          price: product.price,
          image: product.image,
          type: product.type,
          value: product.value,
          option1: product.option1,
          option2: product.option2,
          option3: product.option3,
          category: product.category,
        });
      }

      state.countofProduct += 1;
      state.totalPrice += product.price;
    },

    removeFromCart: (state, action) => {
      const productId = action.payload.id;
      const item = state.products.find((item) => item.id === productId);
      if (item) {
        state.countofProduct -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
      }
      state.products = state.products.filter((item) => item.id !== productId);
    },

    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
      state.countofProduct = 0;
    },
    increaseCount: (state, action) => {
      const productID = action.payload;
      const item = state.products.find((p) => p.id === productID);
      if (item) {
        item.quantity += 1;
        state.countofProduct += 1;
        state.totalPrice += item.price;
      }
    },
    decreaseCount: (state, action) => {
      const productId = action.payload;
      const item = state.products.find((p) => p.id === productId);
      if (item) {
        item.quantity -= 1;
        state.countofProduct -= 1;
        state.totalPrice -= item.price;

        if (item.quantity === 0) {
          state.products = state.products.filter((p) => p.id !== productId);
        }
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseCount,
  decreaseCount,
} = cartSlice.actions;
export default cartSlice.reducer;
