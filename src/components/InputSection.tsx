'use client';

import { motion } from 'framer-motion';
import { FaFileAlt, FaUserTie } from 'react-icons/fa';

interface InputSectionProps {
  jdText: string;
  resumeText: string;
  onJdChange: (value: string) => void;
  onResumeChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export default function InputSection({
  jdText,
  resumeText,
  onJdChange,
  onResumeChange,
  onSubmit,
  loading,
}: InputSectionProps) {
  return (
    <motion.form
      onSubmit={onSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* JD Input */}
      <motion.div
        className="transform-style-3d"
        whileHover={{ rotateY: 5, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="glass-dark rounded-2xl p-6 h-full shadow-2xl">
          <div className="flex items-center mb-4">
            <FaFileAlt className="text-blue-400 text-3xl mr-3" />
            <label className="text-xl font-bold text-white">Job Description</label>
          </div>
          <textarea
            className="w-full h-64 p-4 bg-black/30 border border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300"
            placeholder="Paste the Job Description here..."
            value={jdText}
            onChange={(e) => onJdChange(e.target.value)}
            required
          />
        </div>
      </motion.div>

      {/* Resume Input */}
      <motion.div
        className="transform-style-3d"
        whileHover={{ rotateY: -5, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="glass-dark rounded-2xl p-6 h-full shadow-2xl">
          <div className="flex items-center mb-4">
            <FaUserTie className="text-purple-400 text-3xl mr-3" />
            <label className="text-xl font-bold text-white">Candidate Resume</label>
          </div>
          <textarea
            className="w-full h-64 p-4 bg-black/30 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-300"
            placeholder="Paste the Resume text here..."
            value={resumeText}
            onChange={(e) => onResumeChange(e.target.value)}
            required
          />
        </div>
      </motion.div>

      {/* Submit Button */}
      <div className="md:col-span-2 text-center">
        <motion.button
          type="submit"
          disabled={loading}
          className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto"
            />
          ) : (
            '🚀 Analyze Match'
          )}
        </motion.button>
      </div>
    </motion.form>
  );
}
