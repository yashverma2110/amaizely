export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="blob-bg h-1/2 w-full md:w-3/4 md:scale-150 fixed -top-[20%] -right-[25%]" />
      {children}
    </>
  );
}