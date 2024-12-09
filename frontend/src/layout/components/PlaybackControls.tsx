import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { formatDuration } from "@/utils/format";
import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume1 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PlaybackControls = () => {
  const { currentSong, isPlaying, togglePlay, playPrev, playNext } =
    usePlayerStore();

    const [ currentTime, setCurrentTime ] = useState(0);
    const [ volume, setVolume ] = useState(75);
    const [ duration, setDuration ] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = document.querySelector("audio");

        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);

        const handleEnded = () => {
            usePlayerStore.setState({ isPlaying: false });
        };

        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [currentSong])

  return (
    <footer className="h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4">
      <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
          {currentSong && (
            <>
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="w-14 h-14 rounded-md object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate hover:underline cursor-pointer">
                  {currentSong.title}
                </p>
                <p className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                  {currentSong.artist}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-center flex-1 gap-2 max-w-full sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              size={"icon"}
              variant={"ghost"}
              className="hidden sm:inline-flex hover:text-white text-zinc-400"
            >
              <Shuffle className="h-4 w-4" />
            </Button>

            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={playPrev}
              className="hover:text-white text-zinc-400"
              disabled={!currentSong}
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              size={"icon"}
              onClick={togglePlay}
              className="bg-white hover:bg-white/80 text-black rounded-full h-8 w-8"
              disabled={!currentSong}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>

            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={playNext}
              className="hover:text-white text-zinc-400"
              disabled={!currentSong}
            >
              <SkipForward className="h-4 w-4" />
            </Button>

            <Button
              size={"icon"}
              variant={"ghost"}
              className="hidden sm:inline-flex hover:text-white text-zinc-400"
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          <div className="hidden sm:flex items-center gap-2 w-full">
            <div className="text-xs text-zinc-400">
              {formatDuration(currentTime)}
            </div>
            <Slider 
                value={[currentTime]}
                max={duration || 100}
                step={1}
                className="w-full hover:cursor-grab active:cursor-grabbing"
                onValueChange={(value) => {
                    setCurrentTime(value[0]);
                    if (audioRef.current) {
                        audioRef.current.currentTime = value[0];
                    }
                }}
            />
            <div className="text-xs text-zinc-400">
                {formatDuration(duration)}
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-end gap-4 min-w-[180px] w-[30%]">
            <Button
                size={"icon"}
                variant={"ghost"}
                className="hover:text-white text-zinc-400"
            >
                <Mic2 className="h-4 w-4" />
            </Button>
            <Button
                size={"icon"}
                variant={"ghost"}
                className="hover:text-white text-zinc-400"
            >
                <ListMusic className="h-4 w-4" />
            </Button>
            <Button
                size={"icon"}
                variant={"ghost"}
                className="hover:text-white text-zinc-400"
            >
                <Laptop2 className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2">
            <Button
                size={"icon"}
                variant={"ghost"}
                className="hover:text-white text-zinc-400"
            >
                <Volume1 className="h-4 w-4" />
            </Button>

            <Slider 
                value={[volume]}
                max={100}
                step={1}
                className="w-24 hover:cursor-grab active:cursor-grabbing"
                onValueChange={(value) => {
                    setVolume(value[0]);
                    if (audioRef.current) {
                        audioRef.current.volume = value[0] / 100;
                    }
                }}
            />
            </div>
        </div>
      </div>
    </footer>
  );
};

export default PlaybackControls;
