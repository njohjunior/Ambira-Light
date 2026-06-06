import { useState, useEffect } from "react";

interface Props {
  onDone: () => void;
}

export default function LoadingScreen({ onDone }: Props) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setExiting(true), 2500);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <style>{`
        .al-text-fill {
          background: linear-gradient(to right, #7A9B8C 50%, #FFFFFF 50%);
          background-size: 200% 100%;
          background-position: right center;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: alColorFill 2s cubic-bezier(0.76, 0, 0.24, 1) 0.3s forwards;
        }

        @keyframes alColorFill {
          from { background-position: right center; }
          to   { background-position: left center; }
        }

        .al-screen-exit {
          animation: alExitUp 0.5s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }

        @keyframes alExitUp {
          from { opacity: 1;  transform: translateY(0);    }
          to   { opacity: 0;  transform: translateY(-32px); }
        }
      `}</style>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-dark ${exiting ? "al-screen-exit" : ""}`}
        onAnimationEnd={(e) => {
          if (e.animationName === "alExitUp" && e.target === e.currentTarget) {
            onDone();
          }
        }}
      >
        <h1
          className="al-text-fill font-heading font-bold uppercase tracking-[0.3em] select-none"
          style={{ fontSize: "clamp(1.75rem, 5.5vw, 6.5rem)" }}
        >
          ambira light
        </h1>
      </div>
    </>
  );
}
