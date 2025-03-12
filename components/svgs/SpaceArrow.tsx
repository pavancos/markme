import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SpaceArrow = (props: SvgProps) => (
  <Svg
    width={9}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M8.707 8.707a1 1 0 0 0 0-1.414L2.343.929A1 1 0 0 0 .93 2.343L6.586 8 .929 13.657a1 1 0 1 0 1.414 1.414l6.364-6.364ZM7 9h1V7H7v2Z"
    />
  </Svg>
)
export default SpaceArrow
