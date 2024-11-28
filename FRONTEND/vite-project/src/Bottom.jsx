import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./components/ui/button";
import { useState } from "react";

export function Bottom({ tableData, deleteHandler, updateAndRenderHandler }) {
  const [editingCell, setEditingCell] = useState({ row: null, column: null });
  const [editValue, setEditValue] = useState("");

  const updateCellValue = async (id, field, value) => {
    try {
      const response = await fetch("http://localhost:5000/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, field, value }),
      });

      const result = await response.json();

      if (result.ResponseCode === 200) {
        console.log("Update successful:", result.ResponseMsg);
      } else {
        console.error("Failed to update:", result.ResponseMsg);
      }
    } catch (error) {
      console.error("Error updating cell:", error);
    }
  };

  const handleCellClick = (rowIndex, columnKey) => {
    // Set the current row and column for editing
    setEditingCell({ row: rowIndex, column: columnKey });

    // Set the current value in the cell as the editValue
    setEditValue(tableData[rowIndex][columnKey]);
  };

  const handleInputChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleKeyPress = async (e, id, columnKey) => {
    if (e.key === "Enter") {
      await updateCellValue(id, columnKey, editValue);
      await setEditingCell({ row: null, column: null });
      updateAndRenderHandler();
    }
  };

  return (
    <div className="bottomContainer">
      <Table className="w-full border">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left px-8 py-2">Item Code</TableHead>
            <TableHead className="text-center px-4 py-2">Item Description</TableHead>
            <TableHead className="text-center px-4 py-2">Tech Description</TableHead>
            <TableHead className="text-center px-4 py-2">Indent Qty.</TableHead>
            <TableHead className="text-center px-4 py-2">Rate</TableHead>
            <TableHead className="text-center px-4 py-2">Amount</TableHead>
            <TableHead className="text-center px-4 py-2">Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-gray-100">
          {tableData.map((opt, rowIndex) => (
            <TableRow key={opt.id}>
              {["itemCode", "itemDec", "itemTechDec", "identQty", "rate", "amount"].map((columnKey, index) => (
                <TableCell
                  key={columnKey}
                  className={`border border-gray-300 px-8 py-2 ${
                    index === 0 ? "text-left" : "text-center"
                  }`}
                >
                  {editingCell.row === rowIndex && editingCell.column === columnKey ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={handleInputChange}
                      onKeyPress={(e) => handleKeyPress(e, opt.id, columnKey)}
                      onBlur={() => setEditingCell({ row: null, column: null })}
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    <span
                      onClick={() => handleCellClick(rowIndex, columnKey)}
                      className="cursor-pointer"
                    >
                      {opt[columnKey]}
                    </span>
                  )}
                </TableCell>
              ))}
              <TableCell className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => deleteHandler(opt.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
