import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "fr.neurolia.immo",
  appName: "Neurolia-Immo",
  webDir: "out",
  server: {
    // Dev: pointer vers le serveur Next.js local
    // url: "http://192.168.1.X:3000",
    // cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FFFFFF",
      showSpinner: false,
    },
    StatusBar: {
      style: "DARK",
    },
  },
};

export default config;
