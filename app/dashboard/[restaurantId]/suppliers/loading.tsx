import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function SuppliersLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[180px]" />
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="md:w-2/3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-[150px]" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-9 w-[100px]" />
                  <Skeleton className="h-9 w-[100px]" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Skeleton className="h-9 w-full" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                      <Skeleton className="h-5 w-[150px]" />
                      <Skeleton className="h-5 w-[100px]" />
                      <Skeleton className="h-5 w-[100px]" />
                      <Skeleton className="h-5 w-[80px]" />
                      <Skeleton className="h-5 w-[100px]" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-1/3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="h-5 w-[80px]" />
              </div>
              <Skeleton className="h-4 w-[100px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-10 w-[200px]" />
                </div>
                <div className="space-y-2">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                </div>
                <Skeleton className="h-px w-full" />
                <div className="space-y-2">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-4 w-[80px]" />
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
