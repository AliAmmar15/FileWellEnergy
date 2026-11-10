import { useEffect, useState } from "react";
import { daysUntilDeadline, nextDeadline } from "@/lib/rules";

/** Recomputes on the client so the countdown always reflects the visitor's today. */
export function useDeadline() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => setNow(new Date()), []);
  const date = nextDeadline(now);
  return {
    days: daysUntilDeadline(now),
    label: date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    year: date.getFullYear(),
  };
}

export function DeadlineText() {
  const { label } = useDeadline();
  return <span suppressHydrationWarning>{label}</span>;
}
