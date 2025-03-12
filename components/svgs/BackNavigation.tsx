import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const BackNavigation = (props: SvgProps) => (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M.293 7.293a1 1 0 0 0 0 1.414l6.364 6.364a1 1 0 0 0 1.414-1.414L2.414 8l5.657-5.657A1 1 0 0 0 6.657.93L.293 7.293ZM16 7H1v2h15V7Z"
    />
  </Svg>
)
export default BackNavigation
