import { permanentRedirect } from "next/navigation";

export default function HomePage(): JSX.Element {
  permanentRedirect("/chat");
}
