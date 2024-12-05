// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { Loader2 } from 'lucide-react';
// import { Card } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
// import { useTheme } from './ThemeProvider';

import { ThemeProvider } from "./ThemeProvider";


// const LoadingScreen = () => {
//   const { theme } = useTheme(); 
//   const logoRef = useRef(null);
//   const progressRef = useRef(null);

//   useEffect(() => {
//     // Logo animation
//     gsap.fromTo(
//       logoRef.current,
//       { 
//         opacity: 0, 
//         scale: 0.8,
//         y: 20 
//       },
//       { 
//         opacity: 1, 
//         scale: 1,
//         y: 0,
//         duration: 0.8,
//         ease: 'power3.out'
//       }
//     );

//     // Progress bar animation
//     const progressTimeline = gsap.timeline({ repeat: -1 });
//     progressTimeline.to(progressRef.current, {
//       '--progress': '100%',
//       duration: 2,
//       ease: 'power2.inOut'
//     });

//     return () => {
//       progressTimeline.kill();
//     };
//   }, []);

//   // Theme-specific gradient
//   const gradientClasses = theme === 'dark'
//     ? 'from-purple-400 to-blue-400'
//     : 'from-purple-600 to-blue-600';

//   return (
//     <div className={`
//       fixed inset-0 z-50 flex items-center justify-center 
//       ${theme === 'dark' 
//         ? 'bg-gradient-to-b from-background/80 to-background/50 text-white' 
//         : 'bg-gradient-to-b from-gray-100 to-gray-50 text-black'
//       }
//     `}>
//       <Card className={`
//         w-full max-w-md p-8 text-center 
//         ${theme === 'dark' 
//           ? 'bg-background/70 backdrop-blur-sm border-neutral-800' 
//           : 'bg-white/70 backdrop-blur-sm border-neutral-200 shadow-lg'}
//       `}>
//         <div 
//           ref={logoRef} 
//           className="flex justify-center items-center mb-6"
//         >
//           <h1 className={`
//             text-3xl font-bold bg-clip-text text-transparent 
//             bg-gradient-to-r ${gradientClasses}
//           `}>
//             FusionHub
//           </h1>
//         </div>

//         <div className="flex justify-center items-center mb-4">
//           <Loader2 className={`
//             h-8 w-8 animate-spin 
//             ${theme === 'dark' ? 'text-primary' : 'text-purple-600'}
//           `} />
//         </div>

//         <p className={`
//           mb-4 
//           ${theme === 'dark' ? 'text-muted-foreground' : 'text-gray-600'}
//         `}>
//           Initializing your workspace...
//         </p>

//         <div className="w-full">
//           <Progress 
//             ref={progressRef}
//             value={33} 
//             className={`
//               w-full h-2 
//               ${theme === 'dark' 
//                 ? 'bg-neutral-800' 
//                 : 'bg-gray-200'}
//             `}
//           />
//         </div>
//       </Card>

//       {/* Floating Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className={`
//           absolute top-0 left-1/4 w-72 h-72 rounded-full filter blur-3xl animate-pulse
//           ${theme === 'dark' 
//             ? 'bg-purple-500/10' 
//             : 'bg-purple-300/20'}
//         `} />
//         <div className={`
//           absolute bottom-0 right-1/4 w-72 h-72 rounded-full filter blur-3xl animate-pulse
//           ${theme === 'dark' 
//             ? 'bg-blue-500/10' 
//             : 'bg-blue-300/20'}
//         `} />
//       </div>
//     </div>
//   );
// };

// export default LoadingScreen;


// import  { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { Loader2 } from 'lucide-react';
// import { Card } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';

// const LoadingScreen = () => {
//   const logoRef = useRef(null);
//   const progressRef = useRef(null);

//   useEffect(() => {
//     // Logo animation
//     gsap.fromTo(
//       logoRef.current,
//       { 
//         opacity: 0, 
//         scale: 0.8,
//         y: 20 
//       },
//       { 
//         opacity: 1, 
//         scale: 1,
//         y: 0,
//         duration: 0.8,
//         ease: 'power3.out'
//       }
//     );

//     // Progress bar animation
//     const progressTimeline = gsap.timeline({ repeat: -1 });
//     progressTimeline.to(progressRef.current, {
//       '--progress': '100%',
//       duration: 2,
//       ease: 'power2.inOut'
//     });

//     return () => {
//       progressTimeline.kill();
//     };
//   }, []);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b">
//       <Card className="w-full max-w-md p-8 text-center ">
//         <div 
//           ref={logoRef} 
//           className="flex justify-center items-center mb-6"
//         >
//           <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
//             FusionHub
//           </h1>
//         </div>

//         <div className="flex justify-center items-center mb-4">
//           <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
//         </div>

//         <p className="mb-4 text-gray-600">
//           Initializing your project workspace...
//         </p>

//         <div className="w-full">
//           <Progress 
//             ref={progressRef}
//             value={33} 
//             className="w-full h-2 "
//           />
//         </div>
//       </Card>

//       {/* Floating Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-300/20 rounded-full filter blur-3xl animate-pulse" />
//         <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-300/20 rounded-full filter blur-3xl animate-pulse" />
//       </div>
//     </div>
//   );
// };

// export default LoadingScreen;
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



