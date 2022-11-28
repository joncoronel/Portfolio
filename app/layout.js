import Nav from "../components/Nav";
import "../styles/globals.css";
import RootStyleRegistry from "./emotion";
import { Arima } from "@next/font/google";

const arima = Arima({ subsets: ["latin"], variable: "--font-arima" });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={arima.variable}>
      <head />

      <body>
        <RootStyleRegistry>
          <Nav />
          <main>{children}</main>
        </RootStyleRegistry>
      </body>
    </html>
  );
}
