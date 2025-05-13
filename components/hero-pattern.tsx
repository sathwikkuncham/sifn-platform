"use client"

export function HeroPattern() {
  const patternStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cdefs%3E%3Cpattern id='hexagons' width='40' height='34.64' patternUnits='userSpaceOnUse'%3E%3Cg stroke='%23E2E8F0' strokeWidth='2' fill='none'%3E%3Cpath d='M0 17.32a20 17.32 0 0 0 20 0a20 17.32 0 0 0 20 0l-10 17.32L0 17.32z'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23hexagons)'/%3E%3C/svg%3E")`,
    backgroundSize: "40px 34.64px",
    opacity: 0.1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  }

  return <div style={patternStyle} aria-hidden="true" />
}
