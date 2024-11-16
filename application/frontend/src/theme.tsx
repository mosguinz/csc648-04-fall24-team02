// theme.js
import { extendTheme } from "@chakra-ui/react"
// import "@fontsource/bubblegum-sans"

const disabledStyles = {
  _disabled: {
    backgroundColor: "ui.main",
  },
}

const theme = extendTheme({
  colors: {
    ui: {
      main: "#F48FB1",
      secondary: "#EDF2F7",
      success: "#48BB78",
      danger: "#E53E3E",
      light: "#FAFAFA",
      darkPink: "#b68296",
      darkSlate: "#252D3D",
      dim: "#A0AEC0",
      pastelGreen: "#80ef80",
      softPink: "#F8C8DC",
      orange: "#f7bd52",
      red: "#E32727",
      cream: "#fceaba",
      purple: "#c3baf7",
      green: "#a5d061",
      eggshell: "#FFF5EE",

    },
  },
  fonts: {
    heading: "'Bubblegum Sans', cursive",
    body: "'Bubblegum Sans', cursive",

  },
  styles: {
    global: {
      body: {
        bgColor: "ui.softPink",
        bgImage: "/assets/images/clear-cherry-blossom-falling.gif",
        bgSize: "cover",
        bgRepeat: "no-repeat",
        bgPosition: "center center",
        color: "ui.darkPink",
        overflowX: "hidden",
      },
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          backgroundColor: "ui.main",
          color: "ui.cream",
          _hover: {
            backgroundColor: "ui.orange",
          },
          _disabled: {
            ...disabledStyles,
            _hover: {
              ...disabledStyles,
            },
          },
        },
        danger: {
          backgroundColor: "ui.danger",
          color: "ui.light",
          _hover: {
            backgroundColor: "ui.red",
          },
        },
      },
    },
    Tabs: {
      variants: {
        enclosed: {
          tab: {
            _selected: {
              color: "ui.pastelGreen",
            },
          },
        },
      },
    },
  },
})

export default theme