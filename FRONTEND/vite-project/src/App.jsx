import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Dropdown } from './Dropdown'
import Top from './Top'
import Middle from './Middle'
import { RemarkNote } from './RemarkNote'
import { Bottom } from './Bottom'
import { useEffect } from 'react'

function App() {
  const [tableData, setTableData] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);
  const [dropdowns, setDropdown] = useState([]);

  useEffect(() => {
    const getDropdownData = async () => {
      const data = await fetchTableData();
      setTableData(data);
      setDataChanged(false);
    };

    // Call the function on mount and when dataChanged is true
    getDropdownData();
  }, [dataChanged]);

 useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dropdowns");
        console.log("Raw dropdown: ", response);

        if (!response.ok) {
          throw new Error(`Failed to fetch dropdown data: ${response.statusText}`);
        }

        const parsedData = await response.json();
        console.log("Parsed dropdown: ", parsedData);

        setDropdown(parsedData);
      } catch (error) {
        console.error("Fetch Error: ", error);
      }
    };

    fetchTableData();
  }, []);


  const fetchTableData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/fetchTableData");
      console.log("Raw drop Response: ", response);

      if (!response.ok) {
        throw new Error(`Failed to fetch dropdown data: ${response.statusText}`);
      }

      const parsedData = await response.json();
      console.log("Parsed drop Data: ", parsedData.data);

      return parsedData.data;
    } catch (error) {
      console.error("Fetch Error: ", error);
      return [];
    }
  };

  const deleteHandler = async (id) => {
    try {
  
      const response = await fetch(`http://localhost:5000/api/delete/${id}`, {
        method: 'DELETE',
      });

    
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }


      const data = await response.json();


      if (data.ResponseCode === 200) {
        // Successfully deleted
        alert('Item deleted successfully');
        setDataChanged(true);
        
        // setItems((prevItems) => prevItems.filter((item) => item.id !== id));;
      } else {
        alert(data.ResponseMsg || 'Error deleting item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item');
    }
  };

  const addHandler = async (itemDesc) => {
    console.log("addHandler called with:", itemDesc);

    try {
      // Prepare the data to send to the backend
      const data = {
        itemDesc: itemDesc,
      };

      // Send the data to the backend
      const response = await fetch("http://localhost:5000/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Parse the JSON response
      const result = await response.json();

      // Handle the result
      if (response.ok && result.ResponseCode === 200) {
        console.log("Item added successfully:", result.ResponseMsg);
        setDataChanged(true); // Trigger re-fetching data if needed
      } else {
        console.error("Failed to add item:", result.ResponseMsg || "Unknown error");
      }
    } catch (error) {
      console.error("Error while adding item:", error);
    }
  };

  const updateAndRenderHandler = async () => {
    console.log("updateAndRenderHandler called");
    const data = await fetchTableData();
    setTableData(data); 
    setDataChanged(false);
  }

  return (
    <>
      <div className='appContainer'>
        <Top  />
        <hr />
        <Middle />
        <RemarkNote addHandler={addHandler}/>
        <hr/>
        <Bottom tableData={tableData} 
          deleteHandler={deleteHandler} 
          updateAndRenderHandler={updateAndRenderHandler}
          />
      </div>
    </>
  )
}

export default App
