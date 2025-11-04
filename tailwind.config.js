/** @type {import('tailwindcss').Config} */
module.exports = {
  // 프로젝트 내의 모든 JSX/JS 파일을 스캔하여 Tailwind 클래스를 찾도록 설정
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  
  // 💡 다크 모드를 수동으로 .dark 클래스를 사용해 제어하도록 설정
  darkMode: 'class', 

  theme: {
    // 💡 extend를 사용하여 Tailwind의 기본 설정을 유지하면서 새로운 설정을 추가합니다.
    extend: {
      // 🎨 index.css의 CSS 변수를 Tailwind 클래스로 인식하도록 설정
      colors: {
        // HSL 값을 사용하여 index.css의 CSS 변수를 참조합니다.
        'background': 'hsl(var(--background))', 
        'foreground': 'hsl(var(--foreground))',
        'border': 'hsl(var(--border))', // 👈 이 부분이 border-border 오류를 해결합니다.
        'input': 'hsl(var(--input))',
        'ring': 'hsl(var(--ring))',
        'card': 'hsl(var(--card))',
        'primary': 'hsl(var(--primary))', 
        'secondary': 'hsl(var(--secondary))',
        'muted': 'hsl(var(--muted))',
        'accent': 'hsl(var(--accent))',
        'destructive': 'hsl(var(--destructive))',
        'popover': 'hsl(var(--popover))',

        // Sidebar 관련 색상 추가 (index.css에 정의된 변수)
        'sidebar': 'hsl(var(--sidebar))',
        'sidebar-foreground': 'hsl(var(--sidebar-foreground))',
        'sidebar-primary': 'hsl(var(--sidebar-primary))',
        'sidebar-accent': 'hsl(var(--sidebar-accent))',
      },
      
      // 🔠 커스텀 폰트 변수 추가 (index.css의 --font-sans 변수 사용)
      fontFamily: {
        'sans': ['var(--font-sans)'],
        'serif': ['var(--font-serif)'],
        'mono': ['var(--font-mono)'],
      },

      // 🖼️ 커스텀 그림자 변수 추가 (index.css의 --shadow 변수 사용)
      boxShadow: {
        '2xs': 'var(--shadow-2xs)',
        'xs': 'var(--shadow-xs)',
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
      },
      
      // 📐 커스텀 Border Radius (index.css의 --radius 변수 사용)
      borderRadius: {
        'lg': 'var(--radius)',
        'md': 'calc(var(--radius) - 2px)',
        'sm': 'calc(var(--radius) - 4px)',
      }
    },
  },
  plugins: [],
};