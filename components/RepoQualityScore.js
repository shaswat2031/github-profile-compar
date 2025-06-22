import React from "react";

const RepoQualityScore = ({ repos }) => {
  if (!repos || repos.length === 0) {
    return <div className="text-red-500">No repositories found</div>;
  }

  // Quality metrics calculation
  const calculateScores = () => {
    // Metrics
    const totalRepos = repos.length;
    const reposWithDescription = repos.filter(
      (repo) => repo.description && repo.description.length > 10
    ).length;
    const nonForkedRepos = repos.filter((repo) => !repo.fork).length;
    const reposWithStars = repos.filter(
      (repo) => repo.stargazers_count > 0
    ).length;
    const reposWithWatchers = repos.filter(
      (repo) => repo.watchers_count > 0
    ).length;

    // Original code percentage
    const originalityPercentage = Math.round(
      (nonForkedRepos / totalRepos) * 100
    );

    // Documentation score
    const documentationScore = Math.round(
      (reposWithDescription / totalRepos) * 100
    );

    // Community interest score
    const interestScore = Math.round(
      ((reposWithStars + reposWithWatchers) / (totalRepos * 2)) * 100
    );

    // Overall quality score (weighted average)
    const overallScore = Math.round(
      originalityPercentage * 0.4 +
        documentationScore * 0.4 +
        interestScore * 0.2
    );

    return {
      originalityPercentage,
      documentationScore,
      interestScore,
      overallScore,
    };
  };

  const scores = calculateScores();

  // Generate feedback based on scores
  const getFeedback = () => {
    const { overallScore, originalityPercentage, documentationScore } = scores;

    if (overallScore < 30) {
      return "Poor portfolio quality. Most repositories lack originality and proper documentation.";
    } else if (overallScore < 50) {
      return "Below average quality. Consider improving documentation and focusing more on original work.";
    } else if (overallScore < 70) {
      return "Average portfolio. Has potential but needs more attention to detail.";
    } else if (overallScore < 90) {
      return "Good quality work! Solid portfolio with decent originality and documentation.";
    } else {
      return "Excellent portfolio! High-quality original work with great documentation.";
    }
  };

  // Color based on score range
  const getScoreColor = (score) => {
    if (score < 30) return "text-red-600 dark:text-red-400";
    if (score < 50) return "text-orange-600 dark:text-orange-400";
    if (score < 70) return "text-yellow-600 dark:text-yellow-400";
    if (score < 90) return "text-green-600 dark:text-green-400";
    return "text-emerald-600 dark:text-emerald-400";
  };

  // Progress bar color
  const getProgressColor = (score) => {
    if (score < 30) return "bg-red-500";
    if (score < 50) return "bg-orange-500";
    if (score < 70) return "bg-yellow-500";
    if (score < 90) return "bg-green-500";
    return "bg-emerald-500";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
      <h3 className="text-lg font-semibold mb-4">
        Repository Quality Assessment
      </h3>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Originality</span>
            <span
              className={`text-sm font-medium ${getScoreColor(
                scores.originalityPercentage
              )}`}
            >
              {scores.originalityPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${getProgressColor(
                scores.originalityPercentage
              )}`}
              style={{ width: `${scores.originalityPercentage}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Documentation</span>
            <span
              className={`text-sm font-medium ${getScoreColor(
                scores.documentationScore
              )}`}
            >
              {scores.documentationScore}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${getProgressColor(
                scores.documentationScore
              )}`}
              style={{ width: `${scores.documentationScore}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Community Interest</span>
            <span
              className={`text-sm font-medium ${getScoreColor(
                scores.interestScore
              )}`}
            >
              {scores.interestScore}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${getProgressColor(
                scores.interestScore
              )}`}
              style={{ width: `${scores.interestScore}%` }}
            />
          </div>
        </div>

        <div className="border-t dark:border-gray-700 pt-3 mt-3">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium">Overall Quality</span>
            <span className={`font-bold ${getScoreColor(scores.overallScore)}`}>
              {scores.overallScore}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${getProgressColor(
                scores.overallScore
              )}`}
              style={{ width: `${scores.overallScore}%` }}
            />
          </div>

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            {getFeedback()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RepoQualityScore;
