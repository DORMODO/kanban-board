import { useState, useContext } from "react";
import TextField from "./common/TextField";
import iconCross from "@assets/icon-cross.svg";
import Button from "./common/Button";
import { DataContext } from "@/DataContext";

const AddNewForm = ({
  toggleDialog,
  boardId,
  columns = [{ id: Date.now() }],
  title,
}) => {
  const { setData, setSelectedBoardIndex } = useContext(DataContext);
  const [columnsArray, setColumnsArray] = useState(columns);

  const removeColumnHandler = (id) => {
    setColumnsArray((prev) => prev.filter((col) => col.id !== id));
  };

  const addNewColumnHandler = () => {
    setColumnsArray((prev) => [...prev, { id: Date.now() }]);
  };

  const createNewColumnsArray = (formData, columnsArray, boardId) => {
    return columnsArray.map((col) => {
      const tasksArray = boardId ? columnsArray.tasks : [];

      return {
        id: col.id,
        title: formData.get(col.id),
        tasks: tasksArray,
      };
    });
  };

  const updateData = (boardName, newColumnsArray, setData, boardId) => {
    setData((prev) => {
      let newData;
      console.log(prev);
      
      if (boardId) {
        newData = prev.map((item) => {
          if (item.id === boardId) {
            return {
              ...item,
              title: boardName,
              columns: newColumnsArray,
            };
          }
          return item;
        });
      } else {
        newData = [
          ...prev,
          {
            id: Date.now(),
            title: boardName,
            columns: newColumnsArray,
          },
        ];
        setSelectedBoardIndex(prev.length);
      }
      return newData;
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const boardName = formData.get("boardName");
    const newColumnsArray = createNewColumnsArray(
      formData,
      columnsArray,
      boardId,
    );

    updateData(boardName, newColumnsArray, setData, boardId);
    toggleDialog(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <h3 className="text-body-m text-medium-grey pt-6 pb-2">Name</h3>
        <TextField
          placeholder="e.g. Web Design"
          name="boardName"
          defaultValue={title}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-body-m text-medium-grey pt-6">Columns</h3>
        {columnsArray.map((obj) => (
          <div key={obj.id} className="flex items-center gap-4">
            <TextField
              placeholder="e.g. Web Design"
              name={obj.id}
              defaultValue={obj.title}
              required
            />
            <button type="button" onClick={() => removeColumnHandler(obj.id)}>
              <img src={iconCross} alt="icon cross" />
            </button>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={addNewColumnHandler}
        >
          + Add New Column
        </Button>
      </div>
      <div className="mt-6">
        <Button type="submit" variant="primary" size="sm" isFullWidth>
          {boardId ? "Update" : "Create New"} Board
        </Button>
      </div>
    </form>
  );
};

export default AddNewForm;
