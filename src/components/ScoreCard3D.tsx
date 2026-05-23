'use client';

import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaChartLine } from 'react-icons/fa';

interface ScoreCardProps {
  matchScore: number;
  matchLevel: string;
  strengths: string[];
  gaps: string[];
  reasoning: string;
}

export default function ScoreCard3D({ matchScore, matchLevel, strengths, gaps, reasoning }: ScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-400 to-green-600';
    if (score >= 50) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  const getScoreGlow = (score: number) => {
    if (score >= 80) return 'shadow-green-500/50';
    if (score >= 50) return 'shadow-yellow-500/50';
    return 'shadow-red-500/50';
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: -90 }}
      animate={{ opacity: 1, rotateX: 0 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="perspective-1000 w-full max-w-4xl mx-auto"
    >
      {/* Main Score Card */}
      <div className={`transform-style-3d glass-dark rounded-2xl p-8 shadow-2xl ${getScoreGlow(matchScore)} shadow-lg`}>
        
        {/* Score Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Match Analysis</h2>
          <motion.div
            className={`px-6 py-3 rounded-full bg-gradient-to-r ${getScoreColor(matchScore)} text-white font-bold text-xl shadow-lg`}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {matchScore}/100
          </motion.div>
        </div>

        {/* Match Level Badge */}
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className={`inline-block px-6 py-2 rounded-lg bg-gradient-to-r ${getScoreColor(matchLevel.toLowerCase().includes('strong') ? 80 : matchLevel.toLowerCase().includes('moderate') ? 50 : 0)} text-white font-semibold`}
          >
            {matchLevel}
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-green-900/30 border border-green-500/30 rounded-xl p-6 transform hover:rotate-y-6 transition-transform duration-300"
          >
            <div className="flex items-center mb-4">
              <FaCheckCircle className="text-green-400 text-2xl mr-3" />
              <h3 className="text-xl font-bold text-green-400">Strengths</h3>
            </div>
            <ul className="space-y-2">
              {strengths.map((strength, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-green-300 flex items-start"
                >
                  <span className="mr-2">•</span>
                  {strength}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Gaps */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-red-900/30 border border-red-500/30 rounded-xl p-6 transform hover:-rotate-y-6 transition-transform duration-300"
          >
            <div className="flex items-center mb-4">
              <FaExclamationTriangle className="text-red-400 text-2xl mr-3" />
              <h3 className="text-xl font-bold text-red-400">Gaps</h3>
            </div>
            <ul className="space-y-2">
              {gaps.map((gap, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-red-300 flex items-start"
                >
                  <span className="mr-2">•</span>
                  {gap}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Reasoning */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 bg-blue-900/30 border border-blue-500/30 rounded-xl p-6"
        >
          <div className="flex items-center mb-4">
            <FaChartLine className="text-blue-400 text-2xl mr-3" />
            <h3 className="text-xl font-bold text-blue-400">AI Reasoning</h3>
          </div>
          <p className="text-blue-200 leading-relaxed">{reasoning}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
