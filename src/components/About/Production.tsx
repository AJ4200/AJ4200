import { FaHeadphones, FaWaveSquare } from "react-icons/fa";
import MusicPlayer from "../Utils/MusicPlayer";

const Producing: React.FC = () => {
  return (
    <>
      <div className="mb-10 grid gap-5 lg:grid-cols-[0.75fr_1fr] lg:items-end">
        <div>
          <span className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.28em] text-amber-300">
            <FaHeadphones />
            02 / Music production
          </span>
          <h2 className="mt-3 text-5xl font-black uppercase leading-[0.9] text-white sm:text-7xl">
            When code
            <span className="block text-amber-300">becomes sound.</span>
          </h2>
        </div>
        <div className="max-w-2xl lg:justify-self-end">
          <p className="text-sm leading-7 text-white/50">
            Music is where I work without requirements. These tracks are
            sketches, atmospheres, and finished ideas made by following feeling
            first and structure second.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.18em] text-white/30">
            <FaWaveSquare className="text-amber-300" />
            Original productions / Headphones recommended
          </span>
        </div>
      </div>
      <MusicPlayer />
    </>
  );
};

export default Producing;
