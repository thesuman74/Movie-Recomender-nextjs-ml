import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactPlayer from "react-player";

export function DialogCard({ videoData }: { videoData: any }) {
  const RenderTrailer = () => {
    // console.log("render trailer is clicked from dilog", videoData);
    return (
      <div>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoData}-U`}
          playing={true}
          width="100%"
          height="500px"
          controls={true}
        />
      </div>
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="mx-2 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded w-28">
          Play Trailer
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[500px] p-0 border-none ">
        <div>{RenderTrailer()}</div>
      </DialogContent>
    </Dialog>
  );
}
