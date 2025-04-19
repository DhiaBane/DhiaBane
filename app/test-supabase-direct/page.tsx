"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function TestSupabaseDirectPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [data, setData] = useState<any>(null)
  const [envVars, setEnvVars] = useState({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "Non définie",
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 5)}...`
      : "Non définie",
    fullUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    fullKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })

  const testConnection = async () => {
    setStatus("loading")
    setMessage("Test de connexion en cours...")

    try {
      console.log("Test de connexion avec:", {
        url: envVars.fullUrl,
        key_prefix: envVars.fullKey?.substring(0, 5),
      })

      if (!envVars.fullUrl || !envVars.fullKey) {
        throw new Error("Variables d'environnement manquantes")
      }

      // Créer un client Supabase directement
      const supabase = createClient(envVars.fullUrl, envVars.fullKey)

      // Tester une requête simple
      const { data, error } = await supabase.from("restaurants").select("*").limit(1)

      if (error) {
        throw error
      }

      setStatus("success")
      setMessage("✅ Connexion réussie à Supabase !")
      setData(data)
    } catch (err: any) {
      console.error("Erreur de connexion:", err)
      setStatus("error")
      setMessage(`❌ Erreur: ${err.message || "Erreur inconnue"}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Test direct de connexion Supabase</h1>
        <Link href="/" className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 transition-colors">
          Retour à l'accueil
        </Link>
      </div>

      {/* Informations de débogage */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="font-semibold mb-2">Variables d'environnement :</h2>
        <p>
          <strong>URL:</strong> {envVars.url}
        </p>
        <p>
          <strong>ANON KEY (début):</strong> {envVars.key}
        </p>
      </div>

      {/* Bouton de test */}
      <div className="mb-6">
        <button
          onClick={testConnection}
          disabled={status === "loading"}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="inline-block mr-2 h-4 w-4 animate-spin" />
              Test en cours...
            </>
          ) : (
            "Tester la connexion"
          )}
        </button>
      </div>

      {/* Résultat du test */}
      {status !== "idle" && (
        <div
          className={`mb-6 p-4 rounded-md ${
            status === "loading"
              ? "bg-blue-50 text-blue-700"
              : status === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
          }`}
        >
          {status === "loading" ? (
            <div className="flex items-center">
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              {message}
            </div>
          ) : status === "success" ? (
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              {message}
            </div>
          ) : (
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {message}
            </div>
          )}
        </div>
      )}

      {/* Données reçues */}
      {data && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-semibold mb-2">Données reçues :</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      {/* Étapes de débogage */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Étapes de débogage</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Vérifiez que les variables d'environnement sont correctement définies dans votre projet Vercel</li>
          <li>Assurez-vous que la clé API Supabase est valide et n'a pas expiré</li>
          <li>Vérifiez que le projet Supabase est actif et accessible</li>
          <li>Essayez de recréer une nouvelle clé API dans les paramètres de votre projet Supabase</li>
          <li>Vérifiez si les politiques RLS (Row Level Security) sont correctement configurées</li>
        </ol>
      </div>
    </div>
  )
}
