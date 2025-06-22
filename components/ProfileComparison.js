"use client";

import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

const ProfileComparison = ({
  user1,
  user2,
  userData1,
  userData2,
  repos1,
  repos2,
}) => {
  const [showCritique, setShowCritique] = useState(false);

  // Calculate uniqueness score (lower means more generic/common projects)
  const calculateUniquenessScore = (repos) => {
    if (!repos || repos.length === 0) return 0;

    // Count repos with proper documentation
    const reposWithReadme = repos.filter(
      (repo) => repo.description && repo.description.length > 10
    ).length;

    // Count non-fork projects
    const originalProjects = repos.filter((repo) => !repo.fork).length;

    // Calculate score based on originality and documentation
    return Math.min(
      100,
      Math.floor(
        (reposWithReadme / repos.length) * 50 +
          (originalProjects / repos.length) * 50
      )
    );
  };

  // Generate critical feedback based on profile analysis
  const generateCritique = (userData, repos) => {
    if (!userData || !repos) return "Insufficient data for analysis.";

    const feedback = [];

    // Critique based on bio
    if (!userData.bio) {
      feedback.push(
        "No bio? Really? How are people supposed to know what you do?"
      );
    } else if (
      userData.bio.toLowerCase().includes("mern") ||
      userData.bio.toLowerCase().includes("full stack") ||
      userData.bio.toLowerCase().includes("developer")
    ) {
      feedback.push(
        `"${userData.bio}" sounds like every other aspiring dev out there. Find a way to stand out!`
      );
    }

    // Critique based on repositories
    const reposWithoutReadme = repos.filter((repo) => !repo.description).length;
    if (reposWithoutReadme > 0) {
      feedback.push(
        `${reposWithoutReadme} repos with no proper description. Do you want people to actually use your code or just admire your directory structure?`
      );
    }

    const forks = repos.filter((repo) => repo.fork).length;
    if (forks > repos.length / 3) {
      feedback.push(
        `${forks} forks out of ${repos.length} repos. Come on! Where's the originality?`
      );
    }

    // Quality assessment
    const uniqueScore = calculateUniquenessScore(repos);
    if (uniqueScore < 40) {
      feedback.push(
        "Your projects lack uniqueness. Stop churning out basic projects and build something impressive."
      );
    } else if (uniqueScore < 70) {
      feedback.push(
        "You've got some potential, but you need to focus on quality over quantity."
      );
    } else {
      feedback.push(
        "Good job on maintaining original and well-documented projects!"
      );
    }

    return feedback.join(" ");
  };

  const uniquenessScore1 = calculateUniquenessScore(repos1);
  const uniquenessScore2 = calculateUniquenessScore(repos2);

  const critique1 = generateCritique(userData1, repos1);
  const critique2 = generateCritique(userData2, repos2);

  // Prepare chart data
  const chartData = {
    labels: ["Followers", "Following", "Public Repos", "Uniqueness"],
    datasets: [
      {
        label: userData1?.login || "User 1",
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        data: [
          userData1?.followers || 0,
          userData1?.following || 0,
          userData1?.public_repos || 0,
          uniquenessScore1,
        ],
      },
      {
        label: userData2?.login || "User 2",
        backgroundColor: "rgba(168, 85, 247, 0.7)",
        data: [
          userData2?.followers || 0,
          userData2?.following || 0,
          userData2?.public_repos || 0,
          uniquenessScore2,
        ],
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Honest Profile Assessment
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* User 1 Assessment */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div className="flex items-center mb-4">
            <img
              src={userData1?.avatar_url}
              alt={userData1?.login}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold">
                {userData1?.login || "User 1"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {userData1?.name
                  ? `Known as ${userData1.name}`
                  : "No name provided"}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Uniqueness Score</span>
              <span
                className={`text-sm font-medium ${
                  uniquenessScore1 > 70
                    ? "text-green-600 dark:text-green-400"
                    : uniquenessScore1 > 40
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {uniquenessScore1}/100
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  uniquenessScore1 > 70
                    ? "bg-green-500"
                    : uniquenessScore1 > 40
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${uniquenessScore1}%` }}
              ></div>
            </div>
          </div>

          {showCritique && (
            <div className="mt-4 p-3 bg-white dark:bg-gray-700 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="text-md font-medium mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Honest Feedback
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {critique1}
              </p>
            </div>
          )}
        </div>

        {/* User 2 Assessment */}
        <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
          <div className="flex items-center mb-4">
            <img
              src={userData2?.avatar_url}
              alt={userData2?.login}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold">
                {userData2?.login || "User 2"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {userData2?.name
                  ? `Known as ${userData2.name}`
                  : "No name provided"}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Uniqueness Score</span>
              <span
                className={`text-sm font-medium ${
                  uniquenessScore2 > 70
                    ? "text-green-600 dark:text-green-400"
                    : uniquenessScore2 > 40
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {uniquenessScore2}/100
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  uniquenessScore2 > 70
                    ? "bg-green-500"
                    : uniquenessScore2 > 40
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${uniquenessScore2}%` }}
              ></div>
            </div>
          </div>

          {showCritique && (
            <div className="mt-4 p-3 bg-white dark:bg-gray-700 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 className="text-md font-medium mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1 text-purple-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Honest Feedback
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {critique2}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Comparison Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Stats Comparison</h3>
        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 h-64">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  ticks: {
                    color: "rgb(107, 114, 128)",
                  },
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: "rgb(107, 114, 128)",
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setShowCritique(!showCritique)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          {showCritique ? "Hide Brutal Honesty" : "Show Brutal Honesty"}
        </button>
      </div>
    </div>
  );
};

export default ProfileComparison;
