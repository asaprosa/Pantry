'use client'
import React from 'react'
import Link from 'next/link'
import {
  Triangle,
  User,
  Target,
  Utensils,
  Bookmark,
  LogIn
} from "lucide-react"
import { Button } from "../components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "../components/ui/tooltip"

export function Navbar() {
  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Link href='/'><Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button></Link>
        </div>
        <nav className="grid gap-1 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/profile">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Profile"
                >
                  <User className="size-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Profile
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/goal-tracking">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Goal Tracking"
                >
                  <Target className="size-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Goal Tracking
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/recipes">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Recipes"
                >
                  <Utensils className="size-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Recipes
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/bookmarks">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Bookmark"
                >
                  <Bookmark className="size-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Bookmark
            </TooltipContent>
          </Tooltip>
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Login"
                >
                  <LogIn className="size-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Login
            </TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  )
}