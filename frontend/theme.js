// color design tokens export
export const tokensDark = {
    grey: {
      0: "#ffffff", // manually adjusted
      10: "#f6f6f6", // manually adjusted
      50: "#f0f0f0", // manually adjusted
      100: "#e0e0e0",
      200: "#c2c2c2",
      300: "#a3a3a3",
      400: "#858585",
      500: "#666666",
      600: "#525252",
      700: "#3d3d3d",
      800: "#292929",
      900: "#141414",
      1000: "#000000", // manually adjusted
    },
    primary: {
      // blue
      100: "#d3d4de",
      200: "#a6a9be",
      300: "#7a7f9d",
      400: "#4d547d",
      500: "#21295c",
      600: "#191F45", // manually adjusted
      700: "#141937",
      800: "#0d1025",
      900: "#070812",
    },
    secondary: {
      // yellow
      50: "#f0f0f0", // manually adjusted
      100: "#fff6e0",
      200: "#ffedc2",
      300: "#ffe3a3",
      400: "#ffda85",
      500: "#ffd166",
      600: "#cca752",
      700: "#997d3d",
      800: "#665429",
      900: "#332a14",
    },
    monthlyBadge: {
      jan: { bg: "#EEF2FF",bg2: "#6466F1",  text: "#262626" },   // Indigo bg, white text
      feb: { bg: "#EFFDFA",bg2: "#15B8A6", text: "#262626" },   // Teal bg, white text
      mar: { bg: "#FFF7ED", bg2: "#F97315",text: "#262626" },   // Orange bg, white text
      apr: { bg: "#EFF6FF", bg2: "#3C82F6",text: "#262626" },   // Blue bg, white text
      may: { bg: "#FDF2F8",bg2: "#EC4899", text: "#262626" },   // Pink bg, white text
      jun: { bg: "#FAF5FF",bg2: "#A855F7", text: "#262626" },   // Purple bg, white text
    },
    interestColors: {
      teal: {
        main: "#14B8A6",     // Teal
        light: "#CCFBF1",
      },
      orange: {
        main: "#F97316",     // Orange
        light: "#FFEDD5",
      },
      purple: {
        main: "#8B5CF6",     // Violet
        light: "#EDE9FE",
      },
      rose: {
        main: "#F43F5E",     // Rose
        light: "#FFE4E6",
      },
      cyan: {
        main: "#06B6D4",     // Cyan
        light: "#CFFAFE",
      },
      lime: {
        main: "#84CC16",     // Lime
        light: "#ECFCCB",
      },
      amber: {
        main: "#F59E0B",     // Amber
        light: "#FEF3C7",
      },
      sky: {
        main: "#0EA5E9",     // Sky blue
        light: "#E0F2FE",
      },
    }   

  };
  
  // function that reverses the color palette
  function reverseTokens(tokensDark) {
    const reversedTokens = {};
    Object.entries(tokensDark).forEach(([key, val]) => {
      const keys = Object.keys(val);
      const values = Object.values(val);
  
      const length = keys.length;
   
      const reversedObj = {};
      for (let i = 0; i < length; i++) {
        // console.log(length)
        // console.log(values)
        // console.log(values[length - i - 1])
        reversedObj[keys[i]] = values[length - i - 1];
      }
      reversedTokens[key] = reversedObj;
    });
    return reversedTokens;
  }
  export const tokensLight = reverseTokens(tokensDark);
  
  // mui theme settings
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
            monthlyBadge: {
              ...tokensDark.monthlyBadge,
            },
              // palette values for dark mode
              primary: {
                ...tokensDark.primary,
                main: tokensDark.primary[400],
                light: tokensDark.primary[400],
              },
              secondary: {
                ...tokensDark.secondary,
                main: tokensDark.secondary[300],
              },
              neutral: {
                ...tokensDark.grey,
                main: tokensDark.grey[500],
              },
              background: {
                default: tokensDark.primary[600],
                alt: tokensDark.primary[500],
              },
              interestColors: {
                ...tokensDark.interestColors,
              }
            }
          : {
            monthlyBadge: {
              ...tokensLight.monthlyBadge,
            },
              // palette values for light mode
              primary: {
                ...tokensLight.primary,
                main: tokensDark.grey[50],
                light: tokensDark.grey[100],
              },
              secondary: {
                ...tokensLight.secondary,
                main: tokensDark.secondary[600],
                light: tokensDark.secondary[700],
              },
              neutral: {
                ...tokensLight.grey,
                main: tokensDark.grey[500],
              },
              background: {
                default: tokensDark.grey[0],
                alt: tokensDark.grey[50],
              },
              interestColors: {
                ...tokensDark.interestColors, // same colors for light mode
              }
            }),
      },
      typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };
  