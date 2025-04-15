import { Skeleton } from "@/components/ui/skeleton"

export default function ContactLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-24 rounded-md" />
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-gradient-to-b from-muted/50 to-background py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <Skeleton className="h-12 w-48 mx-auto mb-6" />
              <Skeleton className="h-6 w-full mx-auto" />
              <Skeleton className="h-6 w-3/4 mx-auto mt-2" />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <Skeleton className="h-8 w-64 mb-6" />
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-32 w-full rounded-md" />
                  </div>
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              </div>

              <div>
                <Skeleton className="h-8 w-64 mb-6" />
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-32 mb-2" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4 mt-1" />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-8">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="flex gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-10 w-10 rounded-full" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </footer>
    </div>
  )
}
