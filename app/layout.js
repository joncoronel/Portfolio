import Navbar from "../components/Navbar";
import "../styles/globals.css";
import RootStyleRegistry from "./emotion";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />

      <body>
        <RootStyleRegistry>
          <Navbar />
          <main>{children}</main>
        </RootStyleRegistry>
      </body>
    </html>
  );
}
