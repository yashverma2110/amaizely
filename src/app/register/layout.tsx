export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="internal-layout">
        <div className="blob-bg h-1/2 w-full md:w-3/4 md:scale-150 fixed -top-[20%] -right-[25%]" />
        {children}
      </body>
    </html>
  );
}