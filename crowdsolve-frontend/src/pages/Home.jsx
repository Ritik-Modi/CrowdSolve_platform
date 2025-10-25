import { Link } from "react-router-dom";
import {
  Users,
  Lightbulb,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import Button from "../components/common/Button";
import { motion } from "framer-motion";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                CrowdSolve
              </span>
            </Link>
            <div className="flex gap-2 sm:gap-4">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20">
        <motion.div {...fadeIn(0.1)} className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Collaborative Problem Solving Platform
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Solve Problems
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mt-2">
              Together
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            A collaborative platform where communities unite to create, discuss,
            and solve real-world challenges through collective intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/signup">
              <Button
                size="lg"
                icon={ArrowRight}
                className="shadow-lg hover:shadow-xl transition-all"
              >
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="hover:bg-gray-100">
                Sign In
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mb-24 flex flex-col items-center text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-center">
          {[
            {
              icon: Users,
              title: "Community Driven",
              desc: "Leverage the power of collective intelligence to find the best solutions for any challenge.",
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: Lightbulb,
              title: "Smart Solutions",
              desc: "Vote on the best solutions and help others discover what works through community validation.",
              color: "from-green-500 to-emerald-600",
            },
            {
              icon: TrendingUp,
              title: "Track Progress",
              desc: "Monitor problem status and watch solutions evolve in real-time as the community collaborates.",
              color: "from-purple-500 to-indigo-600",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              {...fadeIn(i * 0.15)}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 mx-auto max-w-sm"
            >
              <div
                className={`w-14 h-14 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center mb-6 shadow-md mx-auto`}
              >
                <f.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {f.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full bg-gradient-to-br from-white via-blue-50 to-indigo-50 py-20 flex flex-col items-center text-center">
        <motion.div {...fadeIn()} className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 mb-16">
            Four simple steps to solve any problem collaboratively.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
            {[
              {
                num: 1,
                title: "Post Problem",
                desc: "Share your problem with the community in detail.",
                color: "from-blue-500 to-blue-600",
              },
              {
                num: 2,
                title: "Get Solutions",
                desc: "Members propose innovative ideas and solutions.",
                color: "from-green-500 to-emerald-600",
              },
              {
                num: 3,
                title: "Vote & Discuss",
                desc: "Upvote great ideas and participate in discussions.",
                color: "from-purple-500 to-indigo-600",
              },
              {
                num: 4,
                title: "Mark Solved",
                desc: "Find and implement the best solution collaboratively.",
                color: "from-orange-500 to-red-600",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                {...fadeIn(i * 0.15)}
                className="group flex flex-col items-center max-w-xs"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${s.color} text-white rounded-3xl flex items-center justify-center text-3xl font-bold mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  {s.num}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {s.title}
                </h4>
                <p className="text-gray-600 text-base">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 mt-24 flex flex-col items-center text-center">
        <motion.div
          {...fadeIn()}
          className="bg-white rounded-3xl p-10 sm:p-14 shadow-xl border border-gray-100 w-full max-w-4xl"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Why Choose CrowdSolve?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              "Tap into collective wisdom",
              "Get diverse perspectives",
              "Vote on best solutions",
              "Build your reputation",
              "Help your community",
              "Track problem resolution",
            ].map((b, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-3 p-4 rounded-xl hover:bg-blue-50 transition-colors"
              >
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-lg text-gray-700 font-medium">{b}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section
        {...fadeIn(0.2)}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-24 text-center"
      >
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 sm:p-16 text-white shadow-2xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 mb-10 text-lg sm:text-xl max-w-2xl mx-auto">
            Join thousands of problem solvers and start making a difference
            today.
          </p>
          <Link to="/signup">
            <Button
              variant="outline"
              size="lg"
              icon={ArrowRight}
              className="bg-white text-blue-600 hover:bg-gray-50 border-0 shadow-lg hover:shadow-xl"
            >
              Create Free Account
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <p className="text-2xl font-bold text-white mb-2">CrowdSolve</p>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} CrowdSolve. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
