
import { ImageUploader } from "@/components/ImageUploader";
import { motion } from "framer-motion";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Home, Settings, Laptop, Tool } from 'lucide-react';
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer";

const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'About', url: '/about', icon: Settings },
  { name: 'Features', url: '/features', icon: Laptop },
  { name: 'Other tools', url: '/tools', icon: Tool }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <NavBar items={navItems} />
      <div className="container mx-auto px-4 py-12 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            AI-Powered
          </span>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Remove Image Backgrounds Instantly
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your image and let our AI do the magic. Get perfect results in seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ImageUploader />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Upload",
                description: "Drag & drop or click to upload your image",
                icon: "📤",
              },
              {
                title: "Process",
                description: "Our AI removes the background automatically",
                icon: "⚡",
              },
              {
                title: "Download",
                description: "Get your image with a transparent background",
                icon: "💾",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="p-6 rounded-xl bg-white shadow-sm border border-gray-100"
              >
                <div className="text-2xl mb-3">{step.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <StackedCircularFooter />
    </div>
  );
};

export default Index;
