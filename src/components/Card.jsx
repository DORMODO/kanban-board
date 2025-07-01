import { DataContext } from "@/DataContext";
import { produce } from "immer";
import { useContext, useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Card = ({ title, columnId, cardId }) => {
  const { setData, selectedBoardIndex } = useContext(DataContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: cardId, data: { columnId } });

  const deleteCardHandler = () => {
    if (window.confirm("Are you sure you want to delete this card?"))
      setData((prev) =>
        produce(prev, (draft) => {
          const column = draft[selectedBoardIndex].columns.find(
            (col) => col.id === columnId,
          );
          column.tasks = column.tasks.filter((task) => task.id !== cardId);
        }),
      );
  };

  const updateCard = (e) => {
    const trimmedTitle = e.target.value.trim();
    if (trimmedTitle === title) return;

    setData((prev) =>
      produce(prev, (draft) => {
        const column = draft[selectedBoardIndex].columns.find(
          (col) => col.id === columnId,
        );
        const task = column.tasks.find((task) => task.id === cardId);
        task.title = trimmedTitle;
      }),
    );
  };

  const toggleEditMode = () => {
    setIsEditMode(true);
  };

  const onFocusHandler = (e) => {
    e.target.select();
  };

  const onBlurHandler = (e) => {
    setIsEditMode(false);
    if (e.target.value.trim() === title) return;
    updateCard(e);
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
      updateCard(e);
    }
    if (e.key === "Escape") {
      setIsEditMode(false);
    }
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="group/card relative min-h-16 overflow-y-hidden rounded-lg bg-white px-4 py-3 shadow-sm"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {isEditMode ? (
        <textarea
          className="text-heading-m outline-light-grey h-full resize-none"
          defaultValue={title}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onKeyDown={onKeyDownHandler}
          autoFocus
        ></textarea>
      ) : (
        <button
          className="peer text-heading-m h-full text-start"
          onClick={toggleEditMode}
        >
          {title}
        </button>
      )}
      <button
        className="text-body-m text-red absolute top-0 right-0 bottom-0 bg-white p-2 opacity-0 shadow duration-300 group-hover/card:opacity-100 peer-focus:opacity-100 focus:opacity-100"
        aria-label="Delete card"
        onClick={deleteCardHandler}
      >
        Delete
      </button>
    </div>
  );
};

export default Card;
