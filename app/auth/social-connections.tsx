"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRightIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { connectSocialAccount } from "@/actions/auth-actions"

export default function SocialConnections() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleConnectSocial = async (provider: string) => {
    setIsLoading(true)
    setError("")

    try {
      const result = await connectSocialAccount(provider)

      if (result.success) {
        // In a real app, this would redirect to the provider's OAuth flow
        console.log(`Connected to ${provider}`)
      } else {
        setError(result.error || `Impossible de se connecter à ${provider}`)
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkip = () => {
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Connectez vos réseaux sociaux</CardTitle>
          <CardDescription className="text-center">
            Optionnel: Connectez vos comptes pour faciliter la récupération et le partage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-start h-12 mb-2"
            onClick={() => handleConnectSocial("google")}
            disabled={isLoading}
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Connecter avec Google
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start h-12 mb-2"
            onClick={() => handleConnectSocial("facebook")}
            disabled={isLoading}
          >
            <svg className="h-5 w-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
            </svg>
            Connecter avec Facebook
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start h-12"
            onClick={() => handleConnectSocial("apple")}
            disabled={isLoading}
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.125 0.1875C14.2969 0.324219 12.1406 1.58203 11.0156 3.1875C10.0078 4.625 9.28125 6.66406 9.60938 8.625C11.5781 8.69531 13.5781 7.40625 14.6562 5.8125C15.6641 4.33594 16.3125 2.32031 16.125 0.1875ZM22.0781 17.8906C22.1719 17.5859 22.2188 17.2812 22.2188 16.9766C22.2188 16.0156 21.8438 15.1016 21.1875 14.3984C20.3906 13.5547 19.3359 13.0781 18.2812 13.0781C17.2266 13.0781 16.4062 13.5078 15.7031 13.5078C14.9531 13.5078 14.0391 13.0312 12.8906 13.0312C11.6016 13.0312 10.3125 13.6406 9.46875 14.7656C8.25 16.3672 8.48438 19.4062 10.3594 22.3984C11.0625 23.5234 11.9531 24.7656 13.125 24.75C14.1328 24.7344 14.5547 24.0781 15.8438 24.0781C17.1328 24.0781 17.5078 24.75 18.5625 24.7344C19.7344 24.7188 20.5781 23.5938 21.2812 22.4688C21.7578 21.7656 22.125 21.0156 22.3828 20.2188C21.0469 19.6094 20.1562 18.3672 20.1562 16.9766C20.1562 15.4688 20.9062 14.1328 22.0781 13.4766V17.8906Z" />
            </svg>
            Connecter avec Apple
          </Button>

          {error && <p className="text-sm text-red-500 text-center mt-4">{error}</p>}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="ghost" onClick={handleSkip} className="text-gray-500 hover:text-gray-700">
            Ignorer pour l'instant
            <ArrowRightIcon className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
