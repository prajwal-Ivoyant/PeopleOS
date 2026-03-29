import React, { useState } from "react";
import {
  Layout, Typography, Button, Card, Tag, Progress,
  ConfigProvider, theme, Rate, Timeline, Space, Row, Col, Tabs, Steps,
} from "antd";
import {
  TeamOutlined, SearchOutlined, PlusOutlined, CheckCircleOutlined,
  EditOutlined, SwapOutlined, BulbOutlined, RocketOutlined,
  GithubOutlined, FilterOutlined, SafetyCertificateOutlined,
  StarOutlined, ArrowRightOutlined, HomeOutlined, UserOutlined,
} from "@ant-design/icons";

import dashboard from "../public/dashboard.png";
import empDetail from "../public/empDetails.png";
import addEmp    from "../public/addEmp.png";
import editImg   from "../public/editImg.png";
import "./LandingPage.css";

const { Header, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

// ─── THEME ───────────────────────────────────────────────────────────────────
const THEME = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary:       "#1677ff",
    colorBgBase:        "#0d0f14",
    colorBgContainer:   "#13161e",
    borderRadius:       12,
    fontFamily:         "'DM Sans', sans-serif",
    colorBorder:        "rgba(255,255,255,0.08)",
    colorText:          "#e8eaf0",
    colorTextSecondary: "rgba(232,234,240,0.55)",
  },
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const APP_URL    = "/dashboard";
const GITHUB_URL = "https://github.com/prajwal-Ivoyant/PeopleOS";

const FEATURES = [
  { icon: <TeamOutlined />,             bg: "rgba(22,119,255,0.12)",  color: "#1677ff", title: "Employee Directory", desc: "View every employee in a clean card grid with role, department, salary, join date, and live status at a glance." },
  { icon: <SearchOutlined />,           bg: "rgba(34,211,238,0.12)",  color: "#22d3ee", title: "Search & Sort",       desc: "Instantly search by name or role. Sort alphabetically or by any field to find exactly who you need in seconds." },
  { icon: <FilterOutlined />,           bg: "rgba(163,230,53,0.12)",  color: "#a3e635", title: "Department Filters",  desc: "Filter by Cloud, SWE, Product, HR, and more. Sidebar navigation makes switching between views instant." },
  { icon: <SwapOutlined />,             bg: "rgba(163,230,53,0.12)",  color: "#a3e635", title: "Status Toggles",      desc: "Toggle active/inactive with one click. Color-coded badges keep your roster clearly organized." },
  { icon: <SafetyCertificateOutlined />,bg: "rgba(244,63,94,0.12)",   color: "#f43f5e", title: "Detailed Profiles",   desc: "View full employee info — name, email, phone, department, role, salary, and join date in a polished modal." },
  { icon: <BulbOutlined />,             bg: "rgba(251,191,36,0.12)",  color: "#fbbf24", title: "Dark & Light Mode",   desc: "Fully themed UI that toggles between sleek dark mode and a clean light mode. Your eyes will thank you." },
];

const DEPARTMENTS = [
  { name: "Cloud",   pct: 28, from: "#1677ff", to: "#22d3ee" },
  { name: "SWE",     pct: 40, from: "#22d3ee", to: "#0ea5e9" },
  { name: "Product", pct: 18, from: "#a3e635", to: "#22d3ee" },
  { name: "HR",      pct: 14, from: "#f43f5e", to: "#fb923c" },
];

const TIMELINE_ITEMS = [
  { color: "#1677ff", name: "Aman",   role: "Cloud Architect",    dept: "Cloud",   salary: "₹1,60,000", joined: "2016-12-09" },
  { color: "#22d3ee", name: "Ananya", role: "Product Manager",    dept: "Product", salary: "₹1,50,000", joined: "2017-08-22" },
  { color: "#a3e635", name: "Aria",   role: "Senior Engineer",    dept: "SWE",     salary: "₹1,20,000", joined: "2021-03-01" },
  { color: "#fbbf24", name: "Chris",  role: "Frontend Developer", dept: "SWE",     salary: "₹1,10,000", joined: "2022-06-15" },
];

const SHOWCASE_TABS = [
  {
    key: "details", label: <Space><UserOutlined />Employee Details</Space>,
    heading: "Every detail,\none click away",
    body:    "Click 'View Details' on any card to open a full profile. See everything, edit anything, or toggle their status — all from one clean modal.",
    checks:  ["Full name, email, phone number", "Department, role, and salary", "Join date and employment status", "In-place editing with Edit button", "Delete or Toggle status instantly"],
    image: empDetail, imgAlt: "Employee Details", barLabel: "Employee Details",
  },
  {
    key: "add", label: <Space><PlusOutlined />Add Employee</Space>,
    heading: "Add employees\nin seconds",
    body:    "Hit '+ Add Employee' to open a clean form modal. Fill in the details and save — the new employee instantly appears in your directory.",
    checks:  ["Full name and email required", "Department dropdown selection", "Active / Inactive on creation", "Date picker for join date", "Salary field with instant save"],
    image: addEmp, imgAlt: "Add Employee", barLabel: "Add Employee Details",
  },
  {
    key: "manage", label: <Space><EditOutlined />Manage Employees</Space>,
    heading: "Edit, update &\nmanage effortlessly",
    body:    "Modify employee details anytime, toggle their status, or remove them from the system — all from a single intuitive interface.",
    checks:  ["Edit employee details instantly", "Save or cancel changes easily", "Toggle active/inactive status", "Delete employee with confirmation", "Real-time updates in directory"],
    image: editImg, imgAlt: "Manage Employees", barLabel: "Edit & Delete Employee",
  },
];

const STEPS = [
  { title: "Open the App",    description: "Launch PeopleOS and land on your full employee directory instantly",     icon: <HomeOutlined /> },
  { title: "Filter & Search", description: "Use the sidebar and search bar to find exactly who you're looking for", icon: <SearchOutlined /> },
  { title: "Manage & Edit",   description: "View profiles, edit records, toggle status, or remove employees",       icon: <EditOutlined /> },
];

const MARQUEE_TAGS = [
  "Employee Management", "Department Filtering", "Salary Tracking", "Status Toggles",
  "Search & Sort", "Dark & Light Mode", "Add New Employee", "Edit Profiles",
  "Ant Design Components", "React + TypeScript",
];

const FOOTER_LINKS = ["Features", "Contact"];

// ─── ATOMS ────────────────────────────────────────────────────────────────────

const ScreenMock = ({ title, children }) => (
  <div className="screen-mock">
    <div className="screen-bar">
      
      <Text className="screen-bar__label">{title}</Text>
    </div>
    {children}
  </div>
);

const SectionHeader = ({ tag, title, subtitle, center }) => (
  <div className={center ? "section-hd section-hd--center" : "section-hd"}>
    <Text className="section-tag">{tag}</Text>
    <Title className="section-title">{title}</Title>
    {subtitle && <Paragraph className="section-sub">{subtitle}</Paragraph>}
  </div>
);

const CheckItem = ({ children }) => (
  <div className="check-item">
    <span className="check-badge"><CheckCircleOutlined /></span>
    <Text className="check-label">{children}</Text>
  </div>
);

// ─── SECTIONS ─────────────────────────────────────────────────────────────────

const NavBar = () => (
  <Header className="nav-header">
    <div className="container nav-inner">
      <div className="logo">
        <div className="logo-mark"><TeamOutlined /></div>
        People<span className="accent">OS</span>
      </div>
      <Button type="primary" icon={<ArrowRightOutlined />} className="nav-btn"
        onClick={() => (window.location.href = APP_URL)}>
        Go to App
      </Button>
    </div>
  </Header>
);

const Hero = () => (
  <section className="section">
    <div className="container">
      <Row gutter={[60, 40]} align="middle">
        <Col xs={24} lg={12} className="fade-up">
          <Tag className="hero-badge" icon={<StarOutlined />}>Now with Smart Department Filtering</Tag>
          <Title className="hero-title">
            The smarter way<br />to manage <span className="grad">your people</span>
          </Title>
          <Paragraph className="hero-para">
            PeopleOS brings all your employee data into one clean, fast, beautifully designed system.
            Add, view, filter, and manage — without the chaos.
          </Paragraph>
          <Space size={14} style={{ marginTop: 8 }}>
            <Button type="primary" size="large" icon={<RocketOutlined />} className="btn-lg btn-lg--primary"
              onClick={() => (window.location.href = APP_URL)}>Go to App</Button>
            <Button size="large" icon={<GithubOutlined />} ghost className="btn-lg btn-lg--ghost"
              onClick={() => window.open(GITHUB_URL, "_blank")}>GitHub</Button>
          </Space>
        </Col>
        <Col xs={24} lg={12} className="fade-up fade-d1">
          <ScreenMock title="PeopleOS — All Employees">
            <img src={dashboard} alt="PeopleOS Dashboard" className="preview-img" />
          </ScreenMock>
        </Col>
      </Row>
    </div>
  </section>
);

const Marquee = () => (
  <div className="marquee-wrap">
    <div className="marquee-track">
      {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((t, i) => (
        <Tag key={i} className="marquee-tag">● {t}</Tag>
      ))}
    </div>
  </div>
);

const Features = () => (
  <section className="section">
    <div className="container">
      <SectionHeader
        tag="✦ Core Features"
        title={<>Everything you need.<br />Nothing you don't.</>}
        subtitle="Designed to stay out of your way while keeping every employee detail organized and instantly accessible."
      />
      <Row gutter={[20, 20]} style={{ marginTop: 52 }}>
        {FEATURES.map(f => (
          <Col xs={24} sm={12} lg={8} key={f.title}>
            <Card className="feat-card">
              <div className="feat-icon" style={{ background: f.bg, color: f.color }}>{f.icon}</div>
              <Title level={4} className="feat-title">{f.title}</Title>
              <Paragraph className="feat-desc">{f.desc}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  </section>
);

const DeptBreakdown = () => (
  <section className="section section--sm">
    <div className="container">
      <Row gutter={[40, 40]} align="middle">
        <Col xs={24} lg={10}>
          <SectionHeader
            tag="✦ By the Numbers"
            title={<>Your workforce,<br />at a glance.</>}
            subtitle="Real-time counts across departments, statuses, and salary bands — all from the sidebar."
          />
          <Space direction="vertical" style={{ width: "100%", marginTop: 28 }} size={16}>
            {DEPARTMENTS.map(d => (
              <div key={d.name}>
                <Row justify="space-between" style={{ marginBottom: 6 }}>
                  <Text className="dept-name">{d.name}</Text>
                  <Text className="text-muted">{d.pct}%</Text>
                </Row>
                <Progress className="dept-bar" percent={d.pct} showInfo={false}
                  strokeColor={{ from: d.from, to: d.to }} trailColor="rgba(255,255,255,0.05)"
                  strokeLinecap="round" size={["100%", 6]} />
              </div>
            ))}
          </Space>
        </Col>
        <Col xs={24} lg={14}>
          <Card className="card-base">
            <Timeline className="timeline" items={TIMELINE_ITEMS.map(e => ({
              color: e.color,
              children: (
                <>
                  <Text className="tl-name">{e.name} joined as {e.role}</Text><br />
                  <Text className="text-muted" style={{ fontSize: 12 }}>
                    {e.joined} · {e.dept} · {e.salary}
                  </Text>
                </>
              ),
            }))} />
          </Card>
        </Col>
      </Row>
    </div>
  </section>
);

const Showcase = () => {
  const [active, setActive] = useState(SHOWCASE_TABS[0].key);
  const tab = SHOWCASE_TABS.find(t => t.key === active);
  if (!tab) return null;
  return (
    <div className="showcase-wrap">
      <div className="container">
        <SectionHeader tag="✦ In Action" title={<>See PeopleOS<br />up close.</>}
          subtitle="Explore how managing employees becomes effortless" />
        <Tabs className="showcase-tabs" style={{ marginTop: 32, marginBottom: 32 }}
          activeKey={active} onChange={setActive}
          items={SHOWCASE_TABS.map(({ key, label }) => ({ key, label }))} />
        <Row gutter={[48, 40]} align="middle">
          <Col xs={24} lg={12}>
            <Title level={2} className="showcase-h">
              {tab.heading.split("\n").map((l, i) => (
                <React.Fragment key={i}>{l}{i === 0 && <br />}</React.Fragment>
              ))}
            </Title>
            <Paragraph className="showcase-body">{tab.body}</Paragraph>
            <Space direction="vertical" size={10} style={{ width: "100%" }}>
              {tab.checks.map(c => <CheckItem key={c}>{c}</CheckItem>)}
            </Space>
          </Col>
          <Col xs={24} lg={12}>
            <ScreenMock title={tab.barLabel}>
              <img src={tab.image} alt={tab.imgAlt} className="preview-img" />
            </ScreenMock>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const HowItWorks = () => (
  <section className="section steps-section">
    <div className="container container--narrow">
      <SectionHeader tag="✦ How It Works" title="Up and running in minutes"
        subtitle="Four simple steps. No training. No manual. Just open and go." center />
      <Steps className="steps" current={1} labelPlacement="vertical"
        items={STEPS} style={{ marginTop: 52 }} />
    </div>
  </section>
);

const Rating = () => (
  <section className="section section--sm">
    <div className="container container--xs">
      <Card className="card-base rating-card">
        <Text className="rating-eyebrow">Crafted with care</Text>
        <Rate className="rating-stars" defaultValue={5} disabled />
        <Title level={4} className="rating-quote">
          "PeopleOS made employee tracking actually enjoyable."
        </Title>
        <Text className="text-muted">— Built for teams who care about clarity, speed, and great design.</Text>
      </Card>
    </div>
  </section>
);

const CTA = () => (
  <section className="section cta-section">
    <div className="container cta-inner">
      <Title className="cta-title">Your team is waiting<br />to be organized.</Title>
      <Paragraph className="cta-sub">
        Stop juggling spreadsheets. PeopleOS is built for teams who care about clarity and speed.
      </Paragraph>
      <Space size={16} wrap style={{ justifyContent: "center" }}>
        <Button type="primary" size="large" icon={<RocketOutlined />}
          className="btn-lg btn-lg--primary btn-lg--xl"
          onClick={() => (window.location.href = APP_URL)}>Go to App</Button>
        <Button size="large" icon={<GithubOutlined />} ghost
          className="btn-lg btn-lg--ghost btn-lg--xl"
          onClick={() => window.open(GITHUB_URL, "_blank")}>View on GitHub</Button>
      </Space>
    </div>
  </section>
);

const SiteFooter = () => (
  <Footer className="site-footer">
    <div className="container footer-inner">
      <div className="logo">
        <div className="logo-mark logo-mark--sm"><TeamOutlined /></div>
        People<span className="accent">OS</span>
      </div>
      <Text className="text-muted" style={{ fontSize: 13 }}>
        © 2026 PeopleOS — Built by <span className="accent">Prajwal</span>
      </Text>
      <Space size={20}>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
        {FOOTER_LINKS.map(l => <Text key={l} className="footer-link">{l}</Text>)}
      </Space>
    </div>
  </Footer>
);

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function PeopleOSLanding() {
  return (
    <ConfigProvider theme={THEME}>
      <div className="page-bg">
        <NavBar />
        <Hero />
        <Marquee />
        <Features />
        <DeptBreakdown />
        <Showcase />
        <HowItWorks />
        <Rating />
        <CTA />
        <SiteFooter />
      </div>
    </ConfigProvider>
  );
}