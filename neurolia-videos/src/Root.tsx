import { Composition, Folder } from 'remotion';
import { videoFormats } from './styles/neurolia-tokens';
import { PlaceholderVideo, placeholderVideoSchema } from './compositions/PlaceholderVideo';
import { HeroMotion, heroMotionSchema } from './compositions/HeroMotion';
import { HeroLogoReveal, heroLogoRevealSchema } from './compositions/HeroLogoReveal';
import { AgencyShowcase, agencyShowcaseSchema } from './compositions/AgencyShowcase';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ============================================
          SOCIAL MEDIA - Promotional videos
          ============================================ */}
      <Folder name="Social-Media">
        {/* Agency Showcase - Automatisation & IA (Impactant) */}
        <Composition
          id="AgencyShowcaseReel"
          component={AgencyShowcase}
          schema={agencyShowcaseSchema}
          durationInFrames={30 * 30}
          fps={videoFormats.reel.fps}
          width={videoFormats.reel.width}
          height={videoFormats.reel.height}
          defaultProps={{
            variant: 'reel',
          }}
        />
        <Composition
          id="AgencyShowcasePost"
          component={AgencyShowcase}
          schema={agencyShowcaseSchema}
          durationInFrames={30 * 30}
          fps={videoFormats.post.fps}
          width={videoFormats.post.width}
          height={videoFormats.post.height}
          defaultProps={{
            variant: 'post',
          }}
        />
        <Composition
          id="AgencyShowcaseLinkedIn"
          component={AgencyShowcase}
          schema={agencyShowcaseSchema}
          durationInFrames={30 * 30}
          fps={videoFormats.linkedin.fps}
          width={videoFormats.linkedin.width}
          height={videoFormats.linkedin.height}
          defaultProps={{
            variant: 'linkedin',
          }}
        />
        <Composition
          id="Reel"
          component={PlaceholderVideo}
          schema={placeholderVideoSchema}
          durationInFrames={30 * 15}
          fps={videoFormats.reel.fps}
          width={videoFormats.reel.width}
          height={videoFormats.reel.height}
          defaultProps={{
            title: 'Neurolia',
            subtitle: 'Un business qui respire.',
          }}
        />
        <Composition
          id="Post"
          component={PlaceholderVideo}
          schema={placeholderVideoSchema}
          durationInFrames={30 * 10}
          fps={videoFormats.post.fps}
          width={videoFormats.post.width}
          height={videoFormats.post.height}
          defaultProps={{
            title: 'Neurolia',
            subtitle: 'Agence web & automatisation',
          }}
        />
        <Composition
          id="LinkedIn"
          component={PlaceholderVideo}
          schema={placeholderVideoSchema}
          durationInFrames={30 * 30}
          fps={videoFormats.linkedin.fps}
          width={videoFormats.linkedin.width}
          height={videoFormats.linkedin.height}
          defaultProps={{
            title: 'Neurolia',
            subtitle: 'Transformez votre présence digitale',
          }}
        />
        <Composition
          id="TikTok"
          component={PlaceholderVideo}
          schema={placeholderVideoSchema}
          durationInFrames={30 * 15}
          fps={videoFormats.tiktok.fps}
          width={videoFormats.tiktok.width}
          height={videoFormats.tiktok.height}
          defaultProps={{
            title: 'Neurolia',
            subtitle: 'Un business qui respire.',
          }}
        />
      </Folder>

      {/* ============================================
          WEBSITE - Background & embedded videos
          ============================================ */}
      <Folder name="Website">
        {/* Hero Logo Reveal - Cinematic logo animation for page load */}
        <Composition
          id="HeroLogoReveal"
          component={HeroLogoReveal}
          schema={heroLogoRevealSchema}
          durationInFrames={30 * 6}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            showTagline: false,
            tagline: 'Un business qui respire.',
          }}
        />
        {/* Hero Logo Reveal with Tagline */}
        <Composition
          id="HeroLogoRevealWithTagline"
          component={HeroLogoReveal}
          schema={heroLogoRevealSchema}
          durationInFrames={30 * 7}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            showTagline: true,
            tagline: 'Un business qui respire.',
          }}
        />
        <Composition
          id="HeroBackground"
          component={HeroMotion}
          schema={heroMotionSchema}
          durationInFrames={30 * 10}
          fps={videoFormats.heroBackground.fps}
          width={videoFormats.heroBackground.width}
          height={videoFormats.heroBackground.height}
          defaultProps={{
            tagline: 'Un business qui respire.',
          }}
        />
        <Composition
          id="SectionBackground"
          component={PlaceholderVideo}
          schema={placeholderVideoSchema}
          durationInFrames={24 * 8}
          fps={videoFormats.sectionBackground.fps}
          width={videoFormats.sectionBackground.width}
          height={videoFormats.sectionBackground.height}
          defaultProps={{
            title: '',
            subtitle: '',
          }}
        />
        <Composition
          id="ServiceShowcase"
          component={PlaceholderVideo}
          schema={placeholderVideoSchema}
          durationInFrames={30 * 20}
          fps={videoFormats.showcase.fps}
          width={videoFormats.showcase.width}
          height={videoFormats.showcase.height}
          defaultProps={{
            title: 'Nos Services',
            subtitle: 'Des leviers de croissance, pas juste de la technique.',
          }}
        />
        <Composition
          id="PortfolioPreview"
          component={PlaceholderVideo}
          schema={placeholderVideoSchema}
          durationInFrames={30 * 15}
          fps={videoFormats.showcase.fps}
          width={videoFormats.showcase.width}
          height={videoFormats.showcase.height}
          defaultProps={{
            title: 'Portfolio',
            subtitle: 'Le beau au service du rentable.',
          }}
        />
      </Folder>

      {/* ============================================
          TEMPLATES - Reusable video templates
          ============================================ */}
      <Folder name="Templates">
        <Composition
          id="TextReveal"
          component={PlaceholderVideo}
          schema={placeholderVideoSchema}
          durationInFrames={30 * 5}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            title: 'Titre ici',
            subtitle: 'Sous-titre ici',
          }}
        />
        <Composition
          id="LogoAnimation"
          component={PlaceholderVideo}
          schema={placeholderVideoSchema}
          durationInFrames={30 * 3}
          fps={30}
          width={1080}
          height={1080}
          defaultProps={{
            title: 'Neurolia',
            subtitle: '',
          }}
        />
      </Folder>
    </>
  );
};
