"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  Calendar,
  Award,
  Code,
  Database,
  Brain,
  Globe,
  Star,
  Zap,
  Sparkles,
} from "lucide-react"

// Particle component for background effects
function Particle({ delay = 0 }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-purple-400 rounded-full"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: [0, Math.random() * 200 - 100],
        y: [0, Math.random() * 200 - 100],
      }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        delay: delay,
        ease: "easeInOut",
      }}
    />
  )
}

// Floating icons component
function FloatingIcon({ icon: Icon, delay = 0, className = "" }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 180, 360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        delay: delay,
        ease: "easeInOut",
      }}
    >
      <Icon className="w-6 h-6 text-purple-400/30" />
    </motion.div>
  )
}

// Typing animation component
function TypingText({ text, delay = 0 }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }
    }, 100 + delay)

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay])

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        className="text-purple-400"
      >
        |
      </motion.span>
    </span>
  )
}

export default function AnimatedPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Main floating orbs */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360],
            x: [0, 60, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Additional smaller orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Particle effects */}
        {[...Array(50)].map((_, i) => (
          <Particle key={i} delay={i * 0.1} />
        ))}

        {/* Floating icons */}
        <FloatingIcon icon={Code} delay={0} className="top-1/4 left-1/4" />
        <FloatingIcon icon={Database} delay={1} className="top-1/3 right-1/4" />
        <FloatingIcon icon={Brain} delay={2} className="bottom-1/3 left-1/3" />
        <FloatingIcon icon={Globe} delay={3} className="bottom-1/4 right-1/3" />
        <FloatingIcon icon={Star} delay={4} className="top-1/2 left-1/6" />
        <FloatingIcon icon={Zap} delay={5} className="top-2/3 right-1/6" />

        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent"
              style={{ left: `${(i + 1) * 5}%` }}
              animate={{
                opacity: [0, 0.5, 0],
                scaleY: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              style={{ top: `${(i + 1) * 6.67}%` }}
              animate={{
                opacity: [0, 0.3, 0],
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Experience Journey */}
      <ExperienceSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Education Section */}
      <EducationSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  )
}

function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4">
      <div className="text-center z-10">
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-blue-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent relative"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.5)",
                  "0 0 40px rgba(168, 85, 247, 0.8)",
                  "0 0 20px rgba(168, 85, 247, 0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              Imran Shaikh
            </motion.span>

            {/* Sparkle effects around name */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                }}
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
              </motion.div>
            ))}
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-2"
            animate={{
              opacity: [0.7, 1, 0.7],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            {isLoaded && <TypingText text="Full Stack Developer & Data Science Enthusiast" />}
          </motion.p>
          <motion.p
            className="text-lg text-gray-400"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            {isLoaded && <TypingText text="Crafting digital experiences with code and creativity" delay={3000} />}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex justify-center space-x-6 mb-8"
        >
          {[
            { icon: Phone, href: "tel:+919689550530", label: "+91-9689550530", color: "from-green-500 to-emerald-600" },
            { icon: Mail, href: "mailto:imranance99@gmail.com", label: "Email", color: "from-red-500 to-pink-600" },
            { icon: Linkedin, href: "#", label: "LinkedIn", color: "from-blue-500 to-cyan-600" },
            { icon: Github, href: "#", label: "GitHub", color: "from-gray-700 to-gray-900" },
          ].map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              className={`p-4 bg-gradient-to-r ${item.color} rounded-full hover:shadow-2xl transition-all duration-300 relative overflow-hidden group`}
              whileHover={{
                scale: 1.2,
                rotate: 360,
                boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
              }}
              whileTap={{ scale: 0.9 }}
              animate={{
                y: [0, -10, 0],
                boxShadow: [
                  "0 0 0px rgba(168, 85, 247, 0)",
                  "0 0 20px rgba(168, 85, 247, 0.3)",
                  "0 0 0px rgba(168, 85, 247, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.2,
              }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <item.icon className="w-6 h-6 relative z-10" />

              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.5,
                }}
              />
            </motion.a>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-gray-400"
          >
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto mb-2 relative overflow-hidden">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                className="w-1 h-3 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full mx-auto mt-2"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-400/20"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
            <motion.p
              className="text-sm"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              Scroll to explore
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: ["Python", "JavaScript", "TypeScript", "C++", "PHP"],
      color: "from-blue-400 to-purple-600",
    },
    {
      title: "Web Technologies",
      icon: Globe,
      skills: ["HTML", "CSS", "React.js", "Node.js", "Tailwind", "CodeIgniter", "Django", "Flask"],
      color: "from-green-400 to-blue-600",
    },
    {
      title: "ML & Data Science",
      icon: Brain,
      skills: ["Tableau", "PowerBI", "PyTorch", "Neural Network"],
      color: "from-purple-400 to-pink-600",
    },
    {
      title: "Database Technologies",
      icon: Database,
      skills: ["MySQL", "PostgreSQL", "Firebase", "SQL"],
      color: "from-orange-400 to-red-600",
    },
  ]

  return (
    <section ref={ref} className="py-20 px-4 relative">
      {/* Animated section background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10"
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent relative"
        >
          <motion.span
            animate={{
              textShadow: [
                "0 0 20px rgba(168, 85, 247, 0.3)",
                "0 0 40px rgba(168, 85, 247, 0.6)",
                "0 0 20px rgba(168, 85, 247, 0.3)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            Skills & Expertise
          </motion.span>

          {/* Floating decorative elements */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              whileHover={{
                scale: 1.02,
                y: -10,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 relative overflow-hidden group"
            >
              {/* Animated background gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10`}
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Animated border */}
              <motion.div
                className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-50`}
                style={{
                  background: `linear-gradient(45deg, transparent, transparent), linear-gradient(45deg, var(--tw-gradient-stops))`,
                  backgroundClip: "padding-box, border-box",
                }}
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 2 }}
              />

              <div className="flex items-center mb-6 relative z-10">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  whileHover={{
                    scale: 1.2,
                    boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
                  }}
                  className={`p-3 rounded-full bg-gradient-to-r ${category.color} mr-4 relative`}
                >
                  <category.icon className="w-6 h-6 text-white" />

                  {/* Pulsing ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/30"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                </motion.div>
                <motion.h3
                  className="text-xl font-semibold"
                  animate={{
                    color: ["#ffffff", "#a855f7", "#ffffff"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  {category.title}
                </motion.h3>
              </div>

              <div className="flex flex-wrap gap-2 relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: categoryIndex * 0.2 + skillIndex * 0.1,
                    }}
                    whileHover={{
                      scale: 1.1,
                      y: -5,
                      boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 bg-gradient-to-r ${category.color} rounded-full text-sm font-medium text-white relative overflow-hidden cursor-pointer`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10">{skill}</span>

                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: skillIndex * 0.2,
                      }}
                    />
                  </motion.span>
                ))}
              </div>

              {/* Floating particles inside card */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.8,
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Transform scroll progress to control various animations
  const timelineProgress = useTransform(scrollYProgress, [0, 1], [0, 100])

  const experiences = [
    {
      title: "Full Stack Developer Intern",
      company: "Maskottchen Technologies",
      period: "Sept 2023 - Present",
      description: [
        "Engineered an advanced diagnostic system using TypeScript and Node.js for medical professionals, improving diagnostic accuracy by 30%.",
        "Integrated cloud-based solutions on GCP, boosting workflow efficiency by 50%.",
        "Developed automation solutions for testing and reporting, enhancing the product release cycle.",
        "Designed API endpoints and tested them using Postman, ensuring seamless data integration with client applications.",
      ],
      color: "from-green-500 to-purple-500",
      icon: Database,
      position: { x: 0, y: 0 },
      milestone: "🚀 Career Launch",
    },
    {
      title: "Developer Intern",
      company: "Creative Galileo",
      period: "June 2024 - Sept 2024",
      description: [
        "Designed and developed interactive games using TypeScript and React with Cocos Creator.",
        "Collaborated with cross-functional teams to enhance the performance and functionality of educational gaming applications.",
        "Achieved a streamlined development process, improving deployment times by 20%.",
      ],
      color: "from-blue-500 to-green-500",
      icon: Code,
      position: { x: 1, y: 1 },
      milestone: "🎮 Gaming Innovation",
    },
    {
      title: "Web Developer",
      company: "Gozoop",
      period: "October 2024 – Present",
      description: [
        "Developed multiple projects and admin panels for renowned websites such as SimplyFresh, Gozoop, and Lilavati Hospital.",
        "Created an Interview Bot leveraging Python, Gemini API, and speech recognition technologies to streamline the interview process.",
        "Delivered seamless and user-friendly interfaces, improving operational efficiency and client satisfaction.",
      ],
      color: "from-purple-500 to-blue-500",
      icon: Globe,
      position: { x: 2, y: 2 },
      milestone: "💼 Professional Growth",
    },
  ]

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1])
  const journeyOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} className="py-32 px-4 relative overflow-hidden min-h-screen">
      {/* Journey Background */}
      <motion.div className="absolute inset-0 opacity-30" style={{ opacity: journeyOpacity }}>
        {/* Animated constellation background */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Journey path background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Journey Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent relative"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 30px rgba(34, 197, 94, 0.3)",
                  "0 0 60px rgba(59, 130, 246, 0.4)",
                  "0 0 30px rgba(168, 85, 247, 0.3)",
                  "0 0 30px rgba(34, 197, 94, 0.3)",
                ],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              My Professional Journey
            </motion.span>
          </motion.h2>

          {/* Journey Progress Indicator */}
          <motion.div className="w-64 h-2 bg-gray-800 rounded-full mx-auto mb-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-full"
              style={{ width: `${timelineProgress.get()}%` }}
              initial={{ width: 0 }}
            />
          </motion.div>
          <motion.p
            className="text-gray-400 text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Scroll to explore the journey • {Math.round(timelineProgress.get())}% complete
          </motion.p>
        </motion.div>

        {/* Journey Path Container */}
        <div className="relative">
          {/* Main Journey Path - Curved SVG */}
          <motion.svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 800 1200"
            style={{ opacity: journeyOpacity }}
          >
            <defs>
              <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Journey Path */}
            <motion.path
              d="M100,100 Q300,200 200,400 T400,600 Q600,700 400,900 T600,1100"
              stroke="url(#journeyGradient)"
              strokeWidth="4"
              fill="none"
              filter="url(#glow)"
              strokeDasharray="10,5"
              style={{ pathLength }}
              animate={{
                strokeDashoffset: [0, -15],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            {/* Journey Milestones on Path */}
            {experiences.map((_, index) => (
              <motion.circle
                key={index}
                cx={index === 0 ? 100 : index === 1 ? 200 : 400}
                cy={index === 0 ? 100 : index === 1 ? 400 : 900}
                r="8"
                fill="url(#journeyGradient)"
                initial={{ scale: 0 }}
                animate={{
                  scale: scrollYProgress.get() > (index + 1) * 0.25 ? [1, 1.5, 1] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            ))}
          </motion.svg>

          {/* Experience Cards Journey */}
          <div className="space-y-32">
            {experiences.map((exp, index) => {
              const cardProgress = useTransform(scrollYProgress, [index * 0.25, (index + 1) * 0.25], [0, 1])

              const cardY = useTransform(cardProgress, [0, 1], [100, 0])
              const cardOpacity = useTransform(cardProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8])
              const cardScale = useTransform(cardProgress, [0, 0.5, 1], [0.8, 1.05, 1])

              return (
                <motion.div
                  key={index}
                  style={{
                    y: cardY,
                    opacity: cardOpacity,
                    scale: cardScale,
                  }}
                  className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  {/* Journey Milestone Badge */}
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 z-20"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{
                      scale: cardProgress.get() > 0.3 ? 1 : 0,
                      rotate: cardProgress.get() > 0.3 ? 0 : -180,
                    }}
                    transition={{ duration: 0.8, type: "spring" }}
                  >
                    <div
                      className={`px-4 py-2 bg-gradient-to-r ${exp.color} rounded-full text-white text-sm font-bold shadow-lg`}
                    >
                      {exp.milestone}
                    </div>
                  </motion.div>

                  {/* Experience Card */}
                  <motion.div
                    className={`w-full max-w-lg ${index % 2 === 0 ? "mr-auto" : "ml-auto"}`}
                    whileHover={{
                      scale: 1.02,
                      rotateY: index % 2 === 0 ? 5 : -5,
                      z: 50,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-gray-900/80 backdrop-blur-lg rounded-3xl p-8 border border-gray-700 relative overflow-hidden group shadow-2xl">
                      {/* Animated Background Orb */}
                      <motion.div
                        className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r ${exp.color} rounded-full opacity-10 blur-2xl`}
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 2,
                        }}
                      />

                      {/* Floating Company Icon */}
                      <motion.div
                        className="absolute top-6 right-6"
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 1.5,
                        }}
                      >
                        <div className={`p-3 bg-gradient-to-r ${exp.color} rounded-xl shadow-lg`}>
                          <exp.icon className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>

                      {/* Timeline Connection */}
                      <motion.div
                        className={`absolute top-1/2 ${
                          index % 2 === 0 ? "-right-4" : "-left-4"
                        } w-8 h-8 bg-gradient-to-r ${exp.color} rounded-full transform -translate-y-1/2 shadow-lg`}
                        animate={{
                          scale: [1, 1.3, 1],
                          boxShadow: [
                            "0 0 0px rgba(168, 85, 247, 0.5)",
                            "0 0 20px rgba(168, 85, 247, 0.8)",
                            "0 0 0px rgba(168, 85, 247, 0.5)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.7,
                        }}
                      >
                        {/* Pulsing rings */}
                        {[...Array(3)].map((_, ringIndex) => (
                          <motion.div
                            key={ringIndex}
                            className="absolute inset-0 border-2 border-white/30 rounded-full"
                            animate={{
                              scale: [1, 2 + ringIndex * 0.5],
                              opacity: [0.5, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: index * 0.7 + ringIndex * 0.3,
                            }}
                          />
                        ))}
                      </motion.div>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Period Badge */}
                        <motion.div
                          className="flex items-center mb-4"
                          animate={{
                            x: [0, 5, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 1,
                          }}
                        >
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">{exp.period}</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h3
                          className="text-2xl font-bold mb-2 text-white"
                          animate={{
                            color: ["#ffffff", "#a855f7", "#3b82f6", "#22c55e", "#ffffff"],
                          }}
                          transition={{
                            duration: 8,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 2,
                          }}
                        >
                          {exp.title}
                        </motion.h3>

                        {/* Company */}
                        <motion.h4
                          className={`text-xl font-semibold mb-6 bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}
                          animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 1.5,
                          }}
                        >
                          {exp.company}
                        </motion.h4>

                        {/* Description */}
                        <ul className="space-y-3">
                          {exp.description.map((item, itemIndex) => (
                            <motion.li
                              key={itemIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{
                                opacity: cardProgress.get() > 0.5 ? 1 : 0,
                                x: cardProgress.get() > 0.5 ? 0 : -20,
                              }}
                              transition={{
                                duration: 0.6,
                                delay: itemIndex * 0.1,
                              }}
                              className="text-gray-300 text-sm flex items-start group/item"
                            >
                              <motion.div
                                className={`w-2 h-2 bg-gradient-to-r ${exp.color} rounded-full mt-2 mr-3 flex-shrink-0`}
                                animate={{
                                  scale: [1, 1.5, 1],
                                  rotate: [0, 180, 360],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: itemIndex * 0.5,
                                }}
                              />
                              <span className="group-hover/item:text-purple-300 transition-colors duration-300">
                                {item}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Journey Progress Indicator for this card */}
                      <motion.div
                        className="absolute bottom-4 left-4 right-4 h-1 bg-gray-800 rounded-full overflow-hidden"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: cardProgress.get() }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className={`h-full bg-gradient-to-r ${exp.color} rounded-full`}
                          style={{ width: `${cardProgress.get() * 100}%` }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Journey Completion Celebration */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: scrollYProgress.get() > 0.8 ? 1 : 0,
              scale: scrollYProgress.get() > 0.8 ? 1 : 0.8,
            }}
            transition={{ duration: 1, type: "spring" }}
          >
            <motion.div
              className="inline-block p-6 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 rounded-full mb-4"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Star className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h3
              className="text-2xl font-bold text-white mb-2"
              animate={{
                textShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.5)",
                  "0 0 40px rgba(59, 130, 246, 0.8)",
                  "0 0 20px rgba(34, 197, 94, 0.5)",
                  "0 0 20px rgba(168, 85, 247, 0.5)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              Journey Continues...
            </motion.h3>
            <p className="text-gray-400">Always learning, always growing</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const projects = [
    {
      title: "Voice Object Identification System",
      description:
        "Built a system using Python and YOLOv8 with hardware integration of Raspberry Pi 4. Achieved 70% accuracy in recognizing and interpreting surroundings to assist visually impaired individuals.",
      tech: ["Python", "YOLOv8", "Raspberry Pi 4", "Computer Vision"],
      color: "from-blue-500 to-purple-600",
    },
    {
      title: "Breast Cancer Detection System",
      description:
        "Developed an end-to-end solution using Django and React. Created three user profiles (Doctor, Admin, User) to streamline the detection and diagnostic process with image annotation capabilities.",
      tech: ["Django", "React", "Medical Imaging", "Machine Learning"],
      color: "from-pink-500 to-red-600",
    },
  ]

  return (
    <section ref={ref} className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent"
        >
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -10 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 group"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: index * 2 }}
                className={`w-12 h-12 bg-gradient-to-r ${project.color} rounded-xl mb-6 flex items-center justify-center`}
              >
                <ExternalLink className="w-6 h-6 text-white" />
              </motion.div>

              <h3 className="text-xl font-bold mb-4 group-hover:text-purple-400 transition-colors">{project.title}</h3>

              <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + techIndex * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1 bg-gradient-to-r ${project.color} rounded-full text-sm font-medium text-white`}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EducationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
        >
          Education & Certifications
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-6 flex items-center justify-center"
            >
              <Award className="w-6 h-6 text-white" />
            </motion.div>

            <h3 className="text-xl font-bold mb-2">B.Tech - Computer Science & Engineering</h3>
            <p className="text-purple-400 font-semibold mb-2">Specialization: Data Science</p>
            <p className="text-gray-300 mb-2">DY Patil International University, Pune</p>
            <p className="text-gray-400 text-sm mb-4">Aug 2020 – July 2024</p>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-green-400">8.64</span>
              <span className="text-gray-400 ml-2">/10 CGPA</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          >
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl mb-6 flex items-center justify-center"
            >
              <Award className="w-6 h-6 text-white" />
            </motion.div>

            <h3 className="text-xl font-bold mb-4">Certifications</h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4"
            >
              <h4 className="font-semibold text-white">Azure AI Fundamental AI-900</h4>
              <p className="text-blue-100 text-sm mt-1">Microsoft Azure Certification</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          Let's Connect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-300 mb-12"
        >
          Ready to bring your ideas to life? Let's collaborate!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8"
        >
          <motion.a
            href="mailto:imranance99@gmail.com"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            <span>imranance99@gmail.com</span>
          </motion.a>

          <motion.a
            href="tel:+919689550530"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 bg-gradient-to-r from-green-600 to-blue-600 px-8 py-4 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300"
          >
            <Phone className="w-5 h-5" />
            <span>+91-9689550530</span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-gray-400">© 2024 Imran Shaikh. Crafted with passion and code.</p>
        </motion.div>
      </div>
    </section>
  )
}
