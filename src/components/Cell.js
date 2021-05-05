import React, { useState, useEffect } from "react";

const Cell = (props) => {
  const {
    value,
    selection,
    setSelection,
    selectionOrigin,
    setSelectionOrigin,
    isSelecting,
    setIsSelecting,
    xIndex,
    yIndex,
    table,
    setTable,
    columnsSize,
    quickSelectRow,
  } = props;

  // We'll be using a new state to tell if the cell is selected or not.
  const [isSelected, setIsSelected] = useState();
  const [localSelection, setLocalSelection] = useState();
  const [cellValue, setCellValue] = useState(value);

  useEffect(() => {
    // When the component is rendered, we need to check if the cell is selected to know how it's supposed to be displayed. First, check if the selection item exists.
    if (selection) {
      if (
        xIndex <= selection.xRange.end &&
        xIndex >= selection.xRange.start &&
        yIndex <= selection.yRange.end &&
        yIndex >= selection.yRange.start
      ) {
        setIsSelected(true);
      } else {
        setIsSelected(false);
      }
    } else {
      setIsSelected(false);
    }
  }, [selection, localSelection, xIndex, yIndex, table]);

  // Handle the row selection made with right click.
  const handleRightClick = (event) => {
    event.preventDefault();
    if (quickSelectRow) {
      setSelection({
        xRange: { start: 0, end: 49 },
        yRange: { start: yIndex, end: yIndex },
      });
      setLocalSelection({
        xRange: { start: 0, end: 49 },
        yRange: { start: yIndex, end: yIndex },
      });
    } else {
      setSelection({
        xRange: { start: xIndex, end: xIndex },
        yRange: { start: 0, end: 49 },
      });
      setLocalSelection({
        xRange: { start: xIndex, end: xIndex },
        yRange: { start: 0, end: 49 },
      });
    }
  };

  // Handle the selection with the hover event.
  const handleOnMouseEnter = (event) => {
    // We only use this function if the isSelecting state has been put to true.
    if (isSelecting) {
      // To update the selection set, we create a new object, its properties value will depend wether the current cell coordinates are greater or smaller than the original selection point.
      const newObject = {};
      if (xIndex < selectionOrigin[0]) {
        newObject.xRange = { start: xIndex, end: selectionOrigin[0] };
      } else if (xIndex > selectionOrigin[0]) {
        newObject.xRange = { start: selectionOrigin[0], end: xIndex };
      } else {
        newObject.xRange = { start: xIndex, end: xIndex };
      }

      if (yIndex < selectionOrigin[1]) {
        newObject.yRange = { start: yIndex, end: selectionOrigin[1] };
      } else if (yIndex > selectionOrigin[1]) {
        newObject.yRange = { start: selectionOrigin[1], end: yIndex };
      } else {
        newObject.yRange = { start: yIndex, end: yIndex };
      }
      setSelection(newObject);
      setLocalSelection(newObject);
    }
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
    // This function must only work when the left click is pressed.
    if (event.button === 0) {
      // The application behavior must change wether we already have a selection or not.
      // If there's no current selection, initiate the selection process so we change select cell by hovering cursor above.
      if (!selection) {
        if (event.button === 0 && !isSelecting) {
          setIsSelecting(true);
          setSelection({
            xRange: { start: xIndex, end: xIndex },
            yRange: { start: yIndex, end: yIndex },
          });
          setLocalSelection({
            xRange: { start: xIndex, end: xIndex },
            yRange: { start: yIndex, end: yIndex },
          });
          setSelectionOrigin([xIndex, yIndex]);
        }

        // If there is a selection, a left click must process it to give a mean value.
      } else {
        if (!value) {
          let finalResult = 0;
          let count = 0;
          // We're going to iterate through the table, using the selection state to select indexes.
          for (let i = selection.xRange.start; i <= selection.xRange.end; i++) {
            for (
              let j = selection.yRange.start;
              j <= selection.yRange.end;
              j++
            ) {
              // We only use the cell content if it contains a number.
              if (typeof table[i][j] === "number") {
                finalResult += table[i][j];
                count++;
              }
            }
          }

          // If there's a value, put it in the cell. Once this is done, we must update the table state.
          if (count > 0) {
            const newCellValue =
              Math.round((finalResult / count) * 1000) / 1000;
            setCellValue(newCellValue);

            const newTable = [];
            for (let i = 0; i < table.length; i++) {
              newTable.push([]);
              for (let j = 0; j < table[i].length; j++) {
                if (i === xIndex && j === yIndex) {
                  newTable[i].push(newCellValue);
                } else {
                  newTable[i].push(table[i][j]);
                }
              }
            }
            setTable(newTable);
          }
          setSelection(undefined);
          setLocalSelection(undefined);
        }
      }
    }
  };

  // When the user stop pressing the mouse, the isSelecting state must be put back on false.
  const handleMouseUp = () => {
    setIsSelecting(false);
    setSelectionOrigin();
  };

  return isSelected ? (
    <div
      className="cell selected"
      style={{ width: `${columnsSize[xIndex]}px` }}
      onContextMenu={handleRightClick}
      onMouseEnter={handleOnMouseEnter}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      {cellValue}
    </div>
  ) : (
    <div
      className="cell"
      style={{ width: `${columnsSize[xIndex]}px` }}
      onContextMenu={handleRightClick}
      onMouseEnter={handleOnMouseEnter}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      {cellValue}
    </div>
  );
};

export default Cell;
