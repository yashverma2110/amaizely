import { cookies } from "next/headers";
import { setHeaders } from "@/config/AxiosService";
import { GET_USER } from "@/services/AuthService";
import UserDetailsForm from "@/components/UserDetailsForm";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function SettingsPage() {
  const cookieStore = cookies();
  const authSid = cookieStore.get('sid')?.value;
  if (authSid) {
    setHeaders({
      Cookie: `sid=${authSid}`
    })
  }

  const response = await GET_USER()

  if (!response.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 flex items-center justify-center">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Failed to load user</h2>
          <p className="text-gray-300">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  if (!response.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 flex items-center justify-center">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">User not found</h2>
          <p className="text-gray-300">Please try logging in again</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

      <div className="relative container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
            Settings
          </h1>
          <p className="text-gray-300 text-lg max-w-xl">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings Sections */}
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Profile Section */}
          <section className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Profile Information</h2>
                  <p className="text-sm text-gray-400">Update your personal details</p>
                </div>
              </div>
              
              <UserDetailsForm user={response.user} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}