import "./globals.css";

export const metadata = {
  title: "Simple Student Management System",
  description: "For CPSY300 Lab 1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-thin antialiased`}>
        {children}
      </body>
    </html>
  );
}
