import React, { useState } from "react";
import Lodash from "lodash";

const Grid = () => {
  const [numCol, setNumCol] = useState(0);
  const [numRow, setNumRow] = useState(0);
  const [gridCol, setGridCol] = useState(0);
  const [running, setRunning] = useState(false);

  const resetGrid = () =>
    Array.from({ length: numRow }).map(() =>
      Array.from({ length: numCol }).fill(0)
    );

  const [grid, setGrid] = useState(() => resetGrid());

  const gridCreate = () => {
    const newGrid = resetGrid();
    setGridCol(numCol);
    setGrid(newGrid);
  };

  const runSimulation = () => {
    /* if (!running) {
      return;
    } */

    console.log("yo");
    console.log(grid);
    let newGrid = Lodash.cloneDeep(grid);

    for (let i = 0; i < numRow; i++) {
      for (let j = 0; j < numCol; j++) {
        let aliveNeighbours = 0;

        for (let l = -1; l <= 1; l++) {
          for (let n = -1; n <= 1; n++) {
            if (i + l >= 0 && j + n >= 0 && i + l < numRow && j + n < numCol) {
              aliveNeighbours += grid[i + l][j + n];
            }
          }
        }
        aliveNeighbours -= grid[i][j];

        if (grid[i][j] === 1 && aliveNeighbours < 2) {
          newGrid[i][j] = 0;
        } else if (grid[i][j] === 1 && aliveNeighbours > 3) {
          newGrid[i][j] = 0;
        } else if (grid[i][j] === 0 && aliveNeighbours === 3) {
          newGrid[i][j] = 1;
        } else {
          newGrid[i][j] = grid[i][j];
        }
      }
    }

    setGrid(newGrid);

    //setTimeout(startSimulation, 1000);
  };

  const resetHandler = () => {
    setNumRow(0);
    setNumCol(0);
    setGrid(() => resetGrid());
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>Rows:</p>
          <input
            value={numRow}
            placeholder="type here"
            onChange={(event) => {
              setNumRow(event.target.value);
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>Columns:</p>
          <input
            value={numCol}
            placeholder="type here"
            onChange={(event) => {
              setNumCol(event.target.value);
            }}
          />
        </div>
      </div>
      <button onClick={gridCreate}>Create Grid</button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridCol}, 40px)`,
          justifyContent: "center",
          padding: "40px",
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}:${k}`}
              onClick={() => {
                const newGrid = Lodash.cloneDeep(grid);
                newGrid[i][k] = grid[i][k] ? 0 : 1;
                setGrid(newGrid);
              }}
              style={{
                width: 40,
                height: 40,
                backgroundColor: grid[i][k] ? "black" : "white",
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
      <button
        onClick={() => {
          setRunning(!running);
          runSimulation();
        }}
      >
        Simulate
      </button>
      <button onClick={resetHandler}>Reset</button>
    </>
  );
};

export default Grid;
