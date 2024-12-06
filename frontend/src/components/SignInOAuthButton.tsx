import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButton = () => {
  const { signIn, isLoaded } = useSignIn();

  const signInWithGoogle = async () => {
    signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <Button
      variant={"secondary"}
      className="w-full text-white border-zinc-200 h-11"
      onClick={signInWithGoogle}
    >
      <img src="/google.png" alt="Google" className="size-5" />
      Continue with Google
    </Button>
  );
};

export default SignInOAuthButton;
