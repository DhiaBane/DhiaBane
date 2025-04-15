import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ExtensionSettingsLoading() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="mr-2" disabled>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour
          </Button>
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <Skeleton className="h-10 w-full mb-4" />

      <div className="space-y-4">
        <Skeleton className="h-64 w-full" />
      </div>
    </DashboardShell>
  )
}
