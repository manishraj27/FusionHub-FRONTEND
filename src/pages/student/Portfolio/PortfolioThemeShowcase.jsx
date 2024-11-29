import { motion, AnimatePresence } from 'framer-motion';

const ThemePreview = ({ theme, isActive }) => {
  const themeStyles = {
    minimalist: {
      background: 'bg-gray-50',
      text: 'text-gray-800',
      accent: 'bg-gray-200',
      title: 'text-gray-900 font-light',
      border: isActive ? 'border-4 border-blue-500' : 'border border-transparent'
    },
    modern: {
      background: 'bg-gradient-to-br from-blue-100 to-purple-100',
      text: 'text-gray-700',
      accent: 'bg-blue-500',
      title: 'text-blue-900 font-semibold',
      border: isActive ? 'border-4 border-purple-500' : 'border border-transparent'
    },
    classic: {
      background: 'bg-white border-2 border-gray-100',
      text: 'text-gray-700',
      accent: 'bg-neutral-200',
      title: 'text-neutral-900 font-serif',
      border: isActive ? 'border-4 border-neutral-500' : 'border border-transparent'
    },
    cyberpunk: {
      background: 'bg-gray-900',
      text: 'text-green-400',
      accent: 'bg-purple-600',
      title: 'text-cyan-300 font-mono',
      border: isActive ? 'border-4 border-green-500' : 'border border-transparent'
    },
    pastel: {
      background: 'bg-pink-50',
      text: 'text-pink-800',
      accent: 'bg-pink-200',
      title: 'text-pink-900 font-rounded',
      border: isActive ? 'border-4 border-pink-500' : 'border border-transparent'
    },
    futuristic: {
      background: 'bg-gradient-to-r from-black to-gray-700',
      text: 'text-teal-400',
      accent: 'bg-teal-600',
      title: 'text-teal-300 font-extrabold',
      border: isActive ? 'border-4 border-teal-500' : 'border border-transparent'
    },
    vintage: {
      background: 'bg-yellow-50',
      text: 'text-gray-800',
      accent: 'bg-yellow-300',
      title: 'text-gray-800 font-serif italic',
      border: isActive ? 'border-4 border-yellow-600' : 'border border-transparent'
    },
    darkElegance: {
      background: 'bg-gray-800',
      text: 'text-white',
      accent: 'bg-indigo-900',
      title: 'text-indigo-400 font-light',
      border: isActive ? 'border-4 border-indigo-600' : 'border border-transparent'
    },
    neon: {
      background: 'bg-black',
      text: 'text-pink-400',
      accent: 'bg-yellow-500',
      title: 'text-lime-400 font-mono',
      border: isActive ? 'border-4 border-pink-600' : 'border border-transparent'
    }
  };

  const currentTheme = themeStyles[theme] || themeStyles.minimalist;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isActive ? 1 : 0.6, 
        scale: isActive ? 1.05 : 1,
        transition: { duration: 0.3 }
      }}
      className={`
        ${currentTheme.background} 
        ${currentTheme.border}
        rounded-xl shadow-lg p-6 
        transform transition-all duration-300 
        relative overflow-hidden
      `}
    >
      {isActive && (
        <motion.div 
          layoutId="theme-highlight"
          className="absolute top-0 right-0 m-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs"
        >
          Selected
        </motion.div>
      )}
      <div className="flex flex-col space-y-4">
        <h2 className={`text-2xl ${currentTheme.title}`}>
          {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme
        </h2>
        <div className={`h-2 w-16 ${currentTheme.accent} rounded-full`}></div>
        <p className={`${currentTheme.text}`}>
          Experience a {theme} portfolio design that reflects your unique style and personality.
        </p>
        <div className="flex space-x-2">
          <div className={`w-8 h-8 rounded-full ${currentTheme.accent}`}></div>
          <div className={`w-8 h-8 rounded-full ${currentTheme.accent} opacity-70`}></div>
          <div className={`w-8 h-8 rounded-full ${currentTheme.accent} opacity-40`}></div>
        </div>
      </div>
    </motion.div>
  );
};

const PortfolioThemeShowcase = ({ currentTheme }) => {
  const themes = ['minimalist', 'modern', 'classic', 'cyberpunk', 'pastel', 'futuristic', 'vintage', 'darkElegance', 'neon'];


  return (
    <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <AnimatePresence>
        {themes.map((theme, index) => (
          <ThemePreview 
            key={theme} 
            theme={theme} 
            isActive={theme === currentTheme}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioThemeShowcase;