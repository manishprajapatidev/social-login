import Image from "next/image";
import { Inter } from "next/font/google";
const axios = require("axios");
// import { getGoogleAuthUrl } from "../pages/api/google-auth";
import { useGoogleLogin } from "@react-oauth/google";
const FACEBOOK_APP_ID = "962421693961000";
if (process.browser) {
	const script = document.createElement("script");
	script.src = `data:text/javascript;base64,${btoa(`(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));`)}`;

	document.body.appendChild(script);

	window.fbAsyncInit = function () {
		FB.init({
			appId: FACEBOOK_APP_ID,
			autoLogAppEvents: true,
			xfbml: true,
			version: "v12.0", // <-- Specify the version of the Facebook SDK here
		});
	};
}

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	// const googleAuthUrl = getGoogleAuthUrl();
	const login = useGoogleLogin({
		onSuccess: (tokenResponse) => {
			console.log(tokenResponse);
			verifyToken(tokenResponse.access_token);
		},
	});

	const verifyToken = async (token) => {
		try {
			const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
			const { sub, email } = response.data;
			// sub is the user ID, email is the email address
			console.log(sub, email);
		} catch (error) {
			console.error(error.response.data);
		}
	};

	const loginWithFacebook = () => {
		FB.login(function (response) {
			if (response.authResponse) {
				const { accessToken } = response.authResponse;
				FB.api("/me", { fields: "email,id" }, function (response) {
					console.log("response :>> ", response);
					const { email, id } = response;
					// Send email and social ID to backend for verification
				});
			} else {
				console.log("User cancelled login or did not fully authorize.");
			}
		});
	};
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<button onClick={loginWithFacebook}>Login with Facebook</button>
			<button onClick={() => login()}>Sign in with Google 🚀 </button>;
		</main>
	);
}
