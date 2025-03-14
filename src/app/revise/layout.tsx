import ReviseLayout from "@/layouts/ReviseLayout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function DeckLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();

  return (
    <html lang="en">
      <body>
        <ReviseLayout>
          {children}
        </ReviseLayout>
      </body>
    </html>
  );
}