import { Skeleton } from "@/components/ui/skeleton"

export default function DemoLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-gradient-to-b from-muted/50 to-background py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <Skeleton className="mx-auto h-12 w-64 sm:w-96" />
              <Skeleton className="mx-auto mt-6 h-20 w-full" />
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Skeleton className="h-12 w-48" />
                <Skeleton className="h-12 w-40" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <Skeleton className="mx-auto mb-12 h-8 w-64" />

            <div className="mx-auto max-w-4xl">
              <Skeleton className="h-12 w-full" />

              <div className="mt-6">
                <div className="rounded-lg border p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-4 w-64" />
                    </div>
                    <Skeleton className="aspect-video w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <Skeleton className="mx-auto h-8 w-64" />
              <Skeleton className="mx-auto mt-4 h-12 w-full" />
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Skeleton className="h-12 w-48" />
                <Skeleton className="h-12 w-40" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </footer>
    </div>
  )
}
