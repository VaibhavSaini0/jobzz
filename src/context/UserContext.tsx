"use client";
import { createContext } from "react";

export type UserContextType = {
  user: any;
  setUser: (value: any) => void;
  company: any;
  setCompany: (value: any) => void;
  isguest: boolean;
  setIsguest: (value: boolean) => void;
  isuserLoading: boolean;
  setIsuserLoading: (value: boolean) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  company: null,
  setCompany: () => {},
  isguest: false,
  setIsguest: () => {},
  isuserLoading: false,
  setIsuserLoading: () => {},
});
