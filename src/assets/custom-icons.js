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

export function LikeIcon(props) {
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
          <Path fill="#fff" d="M0 0h24v24H0z" />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.365 7.6V4.4c0-1.325-1.16-2.4-2.591-2.4L7.319 9.2V18h9.742c.862.009 1.599-.571 1.728-1.36l1.191-7.2a1.52 1.52 0 00-.404-1.29 1.79 1.79 0 00-1.323-.55h-4.888zM7.319 18H4.727C3.773 18 3 17.284 3 16.4v-5.6c0-.884.773-1.6 1.727-1.6H7.32V18z"
            fill="#FF6C00"
            fillOpacity={0.8}
          />
          <Path
            d="M13.365 7.6h-.5a.5.5 0 00.5.5v-.5zM10.774 2v-.5a.5.5 0 00-.451.284l.45.216zM7.319 9.2l-.451-.216a.5.5 0 00-.05.216h.5zm0 8.8h-.5a.5.5 0 00.5.5V18zm9.742 0l.006-.5h-.006v.5zm1.728-1.36l-.494-.082v.001l.494.08zm1.191-7.2l.494.082V9.52l-.494-.081zM18.253 7.6v.5h.005l-.005-.5zM7.32 18v.5a.5.5 0 00.5-.5h-.5zm0-8.8h.5a.5.5 0 00-.5-.5v.5zm6.546-1.6V4.4h-1v3.2h1zm0-3.2c0-1.637-1.421-2.9-3.091-2.9v1c1.191 0 2.09.886 2.09 1.9h1zm-3.542-2.616l-3.455 7.2.901.432 3.455-7.2-.901-.432zM6.819 9.2V18h1V9.2h-1zm.5 9.3h9.742v-1H7.32v1zm9.737 0c1.08.011 2.052-.72 2.226-1.78l-.987-.16c-.085.517-.585.947-1.229.94l-.01 1zm2.226-1.778l1.192-7.2-.987-.164-1.192 7.2.987.164zm1.192-7.201a2.02 2.02 0 00-.533-1.713l-.73.684c.231.245.326.562.276.867l.987.162zm-.533-1.713a2.29 2.29 0 00-1.693-.708l.01 1a1.29 1.29 0 01.954.392l.729-.684zM18.253 7.1h-4.888v1h4.888v-1zM7.32 17.5H4.727v1H7.32v-1zm-2.592 0c-.714 0-1.227-.528-1.227-1.1h-1c0 1.195 1.034 2.1 2.227 2.1v-1zM3.5 16.4v-5.6h-1v5.6h1zm0-5.6c0-.572.513-1.1 1.227-1.1v-1c-1.193 0-2.227.905-2.227 2.1h1zm1.227-1.1H7.32v-1H4.727v1zm2.092-.5V18h1V9.2h-1z"
            fill="#FF6C00"
          />
        </>
      ) : (
        <Path
          d="M13.365 7.6h-.5a.5.5 0 00.5.5v-.5zm0-3.2h.5-.5zM10.774 2v-.5a.5.5 0 00-.451.284l.45.216zM7.319 9.2l-.451-.216a.5.5 0 00-.05.216h.5zm0 8.8h-.5a.5.5 0 00.5.5V18zm9.742 0l.006-.5h-.006v.5zm1.728-1.36l-.494-.082v.001l.494.08zm1.191-7.2l.494.082V9.52l-.494-.081zM18.253 7.6v.5h.005l-.005-.5zM7.32 18v.5a.5.5 0 00.5-.5h-.5zm0-8.8h.5a.5.5 0 00-.5-.5v.5zm6.546-1.6V4.4h-1v3.2h1zm0-3.2c0-1.637-1.421-2.9-3.091-2.9v1c1.191 0 2.09.886 2.09 1.9h1zm-3.542-2.616l-3.455 7.2.901.432 3.455-7.2-.901-.432zM6.819 9.2V18h1V9.2h-1zm.5 9.3h9.742v-1H7.32v1zm9.737 0c1.08.011 2.052-.72 2.226-1.78l-.987-.16c-.085.517-.585.947-1.229.94l-.01 1zm2.226-1.778l1.192-7.2-.987-.164-1.192 7.2.987.164zm1.192-7.201a2.02 2.02 0 00-.533-1.713l-.73.684c.231.245.326.562.276.867l.987.162zm-.533-1.713a2.29 2.29 0 00-1.693-.708l.01 1a1.29 1.29 0 01.954.392l.729-.684zM18.253 7.1h-4.888v1h4.888v-1zM7.32 17.5H4.727v1H7.32v-1zm-2.592 0c-.714 0-1.227-.528-1.227-1.1h-1c0 1.195 1.034 2.1 2.227 2.1v-1zM3.5 16.4v-5.6h-1v5.6h1zm0-5.6c0-.572.513-1.1 1.227-1.1v-1c-1.193 0-2.227.905-2.227 2.1h1zm1.227-1.1H7.32v-1H4.727v1zm2.092-.5V18h1V9.2h-1z"
          fill="#FF6C00"
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
