"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play, Volume2, VolumeX, X } from "lucide-react";
import styles from "./project-video.module.css";

type ProjectVideoProps = {
  project: "elara" | "nomi";
  title: string;
  duration: string;
  description: string;
};

export function ProjectVideo({
  project,
  title,
  duration,
  description,
}: ProjectVideoProps) {
  const preview = useRef<HTMLVideoElement>(null);
  const fullVideo = useRef<HTMLVideoElement>(null);
  const card = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const previousOverflow = useRef<string | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [opened, setOpened] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playbackBlocked, setPlaybackBlocked] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const playbackMeasured = useRef(false);

  const stopPreview = () => {
    preview.current?.pause();
    setPreviewing(false);
  };

  useEffect(() => {
    const stop = () => {
      preview.current?.pause();
      setPreviewing(false);
    };
    const visibility = () => {
      if (document.hidden) {
        stop();
        fullVideo.current?.pause();
      }
    };
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) stop();
    });
    if (card.current) observer.observe(card.current);
    window.addEventListener("portfolio:video-start", stop);
    document.addEventListener("visibilitychange", visibility);
    motion.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      window.removeEventListener("portfolio:video-start", stop);
      document.removeEventListener("visibilitychange", visibility);
      motion.removeEventListener("change", stop);
      if (previousOverflow.current !== null)
        document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  const startPreview = async () => {
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      connection?.saveData ||
      opened
    )
      return;
    window.dispatchEvent(new Event("portfolio:video-start"));
    const video = preview.current;
    if (!video) return;
    if (!video.getAttribute("src")) video.src = `/media/${project}-preview.mp4`;
    try {
      await video.play();
      if (card.current?.matches(":hover")) setPreviewing(true);
      else video.pause();
    } catch {
      stopPreview();
    }
  };

  const open = () => {
    playbackMeasured.current = false;
    stopPreview();
    window.dispatchEvent(new Event("portfolio:video-start"));
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setFailed(false);
    setPlaybackBlocked(false);
    setSoundOn(true);
    setOpened(true);
    dialog.current?.showModal();
    const video = fullVideo.current;
    if (video) {
      // Start within the click gesture so browsers can allow audible playback.
      if (!video.getAttribute("src"))
        video.src = `/media/${project}-showcase.mp4`;
      video.muted = false;
      video.volume = 1;
      video.currentTime = 0;
      void video.play().catch(() => setPlaybackBlocked(true));
    }
  };

  const close = () => {
    fullVideo.current?.pause();
    setOpened(false);
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
  };

  const toggleSound = () => {
    const video = fullVideo.current;
    if (!video) return;
    const enable = video.muted || video.volume === 0;
    video.muted = !enable;
    if (enable && video.volume === 0) video.volume = 1;
    setSoundOn(enable);
    if (enable && playbackBlocked) {
      void video.play().then(
        () => setPlaybackBlocked(false),
        () => setPlaybackBlocked(true),
      );
    }
  };

  return (
    <div className="project-film">
      <button
        ref={card}
        type="button"
        className={`project-film-card ${previewing ? "is-playing" : ""}`}
        onPointerEnter={startPreview}
        onPointerLeave={stopPreview}
        onClick={open}
      >
        <Image
          src={`/media/${project}-poster.jpg`}
          alt=""
          fill
          sizes="(max-width: 700px) 85vw, 44vw"
        />
        <video
          ref={preview}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        />
        <span className="project-film-topline">
          <span>PRODUCT FILM</span>
          <span>{duration}</span>
        </span>
        <span className="project-film-play">
          <Play size={19} fill="currentColor" aria-hidden="true" />
        </span>
        <span className="project-film-caption">
          <span>Watch {title}</span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </span>
      </button>
      <span className="project-film-hint">
        Click to watch with sound. Hover previews stay muted.
      </span>
      <dialog
        ref={dialog}
        className="project-film-dialog"
        onClose={close}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        aria-labelledby={`${project}-film-title`}
        aria-describedby={`${project}-film-description`}
      >
        <div className="project-film-player">
          <div className="project-film-player-heading">
            <div>
              <span>PROJECT SHOWCASE / {duration}</span>
              <h3 id={`${project}-film-title`}>{title}</h3>
            </div>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Close video preview"
              autoFocus
            >
              <X size={22} />
            </button>
          </div>
          <video
            ref={fullVideo}
            id={`${project}-showcase-video`}
            poster={`/media/${project}-poster.jpg`}
            controls
            playsInline
            preload="none"
            onPlay={() => {
              if (playbackMeasured.current) return;
              playbackMeasured.current = true;
              window.dispatchEvent(new CustomEvent("portfolio:video-play", { detail: { project } }));
            }}
            onError={() => setFailed(true)}
            onVolumeChange={(event) => {
              const video = event.currentTarget;
              setSoundOn(!video.muted && video.volume > 0);
            }}
            aria-label={`${title} full project showcase`}
          />
          <p id={`${project}-film-description`}>
            {failed
              ? "The video could not load. Please close the preview and try again."
              : description}
          </p>
          <div className={styles.audioControls}>
            <button
              className={styles.soundButton}
              type="button"
              aria-label={soundOn ? "Sound on — mute video" : "Enable sound"}
              aria-pressed={soundOn}
              aria-controls={`${project}-showcase-video`}
              onClick={toggleSound}
            >
              {soundOn ? (
                <Volume2 size={18} aria-hidden="true" />
              ) : (
                <VolumeX size={18} aria-hidden="true" />
              )}
              {soundOn ? "Sound on" : "Enable sound"}
            </button>
            <span className={styles.audioNote}>
              {playbackBlocked
                ? "Press Play in the player to begin."
                : soundOn
                  ? "Sound is on. Adjust volume using the player controls."
                  : "Sound is muted. Select Enable sound to turn it on."}
            </span>
          </div>
        </div>
      </dialog>
    </div>
  );
}
