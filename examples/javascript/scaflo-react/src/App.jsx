import "./globals.css";
import "./output.css";
const App = () => {
    return (
      <div className="flex flex-col min-h-screen bg-white text-gray-800 text-center">
        <div className="flex-grow flex flex-col p-3 mx-auto w-full max-w-4xl">
          <header className="mb-10">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Scaflo</h3>
              <nav>
                <a
                  href="https://github.com/sponsors/swapnesh839"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-2 px-4 rounded-full text-green-600 border border-green-600 hover:text-white hover:bg-green-600 transition-colors duration-200"
                >
                  ❤️ Sponsor
                </a>
              </nav>
            </div>
          </header>
  
          <main className="px-3">
            <img
              src="https://avatars.githubusercontent.com/u/131942441?v=4"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-lg"
            />
            <h1 className="text-4xl font-bold mb-3">🚀 Welcome to Scaflo</h1>
            <p className="text-xl mb-10 text-gray-600">
              Simplify your development workflow with our powerful scaffolding
              tool.
            </p>
  
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-4xl mb-4 text-green-600">⚡</div>
                <h4 className="text-xl font-bold mb-2">Fast Setup</h4>
                <p className="text-gray-600">
                  Quickly scaffold your projects with pre-configured templates.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-4xl mb-4 text-green-600">🛠️</div>
                <h4 className="text-xl font-bold mb-2">Customizable</h4>
                <p className="text-gray-600">
                  Tailor your project structure to fit your specific needs.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-4xl mb-4 text-green-600">🚀</div>
                <h4 className="text-xl font-bold mb-2">Boost Productivity</h4>
                <p className="text-gray-600">
                  Focus on coding, not on setting up project structures.
                </p>
              </div>
            </div>
  
            <div className="border-t border-gray-200 my-10"></div>
  
            <div className="py-10">
              <h2 className="text-3xl font-bold mb-6">Get Started with Scaflo</h2>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://github.com/swapnesh839/Scaflo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-3 px-6 rounded-full bg-green-600 text-white font-bold hover:bg-green-700 transition-colors duration-200"
                >
                  View on GitHub
                </a>
                <a
                  href="https://www.npmjs.com/package/@scaflo/scaflo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-3 px-6 rounded-full border border-green-600 text-green-600 font-bold hover:bg-green-600 hover:text-white transition-colors duration-200"
                >
                  npm Package
                </a>
              </div>
            </div>
  
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">
                We&apos;d Love to Hear from You!
              </h3>
              <p className="text-gray-600 mb-4">
                Thank you for using Scaflo. Your feedback is invaluable to us.
              </p>
              <a
                href="https://github.com/scaflo/Scaflo/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors duration-200"
              >
                Share Your Feedback
              </a>
            </div>
          </main>
  
          <footer className="mt-auto py-6 text-gray-600">
            <p>
              Created with ❤️ by
              <a
                href="https://github.com/swapnesh839"
                className="font-bold text-green-600 hover:underline ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                swapnesh839
              </a>
            </p>
          </footer>
        </div>
      </div>
    );
  };
  
  export default App;
  