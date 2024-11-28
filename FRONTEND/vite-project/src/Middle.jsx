
import { Dropdown } from "./Dropdown"
import { InputField } from "./Input"
import { TextareaBox } from "./Textarea"
import { DatePicker } from "./DatePicker"
import { Button } from "./components/ui/button"
import { Checkbox } from "./components/ui/checkbox"

export default function Middle(){

    return (
        <div className="middleContainer">

            <div className="middleLeft">
                <div className="flex items-center space-x-20 justify-between">
                    <label htmlFor="Warehouse" className="text-sm font-medium text-gray-700">
                        Warehouse
                    </label>
                    <Dropdown
                        option1="Warehouse A"
                        option2="Warehouse B"
                        option3="Warehouse C"
                        option4="Warehouse D"
                    />
                </div>

                <div className="flex items-center space-x-20 justify-between">
                    <label htmlFor="SourceDocument" className="text-sm font-medium text-gray-700">
                         Source Document
                    </label>
                    <Dropdown 
                        option1="Invoice"
                        option2="Purchase Order"
                        option3="Delivery Note"
                        option4="Sales Order"/>
                </div>

                <div className="flex items-center space-x-20 justify-between">
                    <label htmlFor="RefdocumentNo" className="text-sm font-medium text-gray-700">
                        Ref Document No.
                    </label>
                    <Dropdown
                        option1="Ref001"
                        option2="Ref002"
                        option3="Ref003"
                        option4="Ref004"
                    />
                </div>

                <div className="flex items-center space-x-20 justify-between">
                    <label htmlFor="RefDocumentDate" className="text-sm font-medium text-gray-700">
                        Ref Document Date
                    </label>

                    <InputField val={"28/11/2024"}className="w-[300px] h-[50px]" />
                </div>


                <div className="flex items-center space-x-20 justify-between">
                    <label htmlFor="documentNo" className="text-sm font-medium text-gray-700">
                        Indent Type
                    </label>
                    <Dropdown
                        option1="Type A"
                        option2="Type B"
                        option3="Type C"
                        option4="Type D"
                    />
                </div>

                <div className="flex items-center space-x-20 justify-between">
                    <label htmlFor="documentNo" className="text-sm font-medium text-gray-700">
                        Department
                    </label>
                    <Dropdown
                        option1="IT"
                        option2="HR"
                        option3="Finance"
                        option4="Operations"
                    />
                </div>

            </div>


            <div className="middleRight">

                <div className="flex items-center space-x-20 justify-between">
                    <label htmlFor="RequiestedBy" className="text-sm font-medium text-gray-700">
                        Requiested By
                    </label>
                    <Dropdown
                        option1="John Doe"
                        option2="Jane Smith"
                        option3="Alice Johnson"
                        option4="Bob Browns"
                    />
                </div>

                <div className="flex items-center space-x-20 justify-between">
                    <label htmlFor="ReferenceNoNo" className="text-sm font-medium text-gray-700">
                        Reference No.
                    </label>

                    <InputField className="w-[300px] h-[50px]" />
                </div>

                <div className="flex items-center space-x-20 justify-between">
                    <label htmlFor="ReferenceDate" className="text-sm font-medium text-gray-700">
                        Reference Date
                    </label>

                    <DatePicker className="w-[300px] h-[50px]" />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex item-center w-1/2">
                        <label htmlFor="ReserveLot" className="text-sm font-medium text-gray-700">
                            Reserve Lot
                        </label>
                    </div>

                    <div className="flex item-center w-1/2 ml-7">
                        <Checkbox />
                    </div>
                </div>

            </div>

        </div>
    )
}