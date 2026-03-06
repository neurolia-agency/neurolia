import { Mail } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function MagicLinkSentPage() {
  return (
    <Card>
      <CardHeader className="items-center pb-2">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
          <Mail className="h-8 w-8 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="text-center space-y-2">
        <h2 className="text-xl font-semibold">Verifiez votre boite mail</h2>
        <p className="text-sm text-muted-foreground">
          Nous vous avons envoye un lien de connexion. Cliquez dessus pour
          acceder a votre espace.
        </p>
      </CardContent>
    </Card>
  );
}
