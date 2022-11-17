import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const url = "https://course-api.com/react-useReducer-cart-project";
const initialState = {
  // cartItems: cartItems,
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: false,
};
//create and export async thunk
export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
});
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      console.log("action", action);
      const idItem = action.payload;
      // console.log(idItem, "iddd");
      state.cartItems = state.cartItems.filter((item) => item.id !== idItem);
    },
    //decrease for a single item in cartItems
    increase: (state, { payload }) => {
      const idItem = payload;
      console.log(idItem, "iddd");
      const cartItem = state.cartItems.find((item) => item.id === idItem);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const idItem = payload.id;
      // console.log(idItem, "iddd");
      const cartItem = state.cartItems.find((item) => item.id === idItem);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.total = total;
      state.amount = amount;
    },
  },
  //create extra reducers for lifecycle actions  for promise(pending, fullfilled, rejected)
  //if we are succesful the action is our fetched data
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

console.log("cart slice details includes reducer", cartSlice);
//once we create a reducer the action is created too
export const { clearCart, removeItem, increase, decrease, calculateTotal } =
  cartSlice.actions;
export default cartSlice.reducer;

//to modify the state directly
//create reducers, export it, import useDispatch, then const dispatch = useDispatch(); i
//when I use return in reducers it means I will upadate the entire new state
// Object

// actions
// :
// {}
// caseReducers
// :
// {}
// getInitialState
// :
// ƒ ()
// name
// :
// "cart"
// reducer
// :
// ƒ (state, action)
// length
// :
// 2
// name
// :
// "reducer"
// prototype
// :
// {constructor: ƒ}
// arguments
// :
// (...)
// caller
// :
// (...)
// [[FunctionLocation]]
// :
// createSlice.ts:322
// [[Prototype]]
// :
// ƒ ()
// [[Scopes]]
// :
// Scopes[4]
// [[Prototype]]
// :
// Object

//import at any name
