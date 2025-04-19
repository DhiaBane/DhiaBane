"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface Company {
  id: string
  name: string
}

export default function NewRestaurantPage() {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [cuisineType, setCuisineType] = useState("")
  const [seatingCapacity, setSeatingCapacity] = useState("")
  const [companyId, setCompanyId] = useState("")
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true)
  const { user } = useAuth()
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    const fetchCompanies = async () => {
      if (!user) return

      try {
        // Get user roles to find companies they have access to
        const { data: userRoles, error: rolesError } = await supabase
          .from("user_roles")
          .select("company_id")
          .eq("user_id", user.id)
          .in("role", ["company_admin", "platform_admin"])

        if (rolesError) throw rolesError

        if (userRoles && userRoles.length > 0) {
          const companyIds = userRoles.map((role) => role.company_id).filter((id) => id !== null) as string[]

          if (companyIds.length > 0) {
            const { data: companiesData, error: companiesError } = await supabase
              .from("companies")
              .select("id, name")
              .in("id", companyIds)

            if (companiesError) throw companiesError

            setCompanies(companiesData || [])
            if (companiesData && companiesData.length > 0) {
              setCompanyId(companiesData[0].id)
            }
          }
        }
      } catch (error) {
        console.error("Error fetching companies:", error)
        toast({
          title: "Error",
          description: "Failed to load companies",
          variant: "destructive",
        })
      } finally {
        setIsLoadingCompanies(false)
      }
    }

    fetchCompanies()
  }, [user, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to create a restaurant",
        variant: "destructive",
      })
      return
    }

    if (!companyId) {
      toast({
        title: "Error",
        description: "Please select a company",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Insert the restaurant
      const { data: restaurant, error: restaurantError } = await supabase
        .from("restaurants")
        .insert({
          name,
          address,
          phone,
          email,
          cuisine_type: cuisineType,
          seating_capacity: seatingCapacity ? Number.parseInt(seatingCapacity) : null,
          company_id: companyId,
          manager_id: user.id,
        })
        .select()
        .single()

      if (restaurantError) throw restaurantError

      // Add user role as restaurant_manager
      const { error: roleError } = await supabase.from("user_roles").insert({
        user_id: user.id,
        role: "restaurant_manager",
        company_id: companyId,
        restaurant_id: restaurant.id,
      })

      if (roleError) throw roleError

      toast({
        title: "Restaurant Created",
        description: `${name} has been successfully created`,
      })

      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create restaurant",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingCompanies) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading companies...</p>
      </div>
    )
  }

  if (companies.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Create New Restaurant</CardTitle>
            <CardDescription className="text-center">You need to create a company first</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="mb-4 text-center">
              You don't have any companies yet. Please create a company before adding a restaurant.
            </p>
            <Button onClick={() => router.push("/companies/new")}>Create Company</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create New Restaurant</CardTitle>
          <CardDescription className="text-center">Add your restaurant details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Select value={companyId} onValueChange={setCompanyId} required>
                <SelectTrigger id="company">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Restaurant Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Downtown Bistro"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, City, State, ZIP"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@downtownbistro.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuisineType">Cuisine Type</Label>
              <Input
                id="cuisineType"
                value={cuisineType}
                onChange={(e) => setCuisineType(e.target.value)}
                placeholder="Italian, French, etc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seatingCapacity">Seating Capacity</Label>
              <Input
                id="seatingCapacity"
                type="number"
                value={seatingCapacity}
                onChange={(e) => setSeatingCapacity(e.target.value)}
                placeholder="50"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Restaurant"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
