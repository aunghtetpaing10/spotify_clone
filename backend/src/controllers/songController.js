import Song from "../models/songModel.js";

const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 }); // Sort by newest
    if (!songs) {
      return res.status(404).json({ message: "No songs found" });
    }
    res.status(200).json(songs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getFeaturedSongs = async (req, res) => {
  try {
    const songs = await Song.aggregate([
      { $sample: { size: 6 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    if (!songs) {
      return res.status(404).json({ message: "No songs found" });
    }

    res.status(200).json(songs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getMadeForYouSongs = async (req, res) => {
  try {
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    if (!songs) {
      return res.status(404).json({ message: "No songs found" });
    }

    res.status(200).json(songs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getTrendingSongs = async (req, res) => {
  try {
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    if (!songs) {
      return res.status(404).json({ message: "No songs found" });
    }

    res.status(200).json(songs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs };
