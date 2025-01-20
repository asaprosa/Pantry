
import React from 'react'
import { Settings, Rabbit, Bird } from "lucide-react"
import { Button } from "../components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer"
import { Label } from "../components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
      <h1 className="text-xl font-semibold">Veggify</h1>
      
    </header>
  )
}
