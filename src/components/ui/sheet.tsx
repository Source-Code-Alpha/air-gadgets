"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

function Sheet({ open = false, onOpenChange = () => {}, children }: SheetProps) {
  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  )
}

const SheetContext = React.createContext<{ open: boolean; onOpenChange: (open: boolean) => void }>({
  open: false,
  onOpenChange: () => {},
})

function SheetTrigger({ asChild, children, ...props }: { asChild?: boolean; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = React.useContext(SheetContext)
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: () => onOpenChange(true),
    })
  }
  return <button onClick={() => onOpenChange(true)} {...props}>{children}</button>
}

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right" | "top" | "bottom"
}

function SheetContent({ className, side = "right", children, ...props }: SheetContentProps) {
  const { open, onOpenChange } = React.useContext(SheetContext)
  if (!open) return null

  const sideClasses = {
    left: "inset-y-0 left-0",
    right: "inset-y-0 right-0",
    top: "inset-x-0 top-0",
    bottom: "inset-x-0 bottom-0",
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/80" onClick={() => onOpenChange(false)} />
      <div
        className={cn(
          "fixed z-50 bg-[#111827] shadow-lg transition-transform",
          sideClasses[side],
          className
        )}
        {...props}
      >
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 text-gray-400"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  )
}

export { Sheet, SheetTrigger, SheetContent }
