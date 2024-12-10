import cloudinary from "../lib/cloudinary.js";
import Song from "../models/songModel.js";
import Album from "../models/albumModel.js";

const uploadToCloudinary = async (file) => {
  try {
    if (!file || !file.tempFilePath) {
      throw new Error("Invalid file parameter");
    }
    
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
      folder: "music-app",
    });
    return result.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error("Could not upload file to cloudinary");
  }
};

const createSong = async (req, res) => {
  try {
    if (!req.files || !req.files.imageFile || !req.files.audioFile) {
      return res.status(400).json({ message: "Please upload files" });
    }

    const { title, artist, duration, albumId } = req.body;

    const imageFile = req.files.imageFile;
    const audioFile = req.files.audioFile;

    const imageUrl = await uploadToCloudinary(imageFile);
    const audioUrl = await uploadToCloudinary(audioFile);

    const song = new Song({
      title,
      artist,
      duration,
      imageUrl,
      audioUrl,
      albumId: albumId || null,
    });

    await song.save();

    if (albumId) {
      // Add song to album
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    res.status(201).json(song);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    if (song.albumId) {
      // Remove song from album
      await Album.findByIdAndDelete(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await Song.findByIdAndDelete(id);

    res.json({ message: "Song deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createAlbum = async (req, res) => {
  try {
    const { title, artist, releaseYear } = req.body;
    
    if (!req.files || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const imageFile = req.files.imageFile;
    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      releaseYear,
      imageUrl,
    });

    await album.save();

    res.status(201).json(album);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAlbum = async (req, res) => {
    try {
        const { id } = req.params;
    
        const album = await Album.findById(id);
    
        if (!album) {
        return res.status(404).json({ message: "Album not found" });
        }
    
        await Song.deleteMany({ albumId: id });
        await Album.findByIdAndDelete(id);
    
        res.json({ message: "Album deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const checkAdmin = async (req, res) => {
  res.status(200).json({ admin: true });
};

export { checkAdmin, createSong, deleteSong, createAlbum, deleteAlbum };
