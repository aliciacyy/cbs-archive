export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
      <div className="border-t border-gray-200 text-center py-6 text-xs text-gray-500">
        © {new Date().getFullYear()} AC. All rights reserved.
      </div>
    </footer>
  );
}
