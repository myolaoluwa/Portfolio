# Portfolio media treatment

The October 3 refinement restores the last committed five-chapter cinematic opening and the original project / approach / capability structure. Git history contains photographic chapter backgrounds and a CSS dimensional phone, but no literal tree model, scene, or renderer. The original cinematic implementation is the restoration baseline; a literal tree reference still needs clarification.

## Portrait

- Workspace asset: `public/media/myolaoluwa-studio.webp` (1672 × 941; about 90 KB).
- Input: the seated portrait supplied as `WhatsApp Image 2026-10-03 at 14.49.06.jpeg`.
- Treatment: built-in image generation in identity-preserving edit mode, followed by WebP compression with Sharp. This is a generated studio composition based on the supplied photograph; it is not an original photograph of that location. The face and treatment should be reviewed by the portfolio owner before publication.
- Display: the first scroll within chapter one reveals the studio composition. Mobile uses a lower crop to keep the portrait clear of the headline. The phone recedes as the portrait appears. Reduced-motion visitors see the portrait without the camera effects.
- The original supplied photograph is untouched.

Final prompt used with the built-in image tool:

> Use case: identity-preserve. Edit the supplied portrait of the real adult man into a premium editorial photograph for his software developer portfolio. Preserve exactly his recognisable face, dark skin tone, short natural hair, facial proportions and goatee; do not beautify or change identity, age or body type. Keep his black patterned blazer, beige shirt, tan trousers, wristwatch. He is seated comfortably at a real dark walnut desk, working on a slim unbranded laptop; hands naturally on keyboard, slight attention to screen but face still visible in three-quarter frontal angle. Recompose the environment into a quiet contemporary studio with deep olive and charcoal walls, a subtle tree outside a large window, architectural warmth and realistic natural materials. Professional portrait lighting: warm soft window key from camera right, restrained green reflected environmental light and gentle rim light; retain real skin texture, plausible hands, realistic optical shadows. Wide 16:9 landscape composition, seated man in the RIGHT third, generous dark unobstructed LEFT half as website text negative space. Cinematic photography not fantasy or game; subject clearly readable, clean separation, muted forest green and warm cream highlights. No text, logos, watermark, fake interface, extra people, plastic skin, ornate tech decorations or neon. The identity from the supplied photo is the most important invariant. Deliver high quality landscape photographic image suitable for a full-screen website background.

## Project films

| Supplied file                 | Project | Full film                                           | Silent preview                              |
| ----------------------------- | ------- | --------------------------------------------------- | ------------------------------------------- |
| VIDEO-2026-09-23-11-33-35.mp4 | Nomi    | `public/media/nomi-showcase.mp4`, about 43 seconds  | `public/media/nomi-preview.mp4`, 8 seconds  |
| VIDEO-2026-10-03-12-59-16.mp4 | Elara   | `public/media/elara-showcase.mp4`, about 23 seconds | `public/media/elara-preview.mp4`, 8 seconds |

FFmpeg optimized the supplied videos into H.264 MP4 with fast-start metadata. Full films retain their audio; preview clips are silent. Still covers are extracted from the supplied films. The original attachments are untouched.

Hover previews are available only with a fine mouse pointer, normal motion settings, and without the browser's data-saver flag. Previews load on hover, pause out of view, and stop when another video starts. Full film elements have no source and use `preload="none"` until a click or tap assigns the source and starts playback with sound within that user gesture. If a browser rejects playback, the player asks the visitor to press Play. Native modal dialogs provide focus containment and Escape dismissal; native video controls provide mute, volume, seeking, and fullscreen. Closing a dialog pauses its audio/video.

## Existing chapter photographs

The original five Unsplash chapter photographs are retained, stored locally, and compressed as `public/media/chapter-0.webp` through `chapter-4.webp`:

- `photo-1486406146926-c627a92ad1ab`
- `photo-1460925895917-afdab827c52f`
- `photo-1521737711867-e3b97375f902`
- `photo-1498050108023-c5249f4df085`
- `photo-1519389950473-47ba0277781c`

## Review

Run `npm run dev`, then open `http://localhost:3000`. Review the initial frame, first-scroll portrait, all five chapters, Elara and Nomi films, and the contact panel on desktop and mobile. Contact details are explicit placeholders. No commit or push has been requested or performed.
