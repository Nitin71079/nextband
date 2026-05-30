import {
  useMediaQuery
} from "react-responsive";

export default function useMobile() {
  const isMobile =
    useMediaQuery({
      maxWidth: 768
    });

  return isMobile;
}