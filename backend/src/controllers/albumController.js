import Album from "../models/albumModel.js";

const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    if (!albums) {
      return res.status(404).json({ message: "No albums found" });
    }
    res.status(200).json(albums);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAlbumById = async (req, res) => {
  try {
    const { albumId } = req.params;
    // populate() replaces song IDs with actual song documents from the songs collection
    const album = await Album.findById(albumId).populate("songs");
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.status(200).json(album);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { getAllAlbums, getAlbumById };
