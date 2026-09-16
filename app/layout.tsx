import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Niel Arthur B. Rocacurva | Associate Software Engineer & BSIT Graduate",
  description: "Portfolio of Niel Arthur B. Rocacurva - BSIT graduate from Our Lady of Fatima University, skilled in Python, SQL, Git, IoT robotics, and enterprise IT operations.",
  keywords: [
    "Niel Arthur Rocacurva",
    "Associate Software Engineer",
    "Junior Software Engineer",
    "BSIT Graduate",
    "Python Developer",
    "SQL",
    "Git",
    "AGROSENTINEL",
    "Concentrix Intern",
  ],
  authors: [{ name: "Niel Arthur B. Rocacurva" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('theme');
                if (storedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${poppins.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen selection:bg-cyan/20 selection:text-cyan`}
      >
        {children}
      </body>
    </html>
  );
}
