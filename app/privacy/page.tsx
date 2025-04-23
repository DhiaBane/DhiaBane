import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="outline" size="sm" className="mb-6">
        <Link href="/">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Link>
      </Button>

      <h1 className="text-4xl font-bold mb-6">Politique de confidentialité</h1>

      <div className="prose max-w-none">
        <p className="text-xl text-muted-foreground mb-8">Dernière mise à jour : 23 avril 2025</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Introduction</h2>
        <p>
          Chez RestoPilote, nous accordons une grande importance à la protection de vos données personnelles. Cette
          politique de confidentialité vous informe sur la manière dont nous collectons, utilisons, partageons et
          protégeons vos informations lorsque vous utilisez notre application et nos services.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Collecte des données</h2>
        <p>Nous collectons les informations suivantes :</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Informations d'identification (nom, prénom, numéro de téléphone, adresse email)</li>
          <li>Informations de localisation (avec votre consentement)</li>
          <li>Historique des commandes et des paiements</li>
          <li>Préférences alimentaires et restrictions diététiques</li>
          <li>Informations sur votre appareil et votre utilisation de l'application</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Utilisation des données</h2>
        <p>Nous utilisons vos données pour :</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Fournir, maintenir et améliorer nos services</li>
          <li>Traiter vos commandes et paiements</li>
          <li>Vous envoyer des notifications relatives à vos commandes</li>
          <li>Personnaliser votre expérience et vous proposer des recommandations</li>
          <li>Communiquer avec vous concernant nos services, promotions et événements</li>
          <li>Détecter et prévenir les fraudes et abus</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Partage des données</h2>
        <p>Nous pouvons partager vos informations avec :</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Les restaurants partenaires (uniquement pour traiter vos commandes)</li>
          <li>Les prestataires de services de paiement (pour traiter vos paiements)</li>
          <li>Les prestataires de services techniques (hébergement, analyse de données)</li>
          <li>Les autorités légales lorsque la loi l'exige</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Conservation des données</h2>
        <p>
          Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services ou pour
          respecter nos obligations légales. Vous pouvez demander la suppression de vos données à tout moment en nous
          contactant.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Vos droits</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Droit d'accès à vos données personnelles</li>
          <li>Droit de rectification de vos données</li>
          <li>Droit à l'effacement de vos données</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit à la portabilité de vos données</li>
          <li>Droit d'opposition au traitement</li>
        </ul>
        <p>Pour exercer ces droits, veuillez nous contacter à privacy@restopilote.com.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Sécurité des données</h2>
        <p>
          Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos
          données personnelles contre la perte, l'accès non autorisé, la divulgation, l'altération ou la destruction.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Modifications de la politique de confidentialité</h2>
        <p>
          Nous pouvons modifier cette politique de confidentialité à tout moment. La version la plus récente sera
          toujours disponible sur notre site web et dans notre application. Nous vous encourageons à consulter
          régulièrement cette page pour rester informé des changements.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Contact</h2>
        <p>Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à :</p>
        <p>
          RestoPilote SAS
          <br />
          123 Avenue des Champs-Élysées
          <br />
          75008 Paris, France
          <br />
          Email : privacy@restopilote.com
          <br />
          Téléphone : +33 1 23 45 67 89
        </p>
      </div>
    </div>
  )
}
