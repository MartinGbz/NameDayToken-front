import { useRef, useEffect } from "react";
import JSConfetti from "js-confetti";

interface ConfettiOptions {
  emojis?: string[] | undefined;
}

export const useConfetti = (options: ConfettiOptions) => {
  const jsConfetti = useRef<JSConfetti>();

  function confetti() {
    const commonOptions = {
      confettiRadius: 5,
      confettiNumber: 100,
    };

    if (jsConfetti.current) {
      jsConfetti.current.addConfetti({
        ...commonOptions,
        confettiColors: [
          "#ff3838",
          "#ff9d00",
          "#fffb00",
          "#48ff00",
          "#00ffd5",
          "#0090ff",
          "#7e00ff",
        ],
      });
      jsConfetti.current.addConfetti({
        ...commonOptions,
        emojis: options.emojis ?? ["🎉", "🎊", "🥳"],
        emojiSize: 25,
      });
    }
  }

  useEffect(() => {
    jsConfetti.current = new JSConfetti();
  }, []);

  return { confetti };
};
