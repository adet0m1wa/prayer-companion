// ============================================================
// APPROACH 3: FIGMA PLUGIN API SCRIPT
// Screen 1 — Daily View v3 (Prayer Companion)
// ============================================================
// HOW TO USE:
// 1. Open the target Figma file
// 2. Menu → Plugins → Development → New Plugin → Figma Design
// 3. Replace the code in code.ts with this script
// 4. Run the plugin
// ============================================================

async function main() {
  // Load fonts
  await Promise.all([
    figma.loadFontAsync({ family: "Playfair Display", style: "Bold" }),
    figma.loadFontAsync({ family: "Playfair Display", style: "Bold Italic" }),
    figma.loadFontAsync({ family: "Playfair Display", style: "SemiBold Italic" }),
    figma.loadFontAsync({ family: "DM Sans", style: "Regular" }),
    figma.loadFontAsync({ family: "DM Sans", style: "Medium" }),
    figma.loadFontAsync({ family: "DM Sans", style: "SemiBold" }),
    figma.loadFontAsync({ family: "DM Sans", style: "Bold" }),
    figma.loadFontAsync({ family: "Inter", style: "Bold" }),
    figma.loadFontAsync({ family: "Inter", style: "Regular" }),
  ]);

  // === MAIN FRAME ===
  const screen = figma.createFrame();
  screen.name = "APPROACH 3: Plugin API — screen-1-daily-view-v3";
  screen.resize(402, 874);
  screen.fills = [{ type: "SOLID", color: hexToRgb("#E4DED5") }];
  screen.layoutMode = "VERTICAL";
  screen.primaryAxisSizingMode = "FIXED";
  screen.counterAxisSizingMode = "FIXED";
  screen.clipsContent = true;

  // === STATUS BAR ===
  const statusBar = createAutoFrame("status-bar", "HORIZONTAL", 402, 52);
  statusBar.layoutAlign = "STRETCH";
  statusBar.primaryAxisAlignItems = "SPACE_BETWEEN";
  statusBar.counterAxisAlignItems = "CENTER";
  statusBar.paddingLeft = 24;
  statusBar.paddingRight = 24;

  const statusTime = createText("9:41", "Inter", "Bold", 15, "#3D2E1F");
  statusBar.appendChild(statusTime);

  const statusRight = createAutoFrame("status-right", "HORIZONTAL", null, null);
  statusRight.itemSpacing = 6;
  statusRight.counterAxisAlignItems = "CENTER";

  // Signal bars
  const signal = figma.createRectangle();
  signal.name = "signal";
  signal.resize(16, 16);
  signal.fills = [{ type: "SOLID", color: hexToRgb("#3D2E1F") }];
  statusRight.appendChild(signal);

  // Wifi
  const wifi = figma.createRectangle();
  wifi.name = "wifi";
  wifi.resize(16, 16);
  wifi.fills = [{ type: "SOLID", color: hexToRgb("#3D2E1F") }];
  statusRight.appendChild(wifi);

  // Battery
  const battery = createAutoFrame("battery", "HORIZONTAL", 27, 12);
  battery.cornerRadius = 3;
  battery.strokes = [{ type: "SOLID", color: hexToRgb("#3D2E1F") }];
  battery.strokeWeight = 1;
  battery.strokeAlign = "INSIDE";
  battery.paddingTop = 2; battery.paddingBottom = 2;
  battery.paddingLeft = 2; battery.paddingRight = 2;

  const battLevel = figma.createRectangle();
  battLevel.name = "battery-level";
  battLevel.fills = [{ type: "SOLID", color: hexToRgb("#3D2E1F") }];
  battLevel.layoutGrow = 1;
  battLevel.layoutAlign = "STRETCH";
  battLevel.cornerRadius = 1;
  battery.appendChild(battLevel);

  statusRight.appendChild(battery);
  statusBar.appendChild(statusRight);
  screen.appendChild(statusBar);

  // === CONTENT WRAPPER ===
  const content = createAutoFrame("content-wrapper", "VERTICAL", 402, null);
  content.layoutAlign = "STRETCH";
  content.layoutGrow = 1;
  content.itemSpacing = 20;
  content.paddingLeft = 24; content.paddingRight = 24;
  content.paddingBottom = 20;

  // --- GREETING HEADER ---
  const greeting = createAutoFrame("greeting-header", "HORIZONTAL", null, null);
  greeting.layoutAlign = "STRETCH";
  greeting.primaryAxisAlignItems = "SPACE_BETWEEN";
  greeting.counterAxisAlignItems = "CENTER";

  const greetText = createText("Good Morning, Jamie", "Playfair Display", "Bold", 22, "#3D2E1F");
  greeting.appendChild(greetText);

  const greetActions = createAutoFrame("greeting-actions", "HORIZONTAL", null, null);
  greetActions.itemSpacing = 4;
  greetActions.counterAxisAlignItems = "CENTER";

  // Fire icon placeholder (red circle)
  const fireIcon = figma.createEllipse();
  fireIcon.name = "fire-icon";
  fireIcon.resize(20, 20);
  fireIcon.fills = [{ type: "SOLID", color: hexToRgb("#E63434") }];
  greetActions.appendChild(fireIcon);

  const streakCount = createText("7", "DM Sans", "SemiBold", 15, "#3D2E1F");
  greetActions.appendChild(streakCount);
  greeting.appendChild(greetActions);
  content.appendChild(greeting);

  // --- VERSE CARD ---
  const verseCard = createAutoFrame("verse-card", "VERTICAL", null, null);
  verseCard.layoutAlign = "STRETCH";
  verseCard.cornerRadius = 16;
  verseCard.fills = [{ type: "SOLID", color: hexToRgb("#F3ECE2"), opacity: 0.75 }];
  verseCard.paddingTop = 20; verseCard.paddingBottom = 20;
  verseCard.paddingLeft = 20; verseCard.paddingRight = 20;
  verseCard.itemSpacing = 18;
  verseCard.clipsContent = true;

  const verseLabel = createText("Verse of the day", "DM Sans", "Regular", 14, "#000000", 0.7);
  verseCard.appendChild(verseLabel);

  const verseText = createText(
    '"For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you a hope and a future."',
    "DM Sans", "Medium", 14, "#000000"
  );
  verseText.layoutAlign = "STRETCH";
  verseText.lineHeight = { value: 150, unit: "PERCENT" };
  verseCard.appendChild(verseText);

  // Verse footer
  const verseFooter = createAutoFrame("verse-footer", "HORIZONTAL", null, null);
  verseFooter.layoutAlign = "STRETCH";
  verseFooter.primaryAxisAlignItems = "SPACE_BETWEEN";
  verseFooter.counterAxisAlignItems = "CENTER";

  const verseActions = createAutoFrame("verse-actions", "HORIZONTAL", null, null);
  verseActions.itemSpacing = 10;

  // Action items (like, share, comment)
  const actionData = [
    { name: "like", count: "12" },
    { name: "share", count: "5" },
    { name: "comment", count: "3" },
  ];
  for (const a of actionData) {
    const actionItem = createAutoFrame(`action-${a.name}`, "VERTICAL", 44, null);
    actionItem.counterAxisAlignItems = "CENTER";
    actionItem.primaryAxisAlignItems = "CENTER";

    const iconPlaceholder = figma.createEllipse();
    iconPlaceholder.name = `${a.name}-icon`;
    iconPlaceholder.resize(20, 20);
    iconPlaceholder.fills = [{ type: "SOLID", color: hexToRgb("#000000"), opacity: 0.3 }];
    actionItem.appendChild(iconPlaceholder);

    const countText = createText(a.count, "DM Sans", "Medium", 11, "#000000", 0.5);
    actionItem.appendChild(countText);

    verseActions.appendChild(actionItem);
  }
  verseFooter.appendChild(verseActions);

  const verseRef = createText("Jeremiah 29:11", "DM Sans", "Medium", 14, "#000000");
  verseRef.textAlignHorizontal = "RIGHT";
  verseFooter.appendChild(verseRef);

  verseCard.appendChild(verseFooter);
  content.appendChild(verseCard);

  // --- DISCOVER SECTION ---
  const discover = createAutoFrame("discover-section", "VERTICAL", null, null);
  discover.layoutAlign = "STRETCH";
  discover.itemSpacing = 12;

  const discoverHeading = createText("Discover what God's Word says about...", "DM Sans", "Regular", 14, "#000000", 0.7);
  discoverHeading.layoutAlign = "STRETCH";
  discover.appendChild(discoverHeading);

  const searchBar = createAutoFrame("search-bar", "HORIZONTAL", null, 44);
  searchBar.layoutAlign = "STRETCH";
  searchBar.counterAxisAlignItems = "CENTER";
  searchBar.paddingLeft = 14; searchBar.paddingRight = 14;
  searchBar.cornerRadius = 12;
  searchBar.fills = [];
  searchBar.strokes = [{ type: "SOLID", color: hexToRgb("#D4C9B8") }];
  searchBar.strokeWeight = 1;
  searchBar.strokeAlign = "INSIDE";
  searchBar.itemSpacing = 10;

  const searchIcon = figma.createRectangle();
  searchIcon.name = "search-icon";
  searchIcon.resize(16, 16);
  searchIcon.fills = [{ type: "SOLID", color: hexToRgb("#000000"), opacity: 0.5 }];
  searchBar.appendChild(searchIcon);

  const searchPlaceholder = createText("Search for an aspect", "DM Sans", "Regular", 12, "#000000", 0.5);
  searchBar.appendChild(searchPlaceholder);

  discover.appendChild(searchBar);
  content.appendChild(discover);

  // --- TOPIC CARD STACK ---
  const stack = figma.createFrame();
  stack.name = "topic-card-stack";
  stack.resize(354, 328);
  stack.layoutAlign = "STRETCH";
  stack.fills = [];
  stack.layoutMode = "NONE";

  const topics = [
    { name: "Love", y: 0, h: 137, color: "#E5DCD0" },
    { name: "Faith", y: 60, h: 148, color: "#E5DCD0" },
    { name: "Sin", y: 118, h: 148, color: "#E5DCD0" },
    { name: "Theology", y: 180, h: 148, color: "#E5DCD0" },
  ];

  for (const t of topics) {
    const card = createAutoFrame(`topic-card-${t.name.toLowerCase()}`, "VERTICAL", 354, null);
    card.layoutPositioning = "ABSOLUTE";
    card.x = 0;
    card.y = t.y;
    card.resize(354, t.h);
    card.primaryAxisSizingMode = "FIXED";
    card.counterAxisSizingMode = "FIXED";
    card.topLeftRadius = 16; card.topRightRadius = 16;
    if (t.name === "Theology") {
      card.bottomLeftRadius = 16; card.bottomRightRadius = 16;
    }
    card.fills = [{ type: "SOLID", color: hexToRgb(t.color) }];
    card.paddingTop = 20; card.paddingBottom = 20;
    card.paddingLeft = 20; card.paddingRight = 20;
    card.itemSpacing = 20;

    const topicContent = createAutoFrame(`${t.name.toLowerCase()}-content`, "HORIZONTAL", null, null);
    topicContent.itemSpacing = 6;
    topicContent.counterAxisAlignItems = "CENTER";

    const topicIcon = figma.createEllipse();
    topicIcon.name = `${t.name.toLowerCase()}-icon`;
    topicIcon.resize(30, 30);
    topicIcon.fills = [{ type: "SOLID", color: hexToRgb("#3D2E1F"), opacity: 0.2 }];
    topicContent.appendChild(topicIcon);

    const topicTitle = createText(t.name, "Playfair Display", "SemiBold Italic", 16, "#3D2E1F");
    topicContent.appendChild(topicTitle);

    card.appendChild(topicContent);

    // Theology gets preview text
    if (t.name === "Theology") {
      const preview = createText(
        "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you a hope and a future.",
        "DM Sans", "Regular", 14, "#000000", 0.7
      );
      preview.layoutAlign = "STRETCH";
      preview.lineHeight = { value: 150, unit: "PERCENT" };
      card.appendChild(preview);
    }

    stack.appendChild(card);
  }

  content.appendChild(stack);

  // --- PAGE NAVIGATION ---
  const pageNav = createAutoFrame("page-navigation", "HORIZONTAL", null, null);
  pageNav.layoutAlign = "STRETCH";
  pageNav.primaryAxisAlignItems = "CENTER";
  pageNav.counterAxisAlignItems = "CENTER";
  pageNav.itemSpacing = 20;

  const chevLeft = figma.createEllipse();
  chevLeft.name = "chevron-left";
  chevLeft.resize(32, 32);
  chevLeft.fills = [{ type: "SOLID", color: hexToRgb("#EDE6D8") }];
  chevLeft.opacity = 0.4;
  pageNav.appendChild(chevLeft);

  const pageCounter = createText("1 / 10", "DM Sans", "Medium", 14, "#5C4A38");
  pageNav.appendChild(pageCounter);

  const chevRight = figma.createEllipse();
  chevRight.name = "chevron-right";
  chevRight.resize(32, 32);
  chevRight.fills = [{ type: "SOLID", color: hexToRgb("#F0E8DB") }];
  pageNav.appendChild(chevRight);

  content.appendChild(pageNav);
  screen.appendChild(content);

  // === BOTTOM NAV ===
  const bottomNav = createAutoFrame("bottom-nav", "HORIZONTAL", 402, 62);
  bottomNav.layoutAlign = "STRETCH";
  bottomNav.primaryAxisAlignItems = "SPACE_BETWEEN";
  bottomNav.counterAxisAlignItems = "CENTER";
  bottomNav.paddingTop = 4; bottomNav.paddingBottom = 10;
  bottomNav.paddingLeft = 24; bottomNav.paddingRight = 24;
  bottomNav.fills = [{ type: "SOLID", color: hexToRgb("#F3ECE2"), opacity: 0.75 }];

  const navItems = [
    { label: "HOME", color: "#E63434", active: true },
    { label: "BIBLE", color: "#000000", active: false },
    { label: "COMMUNITY", color: "#000000", active: false },
    { label: "ALERTS", color: "#000000", active: false },
  ];

  for (const n of navItems) {
    const navItem = createAutoFrame(`nav-${n.label.toLowerCase()}`, "VERTICAL", null, null);
    navItem.layoutGrow = 1;
    navItem.counterAxisAlignItems = "CENTER";
    navItem.primaryAxisAlignItems = "CENTER";
    navItem.itemSpacing = 3;
    navItem.layoutAlign = "STRETCH";

    const navIcon = figma.createEllipse();
    navIcon.name = `${n.label.toLowerCase()}-icon`;
    navIcon.resize(22, 22);
    navIcon.fills = [{ type: "SOLID", color: hexToRgb(n.color), opacity: n.active ? 1 : 0.5 }];
    navItem.appendChild(navIcon);

    const navLabel = createText(n.label, "DM Sans", "SemiBold", 10, n.color, n.active ? 1 : 0.5);
    navLabel.letterSpacing = { value: 0.5, unit: "PIXELS" };
    navItem.appendChild(navLabel);

    bottomNav.appendChild(navItem);
  }

  screen.appendChild(bottomNav);

  // === LABEL ===
  const label = createAutoFrame("approach-label", "HORIZONTAL", null, null);
  label.layoutPositioning = "ABSOLUTE";
  label.x = screen.width - 180;
  label.y = 8;
  label.cornerRadius = 6;
  label.fills = [{ type: "SOLID", color: hexToRgb("#E63434"), opacity: 0.9 }];
  label.paddingTop = 4; label.paddingBottom = 4;
  label.paddingLeft = 8; label.paddingRight = 8;

  const labelText = createText("APPROACH 3: PLUGIN API", "DM Sans", "Bold", 10, "#FFFFFF");
  labelText.letterSpacing = { value: 0.5, unit: "PIXELS" };
  label.appendChild(labelText);

  screen.appendChild(label);

  // Position and zoom
  figma.currentPage.appendChild(screen);
  figma.viewport.scrollAndZoomIntoView([screen]);
  figma.closePlugin("Screen 1 v3 created via Plugin API!");
}

// === HELPERS ===
function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 8) hex = hex.substring(0, 6); // strip alpha
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  return { r, g, b };
}

function createAutoFrame(name, direction, w, h) {
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = direction;
  f.fills = [];
  if (w) {
    f.resize(w, h || 40);
    f.primaryAxisSizingMode = direction === "VERTICAL" ? (h ? "FIXED" : "AUTO") : (w ? "FIXED" : "AUTO");
    f.counterAxisSizingMode = direction === "VERTICAL" ? "FIXED" : (h ? "FIXED" : "AUTO");
  } else {
    f.primaryAxisSizingMode = "AUTO";
    f.counterAxisSizingMode = "AUTO";
  }
  return f;
}

function createText(content, family, style, size, color, opacity) {
  const t = figma.createText();
  t.fontName = { family, style };
  t.characters = content;
  t.fontSize = size;
  const rgb = hexToRgb(color);
  t.fills = [{ type: "SOLID", color: rgb, opacity: opacity !== undefined ? opacity : 1 }];
  return t;
}

main();
