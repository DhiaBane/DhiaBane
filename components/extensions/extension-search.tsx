"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"

interface ExtensionSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function ExtensionSearch({ searchTerm, onSearchChange }: ExtensionSearchProps) {
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Rechercher une extension..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button variant="outline" size="icon">
        <Filter className="h-5 w-5" />
      </Button>
    </div>
  )
}
