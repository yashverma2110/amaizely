import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import InAppLayout from "@/layouts/InAppLayout";

export default function DeckLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();

  if (!cookieStore.get('sid')?.value) {
    redirect('/login')
  }

  return (
    <html lang="en">
      <body className="in-app-layout">
        <InAppLayout>
          {children}
        </InAppLayout>
      </body>
    </html>
  );
}