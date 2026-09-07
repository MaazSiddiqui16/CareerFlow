import { Check } from "lucide-react";

export function Toast({ message }) {
  return message ? <div className="toast"><Check size={15} /> {message}</div> : null;
}
