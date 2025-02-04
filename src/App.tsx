// src/App.tsx
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Header,
  Hero,
  ProfitCalculator,
  Dashboard,
  Footer,
} from "./components/index";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Web3ModalProvider } from "./providers/web3Provider";
import { ContractDataProvider }  from "./components/context/DataContext"

const App: React.FC = () => {
  const imagebg = import.meta.env.VITE_APP_BACKGROUND_IMAGE ||
    "https://source.unsplash.com/1600x900/?nature,water";
  const primaryColor = import.meta.env.VITE_APP_PRIMARY_COLOR || "#FFD700";

  return (
    <Web3ModalProvider>
      <ContractDataProvider>
      <div
        style={{
          backgroundImage: `url(${imagebg})`,
          color: primaryColor,
          minHeight: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header />
        <Hero />
        <ProfitCalculator minDeposit={0.02} maxDeposit={300} dailyROI={0} />
        <Dashboard />
        <Footer />
      </div>
      </ContractDataProvider>
    </Web3ModalProvider>
  );
};

export default App;
