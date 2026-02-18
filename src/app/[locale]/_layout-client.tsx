"use client";

import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export default function LocaleLayout({
  children,
  params,
  messages,
}: {
  children: React.ReactNode;
  params: { locale: string };
  messages: Record<string, unknown>;
}) {
  const isRTL = params.locale === "fa";

  return (
    <html
      lang={params.locale}
      dir={isRTL ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={isRTL ? "font-persian" : ""}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <NextIntlClientProvider locale={params.locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
