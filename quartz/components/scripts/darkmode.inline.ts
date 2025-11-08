const userPref = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
const currentTheme = localStorage.getItem("theme") ?? userPref
document.documentElement.setAttribute("saved-theme", currentTheme)

const emitThemeChangeEvent = (theme: "light" | "dark") => {
  const event: CustomEventMap["themechange"] = new CustomEvent("themechange", {
    detail: { theme },
  })
  document.dispatchEvent(event)
}

document.addEventListener("nav", () => {
  const switchTheme = () => {
    const currentTheme = document.documentElement.getAttribute("saved-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    // Add transition class to disable CSS transitions
    document.documentElement.classList.add("theme-transitioning")

    // Create smooth fade overlay
    const overlay = document.createElement("div")
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${newTheme === "dark" ? "#0a0a0f" : "#ffffff"};
      opacity: 0;
      pointer-events: none;
      z-index: 99999;
      transition: opacity 0.15s ease-out;
    `
    document.body.appendChild(overlay)

    // Fade in to 40%
    requestAnimationFrame(() => {
      overlay.style.opacity = "0.4"
    })

    // Switch theme at peak opacity
    setTimeout(() => {
      document.documentElement.setAttribute("saved-theme", newTheme)
      localStorage.setItem("theme", newTheme)
      emitThemeChangeEvent(newTheme)

      // Fade out
      requestAnimationFrame(() => {
        overlay.style.opacity = "0"
      })

      // Cleanup
      setTimeout(() => {
        overlay.remove()
        document.documentElement.classList.remove("theme-transitioning")
      }, 150)
    }, 80)
  }

  const themeChange = (e: MediaQueryListEvent) => {
    const newTheme = e.matches ? "dark" : "light"
    document.documentElement.setAttribute("saved-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    emitThemeChangeEvent(newTheme)
  }

  for (const darkmodeButton of document.getElementsByClassName("darkmode")) {
    darkmodeButton.addEventListener("click", switchTheme)
    window.addCleanup(() => darkmodeButton.removeEventListener("click", switchTheme))
  }

  // Listen for changes in prefers-color-scheme
  const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  colorSchemeMediaQuery.addEventListener("change", themeChange)
  window.addCleanup(() => colorSchemeMediaQuery.removeEventListener("change", themeChange))
})
