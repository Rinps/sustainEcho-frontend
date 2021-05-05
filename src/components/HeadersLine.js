import React, { useEffect } from "react";

const HeaderLine = (props) => {
  const {
    tableSize,
    dataArray,
    setColumnsSize,
    columnsSize,
    cellsArray,
    setCellsArray,
  } = props;

  useEffect(() => {
    if (cellsArray.length === 0 && columnsSize.length === 0) {
      const newTab = [];
      const newSizeTab = [];
      // We're going to iterate through dataArray and create a new array containing only the datas headers.
      // We are also going to get the size of each column.
      for (let i = 0; i < tableSize.rows; i++) {
        if (Object.keys(dataArray).length > 0 && i < dataArray.array.length) {
          const headerValue = dataArray.array[i].header;
          newTab.push(headerValue);
          if (typeof headerValue === "string") {
            if (headerValue.length > 7) {
              newSizeTab.push(headerValue.length * 14);
            } else {
              newSizeTab.push(100);
            }
          } else {
            if (headerValue.length > 7) {
              newSizeTab.push(headerValue.toString().length * 14);
            } else {
              newSizeTab.push(100);
            }
          }
        } else {
          newTab.push(i + 1);
          newSizeTab.push(100);
        }
      }

      setCellsArray(newTab);
      setColumnsSize(newSizeTab);
    }
  }, [
    columnsSize,
    cellsArray,
    setCellsArray,
    dataArray,
    setColumnsSize,
    tableSize,
  ]);

  return (
    <div className="HeadersLine">
      {cellsArray.map((item, index) => {
        return (
          <div
            className="cell HeadersLine"
            style={{ width: `${columnsSize[index]}px` }}
            key={index}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default HeaderLine;
