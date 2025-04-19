"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Building2, Store, Users, Trash2 } from "lucide-react"
import Link from "next/link"

interface Company {
  id: string
  name: string
  logo_url: string | null
  subscription_tier: string
  subscription_status: string
}

interface UserRole {
  id: string
  role: string
  company_id: string | null
  restaurant_id: string | null
}

interface DashboardContentProps {
  companies: Company[]
  userRoles: UserRole[]
  userId: string
}

export function DashboardContent({ companies, userRoles, userId }: DashboardContentProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const isPlatformAdmin = userRoles.some((role) => role.role === "platform_admin")

  return (
    <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="companies">Companies</TabsTrigger>
        <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
        <TabsTrigger value="staff">Staff</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{companies.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Restaurants</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Staff Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{companies.length > 0 ? companies[0].subscription_tier : "N/A"}</div>
              <p className="text-xs text-muted-foreground">
                {companies.length > 0 ? companies[0].subscription_status : "No active subscription"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No recent activity to display.</p>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and operations</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button asChild variant="outline" className="justify-start">
                <Link href="/companies/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Company
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link href="/restaurants/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Restaurant
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link href="/staff/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Staff Member
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link href="/restaurants/delete-test">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Tester Suppression Restaurant
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="companies" className="space-y-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Your Companies</h2>
          <Button asChild>
            <Link href="/companies/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Company
            </Link>
          </Button>
        </div>

        {companies.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Building2 className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                You don't have any companies yet. Create your first company to get started.
              </p>
              <Button asChild className="mt-4">
                <Link href="/companies/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Company
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <Card key={company.id}>
                <CardHeader>
                  <CardTitle>{company.name}</CardTitle>
                  <CardDescription>
                    {company.subscription_tier} - {company.subscription_status}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {company.logo_url ? (
                    <img
                      src={company.logo_url || "/placeholder.svg"}
                      alt={`${company.name} logo`}
                      className="h-20 w-auto object-contain mb-4"
                    />
                  ) : (
                    <div className="h-20 w-full bg-muted flex items-center justify-center mb-4">
                      <Building2 className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/companies/${company.id}`}>Manage Company</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="restaurants" className="space-y-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Your Restaurants</h2>
          <Button asChild>
            <Link href="/restaurants/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Restaurant
            </Link>
          </Button>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Store className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              You don't have any restaurants yet. Add a restaurant to get started.
            </p>
            <Button asChild className="mt-4">
              <Link href="/restaurants/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Restaurant
              </Link>
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="staff" className="space-y-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Staff Management</h2>
          <Button asChild>
            <Link href="/staff/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Staff
            </Link>
          </Button>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Users className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              You don't have any staff members yet. Add staff to get started.
            </p>
            <Button asChild className="mt-4">
              <Link href="/staff/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Staff
              </Link>
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
