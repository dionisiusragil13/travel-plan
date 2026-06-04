// app/(auth)/layout.tsx

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex pt-10 justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-center text-3xl font-bold mb-8">
          My Travel App
        </h1>
        {children}
      </div>
    </div>
  );
}