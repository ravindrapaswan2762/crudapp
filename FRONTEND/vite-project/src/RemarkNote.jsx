
import { useState } from "react"
import { TextareaBox } from "./Textarea"
import { Button } from "./components/ui/button"
export function RemarkNote({addHandler}){

    const [txt, setText] = useState("");

    const textSetHandler = (textval) => {
        console.log(textval)
        setText(textval)
    }

    return (
        <div className="remarkNoteContainer">
            
            <div className="flex items-center justify-between">
                <label
                    htmlFor="documentNo"
                    className="text-sm font-medium text-gray-700 mr-10" // Add margin-right for space
                >
                    Remark
                </label>
                <TextareaBox className="w-[950px] h-[50px]" value={txt} onChange={(e)=>textSetHandler(e.target.value)}/>
            </div>

            <div onClick={(e)=>addHandler(txt)}>
                <Button  variant="outline" className="w-[120px] h-[50px]">
                    Note
                </Button>
            </div>

        </div>
    )
}