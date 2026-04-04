import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { type Review, useApp } from "@/context/AppContext";
import {
  ArrowRight,
  Award,
  Banknote,
  BookOpen,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  GraduationCap,
  Heart,
  HeartHandshake,
  HomeIcon,
  Leaf,
  MapPin,
  Shield,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ICON_MAP: Record<string, React.ElementType> = {
  GraduationCap,
  BookOpen,
  Banknote,
  Heart,
  Users,
  MapPin,
  Award,
  Clock,
  Leaf,
  Shield,
  Star,
  Zap,
  HomeIcon,
  Briefcase,
  Globe,
  Home: HomeIcon,
  HeartHandshake,
  ArrowRight,
};

function getIcon(name: string): React.ElementType {
  return ICON_MAP[name] ?? Star;
}

// ---- Reviews Section ----
const AVATAR_COLORS = [
  "bg-green-500",
  "bg-orange-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-red-500",
  "bg-teal-500",
  "bg-pink-500",
  "bg-yellow-500",
];

function StarDisplay({ stars, size = 16 }: { stars: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{ fontSize: size, color: s <= stars ? "#f59e0b" : "#d1d5db" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewsSection({
  reviews,
  addReview,
}: {
  reviews: Review[];
  addReview: (r: Review) => void;
}) {
  const approvedReviews = reviews.filter((r) => r.isApproved).slice(0, 6);
  const [showForm, setShowForm] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewStars, setReviewStars] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim()) return;
    const randomColor =
      AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
    addReview({
      id: `rv${Date.now()}`,
      name: reviewName.trim(),
      profileInitial: reviewName.trim()[0].toUpperCase(),
      avatarColor: randomColor,
      stars: reviewStars,
      text: reviewText.trim(),
      date: new Date().toISOString().split("T")[0],
      isApproved: false,
    });
    setReviewName("");
    setReviewStars(5);
    setReviewText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setShowForm(false);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <Badge className="bg-yellow-100 text-yellow-700 mb-3">
          Testimonials
        </Badge>
        <h2 className="text-3xl font-extrabold text-gray-900">
          What People Say
        </h2>
        <p className="text-gray-500 mt-2">
          Real stories from real beneficiaries
        </p>
      </div>
      {approvedReviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {approvedReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              data-ocid={`reviews.item.${idx + 1}`}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border border-gray-100">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${review.avatarColor}`}
                    >
                      {review.profileInitial}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">
                        {review.name}
                      </div>
                      <StarDisplay stars={review.stars} size={14} />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="text-xs text-gray-400 mt-3">
                    {new Date(review.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mb-10">
          No reviews yet. Be the first to share your experience!
        </p>
      )}

      {submitted && (
        <div className="text-center mb-4 text-green-600 font-semibold bg-green-50 py-3 rounded-lg">
          ✅ Thank you for your review! It will appear after admin approval.
        </div>
      )}

      <div className="text-center">
        <Button
          variant="outline"
          className="border-ngo-green text-ngo-green hover:bg-green-50"
          onClick={() => setShowForm(!showForm)}
          data-ocid="reviews.open_modal_button"
        >
          {showForm ? "Close" : "Write a Review"}
        </Button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-6 max-w-xl mx-auto"
        >
          <Card className="border-ngo-green/30">
            <CardContent className="p-6">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">
                Share Your Experience
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="review-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Name *
                  </label>
                  <input
                    id="review-name"
                    type="text"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Enter your name"
                    required
                    data-ocid="reviews.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="review-rating"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Rating *
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setReviewStars(s)}
                        style={{
                          fontSize: 28,
                          color: s <= reviewStars ? "#f59e0b" : "#d1d5db",
                        }}
                        className="hover:scale-110 transition-transform"
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="review-text"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Review *
                  </label>
                  <Textarea
                    id="review-text"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience with DMVV Foundation..."
                    rows={4}
                    required
                    data-ocid="reviews.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-ngo-green hover:bg-green-700 text-white"
                  data-ocid="reviews.submit_button"
                >
                  Submit Review
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </section>
  );
}

// ---- Image Slider Component ----
function HeroSlider({
  slides,
  children,
}: {
  slides: { id: string; imageUrl: string; title: string; subtitle: string }[];
  children: React.ReactNode;
}) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      if (transitioning || index === current) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setTransitioning(false);
      }, 400);
    },
    [transitioning, current],
  );

  const prev = useCallback(() => {
    goTo((current - 1 + total) % total);
  }, [current, total, goTo]);

  const next = useCallback(() => {
    goTo((current + 1) % total);
  }, [current, total, goTo]);

  // Auto-loop every 4 seconds
  useEffect(() => {
    if (total <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total]);

  const slide = slides[current] ?? slides[0];

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: i === current ? 1 : 0,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('${s.imageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
      ))}

      {/* Slide title/subtitle overlay at bottom */}
      {total > 0 && (
        <div
          className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-1 z-10 pointer-events-none px-4"
          style={{ opacity: transitioning ? 0 : 1, transition: "opacity 0.4s" }}
        >
          {slide.title && (
            <div className="bg-black/40 backdrop-blur-sm rounded-xl px-6 py-2 text-center max-w-2xl">
              <div className="text-white font-bold text-xl md:text-2xl drop-shadow">
                {slide.title}
              </div>
              {slide.subtitle && (
                <div className="text-green-200 text-sm md:text-base mt-1">
                  {slide.subtitle}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Arrow controls */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full p-2 text-white transition"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full p-2 text-white transition"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {total > 1 && (
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-20">
          {slides.map((s, i) => (
            <button
              type="button"
              key={s.id}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-3 bg-white"
                  : "w-3 h-3 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}

export default function Home() {
  const {
    news,
    homeHero,
    homeStats,
    homeInitiatives,
    homeImpactStories,
    homeCTA,
    communityCenters,
    youtubeVideos,
    sliderImages,
    reviews,
    addReview,
    homeCards,
  } = useApp();

  const latestNews = news.filter((n) => n.isPublished).slice(0, 3);
  const activeStats = homeStats
    .filter((s) => s.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const activeInitiatives = homeInitiatives
    .filter((i) => i.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const activeImpactStories = homeImpactStories
    .filter((s) => s.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const activeYouTubeVideos = youtubeVideos
    .filter((v) => v.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const featuredCenterImage =
    communityCenters.find((c) => c.isActive)?.imageUrl ||
    "/assets/generated/community-center.dim_600x400.jpg";

  const activeSlides = (sliderImages ?? [])
    .filter((s) => s.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  // Fallback slide if admin hasn't added any
  const slides =
    activeSlides.length > 0
      ? activeSlides
      : [
          {
            id: "default",
            imageUrl:
              "/assets/generated/hero-women-empowerment.dim_1400x700.jpg",
            title: "Empowering Women Across India",
            subtitle:
              "Building skills, livelihoods and dignity for every woman",
            isActive: true,
            sortOrder: 1,
          },
        ];

  return (
    <main>
      {/* Hero Slider */}
      <HeroSlider slides={slides}>
        <div className="max-w-7xl mx-auto px-4 w-full py-16 flex flex-col lg:flex-row items-center gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-white"
          >
            <Badge className="bg-ngo-orange text-white mb-4 text-sm px-3 py-1">
              Women Empowerment
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5 whitespace-pre-line">
              {homeHero.heading.split("\n").map((line) =>
                line.includes("Transform") || line.includes("India") ? (
                  <span key={line} className="text-ngo-orange">
                    {line}
                  </span>
                ) : (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ),
              )}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl leading-relaxed">
              {homeHero.subheading}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/about">
                <Button
                  size="lg"
                  className="bg-ngo-orange text-white hover:bg-ngo-orange-dark font-semibold"
                  data-ocid="hero.primary_button"
                >
                  {homeHero.primaryBtnText}{" "}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                  data-ocid="hero.secondary_button"
                >
                  {homeHero.secondaryBtnText}
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full lg:w-80 xl:w-96"
          >
            <Card className="bg-white shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-ngo-green text-white px-5 py-3">
                  <h3 className="font-bold text-sm">Our Core Initiatives</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 p-4">
                  {activeInitiatives.map((item) => {
                    const Icon = getIcon(item.iconName);
                    return (
                      <div
                        key={item.id}
                        className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl"
                        data-ocid={`initiatives.item.${item.sortOrder}`}
                      >
                        <Icon size={28} className={item.color} />
                        <span className="text-xs font-medium text-gray-700 mt-2">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t px-5 py-3">
                  <div className="font-semibold text-sm text-gray-800 mb-3">
                    Impact Stories
                  </div>
                  <div className="space-y-2">
                    {activeImpactStories.map((story) => (
                      <div
                        key={story.id}
                        className={`flex items-center gap-3 p-2 ${story.bgColor} rounded-lg`}
                        data-ocid={`impact_stories.item.${story.sortOrder}`}
                      >
                        <img
                          src={story.imageUrl}
                          className="w-10 h-10 object-cover rounded-lg"
                          alt={story.title}
                        />
                        <div>
                          <div className="text-xs font-semibold text-gray-800">
                            {story.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {story.subtitle}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </HeroSlider>

      {/* Stats Strip */}
      <section className="relative -mt-10 z-10 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-xl rounded-2xl">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  {activeStats.map((stat) => {
                    const Icon = getIcon(stat.iconName);
                    return (
                      <div
                        key={stat.id}
                        className="flex flex-col items-center"
                        data-ocid={`stats.item.${stat.sortOrder}`}
                      >
                        <Icon size={28} className={stat.color} />
                        <div
                          className={`text-3xl font-extrabold mt-2 ${stat.color}`}
                        >
                          {stat.number}
                        </div>
                        <div className="text-sm text-gray-600 mt-1 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* About Preview - Community Center image */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={
                featuredCenterImage ||
                "/assets/generated/community-center.dim_600x400.jpg"
              }
              alt="Community Center"
              className="rounded-2xl shadow-lg w-full object-cover h-72 md:h-80"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-green-100 text-ngo-green mb-3">About Us</Badge>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              A Decade of Transforming Lives
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded over a decade ago, DMVV Bhartiy Mahila Shakti Foundation
              has been at the forefront of women's empowerment in India. We
              believe that when women thrive, families flourish and communities
              transform.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our integrated approach addresses education, skill development,
              financial inclusion, healthcare, and legal rights — creating
              holistic opportunities for women from all backgrounds.
            </p>
            <Link to="/about">
              <Button
                className="bg-ngo-green text-white hover:bg-ngo-green-dark"
                data-ocid="about_preview.primary_button"
              >
                Know More <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* YouTube Videos Section */}
      {activeYouTubeVideos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <Badge className="bg-red-100 text-red-600 mb-3">YouTube</Badge>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Watch &amp; Learn
            </h2>
            <p className="text-gray-500 mt-2">
              Videos from our programs and events
            </p>
          </div>
          {activeYouTubeVideos.length === 1 ? (
            <div className="max-w-3xl mx-auto">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full rounded-2xl shadow-xl"
                  src={`https://www.youtube.com/embed/${activeYouTubeVideos[0].youtubeId}`}
                  title={activeYouTubeVideos[0].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-4 text-center">
                {activeYouTubeVideos[0].title}
              </h3>
              {activeYouTubeVideos[0].description && (
                <p className="text-gray-500 text-center mt-2">
                  {activeYouTubeVideos[0].description}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gray-50 rounded-2xl p-6">
                <div
                  className="relative w-full"
                  style={{ paddingTop: "56.25%" }}
                >
                  <iframe
                    className="absolute inset-0 w-full h-full rounded-xl shadow-lg"
                    src={`https://www.youtube.com/embed/${activeYouTubeVideos[0].youtubeId}`}
                    title={activeYouTubeVideos[0].title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div>
                  <Badge className="bg-red-100 text-red-600 mb-2">
                    Featured
                  </Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {activeYouTubeVideos[0].title}
                  </h3>
                  <p className="text-gray-600">
                    {activeYouTubeVideos[0].description}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeYouTubeVideos.slice(1).map((video) => (
                  <div
                    key={video.id}
                    className="rounded-xl overflow-hidden shadow-md bg-white"
                  >
                    <div
                      className="relative w-full"
                      style={{ paddingTop: "56.25%" }}
                    >
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${video.youtubeId}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-2">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {video.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Government Schemes Section - Dynamic Home Cards */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="bg-orange-100 text-orange-600 mb-3">
              Government Schemes
            </Badge>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Programs We Support
            </h2>
            <p className="text-gray-500 mt-2">
              We help women access these government programs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeCards
              .filter((c) => c.isActive)
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((card, idx) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.07 }}
                  data-ocid={`schemes.item.${idx + 1}`}
                >
                  <Card className="hover:shadow-lg transition-shadow border border-gray-200 h-full">
                    {card.imageUrl && (
                      <img
                        src={card.imageUrl}
                        alt={card.name}
                        className="w-full h-36 object-cover rounded-t-lg"
                      />
                    )}
                    <CardContent className="p-5">
                      {!card.imageUrl && (
                        <div className="text-3xl mb-3">{card.icon}</div>
                      )}
                      <h3 className="font-bold text-gray-900 mb-2">
                        {card.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {card.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/schemes">
              <Button
                variant="outline"
                className="border-ngo-green text-ngo-green hover:bg-green-50"
                data-ocid="schemes.primary_button"
              >
                View All Schemes <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <Badge className="bg-blue-100 text-blue-700 mb-3">
            Latest Updates
          </Badge>
          <h2 className="text-3xl font-extrabold text-gray-900">
            News &amp; Announcements
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="hover:shadow-lg transition-shadow h-full">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-44 object-cover rounded-t-lg"
                  />
                )}
                <CardContent className="p-5">
                  <Badge variant="outline" className="text-xs mb-2">
                    {item.category}
                  </Badge>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {item.content}
                  </p>
                  <div className="text-xs text-gray-400 mt-3">
                    {new Date(item.publishDate).toLocaleDateString("en-IN")}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {latestNews.length === 0 && (
          <p className="text-center text-gray-500">
            No news published yet. Check back soon!
          </p>
        )}
        <div className="text-center mt-8">
          <Link to="/news">
            <Button
              variant="outline"
              className="border-ngo-green text-ngo-green hover:bg-green-50"
              data-ocid="news.primary_button"
            >
              View All News <ChevronRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Reviews / Testimonials Section */}
      <ReviewsSection reviews={reviews} addReview={addReview} />

      {/* CTA Banner */}
      <section className="bg-ngo-green py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            {homeCTA.heading}
          </h2>
          <p className="text-green-200 text-lg mb-8">{homeCTA.subtext}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-ngo-orange text-white hover:bg-ngo-orange-dark font-semibold"
                data-ocid="cta.primary_button"
              >
                {homeCTA.primaryBtnText}
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20"
                data-ocid="cta.secondary_button"
              >
                {homeCTA.secondaryBtnText}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
