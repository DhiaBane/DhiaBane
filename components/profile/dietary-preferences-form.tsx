"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CheckIcon, Loader2Icon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { updateDietaryPreferences } from "@/actions/profile-actions"
import type { DietaryPreferences } from "@/types/profile"

interface DietaryPreferencesFormProps {
  preferences: DietaryPreferences
}

const DIETS = [
  { id: "none", label: "Aucun régime particulier" },
  { id: "vegetarian", label: "Végétarien" },
  { id: "vegan", label: "Végétalien" },
  { id: "pescatarian", label: "Pescétarien" },
  { id: "keto", label: "Keto" },
  { id: "paleo", label: "Paléo" },
]

const ALLERGIES = [
  { id: "gluten", label: "Gluten" },
  { id: "dairy", label: "Produits laitiers" },
  { id: "nuts", label: "Fruits à coque" },
  { id: "peanuts", label: "Arachides" },
  { id: "shellfish", label: "Fruits de mer" },
  { id: "eggs", label: "Œufs" },
  { id: "soy", label: "Soja" },
  { id: "fish", label: "Poisson" },
]

const TASTE_PREFERENCES = [
  { id: "spicy", label: "Épicé" },
  { id: "sweet", label: "Sucré" },
  { id: "salty", label: "Salé" },
  { id: "sour", label: "Acide" },
  { id: "bitter", label: "Amer" },
]

export default function DietaryPreferencesForm({ preferences }: DietaryPreferencesFormProps) {
  const { toast } = useToast()
  const [diet, setDiet] = useState(preferences.diet || "none")
  const [allergies, setAllergies] = useState<string[]>(preferences.allergies || [])
  const [tastePreferences, setTastePreferences] = useState<string[]>(preferences.tastePreferences || [])
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleAllergyChange = (allergyId: string, checked: boolean) => {
    if (checked) {
      setAllergies((prev) => [...prev, allergyId])
    } else {
      setAllergies((prev) => prev.filter((id) => id !== allergyId))
    }
  }

  const handleTastePreferenceChange = (preferenceId: string, checked: boolean) => {
    if (checked) {
      setTastePreferences((prev) => [...prev, preferenceId])
    } else {
      setTastePreferences((prev) => prev.filter((id) => id !== preferenceId))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setIsSuccess(false)

    try {
      const result = await updateDietaryPreferences({
        diet,
        allergies,
        tastePreferences,
      })

      if (result.success) {
        toast({
          title: "Préférences mises à jour",
          description: "Vos préférences alimentaires ont été mises à jour avec succès",
        })
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 3000)
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Une erreur est survenue lors de la mise à jour des préférences",
          variant: "destructive",
        })
      }
    } catch (err) {
      console.error("Error updating dietary preferences:", err)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour des préférences",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences alimentaires</CardTitle>
        <CardDescription>Personnalisez vos préférences alimentaires pour des recommandations adaptées</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Régime alimentaire</h3>
            <RadioGroup value={diet} onValueChange={setDiet}>
              {DIETS.map((dietOption) => (
                <div key={dietOption.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={dietOption.id} id={`diet-${dietOption.id}`} />
                  <Label htmlFor={`diet-${dietOption.id}`}>{dietOption.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-lg font-medium">Allergies et intolérances</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {ALLERGIES.map((allergy) => (
                <div key={allergy.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`allergy-${allergy.id}`}
                    checked={allergies.includes(allergy.id)}
                    onCheckedChange={(checked) => handleAllergyChange(allergy.id, checked === true)}
                  />
                  <Label htmlFor={`allergy-${allergy.id}`}>{allergy.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-lg font-medium">Préférences gustatives</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {TASTE_PREFERENCES.map((preference) => (
                <div key={preference.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`taste-${preference.id}`}
                    checked={tastePreferences.includes(preference.id)}
                    onCheckedChange={(checked) => handleTastePreferenceChange(preference.id, checked === true)}
                  />
                  <Label htmlFor={`taste-${preference.id}`}>{preference.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading || isSuccess} className="ml-auto">
            {isLoading ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : isSuccess ? (
              <>
                <CheckIcon className="mr-2 h-4 w-4" />
                Enregistré
              </>
            ) : (
              "Enregistrer"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
