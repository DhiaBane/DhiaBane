import { Skeleton } from "@/components/ui/skeleton"

export default function FeaturesLoading() {
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
              <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
              <Skeleton className="h-5 w-full mx-auto" />
              <Skeleton className="h-5 w-5/6 mx-auto mt-2" />
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Skeleton className="h-10 w-32 rounded-md mx-auto sm:mx-2" />
                <Skeleton className="h-10 w-32 rounded-md mx-auto sm:mx-2" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="mb-12 text-center">
              <Skeleton className="h-10 w-64 mx-auto mb-4" />
              <Skeleton className="h-5 w-full max-w-3xl mx-auto" />
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-6 w-40" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-3/4 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="mb-12 text-center">
              <Skeleton className="h-10 w-64 mx-auto mb-4" />
              <Skeleton className="h-5 w-full max-w-3xl mx-auto" />
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm md:col-span-2">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-6 w-40" />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full mt-2" />
                      <Skeleton className="h-4 w-full mt-2" />
                      <Skeleton className="h-4 w-3/4 mt-2" />
                    </div>
                    <div className="flex justify-center">
                      <Skeleton className="h-[200px] w-[350px] rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>

              {[...Array(2)].map((_, i) => (
                <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-6 w-40" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-3/4 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="mb-12 text-center">
              <Skeleton className="h-10 w-64 mx-auto mb-4" />
              <Skeleton className="h-5 w-full max-w-3xl mx-auto" />
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex justify-center md:order-last">
                <Skeleton className="h-[400px] w-[500px] rounded-lg" />
              </div>
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-1" />
                    <Skeleton className="h-4 w-3/4 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <Skeleton className="h-10 w-64 mx-auto mb-6 bg-primary-foreground/20" />
              <Skeleton className="h-5 w-full mx-auto mb-10 bg-primary-foreground/20" />
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Skeleton className="h-10 w-48 rounded-md mx-auto sm:mx-2 bg-primary-foreground/20" />
                <Skeleton className="h-10 w-32 rounded-md mx-auto sm:mx-2 bg-primary-foreground/20" />
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
