import logo from "../../assets/logo.svg";

const Logo = () => {
  return (
    <div className="flex w-[300px] items-center gap-4 self-stretch pl-4 text-[32px] font-bold">
      <img className="logo" src={logo} alt="Kanban logo" />
      <h1 className="hidden md:block">Kanban</h1>
    </div>
  );
};

export default Logo;
