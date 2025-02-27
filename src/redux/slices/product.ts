import { sum, map, filter, uniqBy } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
// utils
import { paramCase } from "change-case";

// ----------------------------------------------------------------------

interface initialStateProps {
  checkout: {
    activeStep: number;
    cart: any;
    discount: number;
    subtotal: number;
    total: number;
    shipping: number | string | undefined;
    billing: any;
  };
}
const shippingFee = process?.env?.SHIPPING_FEE;
const initialState: initialStateProps = {
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: parseInt(shippingFee as string),
    billing: null,
  },
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // CHECKOUT
    getCart(state, action) {
      const cart = action.payload;

      const subtotal = sum(
        cart.map(
          (product: { priceSale: number; quantity: number }) =>
            product.priceSale * product.quantity
        )
      );
      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shipping = cart.length === 0 ? 0 : shippingFee;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal + (parseInt(shipping as string) || 0);
    },

    addCart(state, action) {
      const product = action.payload;
      const updatedProduct = {
        ...product,
        sku: paramCase(`${product.name} ${product.size} ${product.color}`),
      };
      const isEmptyCart = state.checkout.cart.length === 0;
      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, updatedProduct];
      } else {
        state.checkout.cart = map(state.checkout.cart, (_product) => {
          const isExisted = _product.sku === updatedProduct.sku;
          if (isExisted) {
            return {
              ..._product,
              quantity: _product.quantity + 1,
            };
          }
          return _product;
        });
      }
      state.checkout.cart = uniqBy(
        [...state.checkout.cart, updatedProduct],
        "sku"
      );
    },

    deleteCart(state, action) {
      const updateCart = filter(
        state.checkout.cart,
        (item) => item.sku !== action.payload
      );

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.activeStep = 0;
      state.checkout.cart = [];
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.billing = null;
    },

    onBackStep(state) {
      state.checkout.activeStep -= 1;
    },

    onNextStep(state) {
      state.checkout.activeStep += 1;
    },

    onGotoStep(state, action) {
      const goToStep = action.payload;
      state.checkout.activeStep = goToStep;
    },

    increaseQuantity(state, action) {
      const productSku = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.sku === productSku) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const productSku = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.sku === productSku) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    applyDiscount(state, action) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  addCart,
  resetCart,
  onGotoStep,
  onBackStep,
  onNextStep,
  deleteCart,
  createBilling,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
} = slice.actions;
