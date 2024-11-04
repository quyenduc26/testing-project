export default function SocialIcon() {
  return (
    <div className="flex items-center justify-center gap-3">
      <svg
        className="hover:scale-125 ease-in-out duration-700"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 32 32"
        width="42"
        height="42">
        <defs>
          <path
            id="A"
            d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
          />
        </defs>
        <clipPath id="B">
          <use xlinkHref="#A" />
        </clipPath>
        <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
          <path d="M0 37V11l17 13z" clipPath="url(#B)" fill="#fbbc05" />
          <path d="M0 11l17 13 7-6.1L48 14V0H0z" clipPath="url(#B)" fill="#ea4335" />
          <path d="M0 37l30-23 7.9 1L48 0v48H0z" clipPath="url(#B)" fill="#34a853" />
          <path d="M48 48L17 24l-4-3 35-10z" clipPath="url(#B)" fill="#4285f4" />
        </g>
      </svg>
      <svg
        className="hover:scale-125 ease-in-out duration-700"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="46"
        height="46"
        viewBox="1 1 45 45">
        <linearGradient
          id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
          x1="9.993"
          x2="40.615"
          y1="9.993"
          y2="40.615"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2aa4f4"></stop>
          <stop offset="1" stopColor="#007ad9"></stop>
        </linearGradient>
        <path
          fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
          d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path>
        <path
          fill="#fff"
          d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"></path>
      </svg>
    </div>
  );
}
