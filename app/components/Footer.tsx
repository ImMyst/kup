export default function Footer() {
  return (
    <p className="flex items-center space-x-1 pt-4 justify-center text-xs text-gray-600">
      <span>Made with ❤️ by</span>
      <a
        className="text-blue-500 underline"
        href="https://twitter.com/ImMyst_"
        rel="noreferrer"
        target={"_blank"}
      >
        @ImMyst
      </a>
      <span>- {new Date().getFullYear()}</span>
    </p>
  );
}
