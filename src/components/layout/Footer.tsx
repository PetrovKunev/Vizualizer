export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="flex items-center justify-center">
        <span className="text-sm text-gray-600">
          © {currentYear} - Algorithm Visualizer -{' '}
          <a 
            href="https://kunev.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 transition-colors"
          >
            kunev.dev
          </a>
        </span>
      </div>
    </footer>
  );
} 