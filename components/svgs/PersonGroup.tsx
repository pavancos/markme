import * as React from "react"
import Svg, { SvgProps, Path, SvgCss } from "react-native-svg"
const PersonGroup = (props: SvgProps) => (
  <Svg
    width={17}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      stroke="#999"
      strokeLinecap="round"
      strokeMiterlimit={10}
      d="M1 12.979v-.945c.003-.77.297-1.508.819-2.051a2.732 2.732 0 0 1 1.964-.853h5.75a2.728 2.728 0 0 1 1.963.853c.521.544.814 1.281.816 2.05v.946"
    />
    <Path
      stroke="#999"
      strokeMiterlimit={10}
      d="M6.658 6.135c1.358 0 2.458-1.15 2.458-2.568C9.116 2.15 8.016 1 6.658 1 5.301 1 4.201 2.15 4.201 3.567c0 1.418 1.1 2.568 2.457 2.568Z"
    />
    <Path
      stroke="#999"
      strokeLinecap="round"
      strokeMiterlimit={10}
      d="M13.6 9.176a2.76 2.76 0 0 1 1.713.972c.441.529.685 1.206.686 1.908V13"
    />
    <Path
      stroke="#999"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.84 1.052a2.442 2.442 0 0 1 1.411.892c.358.458.554 1.031.554 1.623 0 .592-.196 1.165-.554 1.623a2.442 2.442 0 0 1-1.411.892"
    />
  </Svg>
)
export default PersonGroup
