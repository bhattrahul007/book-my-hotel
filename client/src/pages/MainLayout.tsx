import { ReactNode } from "react";
import { Footer, Header, HeroBanner } from "./../components";

type MainLayoutProps = {
  children?: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HeroBanner />
      <div className="container  mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};
