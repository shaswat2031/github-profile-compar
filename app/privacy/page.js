"use client";

import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-4 text-blue-600 dark:text-blue-300">
        Privacy Policy
      </h1>
      <div className="max-w-2xl text-gray-700 dark:text-gray-200 mb-8 text-left space-y-4">
        <p>
          <strong>Effective Date:</strong> July 8, 2025
        </p>
        <p>
          We value your privacy. GitHub Profile Comparison does not store or
          share your personal data. All profile data is fetched directly from
          the GitHub public API and is not retained on our servers.
        </p>
        <p>
          We do not use cookies or tracking technologies for advertising
          purposes. Any information you provide via our contact form is used
          solely to respond to your inquiry.
        </p>
        <p>
          For questions about our privacy practices, please contact us at{" "}
          <a
            href="mailto:prasadshaswat9265@gmail.com"
            className="text-blue-500 underline"
          >
            prasadshaswat9265@gmail.com
          </a>
          .
        </p>
      </div>
      <Link href="/" className="text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
