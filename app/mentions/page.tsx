import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"

export default function MentionsLegalesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="outline" size="sm" className="mb-6">
        <Link href="/">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Link>
      </Button>

      <h1 className="text-4xl font-bold mb-6">Mentions légales</h1>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold mt-8 mb-4">Éditeur du site</h2>
        <p>
          RestoPilote SAS
          <br />
          Capital social : 100 000 €<br />
          Siège social : 123 Avenue des Champs-Élysées, 75008 Paris, France
          <br />
          SIRET : 123 456 789 00012
          <br />
          RCS Paris B 123 456 789
          <br />
          N° TVA intracommunautaire : FR 12 123456789
          <br />
          Directeur de la publication : Jean Dupont
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Hébergement</h2>
        <p>
          Le site RestoPilote est hébergé par :<br />
          Vercel Inc.
          <br />
          340 S Lemon Ave #4133
          <br />
          Walnut, CA 91789
          <br />
          États-Unis
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Propriété intellectuelle</h2>
        <p>
          L'ensemble du contenu du site RestoPilote (textes, graphismes, logos, images, vidéos, etc.) est la propriété
          exclusive de RestoPilote SAS ou de ses partenaires. Toute reproduction, distribution, modification,
          adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement
          interdite sans l'accord exprès par écrit de RestoPilote SAS.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Données personnelles</h2>
        <p>
          Les informations recueillies sur ce site sont enregistrées dans un fichier informatisé par RestoPilote SAS
          pour la gestion de sa clientèle et de ses prospects. Elles sont conservées pendant 3 ans et sont destinées aux
          services marketing et commercial.
        </p>
        <p>
          Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d'accès aux données vous
          concernant et les faire rectifier en contactant : privacy@restopilote.com.
        </p>
        <p>
          Pour plus d'informations sur la gestion de vos données personnelles, veuillez consulter notre
          <Link href="/privacy" className="text-primary hover:underline ml-1">
            politique de confidentialité
          </Link>
          .
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Cookies</h2>
        <p>
          Le site RestoPilote utilise des cookies pour améliorer l'expérience utilisateur. En naviguant sur ce site,
          vous acceptez l'utilisation de cookies conformément à notre politique de cookies.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Limitation de responsabilité</h2>
        <p>
          RestoPilote SAS ne pourra être tenue responsable des dommages directs et indirects causés au matériel de
          l'utilisateur, lors de l'accès au site RestoPilote, et résultant soit de l'utilisation d'un matériel ne
          répondant pas aux spécifications techniques requises, soit de l'apparition d'un bug ou d'une incompatibilité.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Droit applicable et juridiction compétente</h2>
        <p>
          Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français
          seront seuls compétents.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Contact</h2>
        <p>
          Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter à l'adresse suivante :
          legal@restopilote.com.
        </p>
      </div>
    </div>
  )
}
