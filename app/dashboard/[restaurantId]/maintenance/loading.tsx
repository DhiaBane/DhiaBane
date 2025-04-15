import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function MaintenanceLoading() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-10 w-[200px]" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[150px]" />
          <Skeleton className="h-10 w-[180px]" />
        </div>
      </div>

      <div className="mb-6">
        <Skeleton className="h-10 w-full mb-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-6 w-[180px]" />
                  <Skeleton className="h-5 w-[80px]" />
                </div>
                <Skeleton className="h-4 w-[150px] mt-2" />
              </CardHeader>
              <CardContent className="pb-2">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <div className="flex flex-col gap-2 mt-4">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-5 w-[100px] mt-1" />
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex justify-between w-full">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-8 w-[80px]" />
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
}
