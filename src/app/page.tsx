'use client';

import { useState } from 'react';
import ThreeBackground from '@/components/ThreeBackground';
import InputSection from '@/components/InputSection';
import ScoreCard3D from '@/components/ScoreCard3D';
import { motion } from 'framer-motion';

export default function Home() {
  const [jdText, setJdText] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleScore = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jd_text: jdText, resume_text: resumeText }),
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      // Handle nested response structures
      let scoreData = data;
      if (data.json) scoreData = data.json;
      else if (Array.isArray(data) && data[0]?.json) scoreData = data[0].json;

      setResult(scoreData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* 3D Background */}
      <ThreeBackground />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-float">
            AI Recruiter Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            Intelligent Resume Matching powered by n8n & Groq AI
          </p>
        </motion.div>

        {/* Input Section */}
        <InputSection
          jdText={jdText}
          resumeText={resumeText}
          onJdChange={setJdText}
          onResumeChange={setResumeText}
          onSubmit={handleScore}
          loading={loading}
        />

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-600/80 backdrop-blur-lg text-white p-6 rounded-2xl text-center mb-8 shadow-2xl"
          >
            <p className="text-lg font-semibold">⚠️ {error}</p>
          </motion.div>
        )}

        {/* Results Section */}
        {result && (
          <ScoreCard3D
            matchScore={result.match_score || 0}
            matchLevel={result.match_level || 'Unknown'}
            strengths={result.strengths || []}
            gaps={result.gaps || []}
            reasoning={result.reasoning || 'No reasoning provided'}
          />
        )}
      </div>
    </main>
  );
}
