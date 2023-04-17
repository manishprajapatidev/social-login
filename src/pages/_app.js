import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
export default function App({ Component, pageProps }) {
	return (
		<GoogleOAuthProvider clientId="290948843549-9oufq87tflb5l67ap09e4ioschqurk8r.apps.googleusercontent.com">
			<Component {...pageProps} />
		</GoogleOAuthProvider>
	);
}
