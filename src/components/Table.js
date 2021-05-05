import React, { useState } from "react";
import Row from "./Row";

const Table = (props) => {
  const {
    table,
    setTable,
    columnsSize,
    selection,
    setSelection,
    quickSelectRow,
  } = props;

  // We're going to need a few more states for the spread sheet. First a selector state, wich will give a range of cell, then a variable to tell the application how the user is currently interacting. The selectionOrigin is used when the user select a range with the left click.
  const [selectionOrigin, setSelectionOrigin] = useState(undefined);
  const [isSelecting, setIsSelecting] = useState(false);

  return (
    <div className="Table">
      {table.map((item, index) => {
        return (
          <Row
            datas={item}
            key={index}
            xIndex={index}
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

export default Table;
