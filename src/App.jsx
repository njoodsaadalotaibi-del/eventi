 //import { useState, useEffect } from "react";
//import { useState } from "react";
//import { useEffect } from "react";
import { supabase } from "./supabase";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

import React, { useState, useEffect } from "react";


const Orange = "#FF5722";
const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

const translations = {
  en: {
    title: "Let's have fun!",
    subtitle: "events around you!",
    categories: "Categories",
    upcoming: "Upcoming events nearby",
    noEvents: "No events in this category",
    loading: "Loading events...",
    error: "Could not load events. Check your connection.",
    about: "About",
    hostedBy: "Hosted by",
    boothsAvailable: "Booths available",
    booths: "booths",
    reserveBooth: "🎪 Reserve a Booth",
    attending: "✓ I'm Attending",
    admin: "Admin",
    map: "Map",
    discover: "Discover",
    publish: "🚀 Publish Event",
    publishing: "Publishing...",
    eventName: "Event Name",
    category: "Category",
    location: "Location",
    date: "Date",
    time: "Time",
    price: "Entry Price",
    noOfBooths: "No. of Booths",
    description: "Description",
    published: "Event Published!",
    publishedSub: "Your event is now live on eventi",
    backHome: "Back to Home",
    myEvents: "My Events",
    boothsSold: "Booths Sold",
    revenue: "Revenue",
    createEvent: "Create New Event",
    fillRequired: "Please fill in event name and location",
    mapLoading: "Loading map...",
    reservations: "Booth Reservations",
    noReservations: "No reservations yet",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    approve: "Approve",
    reject: "Reject",
    boothReservation: "Reserve a Booth",
    yourName: "Your Name",
    yourEmail: "Your Email",
    boothType: "Booth Type",
    standard: "Standard",
    premium: "Premium",
    corner: "Corner",
    confirm: "Confirm Reservation",
    reservationSuccess: "Booth Reserved!",
    reservationSuccessSub: "Your booth has been reserved. Check your email for confirmation.",
    cancel: "Cancel",
    profile: "Profile",
login: "Login",
signup: "Sign Up",
email: "Email",
password: "Password",
name: "Full Name",
noAccount: "Don't have an account?",
haveAccount: "Already have an account?",
logout: "Logout",
myReservations: "My Reservations",
noMyReservations: "You have no reservations yet",
becomeOrganizer: "Become an Organizer",
organizerRequest: "Request Organizer Access",
requestReason: "Why do you want to be an organizer?",
requestSent: "Request Sent!",
requestSentSub: "We'll review your request and get back to you.",
organizerRequests: "Organizer Requests",
noOrganizerRequests: "No organizer requests yet",
organizerStatus: "Your organizer request is pending approval.",
youAreOrganizer: "You are an organizer! 🎪",
  },

  ar: {
    title: "!هيا نستمتع",
    subtitle: "فعالية بالقرب منك!",
    categories: "الفئات",
    upcoming: "الفعاليات القريبة",
    noEvents: "لا توجد فعاليات في هذه الفئة",
    loading: "جارٍ تحميل الفعاليات...",
    error: "تعذّر تحميل الفعاليات. تحقق من اتصالك.",
    about: "عن الفعالية",
    hostedBy: "منظم الفعالية",
    boothsAvailable: "الأكشاك المتاحة",
    booths: "كشك",
    reserveBooth: "🎪 احجز كشكًا",
    attending: "✓ سأحضر",
    admin: "الإدارة",
    map: "الخريطة",
    discover: "اكتشف",
    publish: "🚀 نشر الفعالية",
    publishing: "جارٍ النشر...",
    eventName: "اسم الفعالية",
    category: "الفئة",
    location: "الموقع",
    date: "التاريخ",
    time: "الوقت",
    price: "سعر الدخول",
    noOfBooths: "عدد الأكشاك",
    description: "الوصف",
    published: "!تم نشر الفعالية",
    publishedSub: "فعاليتك الآن متاحة على eventi",
    backHome: "العودة للرئيسية",
    myEvents: "فعالياتي",
    boothsSold: "أكشاك محجوزة",
    revenue: "الإيرادات",
    createEvent: "إنشاء فعالية جديدة",
    fillRequired: "يرجى تعبئة اسم الفعالية والموقع",
    mapLoading: "جارٍ تحميل الخريطة...",
    reservations: "حجوزات الأكشاك",
    noReservations: "لا توجد حجوزات بعد",
    pending: "قيد الانتظار",
    approved: "مقبول",
    rejected: "مرفوض",
    approve: "قبول",
    reject: "رفض",
    boothReservation: "حجز كشك",
    yourName: "اسمك",
    yourEmail: "بريدك الإلكتروني",
    boothType: "نوع الكشك",
    standard: "عادي",
    premium: "مميز",
    corner: "زاوية",
    confirm: "تأكيد الحجز",
    reservationSuccess: "!تم حجز الكشك",
    reservationSuccessSub: "تم حجز كشكك. تحقق من بريدك الإلكتروني للتأكيد.",
    cancel: "إلغاء",
    profile: "الملف الشخصي",
login: "تسجيل الدخول",
signup: "إنشاء حساب",
email: "البريد الإلكتروني",
password: "كلمة المرور",
name: "الاسم الكامل",
noAccount: "ليس لديك حساب؟",
haveAccount: "لديك حساب بالفعل؟",
logout: "تسجيل الخروج",
myReservations: "حجوزاتي",
noMyReservations: "لا توجد حجوزات بعد",
becomeOrganizer: "كن منظماً",
organizerRequest: "طلب صلاحية المنظم",
requestReason: "لماذا تريد أن تكون منظماً؟",
requestSent: "!تم إرسال الطلب",
requestSentSub: "سنراجع طلبك ونرد عليك قريباً.",
organizerRequests: "طلبات المنظمين",
noOrganizerRequests: "لا توجد طلبات بعد",
organizerStatus: "طلبك قيد المراجعة.",
youAreOrganizer: "أنت منظم فعاليات! 🎪",
  }
};

const categoriesData = [
  { name: "All", nameAr: "الكل", emoji: "✦" },
  { name: "Outside", nameAr: "خارجي", emoji: "🌿" },
  { name: "Music", nameAr: "موسيقى", emoji: "🎵" },
  { name: "Party", nameAr: "حفلة", emoji: "🎉" },
  { name: "Food", nameAr: "طعام", emoji: "🍕" },
  { name: "Sport", nameAr: "رياضة", emoji: "⚽" },
];

const mapContainerStyle = { width: "100%", height: "100%" };
const kuwaitCenter = { lat: 29.3759, lng: 47.9774 };

function EventCard({ event, onClick, lang }) {
  const isAr = lang === "ar";
  return (
    <div
      onClick={() => onClick(event)}
      style={{
        background: "#fff", borderRadius: 16, overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)", cursor: "pointer",
        transition: "transform 0.2s", direction: isAr ? "rtl" : "ltr",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
    <div style={{ background: `${Orange}22`, height: 120, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
  {event.image_url ? (
    <img src={event.image_url} alt={event.name} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
  ) : (
    <span style={{ fontSize: 40 }}>🎉</span>
  )}
        <div style={{ position: "absolute", top: 8, right: 8, background: Orange, color: "#fff", borderRadius: 8, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>
          {event.price}
        </div>
        <div style={{ position: "absolute", bottom: 8, left: 8, background: "#fff", borderRadius: 8, padding: "3px 10px", fontSize: 11, fontWeight: 500 }}>
          {event.date}
        </div>
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 4 }}>{event.name}</div>
        <div style={{ fontSize: 11, color: "#999", marginBottom: 2 }}>📍 {event.location}</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, color: "#999" }}>{event.category}</span>
          <span style={{ fontSize: 11, color: Orange, fontWeight: 600 }}>{event.distance}</span>
        </div>
      </div>
    </div>
  );
}

function CategoryItem({ category, isSelected, onClick, lang }) {
  return (
    <div onClick={() => onClick(category.name)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", minWidth: 60 }}>
      <div style={{
        width: 52, height: 52, borderRadius: "50%",
        background: isSelected ? Orange : "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, transition: "all 0.2s",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
      }}>
        {category.emoji}
      </div>
      <span style={{ fontSize: 10, color: isSelected ? Orange : "#999", fontWeight: isSelected ? 700 : 400 }}>
        {lang === "ar" ? category.nameAr : category.name}
      </span>
    </div>
  );
}

function ReservationModal({ event, onClose, lang }) {
  const t = translations[lang];
  const isAr = lang === "ar";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [boothType, setBoothType] = useState("standard");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const boothTypes = [
    { key: "standard", label: t.standard },
    { key: "premium", label: t.premium },
    { key: "corner", label: t.corner },
  ];

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 12,
    border: "1px solid #eee", background: "#f8f8f8",
    fontSize: 13, outline: "none", boxSizing: "border-box",
    direction: isAr ? "rtl" : "ltr",
  };

  const handleReserve = async () => {
    if (!name || !email) { setError("Please fill in all fields"); return; }
    setIsSubmitting(true);
    setError("");
    try {
      const { error: sbError } = await supabase.from("reservations").insert([{
        event_id: event.id,
        event_name: event.name,
        name, email,
        booth_type: boothType,
        status: "pending"
      }]);
      if (sbError) throw sbError;
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Failed to reserve. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100 }}>
      <div style={{ background: "#fff", borderRadius: "24px 24px 0 0", padding: 32, width: "100%", maxWidth: 480, textAlign: "center" }}>
        <div style={{ fontSize: 64 }}>🎉</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#111", marginTop: 12 }}>{t.reservationSuccess}</div>
        <div style={{ fontSize: 13, color: "#999", marginTop: 8, marginBottom: 24 }}>{t.reservationSuccessSub}</div>
        <button onClick={onClose} style={{ width: "100%", padding: 14, borderRadius: 16, border: "none", background: Orange, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          {t.backHome}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100 }}>
      <div style={{ background: "#fff", borderRadius: "24px 24px 0 0", padding: 24, width: "100%", maxWidth: 480, direction: isAr ? "rtl" : "ltr" }}>
        <div style={{ width: 40, height: 4, background: "#eee", borderRadius: 2, margin: "0 auto 20px" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 28 }}>🎪</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#111" }}>{t.boothReservation}</div>
            <div style={{ fontSize: 12, color: "#999" }}>{event.name}</div>
          </div>
        </div>

        <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.yourName}</label>
        <input style={{ ...inputStyle, marginBottom: 12 }} placeholder="John Smith" value={name} onChange={e => setName(e.target.value)} />

        <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.yourEmail}</label>
        <input style={{ ...inputStyle, marginBottom: 12 }} placeholder="john@email.com" value={email} onChange={e => setEmail(e.target.value)} type="email" />

        <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 8 }}>{t.boothType}</label>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {boothTypes.map(bt => (
            <button key={bt.key} onClick={() => setBoothType(bt.key)} style={{
              flex: 1, padding: "10px 0", borderRadius: 12,
              border: `1px solid ${boothType === bt.key ? Orange : "#eee"}`,
              background: boothType === bt.key ? `${Orange}18` : "#fff",
              color: boothType === bt.key ? Orange : "#999",
              fontSize: 12, fontWeight: boothType === bt.key ? 700 : 400, cursor: "pointer"
            }}>
              {bt.label}
            </button>
          ))}
        </div>

        {error && <div style={{ color: "red", fontSize: 12, marginBottom: 12, textAlign: "center" }}>{error}</div>}

        <button onClick={handleReserve} disabled={isSubmitting} style={{
          width: "100%", padding: 14, borderRadius: 16, border: "none",
          background: isSubmitting ? "#ccc" : Orange,
          color: "#fff", fontSize: 15, fontWeight: 700, cursor: isSubmitting ? "not-allowed" : "pointer",
          marginBottom: 8
        }}>
          {isSubmitting ? "..." : t.confirm}
        </button>
        <button onClick={onClose} style={{ width: "100%", padding: 10, borderRadius: 16, border: "none", background: "transparent", color: "#999", fontSize: 13, cursor: "pointer" }}>
          {t.cancel}
        </button>
      </div>
    </div>
  );
}

function MapScreen({ events, onEventSelected, t }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { isLoaded } = useLoadScript({ googleMapsApiKey: GOOGLE_MAPS_KEY });

  if (!isLoaded) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: Orange }}>
      ⏳ {t.mapLoading}
    </div>
  );

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={11} center={kuwaitCenter}>
        {events.map(event => (
          <MarkerF
            key={event.id}
            position={{ lat: Number(event.lat), lng: Number(event.lng) }}
            title={event.name}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
      </GoogleMap>
      {selectedEvent && (
        <div style={{
          position: "absolute", bottom: 20, left: 16, right: 16,
          background: "#fff", borderRadius: 20, padding: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          display: "flex", gap: 12, alignItems: "center"
        }}>
          <div style={{ width: 56, height: 56, borderRadius: 12, background: `${Orange}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>🎉</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{selectedEvent.name}</div>
            <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>📍 {selectedEvent.location}</div>
            <div style={{ fontSize: 11, color: Orange, fontWeight: 600, marginTop: 2 }}>{selectedEvent.price} · {selectedEvent.date}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <button onClick={() => onEventSelected(selectedEvent)} style={{ padding: "6px 14px", borderRadius: 10, border: "none", background: Orange, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>View</button>
            <button onClick={() => setSelectedEvent(null)} style={{ padding: "6px 14px", borderRadius: 10, border: "none", background: "#f0f0f0", color: "#999", fontSize: 12, cursor: "pointer" }}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}

function EventDetail({ event, onBack, lang }) {
  const t = translations[lang];
  const isAr = lang === "ar";
  const [showReservation, setShowReservation] = useState(false);

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", background: "#f8f8f8", minHeight: "100vh", direction: isAr ? "rtl" : "ltr", fontFamily: isAr ? "Arial, sans-serif" : "sans-serif" }}>
      <div style={{ background: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #eee" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#111" }}>{isAr ? "→" : "←"}</button>
        <span style={{ fontWeight: 700, fontSize: 16, color: "#111" }}>{event.name}</span>
      </div>
      <div style={{ background: `${Orange}22`, height: 200, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
  {event.image_url ? (
    <img src={event.image_url} alt={event.name} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
  ) : (
    <span style={{ fontSize: 72 }}>🎉</span>
  )}
        <div style={{ position: "absolute", top: 12, right: isAr ? "auto" : 12, left: isAr ? 12 : "auto", background: Orange, color: "#fff", borderRadius: 8, padding: "4px 14px", fontSize: 13, fontWeight: 700 }}>
          {event.price}
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111", margin: "0 0 6px" }}>{event.name}</h2>
        <div style={{ fontSize: 12, color: "#999", marginBottom: 12 }}>📍 {event.location}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {[["📅", event.date], ["⏰", event.time], ["📍", event.distance]].map(([emoji, text]) => (
            <div key={text} style={{ background: "#fff", borderRadius: 20, padding: "6px 12px", fontSize: 11, color: "#666", display: "flex", gap: 4, alignItems: "center" }}>
              {emoji} {text}
            </div>
          ))}
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: "0 0 8px" }}>{t.about}</h3>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: "0 0 16px" }}>{event.description}</p>
        <div style={{ background: "#fff", borderRadius: 16, padding: 16, display: "flex", marginBottom: 16 }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 24 }}>🏢</div>
            <div style={{ fontSize: 10, color: "#999", marginTop: 4 }}>{t.hostedBy}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>{event.host}</div>
          </div>
          <div style={{ width: 1, background: "#eee" }} />
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 24 }}>🎪</div>
            <div style={{ fontSize: 10, color: "#999", marginTop: 4 }}>{t.boothsAvailable}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>{event.booths} {t.booths}</div>
          </div>
        </div>
        <button
          onClick={() => setShowReservation(true)}
          style={{ width: "100%", padding: 14, borderRadius: 16, border: "none", background: Orange, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}>
          {t.reserveBooth}
        </button>
        <button style={{ width: "100%", padding: 14, borderRadius: 16, border: "none", background: `${Orange}18`, color: Orange, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          {t.attending}
        </button>
      </div>
      {showReservation && <ReservationModal event={event} onClose={() => setShowReservation(false)} lang={lang} />}
    </div>
  );
}

function AdminScreen({ onBack, lang, onEventPublished }) {
  const [imageUrl, setImageUrl] = useState("");
  const t = translations[lang];
  const isAr = lang === "ar";
  const [activeTab, setActiveTab] = useState("create");
  const [eventName, setEventName] = useState("");

  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [booths, setBooths] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCat, setSelectedCat] = useState("Outside");
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState("");
  const [published, setPublished] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [loadingRes, setLoadingRes] = useState(false);

  const [orgRequests, setOrgRequests] = useState([]);
const [loadingOrg, setLoadingOrg] = useState(false);



useEffect(() => {
  if (activeTab !== "organizers") return;
  const fetchOrgRequests = async () => {
    setLoadingOrg(true);
    const { data } = await supabase
      .from("organizer_requests").select("*")
      .order("created_at", { ascending: false });
    setOrgRequests(data || []);
    setLoadingOrg(false);
  };
  fetchOrgRequests();
}, [activeTab]);


  useEffect(() => {
    const fetchReservations = async () => {
      setLoadingRes(true);
      const { data } = await supabase.from("reservations").select("*").order("created_at", { ascending: false });
      setReservations(data || []);
      setLoadingRes(false);
    };
    fetchReservations();
  }, []);

  const updateStatus = async (id, status) => {
    await supabase.from("reservations").update({ status }).eq("id", id);
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  //send organizer request

  const updateOrganizerRequest = async (req, status) => {
    await supabase.from("organizer_requests").update({ status }).eq("id", req.id);
    if (status === "approved") {
      await supabase.from("users").update({ role: "organizer" }).eq("id", req.user_id);
    }
    setOrgRequests(prev => prev.map(r => r.id === req.id ? { ...r, status } : r));
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 12,
    border: "1px solid #eee", background: "#f8f8f8",
    fontSize: 13, outline: "none", boxSizing: "border-box",
    direction: isAr ? "rtl" : "ltr",
  };

  const handlePublish = async () => {
    if (!eventName || !location) { setError(t.fillRequired); return; }
    setIsPublishing(true);
    setError("");
    try {
      const newEvent = {
        name: eventName, category: selectedCat, image_url: imageUrl, distance: "Nearby",  
        date: date || "TBD", price: price || "FREE",
        lat: 29.3759, lng: 47.9774,
        description: description || "No description provided.",
        host: "eventi organizer", time: time || "TBD",
        booths: parseInt(booths) || 10, location,
      };
      const { data, error: sbError } = await supabase.from("events").insert([newEvent]).select();
      if (sbError) throw sbError;
      onEventPublished(data[0]);
      setPublished(true);
    } catch (err) {
      console.error(err);
      setError("Failed to publish. Check your connection.");
    } finally {
      setIsPublishing(false);
    }
  };

  if (published) return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
      <span style={{ fontSize: 72 }}>🎉</span>
      <div style={{ fontSize: 24, fontWeight: 700, color: "#111" }}>{t.published}</div>
      <div style={{ fontSize: 14, color: "#999" }}>{t.publishedSub}</div>
      <button onClick={onBack} style={{ marginTop: 16, padding: "12px 32px", borderRadius: 16, border: "none", background: Orange, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
        {t.backHome}
      </button>
    </div>
  );

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", background: "#f8f8f8", minHeight: "100vh", direction: isAr ? "rtl" : "ltr", fontFamily: isAr ? "Arial, sans-serif" : "sans-serif" }}>
      <div style={{ background: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #eee" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>{isAr ? "→" : "←"}</button>
        <span style={{ fontWeight: 700, fontSize: 18 }}>{isAr ? "الإدارة" : "Admin Dashboard"}</span>
      </div>

      {/* Admin tabs */}
      <div style={{ background: "#fff", display: "flex", borderBottom: "1px solid #eee" }}>
       {[["create", isAr ? "إنشاء فعالية" : "Create Event", "📋"],
  ["reservations", t.reservations, "🎪"],
  ["organizers", t.organizerRequests, "👥"]].map(([tab, label, emoji]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            flex: 1, padding: "12px 0", border: "none", background: "transparent",
            color: activeTab === tab ? Orange : "#999",
            fontWeight: activeTab === tab ? 700 : 400,
            fontSize: 12, cursor: "pointer",
            borderBottom: activeTab === tab ? `2px solid ${Orange}` : "2px solid transparent"
          }}>
            {emoji} {label}
          </button>
        ))}
      </div>

      {activeTab === "create" && (
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 10 }}>
            {[["📋", "2", t.myEvents], ["🎪", reservations.length.toString(), t.boothsSold], ["💰", "$340", t.revenue]].map(([emoji, val, label]) => (
              <div key={label} style={{ flex: 1, background: "#fff", borderRadius: 16, padding: 12, textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 20 }}>{emoji}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: Orange }}>{val}</div>
                <div style={{ fontSize: 10, color: "#999" }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>{t.createEvent}</div>
          <div>
            <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.eventName}</label>
            <input style={inputStyle} placeholder={isAr ? "مثال: مهرجان الصيف" : "e.g. Summer Food Festival"} value={eventName} onChange={e => setEventName(e.target.value)} />
          </div>



<div>
  <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>Event Image (optional)</label>
  <input
    type="file"
    accept="image/*"
    onChange={async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
     const { error: uploadError } = await supabase.storage
  .from("event-image")
  .upload(fileName, file);
    if (uploadError) {
  console.error(uploadError);
  return;
}
      const { data: urlData } = supabase.storage
        .from("event-image")
        .getPublicUrl(fileName);
      setImageUrl(urlData.publicUrl);
    }}
    style={{ width: "100%", padding: "10px 0", fontSize: 13, color: "#999", cursor: "pointer" }}
  />
  {imageUrl && (
    <img src={imageUrl} alt="preview" style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 12, marginTop: 8 }} />
  )}
</div>

          <div>
            <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 8 }}>{t.category}</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {categoriesData.filter(c => c.name !== "All").map(cat => (
                <button key={cat.name} onClick={() => setSelectedCat(cat.name)} style={{
                  padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
                  background: selectedCat === cat.name ? Orange : "#fff",
                  color: selectedCat === cat.name ? "#fff" : "#999",
                  fontSize: 12, fontWeight: selectedCat === cat.name ? 700 : 400
                }}>
                  {isAr ? categoriesData.find(c => c.name === cat.name)?.nameAr : cat.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.location}</label>
            <input style={inputStyle} placeholder={isAr ? "مثال: الكويت" : "e.g. Kuwait City, Kuwait"} value={location} onChange={e => setLocation(e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.date}</label>
              <input style={inputStyle} placeholder="22 Sep 2024" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.time}</label>
              <input style={inputStyle} placeholder="10am-6pm" value={time} onChange={e => setTime(e.target.value)} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.price}</label>
              <input style={inputStyle} placeholder="FREE or $10" value={price} onChange={e => setPrice(e.target.value)} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.noOfBooths}</label>
              <input style={inputStyle} placeholder="20" value={booths} onChange={e => setBooths(e.target.value)} type="number" />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.description}</label>
            <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} placeholder={isAr ? "اكتب وصف الفعالية..." : "Tell people what your event is about..."} value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          {error && <div style={{ color: "red", fontSize: 12, textAlign: "center" }}>{error}</div>}
          <button onClick={handlePublish} disabled={isPublishing} style={{
            width: "100%", padding: 14, borderRadius: 16, border: "none",
            background: isPublishing ? "#ccc" : Orange,
            color: "#fff", fontSize: 15, fontWeight: 700, cursor: isPublishing ? "not-allowed" : "pointer"
          }}>
            {isPublishing ? t.publishing : t.publish}
          </button>
        </div>
      )}

      {activeTab === "reservations" && (
        <div style={{ padding: 20 }}>
         {loadingRes && <div style={{ textAlign: "center", color: Orange, padding: 40 }}>⏳ Loading...</div>}
          {!loadingRes && reservations.length === 0 && (
            <div style={{ textAlign: "center", color: "#999", padding: 40 }}>{t.noReservations}</div>
          )}
          {!loadingRes && reservations.map(res => (
            <div key={res.id} style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{res.name}</div>
                  <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{res.email}</div>
                  <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>🎪 {res.booth_type} · {res.event_name}</div>
                </div>
                <span style={{
                  padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                  background: res.status === "approved" ? "#E1F5EE" : res.status === "rejected" ? "#FFEBEE" : "#FEF3E2",
                  color: res.status === "approved" ? "#085041" : res.status === "rejected" ? "#c62828" : "#633806"
                }}>
                  {res.status === "approved" ? t.approved : res.status === "rejected" ? t.rejected : t.pending}
                </span>
              </div>
              {res.status === "pending" && (
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button onClick={() => updateStatus(res.id, "approved")} style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", background: "#E1F5EE", color: "#085041", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                    ✓ {t.approve}
                  </button>
                  <button onClick={() => updateStatus(res.id, "rejected")} style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", background: "#FFEBEE", color: "#c62828", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                    ✕ {t.reject}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}






      {/* organizer tab*/}
      {activeTab === "organizers" && (
  <div style={{ padding: 20 }}>
    {loadingOrg && <div style={{ textAlign: "center", color: Orange, padding: 40 }}>⏳</div>}
    {!loadingOrg && orgRequests.length === 0 && (
      <div style={{ textAlign: "center", color: "#999", padding: 40 }}>{t.noOrganizerRequests}</div>
    )}
    {!loadingOrg && orgRequests.map(req => (
      <div key={req.id} style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{req.name}</div>
            <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{req.email}</div>
            <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>{req.reason}</div>
          </div>
          <span style={{
            padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
            background: req.status === "approved" ? "#E1F5EE" : req.status === "rejected" ? "#FFEBEE" : "#FEF3E2",
            color: req.status === "approved" ? "#085041" : req.status === "rejected" ? "#c62828" : "#633806"
          }}>
            {req.status === "approved" ? t.approved : req.status === "rejected" ? t.rejected : t.pending}
          </span>
        </div>
        {req.status === "pending" && (
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button onClick={() => updateOrganizerRequest(req, "approved")} style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", background: "#E1F5EE", color: "#085041", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>✓ {t.approve}</button>
            <button onClick={() => updateOrganizerRequest(req, "rejected")} style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", background: "#FFEBEE", color: "#c62828", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>✕ {t.reject}</button>
          </div>
        )}
      </div>
    ))}
  </div>
)}

    </div>
  );
  } 

  //added new func for login
  function AuthScreen({ onAuth, lang }) {
  const t = translations[lang];
  const isAr = lang === "ar";
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: 14,
    border: "1px solid #eee", background: "#f8f8f8",
    fontSize: 14, outline: "none", boxSizing: "border-box",
    direction: isAr ? "rtl" : "ltr",
  };

  const handleAuth = async () => {
    if (!email || !password) { setError("Please fill in all fields"); return; }
    setLoading(true);
    setError("");
    try {
      if (isLogin) {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
      } else {
        if (!name) { setError("Please enter your name"); setLoading(false); return; }
        const { error: authError } = await supabase.auth.signUp({
          email, password,
          options: { data: { name } }
        });
        if (authError) throw authError;
      }
      onAuth();
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: 24, background: "#f8f8f8", direction: isAr ? "rtl" : "ltr" }}>
      <img src="/mainEventi.png" alt="eventi" style={{ width: 160, height: 160, objectFit: "contain", marginBottom: 8 }} />
      <div style={{ marginBottom: 32 }} />
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
        {!isLogin && (
          <div>
            <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.name}</label>
            <input style={inputStyle} placeholder="John Smith" value={name} onChange={e => setName(e.target.value)} />
          </div>
        )}
        <div>
          <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.email}</label>
          <input style={inputStyle} placeholder="john@email.com" value={email} onChange={e => setEmail(e.target.value)} type="email" />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.password}</label>
          <input style={inputStyle} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} type="password" />
        </div>
        {error && <div style={{ color: "red", fontSize: 12, textAlign: "center" }}>{error}</div>}
        <button onClick={handleAuth} disabled={loading} style={{
          width: "100%", padding: 14, borderRadius: 16, border: "none",
          background: loading ? "#ccc" : Orange, color: "#fff",
          fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer"
        }}>
          {loading ? "..." : isLogin ? t.login : t.signup}
        </button>
        <button onClick={() => { setIsLogin(!isLogin); setError(""); }} style={{
          background: "none", border: "none", color: Orange,
          fontSize: 13, cursor: "pointer", textAlign: "center"
        }}>
          {isLogin ? t.noAccount : t.haveAccount}
        </button>
      </div>
    </div>
  );
}

function ProfileScreen({ user, userProfile, onBack, onLogout, lang }) {
  const t = translations[lang];
  const isAr = lang === "ar";
  const [myReservations, setMyReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrganizerForm, setShowOrganizerForm] = useState(false);
  const [reason, setReason] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: resData } = await supabase
        .from("reservations").select("*")
        .eq("email", user.email)
        .order("created_at", { ascending: false });
      setMyReservations(resData || []);
      const { data: reqData } = await supabase
        .from("organizer_requests").select("*")
        .eq("user_id", user.id).single();
      if (reqData) setRequestStatus(reqData.status);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handleOrganizerRequest = async () => {
    if (!reason) return;
    try {
      await supabase.from("organizer_requests").insert([{
        user_id: user.id, email: user.email,
        name: userProfile?.name || user.email,
        reason, status: "pending"
      }]);
      setRequestSent(true);
      setRequestStatus("pending");
      setShowOrganizerForm(false);
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", background: "#f8f8f8", minHeight: "100vh", direction: isAr ? "rtl" : "ltr" }}>
     <div style={{ background: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #eee" }}>
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
   <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#FF5722", fontWeight: 700 }}>←</button>
    <span style={{ fontWeight: 700, fontSize: 18, color: "#111" }}>{t.profile}</span>
  </div>
  <button onClick={onLogout} style={{ padding: "5px 14px", borderRadius: 20, border: "1px solid #eee", background: "transparent", color: "#999", fontSize: 12, cursor: "pointer" }}>
    {t.logout}
  </button>
</div>
      <div style={{ padding: 20 }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: 20, marginBottom: 16, textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: `${Orange}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 12px" }}>
            {userProfile?.name?.[0]?.toUpperCase() || "👤"}
          </div>
          <div style={{ fontWeight: 700, fontSize: 18, color: "#111" }}>{userProfile?.name || user.email}</div>
          <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>{user.email}</div>
          {userProfile?.role !== "consumer" && (
            <div style={{ marginTop: 8 }}>
              <span style={{
                padding: "3px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                background: userProfile?.role === "admin" ? "#FFEBEE" : "#F3E8FF",
                color: userProfile?.role === "admin" ? "#c62828" : "#6B21A8"
              }}>
                {userProfile?.role === "admin" ? "👑 Admin" : "🎪 Organizer"}
              </span>
            </div>
          )}
        </div>

        {userProfile?.role === "consumer" && (
          <div style={{ background: "#fff", borderRadius: 20, padding: 16, marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            {requestStatus === "pending" && <div style={{ textAlign: "center", color: "#633806", fontSize: 13 }}>⏳ {t.organizerStatus}</div>}
            {requestStatus === "approved" && <div style={{ textAlign: "center", color: "#085041", fontSize: 13 }}>✅ {t.youAreOrganizer}</div>}
            {!requestStatus && !showOrganizerForm && (
              <button onClick={() => setShowOrganizerForm(true)} style={{ width: "100%", padding: 12, borderRadius: 14, border: `1px solid ${Orange}`, background: "transparent", color: Orange, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                🎪 {t.becomeOrganizer}
              </button>
            )}
            {showOrganizerForm && (
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 8 }}>{t.organizerRequest}</div>
                <textarea placeholder={t.requestReason} value={reason} onChange={e => setReason(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1px solid #eee", background: "#f8f8f8", fontSize: 13, outline: "none", boxSizing: "border-box", minHeight: 80, resize: "vertical" }} />
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button onClick={handleOrganizerRequest} style={{ flex: 1, padding: 10, borderRadius: 12, border: "none", background: Orange, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Send</button>
                  <button onClick={() => setShowOrganizerForm(false)} style={{ flex: 1, padding: 10, borderRadius: 12, border: "1px solid #eee", background: "#fff", color: "#999", fontSize: 13, cursor: "pointer" }}>{t.cancel}</button>
                </div>
              </div>
            )}
            {requestSent && <div style={{ textAlign: "center", color: "#085041", fontSize: 13, marginTop: 8 }}>✅ {t.requestSent}</div>}
          </div>
        )}

        <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 12 }}>{t.myReservations}</div>
        {loading && <div style={{ textAlign: "center", color: Orange, padding: 20 }}>⏳</div>}
        {!loading && myReservations.length === 0 && <div style={{ textAlign: "center", color: "#999", padding: 20 }}>{t.noMyReservations}</div>}
        {!loading && myReservations.map(res => (
          <div key={res.id} style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{res.event_name}</div>
            <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>🎪 {res.booth_type} booth</div>
            <div style={{ marginTop: 6 }}>
              <span style={{
                padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                background: res.status === "approved" ? "#E1F5EE" : res.status === "rejected" ? "#FFEBEE" : "#FEF3E2",
                color: res.status === "approved" ? "#085041" : res.status === "rejected" ? "#c62828" : "#633806"
              }}>
                {res.status === "approved" ? t.approved : res.status === "rejected" ? t.rejected : t.pending}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrganizerScreen({ onBack, lang, onEventPublished, userProfile }) {



 const [imageUrl, setImageUrl] = useState("");
  const t = translations[lang];
  const isAr = lang === "ar";
  const [eventName, setEventName] = useState("");

  const [showBoothMap, setShowBoothMap] = useState(false);
const [publishedEvent, setPublishedEvent] = useState(null);

  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [booths, setBooths] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCat, setSelectedCat] = useState("Outside");
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState("");
  const [published, setPublished] = useState(false);
  const [myReservations, setMyReservations] = useState([]);
  const [loadingRes, setLoadingRes] = useState(false);
  const [activeTab, setActiveTab] = useState("create");

  

  useEffect(() => {
    if (activeTab !== "reservations") return;
    const fetchReservations = async () => {
      setLoadingRes(true);
      const { data } = await supabase.from("reservations").select("*").order("created_at", { ascending: false });
      setMyReservations(data || []);
      setLoadingRes(false);
    };
    fetchReservations();
  }, [activeTab]);

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 12,
    border: "1px solid #eee", background: "#f8f8f8",
    fontSize: 13, outline: "none", boxSizing: "border-box",
    direction: isAr ? "rtl" : "ltr",
  };

  const handlePublish = async () => {
    if (!eventName || !location) { setError(t.fillRequired); return; }
    setIsPublishing(true); setError("");
    try {
      const newEvent = {
        name: eventName, category: selectedCat, image_url: imageUrl, distance: "Nearby",  
        date: date || "TBD", price: price || "FREE",
        lat: 29.3759, lng: 47.9774,
        description: description || "No description provided.",
        host: userProfile?.name || "Organizer",
        time: time || "TBD", booths: parseInt(booths) || 10, location,
      };
      const { data, error: sbError } = await supabase.from("events").insert([newEvent]).select();
      if (sbError) throw sbError;
      onEventPublished(data[0]);
      setPublishedEvent(data[0]);
      setPublished(true);
    } catch (err) { console.error(err); setError("Failed to publish."); }
    finally { setIsPublishing(false); }
  };



if (showBoothMap && publishedEvent) return (
  <BoothMapEditor event={publishedEvent} onBack={() => setShowBoothMap(false)} lang={lang} />
);



  if (published) return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
      <span style={{ fontSize: 72 }}>🎉</span>
      <div style={{ fontSize: 24, fontWeight: 700, color: "#111" }}>{t.published}</div>
      <button onClick={onBack} style={{ marginTop: 16, padding: "12px 32px", borderRadius: 16, border: "none", background: Orange, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>{t.backHome}</button>
    
    
    {published && (
  <button
    onClick={() => setShowBoothMap(true)}
    style={{ width: "100%", padding: 14, borderRadius: 16, border: `1px solid ${Orange}`, background: "transparent", color: Orange, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 8 }}
  >
    🗺️ Set Up Booth Map
  </button>
)}

    </div>
  );

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", background: "#f8f8f8", minHeight: "100vh", direction: isAr ? "rtl" : "ltr" }}>
      <div style={{ background: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #eee" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>{isAr ? "→" : "←"}</button>
        <span style={{ fontWeight: 700, fontSize: 18 }}>🎪 Organizer Dashboard</span>
      </div>
      <div style={{ background: "#fff", display: "flex", borderBottom: "1px solid #eee" }}>
        {[["create", "📋 Create Event"], ["reservations", "🎪 Reservations"]].map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            flex: 1, padding: "12px 8px", border: "none", background: "transparent",
            color: activeTab === tab ? Orange : "#999", fontWeight: activeTab === tab ? 700 : 400,
            fontSize: 12, cursor: "pointer",
            borderBottom: activeTab === tab ? `2px solid ${Orange}` : "2px solid transparent"
          }}>{label}</button>
        ))}
      </div>
      {activeTab === "create" && (
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <div><label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.eventName}</label>
            <input style={inputStyle} placeholder="e.g. Summer Food Festival" value={eventName} onChange={e => setEventName(e.target.value)} /></div>
          <div><label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 8 }}>{t.category}</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {categoriesData.filter(c => c.name !== "All").map(cat => (
                <button key={cat.name} onClick={() => setSelectedCat(cat.name)} style={{
                  padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
                  background: selectedCat === cat.name ? Orange : "#fff",
                  color: selectedCat === cat.name ? "#fff" : "#999",
                  fontSize: 12, fontWeight: selectedCat === cat.name ? 700 : 400
                }}>{cat.name}</button>
              ))}
            </div>
          </div>
          <div><label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.location}</label>
            <input style={inputStyle} placeholder="e.g. Kuwait City" value={location} onChange={e => setLocation(e.target.value)} /></div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}><label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.date}</label>
              <input style={inputStyle} placeholder="22 Sep 2024" value={date} onChange={e => setDate(e.target.value)} /></div>
            <div style={{ flex: 1 }}><label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.time}</label>
              <input style={inputStyle} placeholder="10am-6pm" value={time} onChange={e => setTime(e.target.value)} /></div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}><label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.price}</label>
              <input style={inputStyle} placeholder="FREE or $10" value={price} onChange={e => setPrice(e.target.value)} /></div>
            <div style={{ flex: 1 }}><label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.noOfBooths}</label>
              <input style={inputStyle} placeholder="20" value={booths} onChange={e => setBooths(e.target.value)} type="number" /></div>
          </div>


  <div>
  <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>Event Image (optional)</label>
  <input
    type="file"
    accept="image/*"
    onChange={async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
  .from("event-image")
  .upload(fileName, file);
     if (uploadError) {
  console.error(uploadError);
  return;
}
      const { data: urlData } = supabase.storage
        .from("event-image")
        .getPublicUrl(fileName);
      setImageUrl(urlData.publicUrl);
    }}
    style={{ width: "100%", padding: "10px 0", fontSize: 13, color: "#999", cursor: "pointer" }}
  />
  {imageUrl && (
    <img src={imageUrl} alt="preview" style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 12, marginTop: 8 }} />
  )}
</div>
          
          <div><label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.description}</label>
            <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} placeholder="Tell people about your event..." value={description} onChange={e => setDescription(e.target.value)} /></div>
          {error && <div style={{ color: "red", fontSize: 12, textAlign: "center" }}>{error}</div>}
          <button onClick={handlePublish} disabled={isPublishing} style={{
            width: "100%", padding: 14, borderRadius: 16, border: "none",
            background: isPublishing ? "#ccc" : Orange, color: "#fff",
            fontSize: 15, fontWeight: 700, cursor: isPublishing ? "not-allowed" : "pointer"
          }}>{isPublishing ? t.publishing : t.publish}</button>
        </div>
      )}
      {activeTab === "reservations" && (
        <div style={{ padding: 20 }}>
          {loadingRes && <div style={{ textAlign: "center", color: Orange, padding: 40 }}>⏳</div>}
          {!loadingRes && myReservations.length === 0 && <div style={{ textAlign: "center", color: "#999", padding: 40 }}>{t.noReservations}</div>}
          {!loadingRes && myReservations.map(res => (
            <div key={res.id} style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{res.name}</div>
              <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{res.email}</div>
              <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>🎪 {res.booth_type} · {res.event_name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


//event booths maps 

function BoothMapEditor({ event, onBack, lang }) {

  //const t = translations[lang];
  const isAr = lang === "ar";
  const [floorMap, setFloorMap] = useState(event.floor_map_url || null);
  const [booths, setBooths] = useState([]);
  const [selectedBooth, setSelectedBooth] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  //const [isSaving, setIsSaving] = useState(false);
  //const [saved, setSaved] = useState(false);
  const [showBoothForm, setShowBoothForm] = useState(false);
  const [clickPosition, setClickPosition] = useState(null);
  const [boothForm, setBoothForm] = useState({ booth_number: "", price: "", size: "" });
  const mapRef = React.useRef(null);

  useEffect(() => {
    const fetchBooths = async () => {
      const { data } = await supabase
        .from("booths")
        .select("*")
        .eq("event_id", event.id);
      setBooths(data || []);
    };
    fetchBooths();
  }, [event.id]);

  const handleMapUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const fileName = `${event.id}-${Math.random()}.${file.name.split(".").pop()}`;
    const { error: uploadError } = await supabase.storage
      .from("floor-maps")
      .upload(fileName, file);
    if (uploadError) { console.error(uploadError); setIsUploading(false); return; }
    const { data: urlData } = supabase.storage.from("floor-maps").getPublicUrl(fileName);
    const url = urlData.publicUrl;
    await supabase.from("events").update({ floor_map_url: url }).eq("id", event.id);
    setFloorMap(url);
    setIsUploading(false);
  };

  const handleMapClick = (e) => {
    if (!floorMap) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setClickPosition({ x, y });
    setBoothForm({ booth_number: `B${booths.length + 1}`, price: "", size: "" });
    setShowBoothForm(true);
  };

  const handleAddBooth = async () => {
    if (!boothForm.booth_number || !boothForm.price) return;
    const newBooth = {
      event_id: event.id,
      booth_number: boothForm.booth_number,
      x: clickPosition.x,
      y: clickPosition.y,
      price: boothForm.price,
      size: boothForm.size,
      status: "available"
    };
    const { data } = await supabase.from("booths").insert([newBooth]).select();
    setBooths(prev => [...prev, data[0]]);
    setShowBoothForm(false);
    setClickPosition(null);
  };

  const handleDeleteBooth = async (boothId) => {
    await supabase.from("booths").delete().eq("id", boothId);
    setBooths(prev => prev.filter(b => b.id !== boothId));
    setSelectedBooth(null);
  };

  const inputStyle = {
    width: "100%", padding: "8px 12px", borderRadius: 10,
    border: "1px solid #eee", background: "#f8f8f8",
    fontSize: 13, outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", background: "#f8f8f8", minHeight: "100vh", direction: isAr ? "rtl" : "ltr", fontFamily: isAr ? "Arial, sans-serif" : "sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #eee" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
        <span style={{ fontWeight: 700, fontSize: 16 }}>🗺️ Booth Map — {event.name}</span>
      </div>

      <div style={{ padding: 16 }}>
        {/* Upload floor map */}
        {!floorMap ? (
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 16 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏢</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#111", marginBottom: 8 }}>Upload Floor Map</div>
            <div style={{ fontSize: 13, color: "#999", marginBottom: 16 }}>Upload an image of your venue layout</div>
            <label style={{ display: "inline-block", padding: "10px 24px", borderRadius: 14, background: Orange, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              {isUploading ? "Uploading..." : "📁 Choose Image"}
              <input type="file" accept="image/*" onChange={handleMapUpload} style={{ display: "none" }} />
            </label>
          </div>
        ) : (
          <>
            {/* Instructions */}
            <div style={{ background: `${Orange}15`, borderRadius: 12, padding: "10px 14px", marginBottom: 12, fontSize: 12, color: Orange, fontWeight: 600 }}>
              💡 Tap anywhere on the map to place a booth
            </div>

            {/* Map with booths */}
            <div
              ref={mapRef}
              onClick={handleMapClick}
              style={{ position: "relative", width: "100%", borderRadius: 16, overflow: "hidden", cursor: "crosshair", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: 12 }}
            >
              <img src={floorMap} alt="floor map" style={{ width: "100%", display: "block" }} />
              {booths.map(booth => (
                <div
                  key={booth.id}
                  onClick={(e) => { e.stopPropagation(); setSelectedBooth(selectedBooth?.id === booth.id ? null : booth); }}
                  style={{
                    position: "absolute",
                    left: `${booth.x}%`,
                    top: `${booth.y}%`,
                    transform: "translate(-50%, -50%)",
                    width: 36, height: 36,
                    borderRadius: 8,
                    background: selectedBooth?.id === booth.id ? "#06D6A0" : booth.status === "available" ? Orange : "#aaa",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 700, color: "#fff",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                    border: selectedBooth?.id === booth.id ? "2px solid #fff" : "none",
                    zIndex: 2
                  }}
                >
                  {booth.booth_number}
                </div>
              ))}
            </div>

            {/* Selected booth info */}
            {selectedBooth && (
              <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#111", marginBottom: 8 }}>Booth {selectedBooth.booth_number}</div>
                <div style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>💰 Price: {selectedBooth.price}</div>
                <div style={{ fontSize: 13, color: "#666", marginBottom: 12 }}>📐 Size: {selectedBooth.size || "Not specified"}</div>
                <button
                  onClick={() => handleDeleteBooth(selectedBooth.id)}
                  style={{ width: "100%", padding: 10, borderRadius: 12, border: "none", background: "#FFEBEE", color: "#c62828", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                >
                  🗑️ Delete Booth
                </button>
              </div>
            )}

            {/* Stats */}
            <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              <div style={{ flex: 1, background: "#fff", borderRadius: 14, padding: 12, textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: Orange }}>{booths.length}</div>
                <div style={{ fontSize: 10, color: "#999" }}>Total Booths</div>
              </div>
              <div style={{ flex: 1, background: "#fff", borderRadius: 14, padding: 12, textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#06D6A0" }}>{booths.filter(b => b.status === "available").length}</div>
                <div style={{ fontSize: 10, color: "#999" }}>Available</div>
              </div>
              <div style={{ flex: 1, background: "#fff", borderRadius: 14, padding: 12, textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#aaa" }}>{booths.filter(b => b.status === "reserved").length}</div>
                <div style={{ fontSize: 10, color: "#999" }}>Reserved</div>
              </div>
            </div>

            {/* Change map button */}
            <label style={{ display: "block", padding: "10px", borderRadius: 14, border: `1px solid ${Orange}`, color: Orange, fontSize: 13, fontWeight: 700, cursor: "pointer", textAlign: "center" }}>
              🔄 Change Floor Map
              <input type="file" accept="image/*" onChange={handleMapUpload} style={{ display: "none" }} />
            </label>
          </>
        )}
      </div>

      {/* Add booth form modal */}
      {showBoothForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "#fff", borderRadius: "24px 24px 0 0", padding: 24, width: "100%", maxWidth: 480 }}>
            <div style={{ width: 40, height: 4, background: "#eee", borderRadius: 2, margin: "0 auto 20px" }} />
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>🎪 Add Booth</div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>Booth Number</label>
              <input style={inputStyle} value={boothForm.booth_number} onChange={e => setBoothForm(p => ({ ...p, booth_number: e.target.value }))} placeholder="e.g. A1, B2" />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>Price</label>
              <input style={inputStyle} value={boothForm.price} onChange={e => setBoothForm(p => ({ ...p, price: e.target.value }))} placeholder="e.g. $100, 50 KWD" />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>Size</label>
              <input style={inputStyle} value={boothForm.size} onChange={e => setBoothForm(p => ({ ...p, size: e.target.value }))} placeholder="e.g. 3x3m, 4x4m" />
            </div>
            <button onClick={handleAddBooth} style={{ width: "100%", padding: 14, borderRadius: 16, border: "none", background: Orange, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}>
              ✓ Add Booth
            </button>
            <button onClick={() => setShowBoothForm(false)} style={{ width: "100%", padding: 10, borderRadius: 16, border: "none", background: "transparent", color: "#999", fontSize: 13, cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showOrganizer, setShowOrganizer] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("discover");
  const [lang, setLang] = useState("en");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const t = translations[lang];
  const isAr = lang === "ar";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    supabase.from("users").select("*").eq("id", user.id).single()
      .then(({ data }) => setUserProfile(data));
  }, [user]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error: sbError } = await supabase
          .from("events").select("*").order("id", { ascending: true });
        if (sbError) throw sbError;
        setEvents(data || []);
      } catch (err) {
        console.error(err);
        setError(t.error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, [t]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
    setShowProfile(false);
  };

  const filteredEvents = selectedCategory === "All"
    ? events : events.filter(e => e.category === selectedCategory);

  if (authLoading) return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: Orange, fontSize: 16 }}>⏳ Loading...</div>
    </div>
  );

  if (!user) return <AuthScreen onAuth={() => {}} lang={lang} />;
  if (selectedEvent) return <EventDetail event={selectedEvent} onBack={() => setSelectedEvent(null)} lang={lang} userEmail={user?.email} />;
  if (showAdmin) return <AdminScreen onBack={() => setShowAdmin(false)} lang={lang} onEventPublished={(e) => { setEvents(prev => [...prev, e]); setShowAdmin(false); }} user={user} />;
  if (showOrganizer) return <OrganizerScreen onBack={() => setShowOrganizer(false)} lang={lang} onEventPublished={(e) => { setEvents(prev => [...prev, e]); setShowOrganizer(false); }} user={user} userProfile={userProfile} />;
  if (showProfile) return <ProfileScreen user={user} userProfile={userProfile} onBack={() => setShowProfile(false)} onLogout={handleLogout} lang={lang} />;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", background: "#f8f8f8", minHeight: "100vh", fontFamily: isAr ? "Arial, sans-serif" : "sans-serif", direction: isAr ? "rtl" : "ltr", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#fff", padding: "16px 20px", borderBottom: "1px solid #eee" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>

           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <img src="/faviconapp.png" alt="eventi" style={{ height: 32, width: 32, objectFit: "contain" }} />
  <div style={{ fontWeight: 700, fontSize: 22, color: "#111" }}>{t.title}</div>
</div>
          
          
          
            <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>
              <span style={{ color: Orange, fontWeight: 700 }}>{events.length}</span> {t.subtitle}
            </div>


          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={() => setLang(lang === "en" ? "ar" : "en")} style={{
              padding: "5px 12px", borderRadius: 20, border: `1px solid ${Orange}`,
              background: "transparent", color: Orange, fontSize: 12, fontWeight: 700, cursor: "pointer"
            }}>
              {lang === "en" ? "عربي" : "EN"}
            </button>
            {userProfile?.role === "admin" && (
              <button onClick={() => setShowAdmin(true)} style={{
                padding: "5px 12px", borderRadius: 20, border: "none",
                background: Orange, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer"
              }}>👑 {t.admin}</button>
            )}
            {userProfile?.role === "organizer" && (
              <button onClick={() => setShowOrganizer(true)} style={{
                padding: "5px 12px", borderRadius: 20, border: "none",
                background: "#6B21A8", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer"
              }}>🎪 Organizer</button>
            )}
            <button onClick={() => setShowProfile(true)} style={{
              width: 32, height: 32, borderRadius: "50%", border: "none",
              background: `${Orange}22`, color: Orange, fontSize: 16, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>👤</button>
          </div>
        </div>
      </div>
      <div style={{ background: "#fff", display: "flex", borderBottom: "1px solid #eee" }}>
        {[["discover", t.discover, "🔍"], ["map", t.map, "🗺️"]].map(([tab, label, emoji]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            flex: 1, padding: "12px 0", border: "none", background: "transparent",
            color: activeTab === tab ? Orange : "#999",
            fontWeight: activeTab === tab ? 700 : 400, fontSize: 13, cursor: "pointer",
            borderBottom: activeTab === tab ? `2px solid ${Orange}` : "2px solid transparent"
          }}>{emoji} {label}</button>
        ))}
      </div>
      <div style={{ flex: 1, overflow: "auto" }}>
        {activeTab === "discover" && (
          <div style={{ padding: "16px 20px" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 12 }}>{t.categories}</div>
            <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8, marginBottom: 20 }}>
              {categoriesData.map(cat => (
                <CategoryItem key={cat.name} category={cat} isSelected={selectedCategory === cat.name} onClick={setSelectedCategory} lang={lang} />
              ))}
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 12 }}>{t.upcoming}</div>
            {isLoading && <div style={{ textAlign: "center", padding: 40, color: Orange }}>⏳ {t.loading}</div>}
            {error && <div style={{ textAlign: "center", padding: 40, color: "red", fontSize: 13 }}>{error}</div>}
            {!isLoading && !error && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {filteredEvents.map(event => (
                  <EventCard key={event.id} event={event} onClick={setSelectedEvent} lang={lang} />
                ))}
              </div>
            )}
            {!isLoading && !error && filteredEvents.length === 0 && (
              <div style={{ textAlign: "center", color: "#999", padding: 40 }}>{t.noEvents}</div>
            )}
          </div>
        )}
        {activeTab === "map" && (
          <div style={{ height: "calc(100vh - 160px)" }}>
            <MapScreen events={events} onEventSelected={setSelectedEvent} t={t} />
          </div>
        )}
      </div>
    </div>
  );
}