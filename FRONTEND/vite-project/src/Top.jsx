import { Dropdown } from "./Dropdown"
import { DatePicker } from "./DatePicker"
import { InputField } from "./Input"
import { useState, useEffect } from "react";



export default function Top() {

    const [dropdownData, setDropdownData] = useState([]);

    console.log("dropdownData from top", dropdownData);

  // Fetch dropdown data on component mount
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dropdowns");
        const data = await response.json();
        setDropdownData(data);
      } catch (error) {
        console.error('Fetch Error: ', error);
      }
    };

    fetchDropdownData();
  }, []);

  return (
    <div className="topcontainer">
      <div>
        <label htmlFor="documentStatus" className="block text-sm font-medium text-gray-700">
          Document Status
        </label>
        <Dropdown 
            label="DocumentStatus" 
            dropdownData={dropdownData} 
            option1="Pending"
            option2="Approved"
            option3="Rejected"
            option4="Under Review"
        />
      </div>

      <div>
        <label htmlFor="documentNo" className="block text-sm font-medium text-gray-700">
          Document No.
        </label>
        <InputField val={"MMPR/0041/23-24"} id="documentNo" className="w-[300px] h-[50px]" />
      </div>

      <div>
        <label htmlFor="divisionName" className="block text-sm font-medium text-gray-700">
          Division Name
        </label>
        <Dropdown label="DivisionName" dropdownData={dropdownData} 
            option1="Electronics"
            option2="Furniture"
            option3="Clothing"
            option4="Automotive"
        />
      </div>

      <div>
        <label htmlFor="documentDate" className="block text-sm font-medium text-gray-700">
          Document Date
        </label>
        <DatePicker />
      </div>
    </div>
  );

  
}
