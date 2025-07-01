import { useContext, useState } from "react";
import { DataContext } from "@/DataContext";

import Dropdown from "../components/common/Dropdown";
import Dialog from "../components/common/Dialog";
import Logo from "@/components/common/Logo";
import AddNewForm from "./../components/AddNewForm";
import iconVerticalEllipsis from "../assets/icon-vertical-ellipsis.svg";

const Header = () => {
  const { data, setData, selectedBoardIndex } = useContext(DataContext);
  const [open, setOpen] = useState(false);

  const onEditBoard = () => {
    setOpen(true);
  };

  const onDeleteBoard = () => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      setData((prev) => prev.toSpliced(selectedBoardIndex, 1));
    }
  };

  const currentBoardTitle = () => {
    if (data.length === 0) return "No Boards Available";
    return data[selectedBoardIndex]?.title || "Untitled Board";
  };

  return (
    <header className="flex shrink-0 items-center justify-between p-4">
      <Logo />
      <div className="flex flex-1 items-center justify-between self-stretch">
        <h2 className="text-heading-xl">{currentBoardTitle()}</h2>
        <Dropdown
          items={{
            edit: {
              label: "Edit Board",
              onClick: onEditBoard,
            },
            delete: {
              label: "Delete Board",
              onClick: onDeleteBoard,
            },
          }}
          triggerComponent={() => (
            <button className="flex h-8 w-8 items-center justify-center rounded-full">
              <img src={iconVerticalEllipsis} alt="Vertical Ellipsis Icon" />
            </button>
          )}
        />
        <Dialog isOpen={open} setOpen={setOpen} title="Edit Board">
          <AddNewForm
            toggleDialog={setOpen}
            boardId={data[selectedBoardIndex]?.id}
            columns={data[selectedBoardIndex]?.columns}
            title={data[selectedBoardIndex]?.title}
          />
        </Dialog>
      </div>
    </header>
  );
};

export default Header;
