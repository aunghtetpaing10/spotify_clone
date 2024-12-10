import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { useMusicStore } from "@/stores/useMusicStore";
  import { Calendar, Loader, Music, Trash2 } from "lucide-react";
  import { Button } from "./ui/button";

const AlbumsTable = () => {
    const { albums, deleteAlbum, error, isLoading } = useMusicStore();

    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="text-zinc-400 flex items-center gap-1">
            <Loader className="animate-spin size-5" />
            Loading albums...
          </div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="text-red-400">{error}</div>
        </div>
      );
    }
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead>Release Date</TableHead>
            <TableHead>Songs</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {albums.map((album) => (
            <TableRow key={album._id} className="hover:bg-zinc-800/50">
              <TableCell>
                <img
                  src={album.imageUrl}
                  alt={album.title}
                  className="size-10 rounded object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{album.title}</TableCell>
              <TableCell>{album.artist}</TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  {album.releaseYear}
                </span>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                    <Music className="size-4" />
                    {album.songs.length} songs
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  onClick={() => deleteAlbum(album._id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
}

export default AlbumsTable