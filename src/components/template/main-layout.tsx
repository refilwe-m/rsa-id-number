import { type FC, type PropsWithChildren } from "react";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => (
  <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    {children}
  </main>
);
