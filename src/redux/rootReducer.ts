import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// slices
import productReducer from "./slices/product";
import UserReducer from "./slices/user";
import NotificationReducer from "./slices/notification";
import WishlistReducer from "./slices/wishlist";
import CategoriesReducer from "./slices/categories";
import SettingsReducer from "./slices/settings";

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const productPersistConfig = {
  key: "product",
  storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"],
};
const wishlistPersistConfig = {
  key: "wishlist",
  storage,
  keyPrefix: "redux-",
  whitelist: ["wishlist"],
};
const notificatiionPersistConfig = {
  key: "notification",
  storage,
  keyPrefix: "redux-",
  whitelist: ["notifications"],
};
const categoriesPersistConfig = {
  key: "categories",
  storage,
  keyPrefix: "redux-",
  whitelist: ["categories"],
};
const settingsPersistConfig = {
  key: "settings",
  storage,
  keyPrefix: "redux-",
  whitelist: ["currency", "symbol", "unitRate", "themeMode", "themeColor"],
};

const rootReducer = combineReducers({
  product: persistReducer(productPersistConfig, productReducer),
  user: UserReducer,
  notification: persistReducer(notificatiionPersistConfig, NotificationReducer),
  settings: persistReducer(settingsPersistConfig, SettingsReducer),
  wishlist: persistReducer(wishlistPersistConfig, WishlistReducer),
  categories: persistReducer(categoriesPersistConfig, CategoriesReducer),
});

export { rootPersistConfig, rootReducer };
