import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="outline" size="sm" className="mb-6">
        <Link href="/">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Link>
      </Button>

      <h1 className="text-4xl font-bold mb-6">Conditions d'utilisation</h1>

      <div className="prose max-w-none">
        <p className="text-xl text-muted-foreground mb-8">Dernière mise à jour : 23 avril 2025</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptation des conditions</h2>
        <p>
          En accédant et en utilisant l'application et les services RestoPilote, vous acceptez d'être lié par les
          présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos
          services.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Description des services</h2>
        <p>
          RestoPilote est une plateforme qui permet aux utilisateurs de découvrir des restaurants, de consulter leurs
          menus, de passer des commandes, de réserver des tables et de partager des additions avec leurs amis.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Inscription et compte</h2>
        <p>
          Pour utiliser certaines fonctionnalités de nos services, vous devez créer un compte. Vous êtes responsable de
          maintenir la confidentialité de vos informations de connexion et de toutes les activités qui se produisent
          sous votre compte.
        </p>
        <p>
          Vous vous engagez à fournir des informations exactes, actuelles et complètes lors de la création de votre
          compte et à les mettre à jour régulièrement.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Utilisation des services</h2>
        <p>Vous acceptez d'utiliser nos services conformément aux lois et réglementations applicables et de ne pas :</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Utiliser nos services à des fins illégales ou non autorisées</li>
          <li>Violer les droits de propriété intellectuelle ou autres droits de tiers</li>
          <li>Interférer avec le fonctionnement normal de nos services</li>
          <li>Tenter d'accéder à des comptes, systèmes ou réseaux sans autorisation</li>
          <li>Transmettre des virus, logiciels malveillants ou autres codes nuisibles</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Commandes et paiements</h2>
        <p>
          Lorsque vous passez une commande via nos services, vous concluez un contrat directement avec le restaurant
          concerné. RestoPilote agit uniquement en tant qu'intermédiaire.
        </p>
        <p>
          Vous êtes responsable de tous les frais associés à vos commandes, y compris le prix des articles, les taxes,
          les frais de livraison et les pourboires.
        </p>
        <p>
          Les paiements sont traités par des prestataires de services de paiement tiers. En utilisant ces services, vous
          acceptez leurs conditions d'utilisation.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">6. Politique d'annulation</h2>
        <p>
          Les politiques d'annulation peuvent varier selon les restaurants. Veuillez consulter les informations
          spécifiques à chaque restaurant avant de passer une commande ou de faire une réservation.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">7. Propriété intellectuelle</h2>
        <p>
          Tous les contenus, marques, logos, graphiques, photographies, vidéos, textes et autres éléments de nos
          services sont la propriété exclusive de RestoPilote ou de ses partenaires et sont protégés par les lois sur la
          propriété intellectuelle.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">8. Limitation de responsabilité</h2>
        <p>
          RestoPilote ne garantit pas l'exactitude, l'exhaustivité ou la fiabilité des informations fournies par les
          restaurants ou les utilisateurs.
        </p>
        <p>
          Dans toute la mesure permise par la loi, RestoPilote ne sera pas responsable des dommages directs, indirects,
          accessoires, spéciaux ou consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser nos services.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">9. Modifications des conditions</h2>
        <p>
          Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Les modifications
          prendront effet dès leur publication. Votre utilisation continue de nos services après la publication des
          modifications constitue votre acceptation de ces modifications.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">10. Résiliation</h2>
        <p>
          Nous nous réservons le droit de suspendre ou de résilier votre accès à nos services, à tout moment et pour
          quelque raison que ce soit, sans préavis ni responsabilité.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">11. Droit applicable</h2>
        <p>
          Ces conditions d'utilisation sont régies par le droit français. Tout litige relatif à ces conditions sera
          soumis à la compétence exclusive des tribunaux français.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">12. Contact</h2>
        <p>
          Si vous avez des questions concernant ces conditions d'utilisation, veuillez nous contacter à
          legal@restopilote.com.
        </p>
      </div>
    </div>
  )
}
