import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="max-w-2xl rounded-[32px] border border-gray-100 bg-white p-10 text-center shadow-[0_20px_56px_rgba(37,99,235,0.06)]">
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-primary-500">404</p>
        <h1 className="mt-4 font-heading text-[38px] font-extrabold text-gray-900">This page does not exist</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-gray-500">
          The route could not be found. Use the main navigation to return to Rooms, Doctors, Services, or Home.
        </p>
        <Link to="/" className="btn-primary mt-6 inline-flex">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
