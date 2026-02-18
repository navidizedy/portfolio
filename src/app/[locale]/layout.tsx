import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";
import { readFileSync } from "fs";
import { join } from "path";

const locales = ["en", "fa"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();

  const filePath = join(process.cwd(), "src", "messages", `${locale}.json`);
  const messages = JSON.parse(readFileSync(filePath, "utf-8"));

  const isRTL = locale === "fa";

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <div
          dir={isRTL ? "rtl" : "ltr"}
          style={isRTL ? { fontFamily: "Tahoma, sans-serif" } : undefined}
        >
          {children}
        </div>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
