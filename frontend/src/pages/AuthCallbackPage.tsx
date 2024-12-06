import { Card, CardContent } from "@/components/ui/card";
import { axios } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const syncAttempted = useRef(false);

  useEffect(() => {
    const syncUser = async () => {
      if (!user || syncAttempted.current) return;

      try {
        syncAttempted.current = true;

        await axios.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });
      } catch (error) {
        console.error(error);
      } finally {
        navigate("/");
      }
    };

    syncUser();
  }, [user, isLoaded, navigate]);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-900">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-6 text-emerald-500 animate-spin" />
          <h3 className="text-zinc-400 text-xl font-bold">Loggin you in</h3>
          <p className="text-zinc-400">Redirecting...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallbackPage;
