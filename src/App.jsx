import { useEffect, useState } from "react";
import { DataContext } from "./DataContext";

import Header from "@layouts/Header";
import SideMenu from "./layouts/SideMenu";
import WorkSpace from "./components/WorkSpace";

const App = () => {
  const [dataState, setDataState] = useState();
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(0);

  useEffect(() => {
    const savedData = localStorage.getItem("data");
    if (savedData) setDataState(JSON.parse(savedData));
  }, []);

  useEffect(() => {
    if (!dataState) return;

    localStorage.setItem("data", JSON.stringify(dataState));
  }, [dataState]);

  return (
    <DataContext.Provider
      value={{
        data: dataState || [],
        setData: setDataState,
        selectedBoardIndex,
        setSelectedBoardIndex,
      }}
    >
      <div className="font-Jakarta text-heading-xl flex h-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <SideMenu />
          <WorkSpace />
        </div>
      </div>
    </DataContext.Provider>
  );
};

export default App;
