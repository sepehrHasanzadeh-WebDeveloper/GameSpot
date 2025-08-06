import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import CProductReducer from "./Slice/GiftCards_Product";
import DiskDataReducer from "./Slice/DisksData";
import UserReducer from "./Slice/user";
import messagesReducer from "./Slice/Messages";
import ChatReducer from "./Slice/chat";
import getProductReducer from "./Slice/GetProductByID";
import CartReducer from "./Slice/cart";
import AddressReducer from "./Slice/AddressBook";
const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
};
const rootReducer = combineReducers({
  GiftCards_Product: CProductReducer,
  Disk_Product: DiskDataReducer,
  User: UserReducer,
  message: messagesReducer,
  chat: ChatReducer,
  getProduct: getProductReducer,
  cart: CartReducer,
  address: AddressReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // مثال برای اکشن‌هایی که نیازی به سریال‌چک ندارند
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
