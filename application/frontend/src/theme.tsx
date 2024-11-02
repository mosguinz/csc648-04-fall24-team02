// theme.js
import { extendTheme } from "@chakra-ui/react"
import "@fontsource/bubblegum-sans"

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
      dark: "#b68296",
      darkSlate: "#252D3D",
      dim: "#A0AEC0",
      pastelGreen: "#80ef80",
    },
  },
  fonts: {
    heading: "'Bubblegum Sans', cursive",
    body: "'Bubblegum Sans', cursive",

  },
  styles: {
    global: {
      body: {
        bgColor: "#F8C8DC",
        bgImage: "/assets/images/clear-cherry-blossom-falling.gif",
        bgSize: "cover",
        bgRepeat: "no-repeat",
        bgPosition: "center center",
        color: "#b68296",
        overflowX: "hidden",
      },
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          backgroundColor: "ui.main",
          color: "#fceaba",
          _hover: {
            backgroundColor: "#f7bd52",
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
            backgroundColor: "#E32727",
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
