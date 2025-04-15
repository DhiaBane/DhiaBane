import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Skeleton } from "@/components/ui/skeleton"

export default function SpecialEventsLoading({ params }: { params: { restaurantId: string } }) {
  return (
    <DashboardShell restaurantId={params.restaurantId}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <div className="mt-6">
        <Skeleton className="h-10 w-[400px] mb-6" />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex justify-between pt-2">
                  <Skeleton className="h-9 w-[100px]" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </DashboardShell>
  )
}
