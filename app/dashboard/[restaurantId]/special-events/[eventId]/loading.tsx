import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function EventDetailsLoading({ params }: { params: { restaurantId: string } }) {
  return (
    <DashboardShell restaurantId={params.restaurantId}>
      <div className="flex items-center mb-6">
        <Button variant="ghost" disabled className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <Skeleton className="h-10 w-[300px]" />
      </div>

      <Skeleton className="h-10 w-[400px] mb-6" />

      <div className="space-y-6">
        <Skeleton className="h-64 w-full rounded-xl" />

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-6">
            <div>
              <Skeleton className="h-10 w-3/4" />
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div>
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-60 mt-1" />
              </div>
            </div>
          </div>

          <div className="w-full md:w-80">
            <Skeleton className="h-[400px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
