import '@/app/flexiable.css';
import '@/app/fonts.css';
import '@/app/globals.css';
import { BaseToaster, ThemeProvider } from '@/components';
import { dir } from '@/utils';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { inter } from './fonts';
export const metadata: Metadata = {
  title: 'telegram miniapp',
  description: 'telegram miniapp',
};

export const runtime = 'edge';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        {/* iconfont 链接 */}
        <link
          rel="stylesheet"
          href="https://cdn2.codesign.qq.com/icons/Jd0N3L8a4OAJKZA/latest/iconfont.css"
        />
        <script async={false} src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
        <BaseToaster />
      </body>
    </html>
  );
}
