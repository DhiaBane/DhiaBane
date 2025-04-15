"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Clock, Filter } from "lucide-react"
import type { ExtensionStatus } from "@/types/extensions"

interface ExtensionStatusFilterProps {
  activeStatus: ExtensionStatus | null
  onStatusChange: (status: ExtensionStatus | null) => void
}

export function ExtensionStatusFilter({ activeStatus, onStatusChange }: ExtensionStatusFilterProps) {
  const statuses: { value: ExtensionStatus | null; label: string; icon: React.ReactNode }[] = [
    { value: null, label: "Tous", icon: <Filter className="h-4 w-4 mr-1" /> },
    { value: "completed", label: "Terminées", icon: <CheckCircle className="h-4 w-4 mr-1" /> },
    { value: "beta", label: "Bêta", icon: <AlertCircle className="h-4 w-4 mr-1" /> },
    { value: "alpha", label: "Alpha", icon: <AlertCircle className="h-4 w-4 mr-1" /> },
    { value: "development", label: "En développement", icon: <Clock className="h-4 w-4 mr-1" /> },
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {statuses.map((status) => (
        <Button
          key={status.value || "all"}
          variant={activeStatus === status.value ? "default" : "outline"}
          size="sm"
          onClick={() => onStatusChange(status.value)}
          className="flex items-center"
        >
          {status.icon}
          {status.label}
        </Button>
      ))}
    </div>
  )
}
