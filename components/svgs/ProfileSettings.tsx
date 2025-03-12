import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const ProfileSettings = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke="#999"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11.05V8.974l-1.6-.32a7.445 7.445 0 0 0-1.236-2.902l.924-1.382-1.456-1.45-1.396.943a7.559 7.559 0 0 0-2.872-1.198L11.028 1H8.972l-.336 1.665a7.56 7.56 0 0 0-2.872 1.198l-1.4-.93-1.456 1.449.924 1.382A7.444 7.444 0 0 0 2.6 8.654L1 8.97v2.08l1.564.312a7.503 7.503 0 0 0 1.2 2.994L2.9 15.65l1.456 1.45 1.284-.86a7.527 7.527 0 0 0 3.032 1.27l.3 1.49h2.056l.3-1.49a7.528 7.528 0 0 0 3.032-1.27l1.276.851 1.456-1.449-.864-1.294a7.503 7.503 0 0 0 1.2-2.994L19 11.05Z"
    />
    <Path
      stroke="#999"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"
    />
  </Svg>
)
export default ProfileSettings
