import ChatInterface from './components/ChatInterface';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-4xl w-full h-[600px] sm:h-[700px] flex flex-col">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Crypto Financial Advisor</h1>
          <p className="text-gray-300">Get AI-powered advice on sustainable and profitable crypto investments</p>
        </div>
        
        <div className="flex-1">
          <ChatInterface />
        </div>
        
        <style>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default App;

// this code is the root component that sets up the main layout and includes the ChatInterface component.