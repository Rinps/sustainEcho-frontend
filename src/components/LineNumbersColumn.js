import React from "react";

const LineNumbersColumn = (props) => {
  const { tableSize } = props;
  const newTab = [""];
  for (let i = 0; i < tableSize.rows; i++) {
    newTab.push(i + 1);
  }

  return (
    <div>
      {newTab.map((item, index) => {
        return (
          <div className="cell HeadersLine" key={index}>
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default LineNumbersColumn;
