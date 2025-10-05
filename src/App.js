import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, FileDown, ArrowLeft, ArrowRight } from "lucide-react";

/*
  Professional CV/Resume Portfolio using React, Styled-Components & Framer Motion
  ------------------------------------------------------------------
  Dependencies:
  npm install styled-components framer-motion prop-types lucide-react
*/

// -------------------- Global Styles --------------------
const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #0f1724;
    --card: #0b1220;
    --muted: #94a3b8;
    --accent: #60a5fa;
    --glass: rgba(255,255,255,0.04);
    --radius: 16px;
    font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; scroll-behavior: smooth; }
  body {
    background: linear-gradient(180deg, var(--bg), #08101e 120%);
    color: #e6eef8;
    -webkit-font-smoothing: antialiased;
  }
  a { color: inherit; text-decoration: none; }
`;

// -------------------- Layout Components --------------------
const Container = styled.div`
  max-width: 1100px;
  margin: 40px auto;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 340px;
  }
`;

const Card = styled(motion.section)`
  background: var(--card);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.04);
`;

// -------------------- Header --------------------
const HeaderWrap = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const Name = styled.h1`
  font-size: 28px;
  font-weight: 700;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 400;
  color: var(--accent);
`;

const SubText = styled.p`
  font-size: 14px;
  color: var(--muted);
  max-width: 600px;
`;

// -------------------- Sidebar --------------------
const SidebarCard = styled(Card)`
  position: sticky;
  top: 24px;
  height: fit-content;

  @media (max-width: 899px) {
    display: none;
  }
`;

const MobileProfile = styled.div`
  display: none;
  text-align: center;
  @media (max-width: 899px) {
    display: block;
    margin-top: 10px;
  }
`;

const Avatar = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 14px;
  object-fit: cover;
  border: 2px solid var(--accent);
  margin-bottom: 12px;
`;

const ContactButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const GhostButton = styled.a`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--muted);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.2s ease;
  &:hover {
    color: var(--accent);
    border-color: var(--accent);
    background: rgba(96, 165, 250, 0.08);
  }
`;

// -------------------- Projects --------------------
const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  transition: transform 0.3s ease;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(15, 23, 36, 0.6);
  border: none;
  color: white;
  padding: 6px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: rgba(96, 165, 250, 0.7);
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 8px;
`;

const RightArrow = styled(ArrowButton)`
  right: 8px;
`;

const ProjectTitle = styled.h3`
  font-size: 18px;
  margin-top: 8px;
`;

const ProjectDesc = styled.p`
  color: var(--muted);
  font-size: 14px;
  line-height: 1.5;
  margin-top: 6px;
`;

const TechList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const Tech = styled.span`
  font-size: 12px;
  padding: 6px 8px;
  border-radius: 6px;
  background: var(--glass);
  color: var(--muted);
`;

// -------------------- Footer --------------------
const FooterWrap = styled.footer`
  text-align: center;
  font-size: 13px;
  color: var(--muted);
  margin-top: 36px;
`;

// -------------------- Project Data --------------------
const projectData = [
  {
    id: 1,
    title: "Bus Reservation System",
    description:
      "A full-featured bus booking system built with React, Next.js, and Supabase.",
    technologies: ["React", "Next.js", "Supabase"],
    images: ["/images/bus.PNG", "/images/bus1.PNG", "/images/bus3.PNG"],
  },
  {
    id: 2,
    title: "LUMS App Development",
    description:
      "Full-stack mobile app with Flutter and Firebase integration.",
    technologies: ["Flutter", "Dart", "Firebase"],
    images: ["/images/lums.jpeg", "/images/lums2.jpeg"],
  },
  {
    id: 3,
    title: "Business Portfolio (Kidmall.pk)",
    description:
      "WordPress business site using MySQL and Elementor.",
    technologies: ["WordPress", "MySQL", "PHP"],
    images: ["/images/kid.PNG", "/images/kid1.PNG", "/images/kid2.PNG"],
  },
  {
    id: 4,
    title: "EV Charging App UI",
    description:
      "EV Charging app UI using Flutter, Maps, and booking features.",
    technologies: ["Flutter", "Dart", "Firebase"],
    images: ["/images/ev1.png", "/images/ev2.png", "/images/ev3.png"],
  },
  {
    id: 5,
    title: "Personal Portfolio Redesign",
    description:
      "Portfolio redesign with accessibility and styled-components.",
    technologies: ["React", "Styled Components", "Framer Motion"],
    images: ["/images/portfolio1.png", "/images/portfolio2.png"],
  },
];

// -------------------- Components --------------------
function AboutSection() {
  return (
    <Card id="about">
      <h2 style={{ marginBottom: 10 }}>About Me</h2>
      <SubText>
        I’m a <strong>Front-End & Mobile Developer</strong> specializing in{" "}
        <strong>React.js</strong> and <strong>Flutter</strong>. I build fast,
        visually refined, and high-performing user experiences across web and
        mobile.
      </SubText>
    </Card>
  );
}

function ProjectCard({ project }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <Card
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ImageWrapper>
        <ProjectImage
          src={project.images[currentIndex]}
          alt={project.title}
          loading="lazy"
        />
        {project.images.length > 1 && (
          <>
            <LeftArrow onClick={handlePrev}>
              <ArrowLeft size={18} />
            </LeftArrow>
            <RightArrow onClick={handleNext}>
              <ArrowRight size={18} />
            </RightArrow>
          </>
        )}
      </ImageWrapper>
      <ProjectTitle>{project.title}</ProjectTitle>
      <ProjectDesc>{project.description}</ProjectDesc>
      <TechList>
        {project.technologies.map((t) => (
          <Tech key={t}>{t}</Tech>
        ))}
      </TechList>
    </Card>
  );
}
ProjectCard.propTypes = { project: PropTypes.object.isRequired };

function ProjectsSection({ projects }) {
  return (
    <section id="projects">
      <h2 style={{ marginBottom: 12 }}>Projects</h2>
      <ProjectGrid>
        <AnimatePresence>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </AnimatePresence>
      </ProjectGrid>
    </section>
  );
}
ProjectsSection.propTypes = { projects: PropTypes.array.isRequired };

function Sidebar() {
  return (
    <SidebarCard>
      <Avatar src="/images/profile.png" alt="Bilal Arshad" />
      <h3 style={{ fontWeight: 700 }}>Bilal Arshad</h3>
      <p style={{ color: "var(--muted)", fontSize: 13 }}>
        React & Flutter Developer
      </p>

      <ContactButtons>
        <GhostButton href="mailto:Bilal.tarar008@gmail.com">
          <Mail size={16} /> Email
        </GhostButton>
        <GhostButton href="/Bilalcv.pdf" download="Bilal_Arshad_CV.pdf">
          <FileDown size={16} /> Download CV
        </GhostButton>
        <GhostButton
          href="https://wa.me/923194098688"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={16} /> WhatsApp
        </GhostButton>
      </ContactButtons>
    </SidebarCard>
  );
}

// -------------------- App --------------------
export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setTimeout(() => setProjects(projectData), 200);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <HeaderWrap>
          <Name>Bilal Arshad</Name>
          <Title>Front-End & Mobile Developer</Title>
          <SubText>
            I’m a developer specializing in <strong>React</strong> and{" "}
            <strong>Flutter</strong>, crafting fast, accessible, and visually
            refined interfaces.
          </SubText>
        </HeaderWrap>

        <MobileProfile>
          <Avatar src="/images/profile.png" alt="Bilal Arshad" />
          <h3 style={{ fontWeight: 700, marginTop: 8 }}>Bilal Arshad</h3>
          <p style={{ color: "var(--muted)", fontSize: 13 }}>
            React & Flutter Developer
          </p>
        </MobileProfile>

        <Grid>
          <div>
            <AboutSection />
            <ProjectsSection projects={projects} />

            <Card id="contact" style={{ marginTop: 24 }}>
              <h2>Contact</h2>
              <SubText style={{ marginTop: 10 }}>
                Open for collaborations and freelance opportunities.
              </SubText>
              <ContactButtons style={{ marginTop: 16 }}>
                <GhostButton href="mailto:Bilal.tarar008@gmail.com">
                  <Mail size={16} /> Say Hello
                </GhostButton>
                <GhostButton
                  href="https://wa.me/923194098688"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={16} /> WhatsApp Me
                </GhostButton>
              </ContactButtons>
            </Card>
          </div>

          <div>
            <Sidebar />
          </div>
        </Grid>

        <FooterWrap>
          © {new Date().getFullYear()} Bilal Arshad — Built with React.js
        </FooterWrap>
      </Container>
    </>
  );
}
