'use client'
export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-16 h-16 border-4 border-dark-blue border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
