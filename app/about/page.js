"use client";

import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-4 text-blue-600 dark:text-blue-300">
        About Us
      </h1>
      <p className="max-w-2xl text-lg text-gray-700 dark:text-gray-200 mb-8 text-center">
        GitHub Profile Comparison is a platform designed to help developers and
        teams analyze and compare GitHub profiles with insightful visualizations
        and AI-powered summaries. Our mission is to make developer data
        meaningful, accessible, and actionable for everyone.
      </p>
      <Link href="/" className="text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
