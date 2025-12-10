import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const LocationPin = (props: SvgProps) => (
    <Svg
        width={10}
        height={13}
        fill="none"
        {...props}
    >
        <Path
            stroke="#999"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 6.256c.736 0 1.333-.587 1.333-1.312 0-.725-.597-1.312-1.334-1.312-.736 0-1.333.587-1.333 1.312 0 .725.597 1.312 1.333 1.312Z"
        />
        <Path
            stroke="#999"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 4.944a3.885 3.885 0 0 0-.419-1.76 3.952 3.952 0 0 0-1.174-1.392 4.062 4.062 0 0 0-3.518-.637 4.017 4.017 0 0 0-1.6.888 3.934 3.934 0 0 0-1.03 1.498 3.879 3.879 0 0 0 .362 3.502l.512.788L5 12.029l2.867-4.198.512-.788A3.865 3.865 0 0 0 9 4.944v0Z"
        />
    </Svg>
)
export default LocationPin