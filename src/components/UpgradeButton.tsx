"use client";

export default function UpgradeButton() {
  return (
    <button
      className="rounded-md bg-blue-600 text-white px-4 py-2"
      onClick={() => alert("Stripe checkout comes next")}
    >
      Upgrade
    </button>
  );
}
