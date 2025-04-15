import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function RecipesLoading({ params }: { params?: { restaurantId: string } }) {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-10 w-64" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      <div className="mb-4">
        <Skeleton className="h-10 w-96" />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-full max-w-md mb-4" />
          <div className="flex justify-between">
            <div />
            <Skeleton className="h-10 w-64" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <Skeleton className="h-6 w-48 mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i}>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-6 w-48 mb-4" />
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <Skeleton className="h-6 w-48 mb-4" />
                <div className="space-y-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-full" />
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-6 w-48 mb-4" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
