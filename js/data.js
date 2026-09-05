/**
 * ArcTech Interior LLP - Application Data
 * Focus: Precision CNC Manufacturing + Premium Interiors
 * Location: Jogeshwari West, Mumbai
 */

const ARCTECH_DATA = {
  company: {
    name: "ArcTech Interior LLP",
    shortName: "ArcTech",
    tagline: "Precision CNC Manufacturing + Premium Interiors",
    location: "Jogeshwari West, Mumbai, Maharashtra 400102",
    phone: "+91 86522 23456",
    phoneClean: "918652223456",
    email: "contact@arctechinteriors.com",
    whatsapp: "918652223456",
    hours: "Mon - Sat: 9:30 AM - 7:30 PM",
    established: 2012,
    llpYear: 2019,
    rootsYear: 1970
  },

  stats: [
    { label: "Construction Roots", value: "Since 1970", desc: "5+ decades of building foundation" },
    { label: "ArcTech Founded", value: "Est. 2012", desc: "Pioneering precision interior solutions" },
    { label: "LLP Transition", value: "2019", desc: "Corporate scale & modern facility" },
    { label: "Manufacturing Base", value: "Jogeshwari W", desc: "In-house precision CNC hub" }
  ],

  services: {
    cnc: {
      title: "CNC Manufacturing",
      subtitle: "Turn designs into precisely manufactured pieces.",
      description: "ArcTech provides precision CNC manufacturing for custom interior elements and decorative applications, including high-accuracy 3D CNC carving and bespoke patterns.",
      categories: [
        { name: "3D CNC Stone Carving", desc: "Relief carvings, marble feature walls, textured fluted stone", icon: "gem" },
        { name: "Custom Decorative Panels (Jali)", desc: "Intricate geometric, floral & parametric partition screens", icon: "grid" },
        { name: "Bespoke 3D Wall Panels", desc: "Acoustic wave patterns, textured MDF, brass-inlaid wood panels", icon: "layers" },
        { name: "Architectural Feature Elements", desc: "Custom reception desks, sculptural column claddings, ceiling baffles", icon: "box" },
        { name: "Custom Interior Components", desc: "Precision joinery parts, fluted tambour slats, bespoke door skins", icon: "sliders" },
        { name: "CNC Design Mockups & Prototypes", desc: "Digital toolpath simulation and 1:1 scale test cuts", icon: "cpu" }
      ],
      materials: [
        "Italian & Indian Marble",
        "Travertine & Sandstone",
        "Teakwood & Hardwoods",
        "High-Density MDF & HDF",
        "Corian / Solid Surface",
        "Aluminium Composite & Brass"
      ]
    },
    interiors: {
      title: "Premium Interiors",
      subtitle: "Thoughtfully designed. Precisely executed.",
      description: "From interior planning and custom elements to execution and finishing, ArcTech delivers complete turnkey interior solutions tailored to each space.",
      categories: [
        { name: "Residential Interiors", desc: "Luxury apartments, penthouses, and bespoke master suites in Mumbai", icon: "home" },
        { name: "Commercial Interiors", desc: "Executive boardrooms, modern headquarters, and boutique retail", icon: "briefcase" },
        { name: "Turnkey Interiors", desc: "Complete end-to-end execution from bare shell to final handover", icon: "check-circle" },
        { name: "Feature Walls & Cladding", desc: "Signature 3D CNC focal walls with integrated cove lighting", icon: "layout" },
        { name: "Ceiling & Wall Systems", desc: "Acoustic coffered ceilings, CNC drop baffles, seamless paneling", icon: "maximize" },
        { name: "Custom Furniture & Joinery", desc: "Precision-milled storage, bespoke credenzas, luxury wardrobes", icon: "armchair" },
        { name: "Interior Finishing & Polishing", desc: "Artisanal polyurethane, veneer staining, metal plating & sealing", icon: "sparkles" }
      ]
    }
  },

  cncProcessSteps: [
    {
      step: "01",
      name: "Design & Concept",
      subtitle: "Customer idea, drawing, or reference",
      details: "We start from architectural drawings, 2D vectors (DWG/DXF), 3D CAD models, or physical reference photos. Our technical draftsmen convert concepts into precision engineering vectors.",
      tooling: "CAD Drafting • 3D Surface Modeling • Scale Verification",
      icon: "pen-tool"
    },
    {
      step: "02",
      name: "CNC Preparation",
      subtitle: "Digital model & toolpath preparation",
      details: "Using advanced CAM software, we generate high-precision toolpaths with optimized feeds, step-overs, and specialized cutter geometries to ensure ultra-smooth surface finishes and zero chipping.",
      tooling: "CAM Toolpathing • Multi-Axis Optimization • Collision Simulation",
      icon: "cpu"
    },
    {
      step: "03",
      name: "Precision Manufacturing",
      subtitle: "CNC machine produces the custom piece",
      details: "Our heavy-duty, high-accuracy CNC machines mill the selected stone, wood, acrylic, or Corian with micro-millimeter tolerance, cutting intricate 3D reliefs and complex profiles effortlessly.",
      tooling: "Multi-Axis Machining • High-Spindle RPM • Zero-Vibration Bed",
      icon: "settings"
    },
    {
      step: "04",
      name: "Artisanal Finishing",
      subtitle: "Surface treatment, detailing & finishing",
      details: "Trained craftsmen hand-sand, deburr, and buff carved profiles. Surfaces receive specialized seals, water-repellent stone coats, matte/gloss lacquer, or metal inlays according to specifications.",
      tooling: "Hand Buffing • Edge Profiling • Stone Sealing • PU Coating",
      icon: "sparkles"
    },
    {
      step: "05",
      name: "Seamless Installation",
      subtitle: "The finished element becomes part of the interior",
      details: "Our interior execution crew transports and mechanically anchors each CNC component on-site with laser-aligned precision, seamlessly integrating with lighting, joinery, and surrounding finishes.",
      tooling: "Laser Leveling • Concealed Fasteners • On-Site Integration",
      icon: "check-circle-2"
    }
  ],

  showcaseGallery: [
    {
      id: "cnc-stone-1",
      title: "3D Relief Carved Statuario Marble",
      category: "stone",
      categoryLabel: "3D Stone Carving",
      material: "Imported Statuario Italian Marble",
      technique: "Multi-pass 3D Ball-Nose CNC Milling",
      image: "assets/images/cnc_marble_carving.jpg",
      description: "Organic parametric wave relief carved directly into monolithic Italian marble for a luxury living room focal backdrop."
    },
    {
      id: "cnc-screen-1",
      title: "Geometric Brass-Tipped Jali Screen",
      category: "jali",
      categoryLabel: "Decorative Panels",
      material: "High-Density Moisture-Resistant HDF + Champagne Brass",
      technique: "Precision 2D Profile Cutting + 45° Chamfer",
      image: "assets/images/cnc_jali_partition.jpg",
      description: "Custom geometric partition screen dividing dining and lounge areas with integrated brass accents and backlit shadows."
    },
    {
      id: "cnc-wood-1",
      title: "Fluted Teak Architectural Baffles",
      category: "wood",
      categoryLabel: "Wood & Fluted Paneling",
      material: "Grade-A Natural Burmese Teak",
      technique: "Custom Radiused Tool Milling + Hand Oil Rub",
      image: "assets/images/cnc_fluted_paneling.jpg",
      description: "Precision CNC milled fluted wood paneling with concealed wire raceways and warm integrated linear cove lighting."
    },
    {
      id: "cnc-corian-1",
      title: "Backlit Thermoformed Corian Wall",
      category: "stone",
      categoryLabel: "3D Stone & Solid Surface",
      material: "Translucent Solid Surface / Corian",
      technique: "Variable Depth CNC Relief with LED Backlight",
      image: "assets/images/cnc_backlit_corian.jpg",
      description: "Subtle topographic carving that reveals glowing atmospheric gradient depth when backlit in luxury commercial and lounge spaces."
    },
    {
      id: "cnc-arch-1",
      title: "Heavy-Duty CNC Stone Milling Setup",
      category: "arch",
      categoryLabel: "In-House Manufacturing",
      material: "Italian Statuario Marble & Diamond Tooling",
      technique: "Multi-Axis CNC Milling with Flood Coolant Bed",
      image: "assets/images/cnc_pillar.jpg",
      description: "In-house precision CNC stone bridge machining with liquid coolant bed at our Jogeshwari facility, carving fluid 3D relief contours on clamped marble slabs."
    },
    {
      id: "cnc-panel-2",
      title: "Monolithic 3D CNC Marble Architectural Wall",
      category: "stone",
      categoryLabel: "3D Stone & Marble",
      material: "Imported Italian Statuario Marble & Dark Oak",
      technique: "Multi-Depth 3D Surface Profiling & Integrated LED Cove",
      image: "assets/images/hero_bg.jpg",
      description: "Monolithic precision-machined marble feature wall with fluid 3D relief contours and ambient cove lighting for luxury residential interiors in Mumbai."
    }
  ],

  projects: [
    {
      id: "proj-1",
      title: "Penthouse Suite — Altamount Road",
      category: "residential",
      categoryLabel: "Residential Turnkey",
      location: "Altamount Road, South Mumbai",
      scope: "Turnkey Interiors + Custom 3D CNC Travertine Wall",
      materials: "Travertine Stone, Smoked Oak, Champagne Bronze Trim",
      image: "assets/images/interior_pillar.jpg",
      description: "A 4,200 sq.ft luxury penthouse featuring an 18-foot monolithic CNC carved travertine wall, integrated cove lighting, and custom precision millwork."
    },
    {
      id: "proj-2",
      title: "Corporate Headquarters — BKC",
      category: "commercial",
      categoryLabel: "Commercial Interior",
      location: "Bandra Kurla Complex (BKC), Mumbai",
      scope: "Executive Boardroom, CNC Acoustic Paneling, Geometric Wood Wall",
      materials: "Acoustic Hardwood, Walnut Veneer, Brushed Brass",
      image: "assets/images/commercial_office.jpg",
      description: "Complete executive floor execution with custom geometric faceted wall paneling, integrated brass lighting, and custom boardroom table."
    },
    {
      id: "proj-3",
      title: "Sea-Facing Master Suite — Bandra West",
      category: "residential",
      categoryLabel: "Residential Interior",
      location: "Carter Road, Bandra West, Mumbai",
      scope: "Turnkey Bedroom, Fluted Teak Wall Cladding, Concealed Lighting",
      materials: "Natural Teak, Bronze Headboard, Engineered Oak",
      image: "assets/images/cnc_fluted_paneling.jpg",
      description: "Contemporary coastal luxury interior built with custom CNC fluted wooden transitions and warm vertical LED channels."
    },
    {
      id: "proj-4",
      title: "Signature 3D CNC Statuario Feature Wall",
      category: "cnc",
      categoryLabel: "CNC Manufacturing",
      location: "Juhu, Mumbai",
      scope: "3D CNC Stone Carving, Multi-Depth Wave Milling, Integrated Lighting",
      materials: "Imported Italian Statuario Marble & Concealed Fasteners",
      image: "assets/images/cnc_marble_carving.jpg",
      description: "Bespoke architectural statement wall crafted from imported Statuario marble with continuous fluid 3D wave toolpaths and concealed structural mounting."
    },
    {
      id: "proj-5",
      title: "Lounge & Reception Feature — Lower Parel",
      category: "commercial",
      categoryLabel: "Commercial Interior",
      location: "One Lodha Place, Lower Parel, Mumbai",
      scope: "Turnkey Fitout + CNC Backlit Corian Feature Wall",
      materials: "Translucent Corian, Dark Smoked Oak, Polished Terrazzo",
      image: "assets/images/cnc_backlit_corian.jpg",
      description: "Sleek private firm lounge delivered turnkey with custom CNC-carved illuminated Corian wall sculpture."
    },
    {
      id: "proj-6",
      title: "Luxury Duplex — Andheri West",
      category: "residential",
      categoryLabel: "Residential Turnkey",
      location: "Lokhandwala, Andheri West, Mumbai",
      scope: "Turnkey Renovation, CNC Geometric Screen, Full Millwork",
      materials: "Champagne Brass, Statuario Marble, Matt Polyurethane",
      image: "assets/images/cnc_jali_partition.jpg",
      description: "Total interior overhaul uniting living, dining, and private suites with custom geometric CNC divider screen and bespoke joinery."
    }
  ],

  timeline: [
    {
      year: "1970",
      title: "Construction Roots",
      badge: "Foundation",
      description: "Initial foundational experience in structural building, civil construction, and carpentry craftsmanship in Mumbai, laying 5+ decades of material expertise."
    },
    {
      year: "2012",
      title: "ArcTech Interior Established",
      badge: "Interior Vision",
      description: "Founded as a specialized interior execution brand dedicated to delivering tailored luxury spaces and high-detail finishes across Mumbai."
    },
    {
      year: "2019",
      title: "ArcTech Interior LLP",
      badge: "Corporate Scale",
      description: "Formally transitioned to an LLP, investing heavily in state-of-the-art multi-axis CNC machinery and precision digital toolpathing in Jogeshwari West, Mumbai."
    },
    {
      year: "TODAY",
      title: "Precision CNC + Premium Interiors",
      badge: "Current Milestone",
      description: "Operating a unified precision manufacturing facility and turnkey interior delivery team serving Mumbai's finest residences, offices, and custom architectural commissions."
    }
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.ARCTECH_DATA = ARCTECH_DATA;
}
