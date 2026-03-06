"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterStaffPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: D07 - Validate invitation + Supabase signup
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Rejoindre l&apos;equipe</CardTitle>
        <p className="text-sm text-muted-foreground">
          Vous avez ete invite a rejoindre une equipe
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleJoin} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="firstName">Prenom</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Votre prenom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            <Users className="mr-2 h-4 w-4" />
            Rejoindre l&apos;equipe
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
