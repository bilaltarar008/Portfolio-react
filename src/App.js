/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, FileDown, ArrowLeft, ArrowRight } from "lucide-react";

// -------------------- Global Styles --------------------
const GlobalStyle = createGlobalStyle`
  html,
body,
#root {
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

  :root {
    --bg: #fafafa;
    --card: #ffffff;
    --muted: #666;
    --accent: #3945e6ff;
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
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 24px;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  gap: 32px;

  animation: ${fadeIn} 1.2s ease-in-out;

  @media (max-width: 480px) {
    padding: 12px;
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
  box-shadow: 0 4px 15px rgba(74, 57, 230, 0.2);
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

// -------------------- Featured Showcase Sections --------------------

const ShowcaseSection = styled(Card)`
  padding: 0;
  overflow: hidden;
  background: ${({ dark }) =>
    dark
      ? "linear-gradient(135deg, #0f172a, #111827)"
      : "linear-gradient(135deg, #ffffff, #f8fafc)"};

  color: ${({ dark }) => (dark ? "white" : "#111827")};

  border: ${({ dark }) =>
    dark
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(0,0,0,0.05)"};

  box-shadow: 0 20px 50px rgba(0,0,0,0.08);
`;

const ShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 420px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ShowcaseContent = styled.div`
  padding: 34px;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const ShowcaseBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  padding: 8px 16px;
  border-radius: 999px;

  background: ${({ dark }) =>
    dark
      ? "rgba(255,255,255,0.08)"
      : "rgba(79,70,229,0.08)"};

  color: ${({ dark }) => (dark ? "#fff" : "#4f46e5")};

  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;

  margin-bottom: 18px;
`;

const FeaturedProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedCard = styled(Card)`
  padding: 0;
  overflow: hidden;

  min-height: 460px;

  display: grid;
  grid-template-columns: 420px 1fr;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedProjectsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 22px;

  align-items: stretch;

  margin-bottom: 34px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedLeft = styled.div`
  padding: 34px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const FeaturedRight = styled.div`
  position: relative;

  background: #eef2ff;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  overflow: hidden;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: contain;

  border-radius: 18px;

  transition: 0.4s ease;

  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`;

const MobileFrame = styled.div`
  width: 260px;
  height: 520px;

  border-radius: 38px;
  overflow: hidden;

  background: black;
  padding: 10px;

  box-shadow:
    0 20px 50px rgba(0,0,0,0.25);

  @media (max-width: 768px) {
    width: 220px;
    height: 430px;
  }
`;

const MobileImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;

  border-radius: 30px;

  cursor: pointer;
`;

const GalleryArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  width: 42px;
  height: 42px;

  border-radius: 50%;
  border: none;

  background: rgba(0,0,0,0.55);

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  z-index: 5;

  transition: 0.3s ease;

  &:hover {
    background: #4f46e5;
  }
`;

const GalleryLeft = styled(GalleryArrow)`
  left: 14px;
`;

const GalleryRight = styled(GalleryArrow)`
  right: 14px;
`;

const ShowcaseTitle = styled.h2`
  font-size: 2rem;
  line-height: 1.2;
  margin-bottom: 14px;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const ShowcaseDesc = styled.p`
  line-height: 1.9;
  font-size: 15px;

  color: ${({ dark }) =>
    dark ? "rgba(255,255,255,0.75)" : "#4b5563"};
`;

const StackWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
`;

const StackItem = styled.div`
  padding: 8px 12px;
  border-radius: 999px;

  background: ${({ dark }) =>
    dark
      ? "rgba(255,255,255,0.08)"
      : "rgba(79,70,229,0.08)"};

  color: ${({ dark }) => (dark ? "#fff" : "#4338ca")};

  font-size: 12px;
  font-weight: 500;
`;

const MetricsRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 22px;
`;


const MetricCard = styled.div`
  min-width: 110px;

  padding: 12px;
  border-radius: 12px;

  background: ${({ dark }) =>
    dark
      ? "rgba(255,255,255,0.05)"
      : "rgba(255,255,255,0.8)"};
`;

const MetricValue = styled.div`
  font-size: 1rem;
  font-weight: 700;
`;

const MetricLabel = styled.div`
  font-size: 11px;
  margin-top: 2px;
  opacity: 0.7;
`;

const ShowcaseButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 30px;
`;

const ShowcaseBtn = styled.a`
  padding: 13px 20px;
  border-radius: 12px;

  text-decoration: none;
  font-weight: 600;
  transition: 0.3s ease;

  ${({ primary, dark }) =>
    primary
      ? `
        background: ${dark ? "#22c55e" : "#4f46e5"};
        color: white;

        &:hover {
          transform: translateY(-2px);
        }
      `
      : `
        border: 1px solid ${
          dark
            ? "rgba(255,255,255,0.15)"
            : "rgba(79,70,229,0.2)"
        };

        color: ${dark ? "#fff" : "#4f46e5"};

        &:hover {
          background: ${
            dark
              ? "rgba(255,255,255,0.06)"
              : "rgba(79,70,229,0.05)"
          };
        }
      `}
`;

const ShowcaseImageWrap = styled.div`
  height: 100%;
  min-height: 320px;
  position: relative;

  @media (max-width: 900px) {
    min-height: 220px;
  }
`;

const ShowcaseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
// -------------------- Sooraj Crop Science --------------------

function FeaturedProjectsSection() {

  const soorajImages = [
    "/images/sooraj.png",
    "/images/sooraj1.png",
    "/images/sooraj2.png",
    "/images/sooraj3.png",
    "/images/sooraj4.png",
    "/images/sooraj5.png",

  ];

  const meatImages = [
    "/images/meatapp.png",
    "/images/meatapp1.png",
    "/images/meatapp2.png",
    "/images/meatapp3.png",
    "/images/meatapp4.png",
  ];

  const [soorajIndex, setSoorajIndex] = useState(0);
  const [meatIndex, setMeatIndex] = useState(0);

  const [fullscreen, setFullscreen] =
    useState(null);

  // AUTO SLIDE

  useEffect(() => {

    const interval = setInterval(() => {

      setSoorajIndex((prev) =>
        (prev + 1) % soorajImages.length
      );

      setMeatIndex((prev) =>
        (prev + 1) % meatImages.length
      );

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (
  <div
    style={{
      display: "grid",
      gridTemplateColumns:
  "repeat(auto-fit,minmax(min(100%,320px),1fr))",
      gap: "18px",
      alignItems: "start",
      marginBottom: "20px",
    }}
  >

    {/* ================= SOORAJ ================= */}

    <Card
      style={{
        overflow: "hidden",
        borderRadius: "24px",
        background:
          "linear-gradient(135deg,#07122b,#0f172a)",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >

      <div style={{ padding: "0.5px" }}>

        {/* TOP */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >

          <div
            style={{
              padding: "8px 16px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.08)",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "2px",
            }}
          >
            AGRICULTURE PLATFORM
          </div>

          <a
            href="https://soorajcropsciences.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "9px 16px",
              borderRadius: "10px",
              background: "#22c55e",
              color: "white",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            Visit Website
          </a>

        </div>

        {/* TITLE */}

        <h2
          style={{
            fontSize: "2rem",
            lineHeight: "1.1",
            marginBottom: "16px",
          }}
        >
          Sooraj Crop Science
        </h2>

        {/* DESC */}

        <p
          style={{
            fontSize: "14px",
            lineHeight: "1.8",
            color: "rgba(255,255,255,0.78)",
          }}
        >
          Enterprise agriculture management
          platform for crop analysis,
          fertilizer recommendations,
          farmer management, and operational
          workflows with scalable frontend
          architecture.
        </p>

        {/* STACK */}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "18px",
          }}
        >

          {[
            "React.js",
            "Firebase",
            "Node.js",
            "AI Bot",
            "Responsive Dashboard",
            "Multilingual Websites",
          ].map((item) => (

            <div
              key={item}
              style={{
                padding: "8px 12px",
                borderRadius: "999px",
                background:
                  "rgba(255,255,255,0.08)",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              {item}
            </div>

          ))}

        </div>

      </div>

      {/* IMAGE */}

      <div
  style={{
    position: "relative",
    padding: "14px",
  }}
>

  <div
    style={{
      height: "240px",
      overflow: "hidden",
      borderRadius: "20px",
      background: "white",
      position: "relative",
    }}
  >

    <img
      src={soorajImages[soorajIndex]}
      alt="Sooraj"
      onClick={() =>
        setFullscreen({
          images: soorajImages,
          index: soorajIndex,
        })
      }
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        cursor: "pointer",
      }}
    />

    {/* LEFT */}

    <button
      onClick={() =>
        setSoorajIndex((prev) =>
          prev === 0
            ? soorajImages.length - 1
            : prev - 1
        )
      }
      style={{
        position: "absolute",
        top: "50%",
        left: "14px",
        transform: "translateY(-50%)",
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        border: "none",
        background: "rgba(0,0,0,0.55)",
        color: "white",
        cursor: "pointer",
        fontSize: "18px",
      }}
    >
      ←
    </button>

    {/* RIGHT */}

    <button
      onClick={() =>
        setSoorajIndex((prev) =>
          (prev + 1) %
          soorajImages.length
        )
      }
      style={{
        position: "absolute",
        top: "50%",
        right: "14px",
        transform: "translateY(-50%)",
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        border: "none",
        background: "rgba(0,0,0,0.55)",
        color: "white",
        cursor: "pointer",
        fontSize: "18px",
      }}
    >
      →
    </button>

  </div>

</div>

    </Card>

    {/* ================= MEAT ================= */}

    <Card
      style={{
        overflow: "hidden",
        borderRadius: "24px",
        background: "white",
        padding: "0",
        width: "100%",
maxWidth: "100%",
      }}
    >

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          alignItems: "center",
          minHeight: "100%",
        }}
      >

        {/* LEFT */}

        <div
          style={{
            padding: "26px",
          }}
        >

          {/* TOP */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "18px",
            }}
          >

            <div
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                background:
                  "rgba(79,70,229,0.08)",
                color: "#4f46e5",
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "2px",
              }}
            >
              Mobile Application
            </div>

            <a
              href="https://meat-exporter-app.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "9px 16px",
                borderRadius: "10px",
                background: "#4f46e5",
                color: "white",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              Open Live App
            </a>

          </div>

          {/* TITLE */}

          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "14px",
              color: "#111827",
            }}
          >
            Meat Tracer
          </h2>

          {/* DESC */}

          <p
            style={{
              fontSize: "14px",
              lineHeight: "1.8",
              color: "#6b7280",
            }}
          >
            Livestock and shipment
            traceability application for
            slaughterhouse workflows,
            operational tracking, owner
            management, and monitoring.
          </p>

          {/* STACK */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "18px",
            }}
          >

            {[
              "Flutter",
              "Firebase",
              "Riverpod",
              "Firebase Auth",
              "Firestore Database",
              "Responsive UI",
              "Offline Sync",
            ].map((item) => (

              <div
                key={item}
                style={{
                  padding: "8px 12px",
                  borderRadius: "999px",
                  background:
                    "rgba(79,70,229,0.08)",
                  color: "#4f46e5",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {item}
              </div>

            ))}

          </div>

        </div>

        {/* RIGHT */}

       {/* RIGHT */}

<div
  style={{
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8fafc",
    padding: "18px",
    height: "100%",
  }}
>

  <div
    style={{
      width: "100%",
maxWidth: "170px",
height: "340px",
      background: "black",
      borderRadius: "34px",
      padding: "8px",
      overflow: "hidden",
    }}
  >

    <img
      src={meatImages[meatIndex]}
      alt="Meat Tracer"
      onClick={() =>
        setFullscreen({
          images: meatImages,
          index: meatIndex,
        })
      }
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "26px",
        cursor: "pointer",
      }}
    />

  </div>

  <button
    onClick={() =>
      setMeatIndex((prev) =>
        prev === 0
          ? meatImages.length - 1
          : prev - 1
      )
    }
    style={{
      position: "absolute",
      left: "10px",
      width: "38px",
      height: "38px",
      borderRadius: "50%",
      border: "none",
      background: "rgba(0,0,0,0.55)",
      color: "white",
      cursor: "pointer",
      fontSize: "18px",
    }}
  >
    ←
  </button>

  <button
    onClick={() =>
      setMeatIndex((prev) =>
        (prev + 1) % meatImages.length
      )
    }
    style={{
      position: "absolute",
      right: "10px",
      width: "38px",
      height: "38px",
      borderRadius: "50%",
      border: "none",
      background: "rgba(0,0,0,0.55)",
      color: "white",
      cursor: "pointer",
      fontSize: "18px",
    }}
  >
    →
  </button>

</div>

</div>

</Card>
    {fullscreen && (
  <FullscreenGallery
    images={fullscreen.images}
    currentIndex={fullscreen.index}
    onClose={() => setFullscreen(null)}
  />
)}

  </div>
);
}

// -------------------- Meat Tracer App --------------------

function MeatTracerFeaturedProject() {
  return (
    <ShowcaseSection>

      <ShowcaseGrid>

        <ShowcaseContent>

          <ShowcaseBadge>
            LIVESTOCK TRACEABILITY SYSTEM
          </ShowcaseBadge>

          <ShowcaseTitle>
            Meat Tracer Application
          </ShowcaseTitle>

          <ShowcaseDesc>
            Cross-platform livestock and meat traceability application
            built for slaughterhouse operations, shipment tracking,
            operational monitoring, and owner workflows. Designed with
            scalable Flutter architecture and real-time synchronization.
          </ShowcaseDesc>

          <StackWrap>
            <StackItem>Flutter</StackItem>
            <StackItem>Firebase</StackItem>
            <StackItem>Riverpod</StackItem>
            <StackItem>Responsive UI</StackItem>
            <StackItem>Real-time Tracking</StackItem>
            <StackItem>Offline Sync</StackItem>
          </StackWrap>

          <MetricsRow>

            <MetricCard>
              <MetricValue>Cross Platform</MetricValue>
              <MetricLabel>Android + iOS</MetricLabel>
            </MetricCard>

            <MetricCard>
              <MetricValue>Live Data</MetricValue>
              <MetricLabel>Tracking System</MetricLabel>
            </MetricCard>

            <MetricCard>
              <MetricValue>Enterprise</MetricValue>
              <MetricLabel>Operations</MetricLabel>
            </MetricCard>

          </MetricsRow>

          <ShowcaseButtons>

            <ShowcaseBtn primary>
              View Screens
            </ShowcaseBtn>

            <ShowcaseBtn>
              Flutter App
            </ShowcaseBtn>

          </ShowcaseButtons>

        </ShowcaseContent>

        <ShowcaseImageWrap>
          <ShowcaseImage
            src="/images/mobile.PNG"
            alt="Meat Tracer App"
          />
        </ShowcaseImageWrap>

      </ShowcaseGrid>

    </ShowcaseSection>
  );
}


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
  title: "Business Portfolio",
  description:
    "WordPress business site using MySQL and Elementor.",

  technologies: ["WordPress", "MySQL", "PHP"],

  liveUrl: "https://kidmall.pk/",

  images: [
    "/images/kid.PNG",
    "/images/kid1.PNG",
    "/images/kid2.PNG",
  ],
},
   {
    id: 3,
    title: "EV Charging App UI",
    description:
      "EV Charging app UI using Flutter, Maps, and booking features.",
    technologies: ["Flutter", "Dart", "Firebase"],
    images: ["/images/mobile.PNG", "/images/mobile1.PNG", "/images/mobile2.PNG","/images/mobile3.PNG",],
  },
  {
    id: 4,
    title: "LUMS App Development",
    description: "Full-stack mobile app with Flutter and Firebase integration.",
    technologies: ["Flutter", "Dart", "Firebase"],
    images: ["/images/lums.jpeg", "/images/lums2.jpeg"],
  },
  
  {
    id: 5,
    title: "Kids Quiz App",
    description: "Its a quiz App for kids  which Include Math, science, Art and Social Studt Quizs",
    technologies: ["FLutter", "Firebase", "Dart"],
    media: [
    { type: "video", src: "/videos/kidsquiz.mp4" },
    { type: "image", src: "/images/kidsquiz1.jpeg" },
    { type: "image", src: "/images/kidsquiz2.jpeg" },
  ]
  },

  {
    id: 6,
    title: "United Energy (unitedenergy.pk)",
    description: "United Energy is a renewable energy company specializing in solar solutions for residential, commercial, and industrial needs.",
    technologies: ["React", "CSS", "SupaBase"],
    liveUrl: "https://unitedenergy.pk/",
    media: [
    { type: "image", src: "/images/Ue1.PNG" },
    { type: "image", src: "/images/Ue2.PNG" },
    { type: "image", src: "/images/Ue3.PNG" },
  ]
  },
];

// -------------------- Components --------------------
function AboutSection() {

  return (

    <Card
      id="about"

      style={{
        padding: "30px",
        borderRadius: "24px",
      }}
    >

      <h2
        style={{
          marginBottom: "18px",
          fontSize: "2rem",
        }}
      >
        About Me
      </h2>

      <div
        style={{
          maxWidth: "900px",
        }}
      >

        <p
          style={{
            lineHeight: "1.9",
            fontSize: "15px",
            color: "#4b5563",
            marginBottom: "18px",
          }}
        >
          I’m a
          <strong>
            {" "}Front-End & Mobile Developer
          </strong>
          {" "}specializing in
          <strong> React.js</strong>,
          <strong> Flutter</strong>,
          and
          <strong> WordPress</strong>.
          I build modern, scalable, and
          performance-focused applications
          with clean user experiences.
        </p>

        <p
          style={{
            lineHeight: "1.9",
            fontSize: "15px",
            color: "#4b5563",
            marginBottom: "18px",
          }}
        >
          My focus is on creating
          responsive interfaces, reusable
          component systems, optimized
          frontend architecture, and
          visually refined digital
          products that scale efficiently
          across mobile and web platforms.
        </p>

        <p
          style={{
            lineHeight: "1.9",
            fontSize: "15px",
            color: "#4b5563",
            marginBottom: 0,
          }}
        >
          I enjoy transforming complex
          ideas into polished products
          through clean code, thoughtful
          UI design, and modern frontend
          technologies.
        </p>

      </div>

    </Card>

  );
}


function ProjectCard({ project }) {

  const media =
    project.media ||
    project.images?.map((img) => ({
      type: "image",
      src: img,
    })) ||
    [];

  const [index, setIndex] = useState(0);

  if (media.length === 0) return null;

  const next = () =>
    setIndex((i) => (i + 1) % media.length);

  const prev = () =>
    setIndex((i) =>
      i === 0 ? media.length - 1 : i - 1
    );

  const current = media[index];

  return (
    <Card
      style={{
        padding: "18px",
        borderRadius: "20px",
      }}
    >

      <ImageWrapper>

        {current.type === "video" ? (
          <video
            src={current.src}
            controls
            style={{
              width: "100%",
              height: "230px",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
        ) : (
          <ProjectImage
            src={current.src}
            alt={project.title}
          />
        )}

        {media.length > 1 && (
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

      <ProjectTitle>
        {project.title}
      </ProjectTitle>

      <ProjectDesc>
        {project.description}
      </ProjectDesc>

      <TechList>
        {project.technologies.map((tech) => (
          <Tech key={tech}>
            {tech}
          </Tech>
        ))}
      </TechList>

      {project.liveUrl && (
  <a
    href={project.liveUrl}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      textDecoration: "none",
      display: "inline-block",
      marginTop: "16px",
    }}
  >
    <div
      style={{
        padding: "10px 16px",
        borderRadius: "10px",
        background: "#4f46e5",
        color: "white",
        fontWeight: "600",
        fontSize: "14px",
        width: "fit-content",
      }}
    >
      Visit Website
    </div>
  </a>
)}

    </Card>
  );
}

// -------------------- Image Modal --------------------
function ImageModal({ media, currentIndex, onClose }) {
  const [index, setIndex] = useState(currentIndex);

  const next = () => setIndex((i) => (i + 1) % media.length);
  const prev = () => setIndex((i) => (i === 0 ? media.length - 1 : i - 1));

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const current = media[index];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000,
        }}
        onClick={onClose}
      >
        {current.type === "image" ? (
          <motion.img
            key={index}
            src={current.src}
            alt="Full view"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              maxWidth: "100%",
              maxHeight: "85%",
              borderRadius: "12px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
              objectFit: "contain",
            }}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <motion.video
            key={index}
            src={current.src}
            controls
            autoPlay
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              maxWidth: "100%",
              maxHeight: "85%",
              borderRadius: "12px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
              background: "#000",
            }}
            onClick={(e) => e.stopPropagation()}
          />
        )}

        {media.length > 1 && (
          <>
            <ArrowButton
              style={{ left: "20px", background: "rgba(255,255,255,0.15)" }}
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              <ArrowLeft size={24} />
            </ArrowButton>
            <ArrowButton
              style={{ right: "20px", background: "rgba(255,255,255,0.15)" }}
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              <ArrowRight size={24} />
            </ArrowButton>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}


function FullscreenGallery({
  images,
  currentIndex,
  onClose,
}) {

  const [index, setIndex] = useState(currentIndex);

  const next = () =>
    setIndex((i) => (i + 1) % images.length);

  const prev = () =>
    setIndex((i) =>
      i === 0 ? images.length - 1 : i - 1
    );

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);

  }, []);

  return (
    <AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}

        onClick={onClose}

        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.9)",
          zIndex: 9999,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >

        <motion.img
          key={index}
          src={images[index]}
          alt="preview"

          initial={{
            opacity: 0,
            scale: 0.9,
          }}

          animate={{
            opacity: 1,
            scale: 1,
          }}

          exit={{
            opacity: 0,
            scale: 0.9,
          }}

          style={{
            maxWidth: "92%",
            maxHeight: "90%",
            borderRadius: "20px",
            objectFit: "contain",
          }}

          onClick={(e) =>
            e.stopPropagation()
          }
        />

        <GalleryLeft
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
        >
          <ArrowLeft size={20} />
        </GalleryLeft>

        <GalleryRight
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
        >
          <ArrowRight size={20} />
        </GalleryRight>

      </motion.div>

    </AnimatePresence>
  );
}


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
        <HeaderWrap
  style={{
    gap: "14px",
    marginBottom: "6px",
  }}
>

  <Name
    style={{
      fontSize: "clamp(2rem, 8vw, 3.2rem)",
      lineHeight: "1",
      margin: 0,
    }}
  >
    Bilal Arshad
  </Name>

  <Title
    style={{
      fontSize: "1.5rem",
      marginTop: "4px",
      marginBottom: "2px",
    }}
  >
    Front-End & Flutter Developer
  </Title>

  <SubText
    style={{
      maxWidth: "100%",

      fontSize: "16px",

      lineHeight: "1.7",

      marginTop: "8px",

      color: "#6b7280",
    }}
  >
    I specialize in
    <strong> React</strong>,
    <strong> Flutter</strong>, and
    <strong> WordPress </strong>
    development, building responsive,
    high-performance digital products
<br className="desktop-break" />
with clean UI and scalable frontend
    architecture.
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
        width: "100%",
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
        width: "100%",
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
        width: "100%",
        borderColor: "#f43f5e",
        color: "#f43f5e",
      }}
    >
      <MessageCircle size={15} style={{ marginRight: "6px" }} /> WhatsApp
    </GhostButton>
  </ContactButtons>
</MobileProfile>

            <AboutSection />

<div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "28px",
    marginTop: "10px",
  }}
>
  <FeaturedProjectsSection />

  <ProjectsSection
    projects={projects.filter(
      (p) => p.id !== 7 && p.id !== 8
    )}
  />
</div>
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
      {/* <h2 style={{ marginBottom: 12 }}>Projects:</h2> */}
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
