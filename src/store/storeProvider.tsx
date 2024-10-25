"use client";

import React from "react";
import { Provider } from "react-redux";
import store from ".";

export const StoreProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  return <Provider store={store}>{children}</Provider>;
};
