import type { FC, PropsWithChildren } from "react";

export const PageLayout: FC<PropsWithChildren> = ({ children }) => (
  <section className="max-w-4xl mx-auto">{children}</section>
);
