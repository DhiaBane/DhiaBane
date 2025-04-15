import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Clock } from "lucide-react"
import type { ExtensionStatus } from "@/types/extensions"

interface ExtensionStatusBadgeProps {
  status: ExtensionStatus
  className?: string
}

export function ExtensionStatusBadge({ status, className }: ExtensionStatusBadgeProps) {
  switch (status) {
    case "completed":
      return (
        <Badge className={`bg-green-100 text-green-800 hover:bg-green-200 ${className}`}>
          <CheckCircle className="h-3 w-3 mr-1" />
          Terminée
        </Badge>
      )
    case "beta":
      return (
        <Badge className={`bg-blue-100 text-blue-800 hover:bg-blue-200 ${className}`}>
          <AlertCircle className="h-3 w-3 mr-1" />
          Bêta
        </Badge>
      )
    case "alpha":
      return (
        <Badge className={`bg-amber-100 text-amber-800 hover:bg-amber-200 ${className}`}>
          <AlertCircle className="h-3 w-3 mr-1" />
          Alpha
        </Badge>
      )
    case "development":
      return (
        <Badge className={`bg-gray-100 text-gray-800 hover:bg-gray-200 ${className}`}>
          <Clock className="h-3 w-3 mr-1" />
          En développement
        </Badge>
      )
    default:
      return null
  }
}
