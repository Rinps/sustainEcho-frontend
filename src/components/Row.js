import React from "react";
import Cell from "./Cell";

const Row = (props) => {
  const {
    datas,
    selection,
    setSelection,
    selectionOrigin,
    setSelectionOrigin,
    isSelecting,
    setIsSelecting,
    xIndex,
    table,
    setTable,
    columnsSize,
    quickSelectRow,
  } = props;

  return (
    <div className="Row">
      {datas.map((item, index) => {
        return (
          <Cell
            value={item}
            key={index}
            xIndex={xIndex}
            yIndex={index}
            selection={selection}
            setSelection={setSelection}
            selectionOrigin={selectionOrigin}
            setSelectionOrigin={setSelectionOrigin}
            isSelecting={isSelecting}
            setIsSelecting={setIsSelecting}
            table={table}
            setTable={setTable}
            columnsSize={columnsSize}
            quickSelectRow={quickSelectRow}
          />
        );
      })}
    </div>
  );
};

export default Row;
