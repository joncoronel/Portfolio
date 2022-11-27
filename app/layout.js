
import Nav from "../components/Nav";
import "../styles/globals.css";
import RootStyleRegistry from "./emotion";

export default function RootLayout({ children }) {
  return (
    <html>
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
