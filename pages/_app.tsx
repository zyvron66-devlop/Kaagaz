import type { AppType } from "next/app";
import "../styles/globals.css";

const App: AppType = ({ Component, pageProps }) => <Component {...pageProps} />;
export default App;
