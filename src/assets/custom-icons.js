import Svg, { Path, Circle, G, Rect, Defs, ClipPath } from "react-native-svg";

export function AddPhotoIcon(props) {
  return (
    <Svg
      width={25}
      height={25}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={12.5} cy={12.5} r={12} fill="#fff" stroke="#FF6C00" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 6h-1v6H6v1h6v6h1v-6h6v-1h-6V6z"
        fill="#FF6C00"
      />
    </Svg>
  );
}

export function RemovePhotoIcon(props) {
  return (
    <Svg
      width={25}
      height={25}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#prefix__clip0_37063_92)">
        <Circle
          cx={12.5}
          cy={12.5}
          r={12}
          transform="rotate(-45 12.5 12.5)"
          fill="#fff"
          stroke="#E8E8E8"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.257 7.55l-.707.707 4.243 4.243-4.243 4.243.707.707 4.243-4.243 4.243 4.243.707-.707-4.243-4.243 4.243-4.243-.707-.707-4.243 4.243L8.257 7.55z"
          fill="#BDBDBD"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_37063_92">
          <Path fill="#fff" d="M0 0h25v25H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export function LogOutIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10 22H5a2 2 0 01-2-2V4a2 2 0 012-2h5M17 16l4-4-4-4M21 12H9"
        stroke="#BDBDBD"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PostsIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="#fff" d="M0 0h24v24H0z" />
      <Path
        clipRule="evenodd"
        d="M3 3h7v7H3V3zM14 3h7v7h-7V3zM14 14h7v7h-7v-7zM3 14h7v7H3v-7z"
        stroke={props.focused ? "#FF6C00" : "#212121"}
        strokeOpacity={0.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CreatePostIcon(props) {
  return (
    <Svg
      width={70}
      height={40}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#prefix__clip0_12_109)">
        <Rect width={70} height={40} rx={20} fill={"#FF6C00"} />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M35.5 13.5h-1v6h-6v1h6v6h1v-6h6v-1h-6v-6z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_12_109">
          <Path fill="#fff" d="M0 0h70v40H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export function ProfileIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
        stroke={props.focused ? "#FF6C00" : "#212121"}
        strokeOpacity={0.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M12 11a4 4 0 100-8 4 4 0 000 8z"
        stroke={props.focused ? "#FF6C00" : "#212121"}
        strokeOpacity={0.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function GoBackIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20 12H4M10 18l-6-6 6-6"
        stroke="#212121"
        strokeOpacity={0.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function MakePhotoIcon(props) {
  return (
    <Svg
      width={60}
      height={60}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={30} cy={30} r={30} fill="#fff" fillOpacity={0.3} />
      <G clipPath="url(#prefix__clip0_36716_98)" fill="#fff">
        <Path d="M30 33.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z" />
        <Path d="M27 20l-1.83 2H22c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V24c0-1.1-.9-2-2-2h-3.17L33 20h-6zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_36716_98">
          <Path fill="#fff" transform="translate(18 18)" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export function LocationIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {props.filled ? (
        <>
          <Path
            clipRule="evenodd"
            d="M20 10.364C20 16.09 12 21 12 21s-8-4.91-8-10.636C4 6.297 7.582 3 12 3s8 3.297 8 7.364v0z"
            stroke="#FF6C00"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            clipRule="evenodd"
            d="M12 14a3 3 0 100-6 3 3 0 000 6z"
            stroke="#FF6C00"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <Path
            clipRule="evenodd"
            d="M20 10.364C20 16.09 12 21 12 21s-8-4.91-8-10.636C4 6.297 7.582 3 12 3s8 3.297 8 7.364v0z"
            stroke="#BDBDBD"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            clipRule="evenodd"
            d="M12 14a3 3 0 100-6 3 3 0 000 6z"
            stroke="#BDBDBD"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </Svg>
  );
}

export function ClearFormIcon(props) {
  return (
    <Svg
      width={70}
      height={40}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#prefix__clip0_36_58)">
        <Rect width={70} height={40} rx={20} fill="#F6F6F6" />
        <Path
          d="M26 14h18"
          stroke="#BDBDBD"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M42.5 14a.5.5 0 00-1 0h1zm-14 0a.5.5 0 00-1 0h1zm2 0a.5.5 0 001 0h-1zm8 0a.5.5 0 001 0h-1zm3 0v14h1V14h-1zm0 14a1.5 1.5 0 01-1.5 1.5v1a2.5 2.5 0 002.5-2.5h-1zM40 29.5H30v1h10v-1zm-10 0a1.5 1.5 0 01-1.5-1.5h-1a2.5 2.5 0 002.5 2.5v-1zM28.5 28V14h-1v14h1zm3-14v-2h-1v2h1zm0-2a1.5 1.5 0 011.5-1.5v-1a2.5 2.5 0 00-2.5 2.5h1zm1.5-1.5h4v-1h-4v1zm4 0a1.5 1.5 0 011.5 1.5h1A2.5 2.5 0 0037 9.5v1zm1.5 1.5v2h1v-2h-1z"
          fill="#BDBDBD"
        />
        <Path
          d="M33 19v6M37 19v6"
          stroke="#BDBDBD"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_36_58">
          <Path fill="#fff" d="M0 0h70v40H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export function CommentsIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {props.filled ? (
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 11.5a8.38 8.38 0 00.9 3.8 8.5 8.5 0 007.6 4.7 8.38 8.38 0 003.8-.9L21 21l-1.9-5.7a8.38 8.38 0 00.9-3.8 8.5 8.5 0 00-4.7-7.6 8.38 8.38 0 00-3.8-.9H11a8.48 8.48 0 00-8 8v.5z"
          fill="#FF6C00"
        />
      ) : (
        <Path
          clipRule="evenodd"
          d="M3 11.5a8.38 8.38 0 00.9 3.8 8.5 8.5 0 007.6 4.7 8.38 8.38 0 003.8-.9L21 21l-1.9-5.7a8.38 8.38 0 00.9-3.8 8.5 8.5 0 00-4.7-7.6 8.38 8.38 0 00-3.8-.9H11a8.48 8.48 0 00-8 8v.5z"
          stroke="#BDBDBD"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </Svg>
  );
}

export function LocationMarkerIcon(props) {
  return (
    <svg
      width={40}
      height={50}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40 20C40 8.954 31.046 0 20 0S0 8.954 0 20c0 13.627 20 30 20 30s20-16.373 20-30zm-20 7a8 8 0 100-16 8 8 0 000 16z"
        fill="#FF6C00"
      />
    </svg>
  );
}

export function SendCommentIcon(props) {
  return (
    <Svg
      width={34}
      height={34}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={17} cy={17} r={17} fill="#FF6C00" />
      <Path
        d="M17 10l.354-.354a.5.5 0 00-.708 0L17 10zm4.646 5.354a.5.5 0 00.708-.708l-.708.708zm-10-.708a.5.5 0 00.708.708l-.708-.708zM16.5 24a.5.5 0 001 0h-1zm.146-13.646l5 5 .708-.708-5-5-.708.708zm0-.708l-5 5 .708.708 5-5-.708-.708zM16.5 10v7h1v-7h-1zm0 7v7h1v-7h-1z"
        fill="#fff"
      />
    </Svg>
  );
}
