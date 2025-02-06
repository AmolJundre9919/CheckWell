import type { ComponentCategory } from "../types/editor.types"

export interface ComponentDefinition {
  type: ComponentCategory
  name: string
  tagName: string
  icon: string
  defaultProps: Record<string, any>
  editableProps: string[]
}

// Utility function to get the icon for each component by name
const getComponentIcon = (name: string): string => {
  const icons: Record<string, string> = {
    Button: "🔘",
    Input: "📝",
    Badge: "🏷️",
    Avatar: "👤",
    Typography: "📄",
    Logo: "🎨",
    Card: "🗂️",
    SearchBar: "🔍",
    Header: "📑",
    Navigation: "🔗",
    NavigationLink: "🔗",
    Grid: "📏",
    Container: "📦",
    Divider: "➖",
    Image: "🖼️",
    Icon: "🎨",
    Spinner: "🔄",
    Checkbox: "☑️",
    Switch: "🔘",
    GoogleMap: "🗺️",
    ImageBox: "🖼️",
    IconBox: "🔲",
    ImageCarousel: "📸",
    Accordion: "📂",
    TabMolecule: "📋",
    SocialIcons: "🌐",
    Testimonial: "💬",
    TextPath: "🖋️",
    Video: "🎥",
    Alert: "⚠️",
    BasicGallery: "🖼️",
    ChipMolecule: "💡",
    CounterMolecule: "🔢",
    IconListMolecule: "📝",
    Ratings: "⭐",
    ReadMoreMolecule: "📖",
    Block: "📦",
    CustomHTML: "🖋️",
    NavigationMenu: "🧭",
    TagCloud: "🏷️",
    SearchForm: "🔍",
    Login: "🔐",
    ShareButton: "🔗",
    MediaCarousel: "🎠",
    Reviews: "⭐",
    Sidebar: "📑",
    PostGrid: "📰",
    CommentSection: "💬",
    MenuAnchor: "🔗",
    HTMLWidget: "📝",
    Shortcode: "[]",
    SoundCloud: "🎵",
    Team: "👥",
    FlipBox: "🔄",
    Countdown: "⏲️",
    CallToAction: "📢",
    Blockquote: "💭",
    Portfolio: "🎨",
    PriceList: "💰",
    PricingTable: "📊",
    Logos: "🏢",
    MinimalistBio: "👤",
  }
  return icons[name] || "📦"
}

// Function to get the default properties for each component by name
const getDefaultProps = (name: string): Record<string, any> => {
  const defaults: Record<string, Record<string, any>> = {
    Button: { variant: "primary", text: "Button" },
    Input: { placeholder: "Enter text..." },
    Badge: { variant: "default", text: "Badge" },
    Avatar: { alt: "Avatar" },
    Typography: { variant: "body", text: "Text" },
    Logo: { alt: "Logo" },
    Card: { title: "Card Title", content: "Card Content" },
    SearchBar: { placeholder: "Search..." },
    Header: { title: "Header" },
    Navigation: { icon: "🔗", label: "Navigation Item" },
    NavigationLink: { href: "#", text: "Link" },
    Grid: { columns: "12", gap: "md" },
    Container: { size: "lg", padding: "md" },
    Divider: { orientation: "horizontal", thickness: 1 },
    Image: { src: "https://via.placeholder.com/300x200", alt: "Placeholder image", size: "medium" },
    ImageBox: { src: "https://via.placeholder.com/400x300", alt: "Image Box" },
    IconBox: {
      icon: "⭐",
      label: "Default Label",
      size: "medium",
      shape: "square",
      color: "#000",
      backgroundColor: "#fff",
      border: "none",
      padding: "8px",
      margin: "0",
      labelPosition: "right",
      labelColor: "#000",
      labelFontSize: "14px",
      hoverColor: "#fff",
      hoverBackgroundColor: "#007bff",
    },
    ImageCarousel: {
      images: [
        { src: "https://via.placeholder.com/400x300", alt: "Slide 1" },
        { src: "https://via.placeholder.com/400x300", alt: "Slide 2" },
      ],
      autoplay: true,
    },
    Spinner: { size: "medium" },
    Checkbox: { label: "Checkbox" },
    Switch: { label: "Switch" },
    Accordion: {
      items: [
        { title: "Section 1", content: "Content for section 1" },
        { title: "Section 2", content: "Content for section 2" },
      ],
      multiExpand: false,
    },
    TabMolecule: {
      tabs: [
        { label: "Tab 1", content: "Content for Tab 1" },
        { label: "Tab 2", content: "Content for Tab 2" },
      ],
      activeTabIndex: 0,
    },
    SocialIcons: {
      icons: [],
      size: "medium",
      color: "#000",
      hoverColor: "#007bff",
      spacing: "1rem",
      alignment: "center",
      showLabels: true,
    },
    Testimonial: {
      quote: "This is a great testimonial!",
      author: "John Doe",
      role: "Customer",
      avatar: "https://via.placeholder.com/60",
      rating: 5,
      backgroundColor: "#007bff",
      textColor: "#ffffff",
      alignment: "left",
    },
    TextPath: {
      path: "M10 80 Q 95 10 180 80",
      text: "Your curved text here",
      fontSize: "16",
      fill: "#007bff",
      textAlign: "start",
      startOffset: "0",
      letterSpacing: "0",
    },
    Video: {
      src: "",
      type: "video/mp4",
      width: "100%",
      height: "auto",
      autoplay: false,
      controls: true,
      loop: false,
      muted: false,
      poster: "",
      preload: "metadata",
    },
    Alert: { message: "This is an alert!", type: "info", dismissible: true, icon: "⚠️" },
    BasicGallery: {
      images: [
        { src: "https://via.placeholder.com/300x200", alt: "Gallery Image 1" },
        { src: "https://via.placeholder.com/300x200", alt: "Gallery Image 2" },
      ],
      columns: 3,
      caption: "Basic Gallery",
    },
    ChipMolecule: { label: "Chip Label", color: "#007bff", icon: "", size: "medium", removable: false },
    CounterMolecule: { count: 0, min: 0, max: 100, step: 1 },
    IconListMolecule: {
      icons: [
        { icon: "🔗", label: "Link 1" },
        { icon: "📞", label: "Link 2" },
      ],
      size: "medium",
      spacing: "1rem",
      alignment: "left",
    },
    Ratings: { rating: 3, maxRating: 5, icon: "⭐" },
    ReadMoreMolecule: {
      content: "This is the content preview...",
      fullContent: "This is the full content shown after clicking Read More...",
      expanded: false,
    },
    Block: { content: "<p>Your block content here</p>" },
    CustomHTML: { html: "<div>Your custom HTML here</div>" },
    NavigationMenu: {
      items: [
        { label: "Home", url: "/" },
        { label: "About", url: "/about" },
      ],
    },
    TagCloud: {
      tags: [
        { name: "WordPress", count: 5 },
        { name: "WebComponents", count: 3 },
      ],
    },
    SearchForm: { placeholder: "Search..." },
    Login: {},
    ShareButton: { networks: ["facebook", "twitter", "linkedin"] },
    MediaCarousel: { items: [{ url: "https://via.placeholder.com/400x300", caption: "Slide 1" }] },
    Reviews: { reviews: [{ author: "John Doe", rating: 5, content: "Great product!" }] },
    Sidebar: {
      items: [
        { label: "Home", url: "/" },
        { label: "About", url: "/about" },
        { label: "Contact", url: "/contact" },
      ],
    },
    PostGrid: {
      posts: [
        {
          title: "Sample Post",
          excerpt: "This is a sample post excerpt.",
          image: "https://via.placeholder.com/300x200",
          url: "/sample-post",
        },
      ],
    },
    CommentSection: {
      comments: [
        {
          author: "John Doe",
          date: "2023-05-01",
          content: "This is a sample comment.",
        },
      ],
    },
    MenuAnchor: { id: "section-1", label: "Jump to Section 1" },
    HTMLWidget: { content: "<div>Custom HTML content</div>" },
    Shortcode: { code: "shortcode" },
    SoundCloud: {
      url: "https://soundcloud.com/example",
      color: "#FF5500",
      autoplay: false,
    },
    Team: {
      members: [
        {
          name: "John Doe",
          role: "CEO",
          image: "https://via.placeholder.com/200",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
      ],
    },
    FlipBox: {
      frontContent: "<h3>Front Content</h3>",
      backContent: "<h3>Back Content</h3>",
    },
    Countdown: {
      targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    CallToAction: {
      title: "Ready to Get Started?",
      description: "Join us today and experience the difference",
      buttonText: "Sign Up Now",
      buttonUrl: "#",
    },
    Blockquote: {
      quote: "Sample quote text",
      author: "Author Name",
    },
    Portfolio: {
      items: [
        {
          title: "Project 1",
          image: "https://via.placeholder.com/300",
          category: "Web Design",
        },
      ],
    },
    PriceList: {
      items: [
        {
          name: "Basic Plan",
          price: "$9.99",
          features: ["Feature 1", "Feature 2"],
        },
      ],
    },
    PricingTable: {
      plans: [
        {
          name: "Basic",
          price: "$9.99",
          features: ["Feature 1", "Feature 2"],
        },
      ],
    },
    Logos: {
      items: [
        {
          name: "Company 1",
          logo: "https://via.placeholder.com/150",
          url: "#",
        },
      ],
    },
    MinimalistBio: {
      name: "John Doe",
      avatar: "https://via.placeholder.com/100",
      links: [{ label: "Website", url: "#" }],
    },
  }
  return defaults[name] || {}
}

// Function to get editable properties for each component by name
const getEditableProps = (name: string): string[] => {
  const editableProps: Record<string, string[]> = {
    Button: ["variant", "text", "disabled"],
    Input: ["placeholder", "type"],
    Badge: ["variant", "text"],
    Avatar: ["src", "alt", "size"],
    Typography: ["variant", "text", "color"],
    Logo: ["src", "alt"],
    Card: ["title", "content"],
    SearchBar: ["placeholder", "variant"],
    Header: ["variant"],
    Navigation: ["icon", "label"],
    NavigationLink: ["href", "text"],
    Grid: ["columns", "gap"],
    Container: ["size", "padding"],
    Divider: ["color", "thickness"],
    Image: ["src", "alt"],
    ImageBox: ["src", "alt"],
    IconBox: [
      "icon",
      "label",
      "size",
      "shape",
      "color",
      "backgroundColor",
      "border",
      "padding",
      "margin",
      "labelPosition",
      "labelColor",
      "labelFontSize",
      "hoverColor",
      "hoverBackgroundColor",
    ],
    ImageCarousel: ["images", "autoplay"],
    Spinner: ["size"],
    Checkbox: ["label"],
    Switch: ["label"],
    Accordion: ["items", "multiExpand"],
    TabMolecule: ["tabs", "activeTabIndex"],
    SocialIcons: ["icons", "size", "color", "hover-color", "spacing", "alignment", "show-labels"],
    Testimonial: ["quote", "author", "role", "avatar", "rating", "background-color", "text-color", "alignment"],
    TextPath: ["path", "text", "font-size", "fill", "text-align", "start-offset", "letter-spacing"],
    Video: ["src", "type", "width", "height", "autoplay", "controls", "loop", "muted", "poster", "preload"],
    Alert: ["message", "type", "dismissible", "icon"],
    BasicGallery: ["images", "columns", "caption"],
    ChipMolecule: ["label", "color", "icon", "size", "removable"],
    CounterMolecule: ["count", "min", "max", "step"],
    IconListMolecule: ["icons", "size", "spacing", "alignment"],
    Ratings: ["rating", "maxRating", "icon"],
    ReadMoreMolecule: ["content", "fullContent", "expanded"],
    Block: ["content"],
    CustomHTML: ["html"],
    NavigationMenu: ["items"],
    TagCloud: ["tags"],
    SearchForm: ["placeholder"],
    Login: [],
    ShareButton: ["networks"],
    MediaCarousel: ["items"],
    Reviews: ["reviews"],
    Sidebar: ["items"],
    PostGrid: ["posts"],
    CommentSection: ["comments"],
    MenuAnchor: ["id", "label"],
    HTMLWidget: ["content"],
    Shortcode: ["code"],
    SoundCloud: ["url", "color", "autoplay"],
    Team: ["members"],
    FlipBox: ["front-content", "back-content"],
    Countdown: ["target-date"],
    CallToAction: ["title", "description", "button-text", "button-url"],
    Blockquote: ["quote", "author"],
    Portfolio: ["items"],
    PriceList: ["items"],
    PricingTable: ["plans"],
    Logos: ["items"],
    MinimalistBio: ["name", "avatar", "links"],
  }
  return editableProps[name] || []
}

// Function to create a component definition
const createComponentDefinition = (
  name: string,
  category: ComponentCategory,
  tagName: string,
): ComponentDefinition => ({
  type: category,
  name,
  tagName,
  icon: getComponentIcon(name),
  defaultProps: getDefaultProps(name),
  editableProps: getEditableProps(name),
})

// Create a registry for all available components
export const componentRegistry: ComponentDefinition[] = [
  createComponentDefinition("Button", "atoms", "ui-button"),
  createComponentDefinition("Input", "atoms", "ui-input"),
  createComponentDefinition("Checkbox", "atoms", "ui-checkbox"),
  createComponentDefinition("Switch", "atoms", "ui-switch"),
  createComponentDefinition("Badge", "atoms", "ui-badge"),
  createComponentDefinition("Avatar", "atoms", "ui-avatar"),
  createComponentDefinition("Typography", "atoms", "ui-typography"),
  createComponentDefinition("Logo", "atoms", "ui-logo"),
  createComponentDefinition("Grid", "atoms", "ui-grid"),
  createComponentDefinition("Container", "atoms", "ui-container"),
  createComponentDefinition("NavigationLink", "atoms", "ui-nav-link"),
  createComponentDefinition("Navigation", "atoms", "ui-navigation"),
  createComponentDefinition("Divider", "atoms", "ui-divider"),
  createComponentDefinition("Image", "atoms", "ui-image"),
  createComponentDefinition("ImageBox", "molecules", "ui-image-box"),
  createComponentDefinition("IconBox", "molecules", "ui-icon-box"),
  createComponentDefinition("ImageCarousel", "molecules", "ui-image-carousel"),
  createComponentDefinition("GoogleMap", "atoms", "ui-google-map"),
  createComponentDefinition("Spinner", "atoms", "ui-spinner"),
  createComponentDefinition("Icon", "atoms", "ui-icon"),
  createComponentDefinition("Accordion", "molecules", "ui-accordion"),
  createComponentDefinition("TabMolecule", "molecules", "w-tabs"),
  createComponentDefinition("Card", "molecules", "ui-card"),
  createComponentDefinition("SearchBar", "molecules", "ui-search-bar"),
  createComponentDefinition("Header", "molecules", "ui-header"),
  createComponentDefinition("SocialIcons", "molecules", "ui-social-icons"),
  createComponentDefinition("Testimonial", "molecules", "ui-testimonial"),
  createComponentDefinition("TextPath", "molecules", "ui-text-path"),
  createComponentDefinition("Video", "molecules", "ui-video"),
  createComponentDefinition("Alert", "molecules", "ui-alert"),
  createComponentDefinition("BasicGallery", "molecules", "ui-gallery"),
  createComponentDefinition("ChipMolecule", "molecules", "ui-chip"),
  createComponentDefinition("CounterMolecule", "molecules", "ui-counter"),
  createComponentDefinition("IconListMolecule", "molecules", "ui-icon-list"),
  createComponentDefinition("Ratings", "molecules", "ui-ratings"),
  createComponentDefinition("ReadMoreMolecule", "molecules", "ui-read-more"),
  createComponentDefinition("Block", "molecules", "w-block"),
  createComponentDefinition("CustomHTML", "molecules", "w-custom-html"),
  createComponentDefinition("NavigationMenu", "molecules", "w-navigation-menu"),
  createComponentDefinition("TagCloud", "molecules", "w-tag-cloud"),
  createComponentDefinition("SearchForm", "molecules", "w-search-form"),
  createComponentDefinition("Login", "molecules", "w-login"),
  createComponentDefinition("ShareButton", "molecules", "w-share-button"),
  createComponentDefinition("MediaCarousel", "molecules", "w-media-carousel"),
  createComponentDefinition("Reviews", "molecules", "w-reviews"),
  createComponentDefinition("Sidebar", "molecules", "w-sidebar"),
  createComponentDefinition("PostGrid", "molecules", "w-post-grid"),
  createComponentDefinition("CommentSection", "molecules", "w-comment-section"),
  createComponentDefinition("MenuAnchor", "molecules", "w-menu-anchor"),
  createComponentDefinition("HTMLWidget", "molecules", "w-html-widget"),
  createComponentDefinition("Shortcode", "molecules", "w-shortcode"),
  createComponentDefinition("SoundCloud", "molecules", "w-soundcloud"),
  createComponentDefinition("Team", "molecules", "w-team"),
  createComponentDefinition("FlipBox", "molecules", "w-flip-box"),
  createComponentDefinition("Countdown", "molecules", "w-countdown"),
  createComponentDefinition("CallToAction", "molecules", "w-call-to-action"),
  createComponentDefinition("Blockquote", "molecules", "w-blockquote"),
  createComponentDefinition("Portfolio", "molecules", "w-portfolio"),
  createComponentDefinition("PriceList", "molecules", "w-price-list"),
  createComponentDefinition("PricingTable", "molecules", "w-pricing-table"),
  createComponentDefinition("Logos", "molecules", "w-logos"),
  createComponentDefinition("MinimalistBio", "molecules", "w-minimalist-bio"),
]

// Function to get a component by its name
export const getComponentByName = (name: string): ComponentDefinition | null => {
  return componentRegistry.find((component) => component.name === name) || null
}

// Function to get components by category
export const getComponentsByCategory = (category: ComponentCategory): ComponentDefinition[] => {
  return componentRegistry.filter((component) => component.type === category)
}

