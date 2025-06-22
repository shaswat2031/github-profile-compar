"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showCompareForm, setShowCompareForm] = useState(false);
  const [animateChart, setAnimateChart] = useState(false);
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setAnimateChart(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username1 && username2) {
      router.push(`/compare/results?user1=${username1}&user2=${username2}`);
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 inline-block text-transparent bg-clip-text">
          GitHub Profile Comparison
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mt-3">
          Discover who has the coding edge with data-driven developer
          comparisons
        </p>
        <nav className="mt-4">
          <ul className="flex justify-center space-x-6">
            <li>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/compare"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Compare
              </Link>
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex flex-col gap-[48px] w-full max-w-4xl items-center">
        {/* Hero Section with Enhanced Visualization */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold">
              Compare Developer Profiles Like Never Before
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Our AI-powered platform analyzes GitHub profiles to provide
              meaningful insights on developer strengths, language preferences,
              and contribution patterns.
            </p>
            <button
              onClick={() => setShowCompareForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-md transition duration-300 font-medium text-lg shadow-lg hover:shadow-xl"
            >
              Start Comparing
            </button>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 opacity-30"></div>

              {/* Animated Graph Visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full p-4 flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">A</span>
                      </div>
                      <span className="ml-2 text-sm font-semibold">DevA</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 text-sm font-semibold">DevB</span>
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">B</span>
                      </div>
                    </div>
                  </div>

                  {/* Commits Chart */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Commits</span>
                      <span>956 vs 714</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                        style={{ width: animateChart ? "65%" : "0%" }}
                      ></div>
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full bg-purple-500 transition-all duration-1000 ease-out"
                        style={{ width: animateChart ? "48%" : "0%" }}
                      ></div>
                    </div>
                  </div>

                  {/* Languages Chart */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Languages</span>
                      <span>8 vs 12</span>
                    </div>
                    <div className="flex h-3 w-full rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 transition-all duration-1000"
                        style={{ width: animateChart ? "25%" : "0%" }}
                      ></div>
                      <div
                        className="bg-blue-400 transition-all duration-1000 delay-100"
                        style={{ width: animateChart ? "15%" : "0%" }}
                      ></div>
                      <div
                        className="bg-blue-300 transition-all duration-1000 delay-200"
                        style={{ width: animateChart ? "10%" : "0%" }}
                      ></div>
                      <div
                        className="bg-blue-200 transition-all duration-1000 delay-300"
                        style={{ width: animateChart ? "15%" : "0%" }}
                      ></div>
                    </div>
                    <div className="flex h-3 w-full rounded-full overflow-hidden mt-1">
                      <div
                        className="bg-purple-600 transition-all duration-1000"
                        style={{ width: animateChart ? "20%" : "0%" }}
                      ></div>
                      <div
                        className="bg-purple-400 transition-all duration-1000 delay-100"
                        style={{ width: animateChart ? "10%" : "0%" }}
                      ></div>
                      <div
                        className="bg-purple-300 transition-all duration-1000 delay-200"
                        style={{ width: animateChart ? "25%" : "0%" }}
                      ></div>
                      <div
                        className="bg-purple-200 transition-all duration-1000 delay-300"
                        style={{ width: animateChart ? "12%" : "0%" }}
                      ></div>
                    </div>
                  </div>

                  {/* Stars Chart */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Stars Earned</span>
                      <span>237 vs 412</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                        <div
                          className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                          style={{ width: animateChart ? "58%" : "0%" }}
                        ></div>
                      </div>
                      <div className="flex mx-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-yellow-400"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                        <div
                          className="h-full bg-purple-500 transition-all duration-1000 ease-out"
                          style={{ width: animateChart ? "100%" : "0%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Showcase */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600 dark:text-blue-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Data-Driven Insights</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Compare repositories, commits, languages, and contribution
              patterns with easy-to-understand visualizations.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-600 dark:text-purple-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get intelligent assessments of developer strengths, specialties,
              and potential areas for growth.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600 dark:text-green-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Comparison</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Side-by-side profile analysis makes it simple to identify
              differences in coding habits and preferences.
            </p>
          </div>
        </div>

        {/* Sample Comparison Results Preview */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <h3 className="font-semibold text-lg">Sample Comparison Results</h3>
            <p className="text-sm opacity-90">
              See what insights you'll gain from our platform
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Radar Chart */}
              <div>
                <h4 className="font-medium mb-3">Developer Strengths</h4>
                <div className="relative h-60 w-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Radar Chart Background */}
                    <div className="w-48 h-48 rounded-full border border-gray-200 dark:border-gray-700"></div>
                    <div className="absolute w-36 h-36 rounded-full border border-gray-200 dark:border-gray-700"></div>
                    <div className="absolute w-24 h-24 rounded-full border border-gray-200 dark:border-gray-700"></div>
                    <div className="absolute w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700"></div>

                    {/* Radar Chart Lines */}
                    <div className="absolute w-48 h-1 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="absolute w-1 h-48 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="absolute w-[68px] h-1 bg-gray-200 dark:bg-gray-700 rotate-45 origin-center"></div>
                    <div className="absolute w-[68px] h-1 bg-gray-200 dark:bg-gray-700 -rotate-45 origin-center"></div>

                    {/* Developer A Radar Chart */}
                    <div
                      className={`absolute transition-opacity duration-1000 ${
                        animateChart ? "opacity-60" : "opacity-0"
                      }`}
                    >
                      <svg height="150" width="150" viewBox="0 0 100 100">
                        <polygon
                          points="50,10 65,30 90,40 70,60 70,85 50,75 30,85 30,60 10,40 35,30"
                          fill="rgba(59, 130, 246, 0.5)"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          className="transition-all duration-1000"
                          style={{
                            transform: animateChart ? "scale(1)" : "scale(0)",
                          }}
                        />
                      </svg>
                    </div>

                    {/* Developer B Radar Chart */}
                    <div
                      className={`absolute transition-opacity duration-1000 delay-300 ${
                        animateChart ? "opacity-60" : "opacity-0"
                      }`}
                    >
                      <svg height="150" width="150" viewBox="0 0 100 100">
                        <polygon
                          points="50,15 70,25 85,45 75,70 60,90 50,70 35,90 25,70 15,45 30,25"
                          fill="rgba(168, 85, 247, 0.5)"
                          stroke="#a855f7"
                          strokeWidth="2"
                          className="transition-all duration-1000 delay-300"
                          style={{
                            transform: animateChart ? "scale(1)" : "scale(0)",
                          }}
                        />
                      </svg>
                    </div>

                    {/* Labels */}
                    <span className="absolute top-0 text-xs font-medium">
                      Commits
                    </span>
                    <span className="absolute right-0 text-xs font-medium">
                      Stars
                    </span>
                    <span className="absolute bottom-0 text-xs font-medium">
                      PRs
                    </span>
                    <span className="absolute left-0 text-xs font-medium">
                      Issues
                    </span>
                    <span className="absolute top-[15%] right-[15%] text-xs font-medium">
                      Code
                    </span>
                  </div>
                </div>
              </div>

              {/* Timeline Chart */}
              <div>
                <h4 className="font-medium mb-3">Activity Timeline</h4>
                <div className="relative h-60 w-full mt-2">
                  <div className="absolute bottom-0 left-0 right-0 h-40">
                    {/* X-axis */}
                    <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-gray-200 dark:bg-gray-700"></div>
                    <div className="flex justify-between text-xs text-gray-500 absolute -bottom-5 left-0 right-0">
                      <span>Jan</span>
                      <span>Mar</span>
                      <span>May</span>
                      <span>Jul</span>
                      <span>Sep</span>
                      <span>Nov</span>
                    </div>

                    {/* Y-axis grid lines */}
                    <div className="absolute left-0 right-0 bottom-10 h-[1px] bg-gray-100 dark:bg-gray-800"></div>
                    <div className="absolute left-0 right-0 bottom-20 h-[1px] bg-gray-100 dark:bg-gray-800"></div>
                    <div className="absolute left-0 right-0 bottom-30 h-[1px] bg-gray-100 dark:bg-gray-800"></div>

                    {/* Dev A timeline */}
                    <div className="absolute left-0 bottom-0 right-0 h-40 flex items-end">
                      <div
                        className={`w-[7%] bg-blue-500 opacity-80 rounded-t transition-all duration-300 ease-out mx-[0.5%]`}
                        style={{ height: animateChart ? "20%" : "0%" }}
                      ></div>
                      <div
                        className={`w-[7%] bg-blue-500 opacity-80 rounded-t transition-all duration-300 ease-out mx-[0.5%] delay-100`}
                        style={{ height: animateChart ? "40%" : "0%" }}
                      ></div>
                      <div
                        className={`w-[7%] bg-blue-500 opacity-80 rounded-t transition-all duration-300 ease-out mx-[0.5%] delay-200`}
                        style={{ height: animateChart ? "25%" : "0%" }}
                      ></div>
                      <div
                        className={`w-[7%] bg-blue-500 opacity-80 rounded-t transition-all duration-300 ease-out mx-[0.5%] delay-300`}
                        style={{ height: animateChart ? "60%" : "0%" }}
                      ></div>
                      <div
                        className={`w-[7%] bg-blue-500 opacity-80 rounded-t transition-all duration-300 ease-out mx-[0.5%] delay-400`}
                        style={{ height: animateChart ? "45%" : "0%" }}
                      ></div>
                      <div
                        className={`w-[7%] bg-blue-500 opacity-80 rounded-t transition-all duration-300 ease-out mx-[0.5%] delay-500`}
                        style={{ height: animateChart ? "30%" : "0%" }}
                      ></div>
                    </div>

                    {/* Dev B timeline */}
                    <div className="absolute left-[50%] bottom-0 right-0 h-40 flex items-end">
                      <div
                        className={`w-[7%] bg-purple-500 opacity-80 rounded-t transition-all duration-300 ease-out mx-[0.5%]`}
                        style={{ height: animateChart ? "30%" : "0%" }}
                      ></div>
                      <div
                        className={`w-[7%] bg-purple-500 opacity-80 rounded-t transition-all duration-300 ease-out mx-[0.5%] delay-100`}
                        style={{ height: animateChart ? "20%" : "0%" }}
                      ></div>
                      <div
                        className={`w-[7%] bg-purple-500 opacity-80 rounded-t transition-all duration-300 ease-out mx-[0.5%] delay-200`}
                        style={{ height: animateChart ? "50%" : "0%" }}
                      ></div>
                      <div
                        className={`w-[7%] bg-purple-500 opacity-80 rounded-t transition-all duration-300 ease-out mx-[0.5%] delay-300`}
                        style={{ height: animateChart ? "70%" : "0%" }}
                      ></div>
                      <div
                        className={`w-[7%] bg-purple-500 opacity-80 rounded-t transition-all duration-300 ease-out mx-[0.5%] delay-400`}
                        style={{ height: animateChart ? "35%" : "0%" }}
                      ></div>
                      <div
                        className={`w-[7%] bg-purple-500 opacity-80 rounded-t transition-all duration-300 ease-out mx-[0.5%] delay-500`}
                        style={{ height: animateChart ? "55%" : "0%" }}
                      ></div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="absolute top-0 right-0 flex items-center text-xs">
                    <div className="w-3 h-3 bg-blue-500 opacity-80 rounded-sm mr-1"></div>
                    <span className="mr-3">Dev A</span>
                    <div className="w-3 h-3 bg-purple-500 opacity-80 rounded-sm mr-1"></div>
                    <span>Dev B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Form - Only shown after clicking Start Comparing button */}
        {showCompareForm && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full border-2 border-blue-200 dark:border-blue-900">
            <h2 className="text-2xl font-semibold mb-4">Compare Developers</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="username1"
                  >
                    First GitHub Username
                  </label>
                  <input
                    type="text"
                    id="username1"
                    value={username1}
                    onChange={(e) => setUsername1(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g., octocat"
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="username2"
                  >
                    Second GitHub Username
                  </label>
                  <input
                    type="text"
                    id="username2"
                    value={username2}
                    onChange={(e) => setUsername2(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g., defunkt"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 font-medium"
              >
                Compare Profiles
              </button>
            </form>
          </div>
        )}

        {/* About Section */}
        <div className="bg-blue-50 dark:bg-blue-900/30 p-8 rounded-lg shadow-md w-full">
          <h3 className="text-xl font-semibold mb-3">How It Works</h3>
          <p className="mb-4">
            Our platform uses the GitHub API to fetch comprehensive profile data
            and presents meaningful comparisons with visual charts and insights.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  1
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium">Enter Usernames</h4>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Provide two GitHub usernames you want to compare
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  2
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium">Data Processing</h4>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Our system fetches and analyzes GitHub profiles
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  3
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium">Visual Comparison</h4>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Review side-by-side visual comparisons
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  4
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium">AI Insights</h4>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Get smart analysis of developer strengths
                </p>
              </div>
            </div>
          </div>
        </div>

        {!showCompareForm && (
          <button
            onClick={() => setShowCompareForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-10 rounded-full transition duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Comparing Now
          </button>
        )}
      </main>

      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>Powered by GitHub API • Not affiliated with GitHub, Inc.</p>
        <p className="mt-1">
          © {new Date().getFullYear()} GitHub Profile Comparison
        </p>
      </footer>
    </div>
  );
}
