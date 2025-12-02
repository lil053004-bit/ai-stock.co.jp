/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // New neutral gray-blue theme
        'dark-primary': '#0f172a',
        'dark-secondary': '#1e293b',
        'dark-tertiary': '#334155',
        'slate-primary': '#475569',
        'slate-secondary': '#64748b',
        'slate-light': '#94a3b8',
        'slate-lighter': '#cbd5e1',
        'slate-pale': '#e2e8f0',
        'accent-amber': '#f59e0b',
        'accent-amber-light': '#fbbf24',
        'accent-emerald': '#10b981',
        'accent-emerald-light': '#34d399',
        'text-light': '#f8fafc',
        'text-muted': '#cbd5e1',
        'border-subtle': '#475569',
        // Legacy colors for backward compatibility
        'gold': '#f59e0b',
        'gold-dark': '#d97706',
        'label-green': '#10b981',
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        'slate-gradient': 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
        'slate-gradient-hover': 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)',
        'amber-gradient': 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
        'emerald-gradient': 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        'neutral-radial': 'radial-gradient(circle, rgba(100, 116, 139, 0.2), transparent)',
      },
      boxShadow: {
        'slate-glow': '0 0 20px rgba(100, 116, 139, 0.3)',
        'slate-glow-lg': '0 0 40px rgba(100, 116, 139, 0.4)',
        'amber-glow': '0 0 15px rgba(245, 158, 11, 0.4)',
        'emerald-glow': '0 0 15px rgba(16, 185, 129, 0.4)',
      },
      animation: {
        'pulse-red': 'pulse-red 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-rotate': 'float-rotate 4s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.3s ease-in',
      },
      keyframes: {
        'pulse-red': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(220, 38, 38, 0.5)' },
          '50%': { opacity: 0.8, boxShadow: '0 0 40px rgba(220, 38, 38, 0.8)' },
        },
        'float-rotate': {
          '0%, 100%': { transform: 'rotate(0deg) translateY(0)' },
          '50%': { transform: 'rotate(5deg) translateY(-10px)' },
        },
        'fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      fontFamily: {
        'title': ['HYYaKuHeiW', 'Noto Sans JP', 'sans-serif'],
        'subtitle': ['Adobe Heiti Std', 'Hiragino Sans', 'sans-serif'],
      },
      spacing: {
        '7.5': '30px',
      },
      borderRadius: {
        'modern-xl': '20px',
        'modern-lg': '16px',
        'modern-md': '12px',
      },
    },
  },
  plugins: [],
};
