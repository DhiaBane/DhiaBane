"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

// On utilise les variables d'environnement de Vercel
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function TestSupabasePage() {
  const [message, setMessage] = useState("Test en cours...")
  const [data, setData] = useState<any>(null)
  const [envVars, setEnvVars] = useState({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "Non définie",
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 5)}...`
      : "Non définie",
  })

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log("Test de connexion avec:", {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL,
          key_prefix: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 5),
        })

        const { data, error } = await supabase.from("restaurants").select("*").limit(1)

        if (error) {
          console.error("Erreur Supabase :", error)
          setMessage("❌ Connexion échouée : " + error.message)
        } else {
          setMessage("✅ Connexion réussie à Supabase !")
          setData(data)
        }
      } catch (err: any) {
        console.error("Exception:", err)
        setMessage("❌ Exception: " + (err.message || "Erreur inconnue"))
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔌 Test de connexion Supabase</h1>

      <div className="mb-4 p-4 bg-gray-50 rounded border">
        <h2 className="font-semibold mb-2">Variables d'environnement :</h2>
        <p>
          <strong>URL:</strong> {envVars.url}
        </p>
        <p>
          <strong>ANON KEY (début):</strong> {envVars.key}
        </p>
      </div>

      <div
        className={`mb-4 p-4 rounded border ${message.includes("✅") ? "bg-green-50 border-green-200" : message.includes("❌") ? "bg-red-50 border-red-200" : "bg-yellow-50 border-yellow-200"}`}
      >
        <p className="font-medium">{message}</p>
      </div>

      {data && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Données reçues :</h2>
          <pre className="overflow-auto">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      <div className="mt-6">
        <h2 className="font-semibold mb-2">Étapes de débogage :</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Vérifiez que les variables d'environnement sont correctes</li>
          <li>Assurez-vous que la table 'restaurants' existe dans votre base de données</li>
          <li>Vérifiez si le RLS est activé et si vous avez des politiques configurées</li>
          <li>Consultez les logs dans la console du navigateur pour plus de détails</li>
        </ol>
      </div>
    </div>
  )
}
