import InAppLayout from "@/layouts/InAppLayout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
      <body>
        <InAppLayout>
          {children}
        </InAppLayout>
      </body>
    </html>
  );
}