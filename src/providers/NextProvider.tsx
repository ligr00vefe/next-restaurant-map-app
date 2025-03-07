'use client';
import Navbar from "@/layouts/navbar/Navbar";
import RecoilRootProvider from "@/providers/RecoilRootProvider";
import QueryProvider from "@/providers/QueryProvider";
import SessionProviderWrapper from "@/providers/SessionProviderWrapper";
import ToastProvider from "@/providers/ToastProvider";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface INextProviderProps {
  children?: React.ReactNode;
}

export const NextProvider = ({ children }: INextProviderProps) => {
  return (
    <RecoilRootProvider>
          <QueryProvider>
            <SessionProviderWrapper>
              {children}
              <ToastProvider />
              <ReactQueryDevtools />
            </SessionProviderWrapper>          
          </QueryProvider>
        </RecoilRootProvider>        
  )
}

export const NextLayout = ({ children }: INextProviderProps) => {
  return (
    <div className="layout">
      <Navbar />
      {children}
    </div> 
  )
}