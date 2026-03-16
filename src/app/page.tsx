"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const NAV_ITEMS = [
  { id: "home", label: "홈" },
  { id: "why", label: "왜 트레킹네팔?" },
  { id: "courses", label: "트레킹 코스" },
  { id: "process", label: "진행 과정" },
  { id: "reviews", label: "후기" },
  { id: "faq", label: "자주 묻는 질문" },
  { id: "contact", label: "문의하기" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_ITEMS.map((item) =>
        document.getElementById(item.id)
      );
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top = element.offsetTop - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormStatus("success");
        setFormData({ name: "", phone: "", message: "" });
        setTimeout(() => setFormStatus("idle"), 4000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 4000);
      }
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center"
            >
              <Image
                src="/ChatGPT_Image_2026년_3월_16일_오후_02_38_33-removebg-preview.png"
                alt="트레킹네팔"
                width={160}
                height={50}
                className={`h-12 sm:h-24 lg:h-28 w-auto transition-all ${
                  scrolled ? "" : "brightness-0 invert"
                }`}
                priority
              />
            </button>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 xl:px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? "bg-primary text-white"
                      : scrolled
                      ? "text-gray-700 hover:bg-gray-100"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${
                scrolled ? "text-gray-700" : "text-white"
              }`}
              aria-label="메뉴 열기"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <div className="bg-white shadow-lg border-t px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-primary-dark to-gray-900" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-accent font-semibold text-sm sm:text-base mb-4 tracking-widest uppercase">
            Nepal Trekking Specialist
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            네팔 트레킹,
            <br />
            <span className="text-accent">아무에게나</span> 맡기지 마세요.
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            히말라야의 감동을 제대로 경험하려면, 전문가와 함께해야 합니다.
            <br className="hidden sm:block" />
            트레킹네팔이 안전하고 완벽한 여정을 만들어 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-accent hover:bg-amber-600 text-gray-900 font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-lg"
            >
              무료 상담 신청하기
            </button>
            <button
              onClick={() => scrollToSection("courses")}
              className="border-2 border-white/60 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full text-lg transition-all"
            >
              트레킹 코스 보기
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Why Trekking Nepal */}
      <section id="why" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              Why Trekking Nepal
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              히말라야를 <span className="text-primary">제대로</span> 가는 방법
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              네팔 트레킹은 여행이 아니라 &apos;준비&apos;입니다.
              <br />
              트레킹네팔만의 차별화된 서비스를 확인하세요.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🗺️",
                title: "맞춤형 코스 설계",
                desc: "체력, 경험, 일정에 맞춰 최적의 트레킹 코스를 설계해 드립니다. 무리 없는 일정으로 안전한 트레킹을 보장합니다.",
              },
              {
                icon: "🤝",
                title: "현지 전문 가이드",
                desc: "네팔 현지에서 오랜 경험을 갖춘 전문 가이드와 포터를 직접 연결해 드립니다. 언어 장벽 걱정 없이 소통 가능합니다.",
              },
              {
                icon: "✈️",
                title: "원스톱 예약 시스템",
                desc: "항공, 숙소, 퍼밋, 보험까지 한 번에 해결합니다. 복잡한 준비 과정을 트레킹네팔이 모두 대행합니다.",
              },
              {
                icon: "🏥",
                title: "안전 관리 시스템",
                desc: "고산병 대응 매뉴얼, 긴급 헬기 구조, 여행자 보험까지 철저한 안전 관리 시스템을 운영합니다.",
              },
              {
                icon: "💰",
                title: "합리적인 가격",
                desc: "중간 마진 없이 현지 직접 운영으로 합리적인 가격을 제공합니다. 숨겨진 추가 비용이 없습니다.",
              },
              {
                icon: "📞",
                title: "24시간 한국어 지원",
                desc: "출발 전부터 귀국까지, 24시간 한국어로 실시간 지원합니다. 어떤 상황에서도 든든한 동반자가 되어드립니다.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-gray-50 hover:bg-primary hover:shadow-xl transition-all duration-300"
              >
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 group-hover:text-white/85 leading-relaxed transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-lg"
            >
              지금 바로 상담받기
            </button>
          </div>
        </div>
      </section>

      {/* Trekking Courses */}
      <section id="courses" className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              Trekking Courses
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              인기 트레킹 코스
            </h2>
            <p className="text-gray-500 text-lg">
              언젠가 가고 싶은 히말라야, 지금 시작하세요.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "안나푸르나 베이스캠프 (ABC)",
                duration: "10~14일",
                difficulty: "중급",
                altitude: "4,130m",
                desc: "가장 인기 있는 코스. 다양한 지형과 문화를 경험하며 안나푸르나 설산의 파노라마를 감상할 수 있습니다.",
                image:
                  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
              },
              {
                name: "에베레스트 베이스캠프 (EBC)",
                duration: "12~16일",
                difficulty: "중상급",
                altitude: "5,364m",
                desc: "세계 최고봉 에베레스트를 가장 가까이에서 볼 수 있는 코스. 셰르파 문화와 장엄한 히말라야를 체험합니다.",
                image:
                  "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=600&q=80",
              },
              {
                name: "랑탕 밸리 트레킹",
                duration: "7~10일",
                difficulty: "초중급",
                altitude: "3,870m",
                desc: "카트만두에서 가장 가까운 트레킹 코스. 비교적 짧은 일정으로 히말라야의 진수를 경험할 수 있습니다.",
                image:
                  "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=600&q=80",
              },
              {
                name: "안나푸르나 서킷",
                duration: "15~21일",
                difficulty: "중상급",
                altitude: "5,416m",
                desc: "안나푸르나 산군을 한 바퀴 도는 클래식 루트. 토롱 라 패스를 넘는 도전적이고 감동적인 코스입니다.",
                image:
                  "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=600&q=80",
              },
              {
                name: "푼힐 전망대 트레킹",
                duration: "4~5일",
                difficulty: "초급",
                altitude: "3,210m",
                desc: "초보자에게 최적인 단기 코스. 푼힐 전망대에서 바라보는 안나푸르나와 다울라기리의 일출은 감동 그 자체입니다.",
                image:
                  "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=600&q=80",
              },
              {
                name: "마나슬루 서킷",
                duration: "14~18일",
                difficulty: "상급",
                altitude: "5,106m",
                desc: "세계 8위봉 마나슬루를 중심으로 한 오지 트레킹. 때묻지 않은 자연과 티베트 문화를 만날 수 있습니다.",
                image:
                  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
              },
            ].map((course, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-48 overflow-hidden">
                  <div
                    className="w-full h-full bg-gray-200 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url('${course.image}')` }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {course.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-primary-light text-primary font-medium px-3 py-1 rounded-full">
                      {course.duration}
                    </span>
                    <span className="text-xs bg-amber-50 text-amber-700 font-medium px-3 py-1 rounded-full">
                      {course.difficulty}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 font-medium px-3 py-1 rounded-full">
                      최고 {course.altitude}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {course.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">
              원하는 코스가 없으신가요? 맞춤 코스 설계도 가능합니다.
            </p>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-lg"
            >
              맞춤 코스 문의하기
            </button>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              Process
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              트레킹 진행 과정
            </h2>
            <p className="text-gray-500 text-lg">
              문의부터 트레킹 완료까지, 트레킹네팔이 함께합니다.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden sm:block" />

            {[
              {
                step: "01",
                title: "무료 상담 신청",
                desc: "문의폼 또는 전화로 원하시는 트레킹 일정, 코스, 인원 등을 알려주세요.",
              },
              {
                step: "02",
                title: "맞춤 일정 설계",
                desc: "상담 내용을 바탕으로 최적의 트레킹 일정과 코스를 설계해 제안드립니다.",
              },
              {
                step: "03",
                title: "예약 및 결제",
                desc: "일정이 확정되면 항공, 숙소, 퍼밋, 보험 등 모든 예약을 진행합니다.",
              },
              {
                step: "04",
                title: "출발 전 준비 가이드",
                desc: "트레킹 장비, 체력 관리, 고산병 예방 등 출발 전 필수 정보를 안내합니다.",
              },
              {
                step: "05",
                title: "트레킹 출발",
                desc: "현지 전문 가이드와 함께 안전하고 감동적인 히말라야 트레킹을 시작합니다.",
              },
              {
                step: "06",
                title: "안전한 귀국",
                desc: "트레킹 완료 후 안전하게 귀국하실 때까지 24시간 지원합니다.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`relative flex items-start mb-12 last:mb-0 ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                } gap-4 sm:gap-12`}
              >
                {/* Mobile step number */}
                <div className="flex sm:hidden w-10 h-10 bg-primary text-white rounded-full items-center justify-center font-bold text-sm shadow-lg shrink-0">
                  {item.step}
                </div>
                <div
                  className={`flex-1 ${
                    i % 2 === 0 ? "sm:text-right" : "sm:text-left"
                  }`}
                >
                  <div
                    className={`bg-gray-50 p-5 sm:p-6 rounded-2xl inline-block ${
                      i % 2 === 0 ? "sm:ml-auto" : "sm:mr-auto"
                    }`}
                  >
                    <span className="text-primary font-bold text-sm">
                      STEP {item.step}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
                {/* Desktop step number */}
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-primary text-white rounded-full items-center justify-center font-bold text-sm shadow-lg z-10">
                  {item.step}
                </div>
                <div className="flex-1 hidden sm:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-primary-dark to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1920&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            언젠가 가고 싶은 히말라야,
            <br />
            <span className="text-accent">지금 시작하세요.</span>
          </h2>
          <p className="text-white/80 text-lg mb-8">
            망설이는 시간이 길어질수록 히말라야는 멀어집니다.
            <br />
            트레킹네팔과 함께 첫 걸음을 내딛으세요.
          </p>
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-accent hover:bg-amber-600 text-gray-900 font-bold px-10 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-lg"
          >
            무료 상담 신청하기
          </button>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              Reviews
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              트레킹 후기
            </h2>
            <p className="text-gray-500 text-lg">
              트레킹네팔과 함께한 분들의 생생한 이야기
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "김○수",
                course: "안나푸르나 베이스캠프",
                text: "처음 트레킹이라 걱정이 많았는데, 꼼꼼한 준비 덕분에 안전하게 다녀왔습니다. 가이드분도 너무 친절하고 전문적이었어요. 인생 최고의 경험이었습니다!",
                rating: 5,
              },
              {
                name: "박○영",
                course: "에베레스트 베이스캠프",
                text: "에베레스트를 직접 눈앞에서 보는 감동은 말로 표현할 수 없어요. 고산병 걱정이 있었는데 사전 관리가 철저해서 무사히 완주했습니다.",
                rating: 5,
              },
              {
                name: "이○민",
                course: "랑탕 밸리",
                text: "짧은 일정이라 부담 없이 다녀왔어요. 생각보다 훨씬 아름다운 풍경에 감동받았고, 다음에는 안나푸르나에 꼭 도전하려고 합니다!",
                rating: 5,
              },
              {
                name: "최○연",
                course: "안나푸르나 서킷",
                text: "토롱 라 패스를 넘었을 때의 감동은 평생 잊지 못할 것 같아요. 21일간의 여정이 힘들었지만, 트레킹네팔 덕분에 포기하지 않고 완주할 수 있었습니다. 정말 감사합니다!",
                rating: 5,
              },
              {
                name: "정○성",
                course: "에베레스트 베이스캠프",
                text: "40대 후반에 도전한 EBC 트레킹. 체력이 걱정됐는데, 맞춤 일정 덕분에 무리 없이 다녀왔습니다. 고도 순응 일정이 정말 잘 짜여져 있어서 고산병 없이 완주했어요.",
                rating: 5,
              },
              {
                name: "한○희",
                course: "푼힐 전망대",
                text: "혼자 참가했는데 전혀 외롭지 않았어요. 가이드분이 가족처럼 챙겨주셔서 편안하게 트레킹할 수 있었습니다. 푼힐에서 본 일출은 제 인생 최고의 순간이에요!",
                rating: 5,
              },
              {
                name: "송○호",
                course: "마나슬루 서킷",
                text: "관광객이 적은 오지 트레킹을 원했는데 마나슬루 서킷이 딱이었습니다. 티베트 문화권의 독특한 마을들과 때묻지 않은 자연이 정말 인상적이었어요.",
                rating: 5,
              },
              {
                name: "윤○현",
                course: "안나푸르나 베이스캠프",
                text: "친구 4명이서 함께 갔는데, 모두 대만족이었어요. 숙소, 식사, 이동 모든 게 깔끔하게 준비되어 있어서 트레킹에만 집중할 수 있었습니다. 다음에도 꼭 트레킹네팔로!",
                rating: 5,
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j} className="text-accent text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-gray-900">{review.name}</p>
                  <p className="text-sm text-primary">{review.course}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              자주 묻는 질문
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "트레킹 경험이 없어도 참여할 수 있나요?",
                a: "네, 물론입니다! 초보자도 참여 가능한 코스가 다양하게 준비되어 있습니다. 푼힐 전망대 코스(4~5일)는 특별한 트레킹 경험 없이도 충분히 즐기실 수 있으며, 체력 수준에 맞춰 코스를 설계해 드립니다.",
              },
              {
                q: "비용은 어느 정도인가요?",
                a: "코스, 기간, 인원에 따라 달라지지만, 보통 10~14일 기준 150~300만원 수준입니다. 항공권, 숙박, 식사, 가이드, 퍼밋, 보험 등이 모두 포함된 가격이며, 숨겨진 추가 비용은 없습니다. 정확한 견적은 무료 상담을 통해 안내해 드립니다.",
              },
              {
                q: "고산병이 걱정됩니다. 괜찮을까요?",
                a: "고산병은 누구에게나 발생할 수 있지만, 적절한 고도 순응 일정과 사전 준비로 충분히 예방 가능합니다. 트레킹네팔은 고산병 대응 매뉴얼에 따라 일정을 설계하며, 비상시 헬기 구조 서비스도 운영하고 있습니다.",
              },
              {
                q: "언제가 트레킹 최적 시기인가요?",
                a: "네팔 트레킹의 최적 시기는 봄(3~5월)과 가을(9~11월)입니다. 이 시기에는 맑은 날씨와 선명한 히말라야 조망을 기대할 수 있습니다. 시기별 추천 코스는 상담 시 상세히 안내해 드립니다.",
              },
              {
                q: "혼자서도 참여 가능한가요?",
                a: "네, 1인 참가도 가능합니다. 개인 맞춤 트레킹을 진행하거나, 비슷한 일정의 다른 트레커와 소규모 그룹으로 편성해 드릴 수도 있습니다.",
              },
            ].map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">더 궁금한 점이 있으신가요?</p>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-lg"
            >
              문의하기
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section
        id="contact"
        className="py-20 sm:py-28 bg-gradient-to-br from-gray-50 to-primary-light"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              Contact Us
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              무료 상담 신청
            </h2>
            <p className="text-gray-500 text-lg">
              네팔 트레킹에 관한 모든 것, 부담 없이 문의해 주세요.
              <br />
              빠른 시간 내에 연락드리겠습니다.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-xl"
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  연락처
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-900"
                  placeholder="010-0000-0000"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  문의 내용
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-gray-900"
                  placeholder="관심 있는 트레킹 코스, 희망 일정, 인원 수 등을 자유롭게 적어주세요."
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white font-bold py-4 rounded-xl text-lg transition-all hover:scale-[1.02] shadow-lg disabled:hover:scale-100"
              >
                {formStatus === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    전송 중...
                  </span>
                ) : (
                  "상담 신청하기"
                )}
              </button>

              <a
                href="http://pf.kakao.com/_KkxaxhX/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#FEE500] hover:bg-[#F0D800] text-gray-900 font-bold py-4 rounded-xl text-lg transition-all hover:scale-[1.02] shadow-lg text-center block"
              >
                카카오톡 상담하기
              </a>

              {formStatus === "success" && (
                <div className="text-center p-4 bg-primary-light rounded-xl">
                  <p className="text-primary font-semibold">
                    문의가 성공적으로 접수되었습니다!
                  </p>
                  <p className="text-primary/70 text-sm mt-1">
                    빠른 시간 내에 연락드리겠습니다.
                  </p>
                </div>
              )}

              {formStatus === "error" && (
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <p className="text-red-600 font-semibold">
                    전송에 실패했습니다. 잠시 후 다시 시도해주세요.
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/ChatGPT_Image_2026년_3월_16일_오후_02_38_33-removebg-preview.png"
                alt="트레킹네팔"
                width={200}
                height={60}
                className="h-24 sm:h-32 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm">
              네팔 히말라야 트레킹 전문 여행사
            </p>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="text-center text-gray-500 text-sm space-y-1">
              <p className="hidden sm:block">
                상호: 제이코리아 | 대표: 이주영 | 사업자등록번호: 278-30-01540
              </p>
              <div className="sm:hidden space-y-0.5">
                <p>상호: 제이코리아</p>
                <p>대표: 이주영</p>
                <p>사업자등록번호: 278-30-01540</p>
              </div>
              <p className="mt-1">주소: 인천광역시 계양구 오조산로57번길 15, 7층 7106호</p>
              <p className="mt-4 text-gray-600">
                &copy; {new Date().getFullYear()} 트레킹네팔. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Kakao Chat Floating Button */}
      <a
        href="https://pf.kakao.com/_KkxaxhX/chat"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-xl hover:scale-110 transition-transform hover:shadow-2xl"
        aria-label="카카오톡 상담"
      >
        <Image
          src="/카톡_원형_로고.png"
          alt="카카오톡 상담"
          width={64}
          height={64}
          className="w-full h-full rounded-full"
        />
      </a>
    </>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <p className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-600 text-sm sm:text-base leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
