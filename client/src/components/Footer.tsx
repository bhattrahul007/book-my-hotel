export const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          BookmyHotel
        </span>
        <p className="text-white font-bold tracking-tight flex gap-4">
          <span className="cursor-pointer">Privacy policy</span>
          <span className="cursor-pointer">Terms of service</span>
        </p>
      </div>
    </div>
  );
};
