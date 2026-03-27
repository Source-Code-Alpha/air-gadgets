"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, checked = false, onCheckedChange, id, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        id={id}
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-[#1f2937] shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0080FF] disabled:cursor-not-allowed disabled:opacity-50",
          checked && "bg-[#0080FF] border-[#0080FF] text-white",
          className
        )}
        onClick={() => onCheckedChange?.(!checked)}
      >
        {checked && <Check className="h-3 w-3 mx-auto" />}
      </button>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
