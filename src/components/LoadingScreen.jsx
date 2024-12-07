import { ThemeProvider } from "./ThemeProvider";

const LoadingScreen = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

    <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-cyan-500"></div>
</div>
    </ThemeProvider>
  );
};

export default LoadingScreen;