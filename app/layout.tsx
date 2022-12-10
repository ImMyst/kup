import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <head />
      <body className="my-8 max-w-md mx-auto vsc-initialized">{children}</body>
    </html>
  );
}
