import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";

const LeftSidebar = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <div className="flex flex-col h-full gap-2">
      <div className="bg-zinc-900 rounded-lg p-4">
        <div className="space-y-2">
          <Link
            to={"/"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <HomeIcon className="size-5 mr-2" />
            <span className="hidden md:inline">Home</span>
          </Link>
        </div>

        <SignedIn>
          <Link
            to={"/chat"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <MessageCircle className="size-5 mr-2" />
            <span className="hidden md:inline">Messages</span>
          </Link>
        </SignedIn>
      </div>

      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="flex items-center text-white mb-4 px-2">
          <Library className="size-5 mr-2" />
          <span className="hidden md:inline">Playlists</span>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              albums.map((album) => (
                <Link
                  to={`/albums/${album._id}`}
                  key={album._id}
                  className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
                >
                  <img
                    src={album.imageUrl}
                    alt={album.title}
                    className="size-12 rounded-lg flex-shrink-0 object-cover"
                  />

                  <div className="flex-1 min-w-0 hidden md:block">
                    <p className="font-medium truncate">{album.title}</p>
                    <p className="text-sm text-zinc-400 truncate">
                      Album • {album.artist}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;