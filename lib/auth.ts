// Simulation mode for demo purposes
export const SIMULATION_MODE = process.env.NEXT_PUBLIC_SIMULATION_MODE === "true"

// Fonction simplifiée pour simuler l'authentification
export function getCurrentUser() {
  // En mode simulation, nous retournons un utilisateur fictif
  if (SIMULATION_MODE) {
    return {
      id: "user-123",
      phoneNumber: "+33612345678",
      name: "Utilisateur RestoPilote",
    }
  }

  // Dans un environnement réel, nous vérifierions le token JWT
  // Pour l'instant, retournons un utilisateur par défaut pour éviter les erreurs
  return {
    id: "user-123",
    phoneNumber: "+33612345678",
    name: "Utilisateur RestoPilote",
  }
}
