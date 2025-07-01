import Dialog from "./../components/common/Dialog";
import clsx from "clsx";
import iconBoard from "./../assets/icon-board.svg";

import { useContext, useState } from "react";
import { DataContext } from "@/DataContext";
import AddNewForm from "./../components/AddNewForm";

const SideMenu = () => {
  const [open, setOpen] = useState(false);
  const { data, selectedBoardIndex, setSelectedBoardIndex } =
    useContext(DataContext);

  return (
    <aside className="side-menu border-lines-light -mt-px w-[300px] bg-white">
      <p className="text-heading-s text-medium-grey px-8 py-4">
        ALL BOARDS ({data.length})
      </p>
      <ul>
        {data.map((item, index) => (
          <li key={item.id}>
            <button
              className={clsx(
                "text-heading-m text-medium-grey data-[isactive=false]:hover:bg-main-purple/10 data-[isactive=false]:hover:text-main-purple flex w-11/12 items-center gap-4 rounded-e-full px-8 py-4 transition",
                {
                  "bg-main-purple hover:bg-main-purple !text-white":
                    selectedBoardIndex === index,
                },
              )}
              data-isactive={selectedBoardIndex === index}
              onClick={() => setSelectedBoardIndex(index)}
            >
              <img src={iconBoard} alt="Board icon" /> {item.title}
            </button>
          </li>
        ))}
        <li className="px-8 py-4">
          <Dialog
            isOpen={open}
            setOpen={setOpen}
            title={"Create new board"}
            triggerComponent={
              <button className="text-heading-m text-main-purple flex w-full items-center gap-4">
                <img src={iconBoard} alt="Board icon" />+ Create New Board
              </button>
            }
          >
            <AddNewForm toggleDialog={setOpen} />
          </Dialog>
        </li>
      </ul>
    </aside>
  );
};

export default SideMenu;
