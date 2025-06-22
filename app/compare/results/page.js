"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AdvancedStats from "../../../components/AdvancedStats";
import DarkModeToggle from "../../../components/DarkModeToggle";
import ProfileComparison from "../../../components/ProfileComparison";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
} from "chart.js";
import { Bar, Radar, Doughnut, Line } from "react-chartjs-2";
import Typewriter from "typewriter-effect";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement
);

// Loading component to show while data is fetching
function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
        <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-100">
          Loading profiles...
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          This may take a few moments
        </p>
      </div>
    </div>
  );
}

// The main component wrapper with Suspense
export default function ComparisonResultsWrapper() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ComparisonResults />
    </Suspense>
  );
}

// Actual implementation moved to inner component
function ComparisonResults() {
  const searchParams = useSearchParams();
  const user1 = searchParams.get("user1");
  const user2 = searchParams.get("user2");

  const [userData1, setUserData1] = useState(null);
  const [userData2, setUserData2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showHarshComparison, setShowHarshComparison] = useState(false);

  // Extra stats
  const [repos1, setRepos1] = useState([]);
  const [repos2, setRepos2] = useState([]);
  const [contributions1, setContributions1] = useState(null);
  const [contributions2, setContributions2] = useState(null);
  const [languages1, setLanguages1] = useState([]);
  const [languages2, setLanguages2] = useState([]);
  const [activityData1, setActivityData1] = useState([]);
  const [activityData2, setActivityData2] = useState([]);

  useEffect(() => {
    if (!user1 || !user2) {
      setError("User information is missing");
      setLoading(false);
      return;
    }

    async function fetchUserData() {
      try {
        // Fetch basic user data
        const [userRes1, userRes2] = await Promise.all([
          fetch(`https://api.github.com/users/${user1}`),
          fetch(`https://api.github.com/users/${user2}`),
        ]);

        if (!userRes1.ok || !userRes2.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData1 = await userRes1.json();
        const userData2 = await userRes2.json();
        setUserData1(userData1);
        setUserData2(userData2);

        // Fetch repositories
        const [repoRes1, repoRes2] = await Promise.all([
          fetch(
            `https://api.github.com/users/${user1}/repos?per_page=100&sort=updated`
          ),
          fetch(
            `https://api.github.com/users/${user2}/repos?per_page=100&sort=updated`
          ),
        ]);

        if (repoRes1.ok && repoRes2.ok) {
          const reposData1 = await repoRes1.json();
          const reposData2 = await repoRes2.json();
          setRepos1(reposData1);
          setRepos2(reposData2);

          // Process language data
          const langs1 = getLanguageStats(reposData1);
          const langs2 = getLanguageStats(reposData2);
          setLanguages1(langs1);
          setLanguages2(langs2);

          // Generate simulated activity data (in a real app, you'd get this from the GitHub API)
          setActivityData1(generateSimulatedActivityData());
          setActivityData2(generateSimulatedActivityData());
        }

        // Attempt to fetch contributions data (Note: this may require authentication)
        try {
          // This is simulated as the real API requires authentication
          setContributions1({
            totalContributions:
              userData1.public_repos * 10 + Math.floor(Math.random() * 100),
            lastYear: Math.floor(userData1.public_repos * 10 * 0.7),
            thisMonth: Math.floor(userData1.public_repos * 0.8),
          });

          setContributions2({
            totalContributions:
              userData2.public_repos * 10 + Math.floor(Math.random() * 100),
            lastYear: Math.floor(userData2.public_repos * 10 * 0.6),
            thisMonth: Math.floor(userData2.public_repos * 0.7),
          });
        } catch (error) {
          console.warn(
            "Could not fetch contribution data (requires authentication):",
            error
          );
        }

        // Generate AI summary
        generateAISummary(userData1, userData2);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          "An error occurred while fetching user data. Please try again."
        );
        setLoading(false);
      }
    }

    fetchUserData();
  }, [user1, user2]);

  // Function to simulate AI-generated summary based on the profile data
  const generateAISummary = (user1Data, user2Data) => {
    const score1 = calculateScore(user1Data);
    const score2 = calculateScore(user2Data);

    let summary = `Based on the analysis of ${user1Data.login} and ${user2Data.login}'s GitHub profiles, `;

    if (score1 > score2) {
      summary += `${user1Data.login} appears to have a higher overall activity score of ${score1} compared to ${user2Data.login}'s ${score2}. `;
      summary += `${user1Data.login} has more public repositories (${user1Data.public_repos} vs ${user2Data.public_repos}) and `;

      if (user1Data.followers > user2Data.followers) {
        summary += `more followers (${user1Data.followers} vs ${user2Data.followers}). `;
      } else {
        summary += `fewer followers (${user1Data.followers} vs ${user2Data.followers}). `;
      }
    } else {
      summary += `${user2Data.login} appears to have a higher overall activity score of ${score2} compared to ${user1Data.login}'s ${score1}. `;
      summary += `${user2Data.login} has more public repositories (${user2Data.public_repos} vs ${user1Data.public_repos}) and `;

      if (user2Data.followers > user1Data.followers) {
        summary += `more followers (${user2Data.followers} vs ${user1Data.followers}). `;
      } else {
        summary += `fewer followers (${user2Data.followers} vs ${user1Data.followers}). `;
      }
    }

    summary += `Both developers show strong GitHub presence with active contribution patterns. `;
    summary += `${user1Data.login} has been on GitHub since ${new Date(
      user1Data.created_at
    ).getFullYear()}, `;
    summary += `while ${user2Data.login} joined in ${new Date(
      user2Data.created_at
    ).getFullYear()}.`;

    if (languages1.length > 0 && languages2.length > 0) {
      summary += ` ${user1Data.login}'s primary language appears to be ${languages1[0][0]}, `;
      summary += `while ${user2Data.login} works most frequently with ${languages2[0][0]}.`;
    }

    setAiSummary(summary);
  };

  const calculateScore = (user) => {
    if (!user) return 0;
    // Enhanced scoring algorithm
    return (
      (user.followers || 0) * 2 +
      (user.public_repos || 0) * 5 +
      (user.public_gists || 0) * 2 +
      Math.floor(
        (new Date() - new Date(user.created_at)) / (1000 * 60 * 60 * 24 * 30)
      ) // Months active
    );
  };

  const getLanguageStats = (repos) => {
    const languages = {};
    repos.forEach((repo) => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });
    return Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  // Generate simulated activity data for charts
  const generateSimulatedActivityData = () => {
    return [
      Math.floor(Math.random() * 40) + 10,
      Math.floor(Math.random() * 40) + 10,
      Math.floor(Math.random() * 40) + 10,
      Math.floor(Math.random() * 40) + 10,
      Math.floor(Math.random() * 40) + 20,
      Math.floor(Math.random() * 40) + 20,
      Math.floor(Math.random() * 40) + 20,
      Math.floor(Math.random() * 40) + 30,
      Math.floor(Math.random() * 40) + 30,
      Math.floor(Math.random() * 40) + 30,
      Math.floor(Math.random() * 40) + 30,
      Math.floor(Math.random() * 40) + 30,
    ];
  };

  // Prepare language chart data
  const prepareLanguageChartData = () => {
    const labels = Array.from(
      new Set([
        ...languages1.map(([lang]) => lang),
        ...languages2.map(([lang]) => lang),
      ])
    ).slice(0, 7); // limit to 7 languages

    const user1Data = labels.map((label) => {
      const found = languages1.find(([lang]) => lang === label);
      return found ? found[1] : 0;
    });

    const user2Data = labels.map((label) => {
      const found = languages2.find(([lang]) => lang === label);
      return found ? found[1] : 0;
    });

    return {
      labels,
      datasets: [
        {
          label: user1,
          data: user1Data,
          backgroundColor: "rgba(59, 130, 246, 0.5)",
          borderColor: "rgb(59, 130, 246)",
          borderWidth: 1,
        },
        {
          label: user2,
          data: user2Data,
          backgroundColor: "rgba(168, 85, 247, 0.5)",
          borderColor: "rgb(168, 85, 247)",
          borderWidth: 1,
        },
      ],
    };
  };

  // Prepare activity data chart
  const prepareActivityChartData = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return {
      labels: months,
      datasets: [
        {
          label: user1,
          data: activityData1,
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
          tension: 0.3,
        },
        {
          label: user2,
          data: activityData2,
          borderColor: "rgb(168, 85, 247)",
          backgroundColor: "rgba(168, 85, 247, 0.1)",
          fill: true,
          tension: 0.3,
        },
      ],
    };
  };

  const prepareRadarChartData = () => {
    if (!userData1 || !userData2) return null;

    // Extract metrics for radar chart
    const score1 = calculateScore(userData1);
    const score2 = calculateScore(userData2);

    const normalizeValue = (value, maxVal) => (value / maxVal) * 100;

    const maxFollowers = Math.max(
      userData1.followers || 0,
      userData2.followers || 0,
      1
    );
    const maxRepos = Math.max(
      userData1.public_repos || 0,
      userData2.public_repos || 0,
      1
    );
    const maxGists = Math.max(
      userData1.public_gists || 0,
      userData2.public_gists || 0,
      1
    );
    const maxScore = Math.max(score1, score2, 1);

    return {
      labels: [
        "Followers",
        "Repositories",
        "Gists",
        "Activity Score",
        "Contributions",
      ],
      datasets: [
        {
          label: user1,
          data: [
            normalizeValue(userData1.followers || 0, maxFollowers),
            normalizeValue(userData1.public_repos || 0, maxRepos),
            normalizeValue(userData1.public_gists || 0, maxGists),
            normalizeValue(score1, maxScore),
            normalizeValue(
              contributions1?.totalContributions || 0,
              Math.max(
                contributions1?.totalContributions || 0,
                contributions2?.totalContributions || 0,
                1
              )
            ),
          ],
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          borderColor: "rgb(59, 130, 246)",
          pointBackgroundColor: "rgb(59, 130, 246)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(59, 130, 246)",
        },
        {
          label: user2,
          data: [
            normalizeValue(userData2.followers || 0, maxFollowers),
            normalizeValue(userData2.public_repos || 0, maxRepos),
            normalizeValue(userData2.public_gists || 0, maxGists),
            normalizeValue(score2, maxScore),
            normalizeValue(
              contributions2?.totalContributions || 0,
              Math.max(
                contributions1?.totalContributions || 0,
                contributions2?.totalContributions || 0,
                1
              )
            ),
          ],
          backgroundColor: "rgba(168, 85, 247, 0.2)",
          borderColor: "rgb(168, 85, 247)",
          pointBackgroundColor: "rgb(168, 85, 247)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(168, 85, 247)",
        },
      ],
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-100">
            Loading profiles...
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            This may take a few moments
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center px-4">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-100">
            Error
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Calculate scores
  const score1 = calculateScore(userData1);
  const score2 = calculateScore(userData2);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="fixed top-4 right-4 z-10">
        <DarkModeToggle />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/compare"
            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Back to Compare
          </Link>

          <div className="flex items-center space-x-3">
            <a
              href={`https://github.com/${user1}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              @{user1}
            </a>
            <span className="text-gray-400">vs</span>
            <a
              href={`https://github.com/${user2}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 dark:text-purple-400 hover:underline text-sm"
            >
              @{user2}
            </a>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 sm:text-4xl">
            GitHub Profile Comparison
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Detailed analysis and insights
          </p>
        </div>

        {/* AI summary card with typing animation */}
        <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-6 mb-8 border border-blue-100 dark:border-blue-900">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <svg
                className="h-6 w-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <span>AI Analysis Summary</span>
                <span className="ml-2 inline-block h-4 w-4 bg-blue-600 rounded-full animate-pulse"></span>
              </h2>
              <div className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                <Typewriter
                  options={{
                    strings: [aiSummary],
                    autoStart: true,
                    loop: false,
                    delay: 50,
                    deleteSpeed: 20,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* "No sugar coating" toggle button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowHarshComparison(!showHarshComparison)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-md hover:from-red-600 hover:to-pink-600 transition-colors"
          >
            {showHarshComparison
              ? "Back to Polite Comparison"
              : "No Sugar Coating, Please!"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Conditionally show the harsh comparison component */}
        {showHarshComparison && (
          <ProfileComparison
            user1={user1}
            user2={user2}
            userData1={userData1}
            userData2={userData2}
            repos1={repos1}
            repos2={repos2}
          />
        )}

        {/* Battle banner - showing who has higher score */}
        <div className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 text-white text-center">
            <h2 className="text-2xl font-bold">Developer Comparison Results</h2>
            <div className="mt-4 flex items-center justify-center">
              <div className="text-center px-4">
                <img
                  src={userData1.avatar_url}
                  alt={userData1.login}
                  className={`h-20 w-20 rounded-full border-4 ${
                    score1 > score2
                      ? "border-yellow-400 animate-pulse"
                      : "border-white"
                  }`}
                />
                <div className="mt-2 font-bold">{userData1.login}</div>
                <div className="text-2xl font-extrabold">{score1}</div>
              </div>

              <div className="mx-6 text-4xl font-bold">VS</div>

              <div className="text-center px-4">
                <img
                  src={userData2.avatar_url}
                  alt={userData2.login}
                  className={`h-20 w-20 rounded-full border-4 ${
                    score2 > score1
                      ? "border-yellow-400 animate-pulse"
                      : "border-white"
                  }`}
                />
                <div className="mt-2 font-bold">{userData2.login}</div>
                <div className="text-2xl font-extrabold">{score2}</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-lg font-semibold">
                {score1 === score2 ? (
                  <span>It's a tie! Both developers have equal scores.</span>
                ) : (
                  <span>
                    <span className="text-yellow-300 font-bold">
                      {score1 > score2 ? userData1.login : userData2.login}
                    </span>{" "}
                    wins by {Math.abs(score1 - score2)} points!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Basic profile comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden">
            <div className="bg-blue-600 p-4">
              <h2 className="text-xl font-bold text-white">
                {userData1.login}'s Profile
              </h2>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-6">
                <img
                  src={userData1.avatar_url}
                  alt={`${userData1.login}'s avatar`}
                  className="h-24 w-24 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {userData1.name || userData1.login}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {userData1.bio || "No bio available"}
                  </p>
                  <a
                    href={userData1.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm mt-1 inline-block"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {userData1.public_repos}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Repositories
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {userData1.followers}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Followers
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {userData1.following}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Following
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {score1}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Activity Score
                  </div>
                </div>
              </div>

              {contributions1 && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Contributions
                  </h4>
                  <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-lg flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Total
                    </span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {contributions1.totalContributions}
                    </span>
                  </div>
                  <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-lg flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Last year
                    </span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {contributions1.lastYear}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden">
            <div className="bg-purple-600 p-4">
              <h2 className="text-xl font-bold text-white">
                {userData2.login}'s Profile
              </h2>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-6">
                <img
                  src={userData2.avatar_url}
                  alt={`${userData2.login}'s avatar`}
                  className="h-24 w-24 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {userData2.name || userData2.login}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {userData2.bio || "No bio available"}
                  </p>
                  <a
                    href={userData2.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 dark:text-purple-400 hover:underline text-sm mt-1 inline-block"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-purple-50 dark:bg-slate-700 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {userData2.public_repos}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Repositories
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-slate-700 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {userData2.followers}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Followers
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-slate-700 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {userData2.following}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Following
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-slate-700 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {score2}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Activity Score
                  </div>
                </div>
              </div>

              {contributions2 && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Contributions
                  </h4>
                  <div className="bg-purple-50 dark:bg-slate-700 p-3 rounded-lg flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Total
                    </span>
                    <span className="font-semibold text-purple-600 dark:text-purple-400">
                      {contributions2.totalContributions}
                    </span>
                  </div>
                  <div className="bg-purple-50 dark:bg-slate-700 p-3 rounded-lg flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Last year
                    </span>
                    <span className="font-semibold text-purple-600 dark:text-purple-400">
                      {contributions2.lastYear}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Advanced stats button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-all duration-200"
          >
            {showDetails ? (
              <>
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                Hide Detailed Analysis
              </>
            ) : (
              <>
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                Show Detailed Analysis
              </>
            )}
          </button>
        </div>

        {/* Advanced stats section */}
        {showDetails && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Detailed Profile Analysis
            </h2>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Language Comparison Chart */}
              {languages1.length > 0 && languages2.length > 0 && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Programming Languages
                  </h3>
                  <Bar
                    data={prepareLanguageChartData()}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                          labels: {
                            color: "rgb(107, 114, 128)",
                          },
                        },
                        title: {
                          display: true,
                          text: "Repository Language Distribution",
                          color: "rgb(107, 114, 128)",
                        },
                      },
                      scales: {
                        x: {
                          ticks: {
                            color: "rgb(107, 114, 128)",
                          },
                          grid: {
                            color: "rgba(107, 114, 128, 0.1)",
                          },
                        },
                        y: {
                          ticks: {
                            color: "rgb(107, 114, 128)",
                          },
                          grid: {
                            color: "rgba(107, 114, 128, 0.1)",
                          },
                        },
                      },
                    }}
                  />
                </div>
              )}

              {/* Radar Chart */}
              {prepareRadarChartData() && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Overall Performance
                  </h3>
                  <Radar
                    data={prepareRadarChartData()}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                          labels: {
                            color: "rgb(107, 114, 128)",
                          },
                        },
                      },
                      scales: {
                        r: {
                          beginAtZero: true,
                          max: 100,
                          ticks: {
                            color: "rgb(107, 114, 128)",
                          },
                          grid: {
                            color: "rgba(107, 114, 128, 0.1)",
                          },
                          angleLines: {
                            color: "rgba(107, 114, 128, 0.1)",
                          },
                          pointLabels: {
                            color: "rgb(107, 114, 128)",
                          },
                        },
                      },
                    }}
                  />
                </div>
              )}

              {/* Activity Line Chart */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Monthly Activity Comparison
                </h3>
                <Line
                  data={prepareActivityChartData()}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                        labels: {
                          color: "rgb(107, 114, 128)",
                        },
                      },
                      title: {
                        display: true,
                        text: "Estimated Monthly Contributions",
                        color: "rgb(107, 114, 128)",
                      },
                    },
                    scales: {
                      x: {
                        ticks: {
                          color: "rgb(107, 114, 128)",
                        },
                        grid: {
                          color: "rgba(107, 114, 128, 0.1)",
                        },
                      },
                      y: {
                        ticks: {
                          color: "rgb(107, 114, 128)",
                        },
                        grid: {
                          color: "rgba(107, 114, 128, 0.1)",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            <AdvancedStats
              userData1={userData1}
              userData2={userData2}
              repos1={repos1}
              repos2={repos2}
              contributions1={contributions1}
              contributions2={contributions2}
              languages1={languages1}
              languages2={languages2}
            />
          </div>
        )}

        <div className="mt-12 text-center">
          <button
            onClick={() => (window.location.href = "/compare")}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-900 transition-all duration-200"
          >
            Compare Different Profiles
          </button>
        </div>
      </div>
    </div>
  );
}
