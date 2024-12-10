import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButton from "./SignInOAuthButton";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "./ui/button";

const Topbar = () => {
  const { isAdmin } = useAuthStore();

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <div className="flex items-center gap-2">
        <img src="/spotify.png" alt="spotify" className="size-8" />
        Spotify
      </div>

      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to={"/admin"}>
            <Button variant={"outline"}>
              <LayoutDashboardIcon className="size-4 mr-2 inline-flex" />
              Admin Dashboard
            </Button>
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButton />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
