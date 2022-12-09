export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-200 cursor-pointer hover:bg-gray-300 transition-colors active:bg-gray-300/80 text-gray-600 inline-block px-3 py-1 font-semibold rounded-full text-xs">
      {children}
    </div>
  );
}
