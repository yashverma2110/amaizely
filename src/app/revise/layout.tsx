import InAppLayout from "@/layouts/InAppLayout";

export default function DeckLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-200">
        <InAppLayout>
          {children}
        </InAppLayout>
      </body>
    </html>
  );
}