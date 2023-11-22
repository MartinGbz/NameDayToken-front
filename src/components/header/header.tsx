import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <div className="w-screen flex flex-row justify-between p-4">
      <h1 className="font-bold md:text-3xl"> Name Day Token 📅 </h1>
      <ConnectButton />
    </div>
  );
};

export default Header;
