import AuthLayout from "@/layouts/AuthLayouts";

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="internal-layout">
        <AuthLayout>
          {children}
        </AuthLayout>
      </body>
    </html>
  );
}