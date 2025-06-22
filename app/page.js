"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showCompareForm, setShowCompareForm] = useState(false);
  const [animateChart, setAnimateChart] = useState(false);
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isHovering, setIsHovering] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setAnimateChart(true);
    }, 500);

    // Check for user's preference in localStorage or system preference
    const isDarkMode =
      localStorage.getItem("darkMode") === "true" ||
      (!("darkMode" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setDarkMode(isDarkMode);
    updateTheme(isDarkMode);

    return () => clearTimeout(timer);
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

  // Testimonials to add social proof
  const testimonials = [
    {
      text: "This tool helped me identify areas where I need to improve my GitHub contributions.",
      author: "Sarah L.",
      role: "Full-stack Developer",
    },
    {
      text: "Perfect for comparing team performance and recognizing top contributors.",
      author: "Michael T.",
      role: "Engineering Manager",
    },
    {
      text: "Intuitive visualizations that make GitHub stats actually meaningful!",
      author: "Jason K.",
      role: "Data Scientist",
    },
  ];

  // Features info for the enhanced design
  const features = [
    {
      icon: (
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
      ),
      title: "Data-Driven Insights",
      description:
        "Compare repositories, commits, languages, and contribution patterns with easy-to-understand visualizations.",
    },
    {
      icon: (
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
      ),
      title: "AI Analysis",
      description:
        "Get intelligent assessments of developer strengths, specialties, and potential areas for growth.",
    },
    {
      icon: (
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
      ),
      title: "Easy Comparison",
      description:
        "Side-by-side profile analysis makes it simple to identify differences in coding habits and preferences.",
    },
  ];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white dark:bg-gray-900 transition-colors duration-300">
      <header className="w-full text-center relative">
        <div className="absolute top-1 right-1">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-all duration-200"
            aria-label={
              darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
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

        <div className="relative inline-block mb-2">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 inline-block text-transparent bg-clip-text">
            GitHub Profile Comparison
          </h1>
          <div className="absolute -top-4 -right-8 rotate-12">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-xs text-white px-2 py-1 rounded-lg font-bold shadow-md">
              NEW!
            </div>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-lg mt-3">
          Discover who has the coding edge with data-driven developer
          comparisons
        </p>
        <nav className="mt-6">
          <ul className="flex justify-center space-x-6">
            <li>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                href="/compare"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 relative group"
              >
                Compare
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 relative group"
              >
                GitHub
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex flex-col gap-[48px] w-full max-w-4xl items-center">
        {/* Hero Section with Enhanced Visualization */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Compare Developer Profiles <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Like Never Before
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Our AI-powered platform analyzes GitHub profiles to provide
              meaningful insights on developer strengths, language preferences,
              and contribution patterns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowCompareForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-8 rounded-md transition duration-300 font-medium text-lg shadow-lg hover:shadow-xl flex items-center justify-center group"
              >
                Start Comparing
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <Link
                href="/compare"
                className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white py-3 px-8 rounded-md transition duration-300 font-medium text-lg border border-gray-300 dark:border-gray-600 shadow-sm flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative h-64 w-full overflow-hidden rounded-xl shadow-xl">
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

              {/* Added decorative elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-yellow-400 opacity-40 blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-purple-500 opacity-40 blur-xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>

        {/* User Count Banner */}
        <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white/20 p-3 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div className="text-white">
              <p className="text-sm font-medium opacity-90">
                Growing Developer Community
              </p>
              <p className="text-2xl font-bold">50,000+ Profiles Compared</p>
            </div>
          </div>
          <div className="hidden md:flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br ${
                  i % 5 === 0
                    ? "from-blue-400 to-blue-600"
                    : i % 5 === 1
                    ? "from-purple-400 to-purple-600"
                    : i % 5 === 2
                    ? "from-green-400 to-green-600"
                    : i % 5 === 3
                    ? "from-yellow-400 to-yellow-600"
                    : "from-red-400 to-red-600"
                } flex items-center justify-center text-xs font-bold text-white`}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-600 flex items-center justify-center text-xs font-bold text-white">
              +45k
            </div>
          </div>
        </div>

        {/* Features Showcase - Enhanced with hover effects */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1 group relative overflow-hidden"
              onMouseEnter={() => setIsHovering(index)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <div
                className={`absolute top-0 left-0 w-2 h-full transition-all duration-300 ${
                  index === 0
                    ? "bg-blue-500"
                    : index === 1
                    ? "bg-purple-500"
                    : "bg-green-500"
                } ${isHovering === index ? "opacity-100" : "opacity-0"}`}
              ></div>

              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials - New Section */}
        <div className="w-full">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            What Users Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 relative"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="mb-4 text-gray-600 dark:text-gray-300 italic">
                  "{testimonial.text}"
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Comparison Results Preview */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
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
          <div className="w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border-2 border-blue-200 dark:border-blue-900 relative">
            <button
              onClick={() => setShowCompareForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close form"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Compare Developer Profiles
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Enter GitHub usernames to start the comparison
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="username1"
                  >
                    First GitHub Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400 dark:text-gray-500"
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., octocat"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                    First developer to compare
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="username2"
                  >
                    Second GitHub Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400 dark:text-gray-500"
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., defunkt"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                    Second developer to compare
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                <span className="flex-shrink mx-4 font-medium">VS</span>
                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-md transition duration-300 font-medium text-lg flex items-center justify-center"
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

              <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                <p>Profiles are compared using GitHub's public API</p>
              </div>
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
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-10 rounded-full transition duration-300 font-medium text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center"
          >
            Start Comparing Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </main>

      <footer className="w-full mt-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap justify-center space-x-6 mb-4">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
              >
                Contact
              </a>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Powered by GitHub API • Not affiliated with GitHub, Inc.
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} GitHub Profile Comparison
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
