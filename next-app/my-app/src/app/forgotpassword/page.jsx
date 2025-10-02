"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Framer Motion Variants
const cloudVariants = {
  hidden: { x: -200, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      duration: 1.5,
      ease: "easeOut"
    }
  },
  floating: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const cloudVariantsRight = {
  hidden: { x: 200, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      duration: 1.5,
      ease: "easeOut",
      delay: 0.5
    }
  },
  floating: {
    y: [0, -15, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1
    }
  }
};

const sunVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: 1,
      ease: "easeOut",
      delay: 1
    }
  },
  floating: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 2
    }
  }
};

const formVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
      delay: 0.8
    }
  }
};

export default function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { username, password });
  };

  return (
    <div className="page-container">
      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #5EA5CA 0%, #EEFFFC 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .header-container {
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }

        .logo {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(45deg, #FF6B35, #FFA500);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          color: white;
          font-size: 32px;
          font-weight: bold;
        }

        .bg-element {
          position: absolute;
          z-index: 1;
        }

        .sun {
          top: 180px;
          left: 200px;
          z-index: 2;
        }

        .cloud-left {
          top: 200px;
          left: 50px;
        }

        .cloud-right {
          top: 150px;
          right: 80px;
        }

        .cloud-top {
          top: 120px;
          right: 200px;
        }

        .cloud-bottom {
          bottom: 100px;
          left: 100px;
        }

        .main-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          z-index: 5;
        }

        .form-card {
          max-width: 400px;
          width: 100%;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 2rem;
        }

        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-title {
          font-size: 28px;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
          margin: 0;
        }

        .form-subtitle {
          color: #666;
          font-size: 14px;
          margin: 0;
        }

        .form-group {
          margin-bottom: 1.5rem;
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 12px;
          background-color: rgba(245,245,245,0.8);
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .form-input:focus {
          border-color: #1976d2;
          background-color: white;
          box-shadow: 0 0 0 3px rgba(25,118,210,0.1);
        }

        .form-input::placeholder {
          color: #999;
        }

        .password-container {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          font-size: 20px;
          padding: 4px;
        }

        .password-toggle:hover {
          color: #333;
        }

        .submit-button {
          width: 100%;
          padding: 14px;
          background: linear-gradient(45deg, #1976d2, #42a5f5);
          color: white;
          border: none;
          border-radius: 25px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 1rem;
        }

        .submit-button:hover {
          background: linear-gradient(45deg, #1565c0, #1976d2);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(25,118,210,0.4);
        }

        .forgot-link {
          text-align: center;
        }

        .forgot-link a {
          color: #1976d2;
          text-decoration: none;
          font-size: 14px;
        }

        .forgot-link a:hover {
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .form-card {
            margin: 1rem;
            padding: 1.5rem;
          }
          
          .bg-element {
            transform: scale(0.7);
          }
        }
      `}</style>

      {/* Header Logo */}
      <div className="header-container">
        <div className="logo">H</div>
      </div>

      {/* Animated Background Elements with Images */}
      <motion.div
        className="bg-element sun"
        variants={sunVariants}
        initial="hidden"
        animate={["visible", "floating"]}
      >
        <Image
          src="/images/sun.png" // Replace with your sun image path
          alt="Sun"
          width={60}
          height={60}
          style={{ filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.4))' }}
        />
      </motion.div>

      <motion.div
        className="bg-element cloud-left"
        variants={cloudVariants}
        initial="hidden"
        animate={["visible", "floating"]}
      >
        <Image
          src="/images/cloud-left.png" // Replace with your cloud image path
          alt="Cloud"
          width={120}
          height={80}
          style={{ opacity: 0.8 }}
        />
      </motion.div>

      <motion.div
        className="bg-element cloud-right"
        variants={cloudVariantsRight}
        initial="hidden"
        animate={["visible", "floating"]}
      >
        <Image
          src="/images/cloud-right.png" // Replace with your cloud image path
          alt="Cloud"
          width={100}
          height={70}
          style={{ opacity: 0.7 }}
        />
      </motion.div>

      <motion.div
        className="bg-element cloud-top"
        variants={cloudVariantsRight}
        initial="hidden"
        animate={["visible", "floating"]}
      >
        <Image
          src="/images/cloud-small.png" // Replace with your small cloud image path
          alt="Cloud"
          width={80}
          height={50}
          style={{ opacity: 0.6 }}
        />
      </motion.div>

      <motion.div
        className="bg-element cloud-bottom"
        variants={cloudVariants}
        initial="hidden"
        animate={["visible", "floating"]}
      >
        <Image
          src="/images/cloud-large.png" // Replace with your large cloud image path
          alt="Cloud"
          width={140}
          height={90}
          style={{ opacity: 0.5 }}
        />
      </motion.div>

      {/* Main Content */}
      <div className="main-content">
        <motion.div
          className="form-card"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="form-header">
            <h1 className="form-title">Great to See You Again</h1>
            <p className="form-subtitle">Let's get you set up for a great day</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-button">
              Login
            </button>

            <div className="forgot-link">
              <a href="#">Forgot Your Password?</a>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}