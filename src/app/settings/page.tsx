import { cookies } from "next/headers";
import { setHeaders } from "@/config/AxiosService";
import { GET_USER } from "@/services/AuthService";
import UserDetailsForm from "@/components/UserDetailsForm";
import GenerationSettings from "@/components/GenerationSettings";

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
    return <div>Failed to load user</div>
  }

  if (!response.user) {
    return <div>User not found</div>
  }

  return (
    <main className="p-4 flex flex-col gap-4">
      <section className="user-details-form card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Profile:</h2>
          <UserDetailsForm user={response.user} />
        </div>
      </section>
    </main>
  );
}