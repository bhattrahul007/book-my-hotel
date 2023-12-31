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
      <div className="flex flex-col flex-1">
        <div className="flex flex-col justify-center px-4 md:px-[10rem] py-8 flex-1">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
};
