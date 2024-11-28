import { Textarea } from "@/components/ui/textarea"

export function TextareaBox({ className, ...props }) {
  return <Textarea placeholder="Type here." className={className} {...props} />
}
