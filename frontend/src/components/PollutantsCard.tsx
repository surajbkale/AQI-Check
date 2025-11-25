import { motion } from "framer-motion";
import { POLLUTANT_MAP } from "../constants/pollutants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function PollutantCard({ data }: { data: any }) {
  const weatherKeys = ["t", "h", "w", "p", "dew", "wg"];
  const pollutants = Object.entries(data.pollutants).filter(
    ([key]) => !weatherKeys.includes(key)
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-7xl mx-auto mt-6"
    >
      <motion.h3
        variants={itemVariants}
        className="text-xl font-bold text-white mb-4 flex items-center gap-2"
      >
        Major Pollutants
      </motion.h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {pollutants.map(([key, val]: any) => {
          const info = POLLUTANT_MAP[key] || {
            label: key.toUpperCase(),
            name: "Pollutant",
          };

          return (
            <motion.div
              key={key}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(30, 41, 59, 0.8)",
              }}
              className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-4 flex flex-col justify-between cursor-default transition-colors"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                  {info.label}
                </span>
                <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>
              </div>

              {/* Value */}
              <div className="mt-1">
                <span className="text-2xl font-bold text-white">{val.v}</span>
              </div>

              <div className="mt-2 border-t border-slate-700/50 pt-2">
                <p
                  className="text-xs text-slate-400 truncate"
                  title={info.name}
                >
                  {info.name}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
