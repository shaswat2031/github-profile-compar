import { useEffect, useState } from "react";
import { Bar, Line, Radar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import RepoQualityScore from "./RepoQualityScore";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AdvancedStats({
  userData1,
  userData2,
  repos1,
  repos2,
  contributions1,
  contributions2,
  languages1,
  languages2,
}) {
  const [topRepos1, setTopRepos1] = useState([]);
  const [topRepos2, setTopRepos2] = useState([]);
  const [repoSizeData, setRepoSizeData] = useState(null);
  const [comparisonMetrics, setComparisonMetrics] = useState(null);
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData1 && userData2 && repos1 && repos2) {
      analyzeData();
      setLoading(false);
    }
  }, [userData1, userData2, repos1, repos2]);

  const analyzeData = () => {
    // Find top repositories by stars
    const sortedRepos1 = [...repos1].sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    );
    const sortedRepos2 = [...repos2].sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    );

    setTopRepos1(sortedRepos1.slice(0, 3));
    setTopRepos2(sortedRepos2.slice(0, 3));

    // Calculate repository size metrics
    const repoSizes1 = repos1.map((repo) => repo.size);
    const repoSizes2 = repos2.map((repo) => repo.size);

    const avgSize1 =
      repoSizes1.reduce((acc, size) => acc + size, 0) / repos1.length;
    const avgSize2 =
      repoSizes2.reduce((acc, size) => acc + size, 0) / repos2.length;

    setRepoSizeData({
      labels: ["Average Repository Size (KB)"],
      datasets: [
        {
          label: userData1.login,
          data: [avgSize1],
          backgroundColor: "rgba(59, 130, 246, 0.6)",
          borderColor: "rgb(59, 130, 246)",
          borderWidth: 1,
        },
        {
          label: userData2.login,
          data: [avgSize2],
          backgroundColor: "rgba(168, 85, 247, 0.6)",
          borderColor: "rgb(168, 85, 247)",
          borderWidth: 1,
        },
      ],
    });

    // Calculate and compare various metrics
    const metrics = [
      {
        name: "Repositories",
        user1Value: userData1.public_repos,
        user2Value: userData2.public_repos,
        winner:
          userData1.public_repos > userData2.public_repos
            ? 1
            : userData1.public_repos < userData2.public_repos
            ? 2
            : 0,
      },
      {
        name: "Followers",
        user1Value: userData1.followers,
        user2Value: userData2.followers,
        winner:
          userData1.followers > userData2.followers
            ? 1
            : userData1.followers < userData2.followers
            ? 2
            : 0,
      },
      {
        name: "Following",
        user1Value: userData1.following,
        user2Value: userData2.following,
        winner:
          userData1.following > userData2.following
            ? 1
            : userData1.following < userData2.following
            ? 2
            : 0,
      },
      {
        name: "Contributions",
        user1Value: contributions1?.totalContributions || 0,
        user2Value: contributions2?.totalContributions || 0,
        winner:
          (contributions1?.totalContributions || 0) >
          (contributions2?.totalContributions || 0)
            ? 1
            : (contributions1?.totalContributions || 0) <
              (contributions2?.totalContributions || 0)
            ? 2
            : 0,
      },
      {
        name: "Repo Size",
        user1Value: avgSize1.toFixed(0) + " KB",
        user2Value: avgSize2.toFixed(0) + " KB",
        winner: avgSize1 > avgSize2 ? 1 : avgSize1 < avgSize2 ? 2 : 0,
      },
      {
        name: "Languages Used",
        user1Value: languages1.length,
        user2Value: languages2.length,
        winner:
          languages1.length > languages2.length
            ? 1
            : languages1.length < languages2.length
            ? 2
            : 0,
      },
    ];

    setComparisonMetrics(metrics);

    // Determine overall winner
    const user1Wins = metrics.filter((m) => m.winner === 1).length;
    const user2Wins = metrics.filter((m) => m.winner === 2).length;

    if (user1Wins > user2Wins) {
      setWinner({
        user: userData1.login,
        score: `${user1Wins}-${user2Wins}`,
        message: `${userData1.login} wins in ${user1Wins} out of ${metrics.length} categories!`,
      });
    } else if (user2Wins > user1Wins) {
      setWinner({
        user: userData2.login,
        score: `${user2Wins}-${user1Wins}`,
        message: `${userData2.login} wins in ${user2Wins} out of ${metrics.length} categories!`,
      });
    } else {
      setWinner({
        user: "Tie",
        score: `${user1Wins}-${user2Wins}`,
        message: "Both developers are evenly matched!",
      });
    }
  };

  if (loading) {
    return <div>Loading advanced statistics...</div>;
  }

  return (
    <div className="space-y-12">
      {/* Winner announcement */}
      {winner && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl shadow-lg text-center animate-pulse-slow">
          <h3 className="text-2xl font-bold mb-2">
            Detailed Comparison Result
          </h3>
          <p className="text-lg">{winner.message}</p>
          <div className="mt-4 flex justify-center items-center">
            <span className="text-2xl font-bold">{userData1.login}</span>
            <span className="mx-3 text-xl">{winner.score}</span>
            <span className="text-2xl font-bold">{userData2.login}</span>
          </div>
        </div>
      )}

      {/* Detailed metrics comparison table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gray-100 dark:bg-slate-700 p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Detailed Metrics Comparison
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Metric
                </th>
                <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {userData1.login}
                </th>
                <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Winner
                </th>
                <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {userData2.login}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {comparisonMetrics &&
                comparisonMetrics.map((metric, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? "bg-white dark:bg-slate-800"
                        : "bg-gray-50 dark:bg-slate-700/30"
                    }
                  >
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">
                      {metric.name}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-300 text-center font-mono">
                      {metric.user1Value}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {metric.winner === 0 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                          Tie
                        </span>
                      ) : metric.winner === 1 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          {userData1.login}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          {userData2.login}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-300 text-center font-mono">
                      {metric.user2Value}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top repositories grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User 1's top repos */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-100 dark:bg-blue-900/40 p-4">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">
              {userData1.login}'s Top Repositories
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {topRepos1.length > 0 ? (
              topRepos1.map((repo) => (
                <div
                  key={repo.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 dark:text-blue-400 text-lg hover:underline block mb-2"
                  >
                    {repo.name}
                  </a>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {repo.description || "No description provided"}
                  </p>
                  <div className="flex flex-wrap gap-2 items-center text-sm text-gray-500 dark:text-gray-400">
                    {repo.language && (
                      <span className="flex items-center">
                        <span className="h-3 w-3 rounded-full bg-blue-500 mr-1"></span>
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      {repo.stargazers_count} stars
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {repo.forks_count} forks
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                No repositories found
              </div>
            )}
          </div>
        </div>

        {/* User 2's top repos */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-purple-100 dark:bg-purple-900/40 p-4">
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">
              {userData2.login}'s Top Repositories
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {topRepos2.length > 0 ? (
              topRepos2.map((repo) => (
                <div
                  key={repo.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                >
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-purple-600 dark:text-purple-400 text-lg hover:underline block mb-2"
                  >
                    {repo.name}
                  </a>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {repo.description || "No description provided"}
                  </p>
                  <div className="flex flex-wrap gap-2 items-center text-sm text-gray-500 dark:text-gray-400">
                    {repo.language && (
                      <span className="flex items-center">
                        <span className="h-3 w-3 rounded-full bg-purple-500 mr-1"></span>
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      {repo.stargazers_count} stars
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {repo.forks_count} forks
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                No repositories found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Repository Size Comparison */}
      {repoSizeData && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Repository Size Comparison
          </h3>
          <div className="h-64">
            <Bar
              data={repoSizeData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                    labels: {
                      color: "rgb(107, 114, 128)",
                    },
                  },
                  title: {
                    display: true,
                    text: "Average Repository Size (KB)",
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
      )}
    </div>
  );
}
