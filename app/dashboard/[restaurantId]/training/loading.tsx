import { Skeleton } from "@/components/ui/skeleton"

export default function TrainingLoading() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-[300px]" />
          <Skeleton className="h-4 w-[250px] mt-2" />
        </div>
        <Skeleton className="h-10 w-[180px]" />
      </div>

      <div className="space-y-6">
        <Skeleton className="h-10 w-full md:w-[400px]" />

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <Skeleton className="h-10 w-full md:w-[400px]" />
            <div className="flex gap-2 w-full md:w-auto">
              <Skeleton className="h-10 w-full md:w-[180px]" />
              <Skeleton className="h-10 w-full md:w-[180px]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="border rounded-lg overflow-hidden">
                  <Skeleton className="h-[120px] w-full" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-[80%]" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[60%]" />
                    <Skeleton className="h-2 w-full" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
