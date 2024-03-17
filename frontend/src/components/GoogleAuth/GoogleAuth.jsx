import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

function GoogleAuth() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // console.log("🚀 - clientId:", clientId);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.warn(credentialResponse);
        }}
        onError={() => {
          console.error("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleAuth;
