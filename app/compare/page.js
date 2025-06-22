"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ComparePage() {
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for user's preference in localStorage or system preference
    const isDarkMode =
      localStorage.getItem("darkMode") === "true" ||
      (!("darkMode" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setDarkMode(isDarkMode);
    updateTheme(isDarkMode);
  }, []);

  const updateTheme = (isDark) => {
    // Add or remove the dark class from the document
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Store the preference
    localStorage.setItem("darkMode", isDark);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    updateTheme(newDarkMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username1 && username2) {
      router.push(`/compare/results?user1=${username1}&user2=${username2}`);
    }
  };

  // Pre-defined popular comparisons
  const popularComparisons = [
    {
      users: ["torvalds", "gvanrossum"],
      title: "Linus Torvalds vs. Guido van Rossum",
      description: "Linux creator vs. Python creator",
      gradient: "from-blue-600 to-green-600",
    },
    {
      users: ["facebook", "google"],
      title: "Facebook vs. Google",
      description: "Compare tech giants",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      users: ["microsoft", "apple"],
      title: "Microsoft vs. Apple",
      description: "Tech titans face-off",
      gradient: "from-blue-600 to-red-500",
    },
    {
      users: ["reactjs", "vuejs"],
      title: "React vs. Vue",
      description: "Popular frontend frameworks",
      gradient: "from-cyan-500 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-slate-900 py-10 px-4 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-all duration-200"
          aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
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
            Back to Home
          </Link>

          <div className="flex items-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              <svg
                className="h-6 w-6 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z"
                />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 sm:text-5xl mb-2">
            Compare GitHub Profiles
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Enter two usernames to discover who has the coding edge
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 mb-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label
                  htmlFor="username1"
                  className="block text-md font-medium text-gray-700 dark:text-gray-200"
                >
                  First Developer
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-blue-500 dark:text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="username1"
                    value={username1}
                    onChange={(e) => setUsername1(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-3 sm:text-md border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                    placeholder="e.g., octocat"
                    required
                  />
                  {username1 && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enter the first GitHub username to compare
                </p>
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="username2"
                  className="block text-md font-medium text-gray-700 dark:text-gray-200"
                >
                  Second Developer
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-purple-500 dark:text-purple-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="username2"
                    value={username2}
                    onChange={(e) => setUsername2(e.target.value)}
                    className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 pr-12 py-3 sm:text-md border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                    placeholder="e.g., defunkt"
                    required
                  />
                  {username2 && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enter the second GitHub username to compare
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              <span className="flex-shrink mx-4 text-gray-600 dark:text-gray-400">
                VS
              </span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center py-4 px-6 border border-transparent shadow-lg text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transform hover:scale-105 transition-all duration-200"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
                Compare Profiles
              </button>
            </div>
          </form>
        </div>

        <div className="mb-10">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            Popular Comparisons
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularComparisons.map((comparison, index) => (
              <Link
                key={index}
                href={`/compare/results?user1=${comparison.users[0]}&user2=${comparison.users[1]}`}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 p-6 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${comparison.gradient}`}
                ></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {comparison.title}
                    </h4>
                    <svg
                      className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transform transition-all duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {comparison.description}
                  </p>
                  <div className="mt-4 flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {comparison.users[0]}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">vs</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                      {comparison.users[1]}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-16 text-gray-500 dark:text-gray-400 text-sm">
          <p>GitHub Profile Comparison Tool © {new Date().getFullYear()}</p>
          <p className="mt-1">
            Compare developers, analyze stats, and discover coding patterns
          </p>
        </div>
      </div>
    </div>
  );
}
