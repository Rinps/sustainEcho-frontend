import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import HeadersLine from "./components/HeadersLine";
import LineNumbersColumn from "./components/LineNumbersColumn";
import Table from "./components/Table";

function App() {
  // We're going to need a few states: the array to display and the array size. Since this application is small scaled, I'm not going to use context or Redux.
  const [dataArray, setDataArray] = useState({});
  const [tableSize, setTableSize] = useState({ rows: 50, columns: 50 });
  const [table, setTable] = useState([]);
  const [columnsSize, setColumnsSize] = useState([]);
  const [cellsArray, setCellsArray] = useState([]);
  const [selection, setSelection] = useState(undefined);
  const [quickSelectRow, setQuickSelectRow] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // The backend URL is stored in an environment variable.
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  // At the start of the application, fetch the data from the API. We will use a new function named fetchData.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverResponse = await axios.get(
          `${backendURL}/6093d42f86e3d50015ed7663`
        );
        setDataArray({ ...serverResponse.data });
      } catch (error) {
        console.log(error.message);
      }
    };

    // The createTable function will create the spreadsheet to be created using the dataArray as well as the tableSize.
    const createTable = (array, size) => {
      let newTable = [];

      // We can only create the table if we have valid dimensions and if a dataArray have been loaded.
      if (
        tableSize.rows > 0 &&
        tableSize.columns > 0 &&
        Object.keys(array).length > 0
      ) {
        // We're going to iterate through each line and cell of our new table. For each new line, we start by adding a new array to the table state.
        for (let i = 0; i <= size.columns - 1; i++) {
          newTable.push([]);

          // Then, for each cell in this line, we check if its index is in the range of our dataArray. If it is, we put the corresponding value, else we just put null in the cell.
          for (let j = 0; j < size.rows; j++) {
            if (i < array.array.length && j < array.array[i].data.length) {
              const value = array.array[i].data[j];
              if (value === null) {
                newTable[i].push("");
              } else {
                newTable[i].push(value);
              }
            } else {
              newTable[i].push("");
            }
          }
        }
      }
      setTable(newTable);
    };

    // For now, the only time when we want the fetchData function to run is when the dataArray state contains nothing.
    if (Object.keys(dataArray).length === 0) {
      fetchData();
    }

    // We only create a new table if no data have been load. The table update must not trigger this function.
    if (Object.keys(table).length === 0) {
      createTable(dataArray, tableSize);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, [backendURL, tableSize, dataArray, isLoading, table, setTable]);

  // The handleClick is use to clear the current selection.
  const handleClick = () => {
    setSelection(undefined);
  };

  // The quickSelectionToogle allow the user to chose wether he wants to select an entire row or column with the right click
  const quickSelectionToogle = (event) => {
    setQuickSelectRow(!quickSelectRow);
  };

  return isLoading ? (
    <div className="App">
      <h1>Currently loading</h1>
    </div>
  ) : (
    <div className="App">
      <h1>Test SustainEcho</h1>
      <header>
        <button onClick={handleClick}>Clear selection</button>
        <label>
          <input
            type="checkbox"
            defaultChecked={quickSelectRow}
            onChange={quickSelectionToogle}
          />
          {quickSelectRow ? (
            <p>Right click in the spreadsheet to select the entire row</p>
          ) : (
            <p>Right click in the spreadsheet to select the entire column</p>
          )}
        </label>
      </header>
      <section>
        <LineNumbersColumn tableSize={tableSize} />
        <div className="right">
          <HeadersLine
            tableSize={tableSize}
            dataArray={dataArray}
            columnsSize={columnsSize}
            setColumnsSize={setColumnsSize}
            cellsArray={cellsArray}
            setCellsArray={setCellsArray}
          />
          <Table
            table={table}
            setTable={setTable}
            setTableSize={setTableSize}
            columnsSize={columnsSize}
            selection={selection}
            setSelection={setSelection}
            quickSelectRow={quickSelectRow}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
