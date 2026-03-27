"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Minimal dropdown-menu placeholder — not actively used in admin panel
const DropdownMenu = ({ children }: { children: React.ReactNode }) => <>{children}</>
const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ ...props }, ref) => <button ref={ref} {...props} />
)
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("z-50 min-w-[8rem] rounded-md border border-[#1f2937] bg-[#111827] p-1", className)} {...props} />
  )
)
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-gray-300 hover:bg-white/10", className)} {...props} />
  )
)
DropdownMenuItem.displayName = "DropdownMenuItem"

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem }
