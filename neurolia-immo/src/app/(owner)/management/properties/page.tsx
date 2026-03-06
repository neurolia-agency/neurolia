import { Header } from "@/components/layout/header";
import { ScreenWrapper } from "@/components/layout/screen-wrapper";

export default function PropertiesPage() {
  return (
    <>
      <Header title="Mes biens" showBack />
      <ScreenWrapper>
        <div className="flex flex-1 items-center justify-center py-20">
          <p className="text-muted-foreground">D06 — Core Screens</p>
        </div>
      </ScreenWrapper>
    </>
  );
}
