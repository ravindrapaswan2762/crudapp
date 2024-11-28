import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export function Dropdown({option1, option2, option3, option4}){

    return (
        <Select onClick={(e)=>handler(e)}>
            <SelectTrigger className="w-[300px] h-[50px]">
                <SelectValue placeholder="Select" />
            </SelectTrigger>

            <SelectContent>

                <SelectItem value={option1} label="Light Mode">{option1}</SelectItem>
                <SelectItem value={option2}>{option2}</SelectItem>
                <SelectItem value={option3}>{option3}</SelectItem>
                <SelectItem value={option4}>{option4}</SelectItem>
            </SelectContent>
        </Select>

    )
}

