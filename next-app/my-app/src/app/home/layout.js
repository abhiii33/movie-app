export default function HomeLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="bg-zinc-500"
      >
        {children}
      </body>
    </html>
  );
}