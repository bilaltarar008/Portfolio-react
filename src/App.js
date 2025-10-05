import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, FileDown, ArrowLeft, ArrowRight } from "lucide-react";

// -------------------- Global Styles --------------------
const GlobalStyle = createGlobalStyle`
  html, body {
    overflow-x: hidden;
    width: 100%;
  }

  :root {
    --bg: #fafafa;
    --card: #ffffff;
    --muted: #666;
    --accent: #e63946;
    --glass: rgba(230, 57, 70, 0.08);
    --radius: 16px;
    font-family: 'Poppins', sans-serif;
    font-size: 17px;
  }

  body {
    background: var(--bg);
    color: #222;
    -webkit-font-smoothing: antialiased;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

// -------------------- Animations --------------------
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// -------------------- Layout Components --------------------
const Container = styled.div`
  max-width: 1300px;
  margin: 40px auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  animation: ${fadeIn} 1.2s ease-in-out;

  @media (max-width: 480px) {
    padding: 16px;
  }
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
  padding: 28px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
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
  font-size: 2.3rem;
  font-weight: 700;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--accent);
`;

const SubText = styled.p`
  font-size: 15px;
  color: var(--muted);
  max-width: 600px;
`;

// -------------------- Sidebar --------------------
const SidebarCard = styled(Card)`
  position: fixed;
  top: 100px; /* distance from top edge of screen */
  right: 40px; /* adjust if needed depending on layout */
  width: 300px;
  height: fit-content;
  text-align: center;
  z-index: 1000; /* ensures it stays on top of all sections */

  @media (max-width: 899px) {
    display: none;
  }
`;



// For mobile version
const MobileProfile = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px;
  margin-bottom: 20px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);

  @media (min-width: 900px) {
    display: none;
  }
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--accent);
  margin-bottom: 12px;
  box-shadow: 0 4px 15px rgba(230, 57, 70, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ContactButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const GhostButton = styled.a`
  padding: 12px 16px;
  border-radius: 10px;
  font-weight: 600;
  border: 2px solid transparent;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;

  ${({ variant }) =>
    variant === "primary"
      ? `
        background-color: var(--accent);
        color: white;
        box-shadow: 0 5px 15px rgba(230, 57, 70, 0.3);
        &:hover { background-color: #d62839; }
      `
      : `
        background-color: white;
        color: var(--accent);
        border: 2px solid var(--accent);
        &:hover { background-color: var(--accent); color: white; }
      `}
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
  height: 230px;
  object-fit: cover;
  border-radius: 12px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.04);
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(107, 107, 107, 0.7);
  border: none;
  color: white;
  padding: 6px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: rgba(230, 57, 70, 0.9);
  }
`;

const LeftArrow = styled(ArrowButton)`left: 8px;`;
const RightArrow = styled(ArrowButton)`right: 8px;`;

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
  color: #999;
  margin-top: 36px;
`;

// -------------------- Data --------------------
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
    description: "Full-stack mobile app with Flutter and Firebase integration.",
    technologies: ["Flutter", "Dart", "Firebase"],
    images: ["/images/lums.jpeg", "/images/lums2.jpeg"],
  },
  {
    id: 3,
    title: "Business Portfolio (Kidmall.pk)",
    description: "WordPress business site using MySQL and Elementor.",
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
    description: "Portfolio redesign with accessibility and styled-components.",
    technologies: ["React", "Styled Components", "Framer Motion"],
    images: ["/images/portfolio1.png", "/images/portfolio2.png"],
  },
];

// -------------------- Components --------------------



function AboutSection() {
  return (
    <Card id="about">
      <h2 style={{ marginBottom: 10, color: "#111" }}>About Me</h2>
      <SubText>
        I’m a <strong>Front-End & Mobile Developer</strong> specializing in{" "}
        <strong>React.js</strong> and <strong>Flutter</strong>. I build fast,
        elegant, and accessible user interfaces that feel delightful to use.
      </SubText>
    </Card>
  );
}

function ProjectCard({ project }) {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % project.images.length);
  const prev = () =>
    setIndex((i) => (i === 0 ? project.images.length - 1 : i - 1));

  return (
    <Card>
      <ImageWrapper>
        <ProjectImage src={project.images[index]} alt={project.title} />
        {project.images.length > 1 && (
          <>
            <LeftArrow onClick={prev}>
              <ArrowLeft size={18} />
            </LeftArrow>
            <RightArrow onClick={next}>
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

function Sidebar() {
  return (
    <SidebarCard>
      <Avatar src="/images/profile.png" alt="Bilal Arshad" />
      <h3 style={{ fontWeight: 700 }}>Bilal Arshad</h3>
      <p style={{ color: "#888", fontSize: 13 }}>React & Flutter Developer</p>

      <ContactButtons>
        <GhostButton href="mailto:Bilal.tarar008@gmail.com" variant="secondary">
          <Mail size={16} /> Email
        </GhostButton>
        <GhostButton
          href="/Bilalcv.pdf"
          download="Bilal_Arshad_CV.pdf"
          variant="primary"
        >
          <FileDown size={16} /> Download CV
        </GhostButton>
        <GhostButton
          href="https://wa.me/923194098688"
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
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
          <Title>Front-End & Flutter Developer</Title>
          <SubText>
            I specialize in <strong>React</strong> and <strong>Flutter</strong>,
            crafting clean, responsive, and high-performance digital experiences
            with an eye for design and usability.
          </SubText>
        </HeaderWrap>

        <Grid>
          <div>
            <MobileProfile>
  <Avatar src="/images/profile.png" alt="Bilal Arshad" />
  <h3 style={{ fontWeight: 700, marginTop: 8 }}>Bilal Arshad</h3>
  <p style={{ color: "var(--muted)", fontSize: 13 }}>
    React & Flutter Developer
  </p>
  <ContactButtons style={{ width: "100%", marginTop: 10 }}>
    <GhostButton
      href="mailto:Bilal.tarar008@gmail.com"
      style={{
        width: "90%",
        borderColor: "#f43f5e",
        color: "#f43f5e",
      }}
    >
      <Mail size={15} style={{ marginRight: "6px" }} /> Email
    </GhostButton>

    <GhostButton
      href="/Bilalcv.pdf"
      download="Bilal_Arshad_CV.pdf"
      style={{
        width: "90%",
        backgroundColor: "#f43f5e",
        color: "white",
        boxShadow: "0 4px 10px rgba(244,63,94,0.3)",
      }}
    >
      <FileDown size={15} style={{ marginRight: "6px" }} /> Download CV
    </GhostButton>

    <GhostButton
      href="https://wa.me/923194098688"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        width: "90%",
        borderColor: "#f43f5e",
        color: "#f43f5e",
      }}
    >
      <MessageCircle size={15} style={{ marginRight: "6px" }} /> WhatsApp
    </GhostButton>
  </ContactButtons>
</MobileProfile>

            <AboutSection />
            <ProjectsSection projects={projects} />
          </div>
          <Sidebar />
        </Grid>

        <FooterWrap>© {new Date().getFullYear()} Bilal Arshad — Built with ❤️</FooterWrap>
      </Container>
    </>
  );
}

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
