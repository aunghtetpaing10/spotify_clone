import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "./ui/button";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { axios } from "@/lib/axios";

type NewAlbum = {
  title: string;
  artist: string;
  releaseYear: number;
};

const AddAlbumsDialog = () => {
  const [albumDialogOpen, setAlbumDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [newAlbum, setNewAlbum] = useState<NewAlbum>({
    title: "",
    artist: "",
    releaseYear: new Date().getFullYear(),
  });

  const [isLoading, setIsLoading] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (!imageFile) {
        return toast.error("Please upload an image");
      }

      const formData = new FormData();

      formData.append("title", newAlbum.title);
      formData.append("artist", newAlbum.artist);
      formData.append("releaseYear", newAlbum.releaseYear.toString());
      formData.append("imageFile", imageFile);

      await axios.post("/admin/albums", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Album added successfully");

      setImageFile(null);
      setNewAlbum({
        title: "",
        artist: "",
        releaseYear: new Date().getFullYear(),
      });
    } catch (error: any) {
      toast.error("Failed to add album");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={albumDialogOpen} onOpenChange={setAlbumDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-black">
          <Plus className="h-4 w-4 mr-1" />
          Add Album
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add New Album</DialogTitle>
          <DialogDescription>
            Add a new album to your music library.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={imageInputRef}
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />

          <div
            className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
            onClick={() => imageInputRef.current?.click()}
          >
            <div className="text-center">
              {imageFile ? (
                <div className="space-y-2">
                  <div className="text-sm text-emerald-50">Image selected:</div>
                  <div className="text-xs text-zinc-400">
                    {imageFile.name.slice(0, 20)}
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                    <Upload className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div className="text-sm text-zinc-400 mb-2">Upload Image</div>
                  <Button variant={"outline"} size={"sm"} className="text-xs">
                    Choose File
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              className="bg-zinc-800 border-zinc-700"
              value={newAlbum.title}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>
            <Input
              className="bg-zinc-800 border-zinc-700"
              value={newAlbum.artist}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, artist: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Release Year</label>
            <Input
              type="number"
              value={newAlbum.releaseYear}
              onChange={(e) =>
                setNewAlbum({
                  ...newAlbum,
                  releaseYear: parseInt(e.target.value),
                })
              }
              className="bg-zinc-800 border-zinc-700"
              placeholder="Enter release year"
              min={1900}
              max={new Date().getFullYear()}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant={"outline"}
            onClick={() => setAlbumDialogOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading} className="bg-violet-500 hover:bg-violet-600">
            {isLoading ? "Uploading..." : "Add Album"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAlbumsDialog;
