import { configureStore } from "@reduxjs/toolkit";
import slidersReducer from "../pages/sliders/sliderSlice";

const store = configureStore({
  reducer: {
    slider: slidersReducer,
  },
});

export default store;
