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
visitorProfile: "Visitor Profile",
visitorName: "Your Name",
visitorEmail: "Your Email",
visitorSave: "Save",
visitorSaved: "Saved!",
loginRequired: "Please login to attend events",
loginNow: "Login Now",
forgotPassword: "Forgot Password?",
resetPassword: "Reset Password",
resetSent: "Check your email for a reset link!",
resetEmail: "Enter your email to reset password",
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
visitorProfile: "ملف الزائر",
visitorName: "اسمك",
visitorEmail: "بريدك الإلكتروني",
visitorSave: "حفظ",
visitorSaved: "تم الحفظ!",
loginRequired: "يرجى تسجيل الدخول للمشاركة في الفعاليات",
loginNow: "تسجيل الدخول",
forgotPassword: "نسيت كلمة المرور؟",
resetPassword: "إعادة تعيين كلمة المرور",
resetSent: "تحقق من بريدك الإلكتروني!",
resetEmail: "أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور",
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



function EventDetail({ event, onBack, lang, userEmail, userId }) {

  const [showBoothMapViewer, setShowBoothMapViewer] = useState(false);
  const t = translations[lang];
  const isAr = lang === "ar";
  const [showReservation, setShowReservation] = useState(false);

  const [isAttending, setIsAttending] = useState(false);
const [attendees, setAttendees] = useState([]);

useEffect(() => {
  const fetchAttendees = async () => {
    const { data } = await supabase
      .from("attendees")
      .select("*")
      .eq("event_id", event.id);
    setAttendees(data || []);
    if (userEmail) {
      setIsAttending(data?.some(a => a.email === userEmail) || false);
    }
  };
  fetchAttendees();
}, [event.id, userEmail]);

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
        
       {/* Attendees */}
{attendees.length > 0 && (
  <div style={{ marginBottom: 16 }}>
    <div style={{ fontSize: 13, color: "#999", marginBottom: 8 }}>
      👥 {attendees.length} {attendees.length === 1 ? "person" : "people"} attending
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
      {attendees.slice(0, 10).map((attendee, i) => (
        <div key={i} style={{
          width: 36, height: 36, borderRadius: "50%",
          background: `${Orange}22`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 700, color: Orange,
          border: `2px solid #fff`,
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          overflow: "hidden"
        }}>
          {attendee.avatar_url ? (
            <img src={attendee.avatar_url} alt={attendee.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            attendee.name?.[0]?.toUpperCase() || "👤"
          )}
        </div>
      ))}
      {attendees.length > 10 && (
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#999" }}>
          +{attendees.length - 10}
        </div>
      )}
    </div>
  </div>
)}

       {event.floor_map_url && (
  <button
    onClick={() => setShowBoothMapViewer(true)}
    style={{ width: "100%", padding: 14, borderRadius: 16, border: "none", background: Orange, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}
  >
    🗺️ View & Reserve Booth
  </button>
)}
{!event.floor_map_url && (
  <button onClick={() => setShowReservation(true)} style={{ width: "100%", padding: 14, borderRadius: 16, border: "none", background: Orange, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}>
    {t.reserveBooth}
  </button>
)}
        <button
 onClick={async () => {
  if (!userEmail) {
    alert(translations[lang]?.loginRequired || "Please login to attend events");
    return;
  }
    try {
      if (isAttending) {
        // Remove attendance
        await supabase.from("attendees")
          .delete()
          .eq("event_id", event.id)
          .eq("email", userEmail);
        setIsAttending(false);
        setAttendees(prev => prev.filter(a => a.email !== userEmail));
      } else {
        // Add attendance
        const { data } = await supabase.from("attendees").insert([{
          event_id: event.id,
          user_id: userId,
          email: userEmail,
          name: userEmail.split("@")[0],
          avatar_url: null
        }]).select();
        setIsAttending(true);
        setAttendees(prev => [...prev, data[0]]);
      }
    } catch (err) {
      console.error(err);
    }
  }}
  style={{
    width: "100%", padding: 14, borderRadius: 16, border: "none",
    background: isAttending ? "#E1F5EE" : `${Orange}18`,
    color: isAttending ? "#085041" : Orange,
    fontSize: 15, fontWeight: 700, cursor: "pointer",
    transition: "all 0.2s"
  }}
>
  {isAttending ? "✅ Attending" : t.attending}
</button>

      </div>
      {showReservation && <ReservationModal event={event} onClose={() => setShowReservation(false)} lang={lang} />}
      
      {showBoothMapViewer &&( <BoothMapViewer
  event={event}
  onClose={() => setShowBoothMapViewer(false)}
  userEmail={userEmail}
/>
      )}
    </div>
    
  );


}

function AdminScreen({ onBack, lang, onEventPublished }) {


  const [floorMapUrl, setFloorMapUrl] = useState("");
  const [myEvents, setMyEvents] = useState([]);
const [loadingEvents, setLoadingEvents] = useState(false);
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

const [locationSuggestions, setLocationSuggestions] = useState([]);
const [lat, setLat] = useState(29.3759);
const [lng, setLng] = useState(47.9774);



useEffect(() => {
  if (activeTab !== "events") return;
  const fetchMyEvents = async () => {
    setLoadingEvents(true);
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("id", { ascending: false });
    setMyEvents(data || []);
    setLoadingEvents(false);
  };
  fetchMyEvents();
}, [activeTab]);

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


  const handleDeleteEvent = async (eventId) => {
  if (!window.confirm("Are you sure you want to delete this event?")) return;
  try {
    // Delete reservations first
    await supabase.from("reservations").delete().eq("event_id", eventId);
    
    // Delete booths
    await supabase.from("booths").delete().eq("event_id", eventId);
    
    // Delete event
    const { error } = await supabase.from("events").delete().eq("id", eventId);
    
    if (error) {
      console.error("Delete error:", error);
      alert("Failed to delete event: " + error.message);
      return;
    }
    
    // Remove from local state
    setMyEvents(prev => prev.filter(e => e.id !== eventId));
    alert("Event deleted successfully!");
  } catch (err) {
    console.error(err);
    alert("Something went wrong!");
  }
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
        name: eventName, category: selectedCat, image_url: imageUrl, floor_map_url: floorMapUrl, distance: "Nearby",  
        date: date || "TBD", price: price || "FREE",
        lat: lat, lng: lng,
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
  ["organizers", t.organizerRequests, "👥"],["events", "My Events", "📅"]].map(([tab, label, emoji]) => (
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
 <div>
  <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>Floor Map (optional)</label>
  <input
    type="file"
    accept="image/*"
    onChange={async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("floor_maps")
        .upload(fileName, file);
      if (uploadError) { console.error(uploadError); return; }
      const { data: urlData } = supabase.storage
        .from("floor_maps")
        .getPublicUrl(fileName);
      setFloorMapUrl(urlData.publicUrl);
    }}
    style={{ width: "100%", padding: "10px 0", fontSize: 13, color: "#999", cursor: "pointer" }}
  />
  {floorMapUrl && (
    <img src={floorMapUrl} alt="floor map preview" style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 12, marginTop: 8 }} />
  )}
</div>
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
          <div style={{ position: "relative" }}>
  <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.location}</label>
  <input
    style={inputStyle}
    placeholder={isAr ? "مثال: الكويت" : "Search for a location..."}
    value={location}
    onChange={async (e) => {
  setLocation(e.target.value);
  if (e.target.value.length < 2) { setLocationSuggestions([]); return; }
  clearTimeout(window.locationTimeout);
  window.locationTimeout = setTimeout(async () => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(e.target.value)}&format=json&limit=4&countrycodes=kw&accept-language=en`,
        { headers: { "Accept-Language": "en", "User-Agent": "ateventi/1.0" } }
      );
      const data = await res.json();
      setLocationSuggestions(data.map(place => ({
        formatted_address: place.display_name,
        geometry: { location: { lat: parseFloat(place.lat), lng: parseFloat(place.lon) } }
      })));
    } catch (err) {
      console.error(err);
    }
  }, 400);
}}
  />
  {locationSuggestions.length > 0 && (
    <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.15)", zIndex: 100, overflow: "hidden" }}>
      {locationSuggestions.map((place, i) => (
        <div
          key={i}
          onClick={() => {
            setLocation(place.formatted_address);
            setLat(place.geometry.location.lat);
            setLng(place.geometry.location.lng);
            setLocationSuggestions([]);
          }}
          style={{ padding: "10px 14px", fontSize: 13, color: "#111", cursor: "pointer", borderBottom: "1px solid #f5f5f5" }}
          onMouseEnter={e => e.currentTarget.style.background = "#f8f8f8"}
          onMouseLeave={e => e.currentTarget.style.background = "#fff"}
        >
          📍 {place.formatted_address}
        </div>
      ))}
    </div>
  )}
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



{activeTab === "events" && (
  <div style={{ padding: 20 }}>
    {loadingEvents && <div style={{ textAlign: "center", color: Orange, padding: 40 }}>⏳</div>}
    {!loadingEvents && myEvents.length === 0 && (
      <div style={{ textAlign: "center", color: "#999", padding: 40 }}>No events yet</div>
    )}
    {!loadingEvents && myEvents.map(event => (
      <div key={event.id} style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            {event.image_url && (
              <img src={event.image_url} alt={event.name} style={{ width: "100%", height: 80, objectFit: "cover", borderRadius: 10, marginBottom: 8 }} />
            )}
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{event.name}</div>
            <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>📍 {event.location}</div>
            <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>📅 {event.date} · {event.time}</div>
            <div style={{ fontSize: 11, color: Orange, fontWeight: 600, marginTop: 2 }}>{event.price}</div>
          </div>
        </div>
        <button
          onClick={() => handleDeleteEvent(event.id)}
          style={{ width: "100%", marginTop: 10, padding: "8px 0", borderRadius: 10, border: "none", background: "#FFEBEE", color: "#c62828", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
        >
          🗑️ Delete Event
        </button>
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
  const [showForgotPassword, setShowForgotPassword] = useState(false);
const [resetEmail, setResetEmail] = useState("");
const [resetSent, setResetSent] = useState(false);
const [resetLoading, setResetLoading] = useState(false);

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

      {/* Forgot Password Screen */}
      {showForgotPassword && (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
          <button onClick={() => setShowForgotPassword(false)} style={{ background: "none", border: "none", color: "#999", fontSize: 13, cursor: "pointer", textAlign: isAr ? "right" : "left", padding: 0 }}>
            ← {isAr ? "رجوع" : "Back"}
          </button>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#111", textAlign: "center" }}>🔐</div>
          <div style={{ fontSize: 14, color: "#999", textAlign: "center" }}>{t.resetEmail}</div>
          <input
            style={{ width: "100%", padding: "12px 16px", borderRadius: 14, border: "1px solid #eee", background: "#f8f8f8", fontSize: 14, outline: "none", boxSizing: "border-box", direction: isAr ? "rtl" : "ltr" }}
            placeholder="john@email.com"
            value={resetEmail}
            onChange={e => setResetEmail(e.target.value)}
            type="email"
          />
          {resetSent && (
            <div style={{ background: "#E1F5EE", borderRadius: 12, padding: "10px 14px", fontSize: 13, color: "#085041", textAlign: "center" }}>
              ✅ {t.resetSent}
            </div>
          )}
          <button
            onClick={async () => {
              if (!resetEmail) return;
              setResetLoading(true);
              try {
                const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
                  redirectTo: "https://ateventi.com"
                });
                if (error) throw error;
                setResetSent(true);
              } catch (err) {
                console.error(err);
              } finally {
                setResetLoading(false);
              }
            }}
            disabled={resetLoading || !resetEmail}
            style={{
              width: "100%", padding: 14, borderRadius: 16, border: "none",
              background: resetLoading || !resetEmail ? "#ccc" : Orange,
              color: "#fff", fontSize: 15, fontWeight: 700,
              cursor: resetLoading || !resetEmail ? "not-allowed" : "pointer"
            }}
          >
            {resetLoading ? "..." : t.resetPassword}
          </button>
        </div>
      )}

      {/* Login / Signup Form */}
      {!showForgotPassword && (
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
          {isLogin && (
            <button onClick={() => setShowForgotPassword(true)} style={{ background: "none", border: "none", color: "#999", fontSize: 12, cursor: "pointer", textAlign: isAr ? "right" : "left", padding: 0 }}>
              {t.forgotPassword}
            </button>
          )}
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
          <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "4px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#eee" }} />
            <span style={{ fontSize: 11, color: "#ccc" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "#eee" }} />
          </div>
          <button onClick={() => onAuth("visitor")} style={{
            width: "100%", padding: 14, borderRadius: 16,
            border: "1px solid #eee", background: "#fff",
            color: "#666", fontSize: 15, fontWeight: 600, cursor: "pointer"
          }}>
            {lang === "ar" ? "متابعة كزائر 👀" : "Continue as Visitor 👀"}
          </button>
        </div>
      )}
    </div>
  );
}

function ProfileScreen({ user, userProfile, onBack, onLogout, lang, onProfileUpdate, onEventClick }) {
  const t = translations[lang];
  const isAr = lang === "ar";
  const [myReservations, setMyReservations] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrganizerForm, setShowOrganizerForm] = useState(false);
  const [reason, setReason] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);
  const [activeTab, setActiveTab] = useState("reservations");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(userProfile?.avatar_url || null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch reservations
      const { data: resData } = await supabase
        .from("reservations").select("*")
        .eq("email", user.email)
        .order("created_at", { ascending: false });
      setMyReservations(resData || []);

      // Fetch attending events
     const { data: attendData } = await supabase
  .from("attendees").select("*, events(*)")
  .eq("email", user.email)
  .order("created_at", { ascending: false });
      setMyEvents(attendData || []);

      // Fetch organizer request status
      const { data: reqData } = await supabase
        .from("organizer_requests").select("*")
        .eq("user_id", user.id).single();
      if (reqData) setRequestStatus(reqData.status);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(fileName);
      const url = urlData.publicUrl;
      await supabase.from("users").update({ avatar_url: url }).eq("id", user.id);
      setAvatarUrl(url);
      if (onProfileUpdate) onProfileUpdate({ ...userProfile, avatar_url: url });
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingAvatar(false);
    }
  };

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
      {/* Header */}
      <div style={{ background: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #eee" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#111" }}>←</button>
          <span style={{ fontWeight: 700, fontSize: 18, color: "#111" }}>{t.profile}</span>
        </div>
        <button onClick={onLogout} style={{ padding: "5px 14px", borderRadius: 20, border: "1px solid #eee", background: "transparent", color: "#999", fontSize: 12, cursor: "pointer" }}>
          {t.logout}
        </button>
      </div>

      <div style={{ padding: 20 }}>
        {/* User info with avatar */}
        <div style={{ background: "#fff", borderRadius: 20, padding: 20, marginBottom: 16, textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          {/* Avatar */}
          <div style={{ position: "relative", display: "inline-block", marginBottom: 12 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", background: `${Orange}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, border: `3px solid ${Orange}` }}>
              {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span>{userProfile?.name?.[0]?.toUpperCase() || "👤"}</span>
              )}
            </div>
            {/* Upload button */}
            <label style={{
              position: "absolute", bottom: 0, right: 0,
              width: 26, height: 26, borderRadius: "50%",
              background: Orange, display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)", fontSize: 14
            }}>
              {uploadingAvatar ? "⏳" : "📷"}
              <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: "none" }} />
            </label>
          </div>

          <div style={{ fontWeight: 700, fontSize: 18, color: "#111" }}>{userProfile?.name || user.email}</div>
          <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>{user.email}</div>
          <div style={{ marginTop: 8 }}>
            <span style={{
              padding: "3px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
              background: userProfile?.role === "admin" ? "#FFEBEE" : userProfile?.role === "organizer" ? "#F3E8FF" : "#E8FDF5",
              color: userProfile?.role === "admin" ? "#c62828" : userProfile?.role === "organizer" ? "#6B21A8" : "#065F46"
            }}>
              {userProfile?.role === "admin" ? "👑 Admin" : userProfile?.role === "organizer" ? "🎪 Organizer" : "🎉 Consumer"}
            </span>
          </div>
        </div>

        {/* Become organizer section */}
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

        {/* Tabs */}
        <div style={{ background: "#fff", borderRadius: 14, display: "flex", marginBottom: 16, overflow: "hidden" }}>
          {[["reservations", "🎪 Reservations"], ["calendar", "📅 My Calendar"]].map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1, padding: "10px 0", border: "none", background: "transparent",
              color: activeTab === tab ? Orange : "#999",
              fontWeight: activeTab === tab ? 700 : 400,
              fontSize: 12, cursor: "pointer",
              borderBottom: activeTab === tab ? `2px solid ${Orange}` : "2px solid transparent"
            }}>{label}</button>
          ))}
        </div>

        {/* Reservations tab */}
        {activeTab === "reservations" && (
          <>
            {loading && <div style={{ textAlign: "center", color: Orange, padding: 20 }}>⏳</div>}
            {!loading && myReservations.length === 0 && <div style={{ textAlign: "center", color: "#999", padding: 20 }}>{t.noMyReservations}</div>}
            {!loading && myReservations.map(res => (
              <div key={res.id} style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{res.event_name}</div>
                <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>🎪 {res.booth_type}</div>
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
          </>
        )}

        {/* Calendar tab */}
        {activeTab === "calendar" && (
          <>
            {loading && <div style={{ textAlign: "center", color: Orange, padding: 20 }}>⏳</div>}
            {!loading && myEvents.length === 0 && (
              <div style={{ textAlign: "center", color: "#999", padding: 40 }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>📅</div>
                <div>No events yet — tap "I'm Attending" on any event!</div>
              </div>
            )}
            {!loading && myEvents.map(item => (
              <div key={item.id} onClick={() => onEventClick(item.events)} style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }}
onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                {item.events?.image_url ? (
                  <img src={item.events.image_url} alt={item.events?.name} style={{ width: 56, height: 56, borderRadius: 12, objectFit: "cover", flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 56, height: 56, borderRadius: 12, background: `${Orange}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>🎉</div>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{item.events?.name}</div>
                  <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>📅 {item.events?.date}</div>
                  <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>⏰ {item.events?.time}</div>
                  <div style={{ fontSize: 11, color: Orange, marginTop: 2 }}>📍 {item.events?.location}</div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function OrganizerScreen({ onBack, lang, onEventPublished, userProfile }) {


  const [floorMapUrl, setFloorMapUrl] = useState("");
  const [myEvents, setMyEvents] = useState([]);
const [loadingEvents, setLoadingEvents] = useState(false);

  const [locationSuggestions, setLocationSuggestions] = useState([]);
const [lat, setLat] = useState(29.3759);
const [lng, setLng] = useState(47.9774);

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
  if (activeTab !== "events") return;
  const fetchMyEvents = async () => {
    setLoadingEvents(true);
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("id", { ascending: false });
    setMyEvents(data || []);
    setLoadingEvents(false);
  };
  fetchMyEvents();
}, [activeTab]);

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
        name: eventName, category: selectedCat, image_url: imageUrl,  floor_map_url: floorMapUrl, distance: "Nearby",  
        date: date || "TBD", price: price || "FREE",
        lat: lat, lng: lng,
        description: description || "No description provided.",
        host: userProfile?.name || "Organizer",
        time: time || "TBD", booths: parseInt(booths) || 10, location,
      };
      const { data, error: sbError } = await supabase.from("events").insert([newEvent]).select();
      if (sbError) throw sbError;
      onEventPublished(data[0]);
      setPublishedEvent(data[0]);
setPublished(true);
console.log("published!", data[0]);
    } catch (err) { console.error(err); setError("Failed to publish."); }
    finally { setIsPublishing(false); }
  };


  const handleDeleteEvent = async (eventId) => {
  if (!window.confirm("Are you sure you want to delete this event?")) return;
  try {
    // Delete reservations first
    await supabase.from("reservations").delete().eq("event_id", eventId);
    
    // Delete booths
    await supabase.from("booths").delete().eq("event_id", eventId);
    
    // Delete event
    const { error } = await supabase.from("events").delete().eq("id", eventId);
    
    if (error) {
      console.error("Delete error:", error);
      alert("Failed to delete event: " + error.message);
      return;
    }
    
    // Remove from local state
    setMyEvents(prev => prev.filter(e => e.id !== eventId));
    alert("Event deleted successfully!");
  } catch (err) {
    console.error(err);
    alert("Something went wrong!");

    
  }


};




if (showBoothMap && publishedEvent) return (
  <BoothMapEditor event={publishedEvent} onBack={() => setShowBoothMap(false)} lang={lang} />
);



if (published) return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, padding: 20 }}>
      <span style={{ fontSize: 72 }}>🎉</span>
      <div style={{ fontSize: 24, fontWeight: 700, color: "#111" }}>{t.published}</div>
      <button onClick={onBack} style={{ marginTop: 16, width: "100%", padding: "12px 32px", borderRadius: 16, border: "none", background: Orange, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>{t.backHome}</button>
      <button
        onClick={() => setShowBoothMap(true)}
        style={{ width: "100%", padding: 14, borderRadius: 16, border: `1px solid ${Orange}`, background: "transparent", color: Orange, fontSize: 15, fontWeight: 700, cursor: "pointer" }}
      >
        🗺️ Set Up Booth Map
      </button>
    </div>
  );

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", background: "#f8f8f8", minHeight: "100vh", direction: isAr ? "rtl" : "ltr" }}>
      <div style={{ background: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #eee" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>{isAr ? "→" : "←"}</button>
        <span style={{ fontWeight: 700, fontSize: 18 }}>🎪 Organizer Dashboard</span>
      </div>
      <div style={{ background: "#fff", display: "flex", borderBottom: "1px solid #eee" }}>
        {[["create", "📋 Create Event"], ["reservations", "🎪 Reservations"],  ["events", "📅 My Events"]].map(([tab, label]) => (
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
         <div style={{ position: "relative" }}>
  <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.location}</label>
  <input
    style={inputStyle}
    placeholder={isAr ? "مثال: الكويت" : "Search for a location..."}
    value={location}
    onChange={async (e) => {
  setLocation(e.target.value);
  if (e.target.value.length < 2) { setLocationSuggestions([]); return; }
  clearTimeout(window.locationTimeout);
  window.locationTimeout = setTimeout(async () => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(e.target.value)}&format=json&limit=4&countrycodes=kw&accept-language=en`,
        { headers: { "Accept-Language": "en", "User-Agent": "ateventi/1.0" } }
      );
      const data = await res.json();
      setLocationSuggestions(data.map(place => ({
        formatted_address: place.display_name,
        geometry: { location: { lat: parseFloat(place.lat), lng: parseFloat(place.lon) } }
      })));
    } catch (err) {
      console.error(err);
    }
  }, 400);
}}
  />
  {locationSuggestions.length > 0 && (
    <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.15)", zIndex: 100, overflow: "hidden" }}>
      {locationSuggestions.map((place, i) => (
        <div
          key={i}
          onClick={() => {
            setLocation(place.formatted_address);
            setLat(place.geometry.location.lat);
            setLng(place.geometry.location.lng);
            setLocationSuggestions([]);
          }}
          style={{ padding: "10px 14px", fontSize: 13, color: "#111", cursor: "pointer", borderBottom: "1px solid #f5f5f5" }}
          onMouseEnter={e => e.currentTarget.style.background = "#f8f8f8"}
          onMouseLeave={e => e.currentTarget.style.background = "#fff"}
        >
          📍 {place.formatted_address}
        </div>
      ))}
    </div>
  )}
</div>
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


{/* Event Image */}
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
      if (uploadError) { console.error(uploadError); return; }
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

{/* Floor Map */}
<div>
  <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>Floor Map (optional)</label>
  <input
    type="file"
    accept="image/*"
    onChange={async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("floor_maps")
        .upload(fileName, file);
      if (uploadError) { console.error(uploadError); return; }
      const { data: urlData } = supabase.storage
        .from("floor_maps")
        .getPublicUrl(fileName);
      setFloorMapUrl(urlData.publicUrl);
    }}
    style={{ width: "100%", padding: "10px 0", fontSize: 13, color: "#999", cursor: "pointer" }}
  />
  {floorMapUrl && (
    <img src={floorMapUrl} alt="floor map preview" style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 12, marginTop: 8 }} />
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

      {activeTab === "events" && (
  <div style={{ padding: 20 }}>
    {loadingEvents && <div style={{ textAlign: "center", color: Orange, padding: 40 }}>⏳</div>}
    {!loadingEvents && myEvents.length === 0 && (
      <div style={{ textAlign: "center", color: "#999", padding: 40 }}>No events yet</div>
    )}
    {!loadingEvents && myEvents.map(event => (
      <div key={event.id} style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ flex: 1 }}>
          {event.image_url && (
            <img src={event.image_url} alt={event.name} style={{ width: "100%", height: 80, objectFit: "cover", borderRadius: 10, marginBottom: 8 }} />
          )}
          <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{event.name}</div>
          <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>📍 {event.location}</div>
          <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>📅 {event.date} · {event.time}</div>
          <div style={{ fontSize: 11, color: Orange, fontWeight: 600, marginTop: 2 }}>{event.price}</div>
        </div>
        <button
          onClick={() => handleDeleteEvent(event.id)}
          style={{ width: "100%", marginTop: 10, padding: "8px 0", borderRadius: 10, border: "none", background: "#FFEBEE", color: "#c62828", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
        >
          🗑️ Delete Event
        </button>
      </div>
    ))}
  </div>
)}
    </div>
  );
}


//event booths maps 

function BoothMapEditor({ event, onBack }) {

  
  const [zoom, setZoom] = useState(1);
  const [floorMap, setFloorMap] = useState(event.floor_map_url || null);
  const [booths, setBooths] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [boothTypes, setBoothTypes] = useState([
    { id: 1, name: "Standard", color: "#22C55E", price: "", size: "" },
  ]);
  const [selectedType, setSelectedType] = useState(null);
  const [showTypeForm, setShowTypeForm] = useState(false);
  const [newType, setNewType] = useState({ name: "", color: "#6366F1", price: "", size: "" });
  const mapRef = React.useRef(null);

  const colors = ["#22C55E", "#A855F7", "#EF4444", "#3B82F6", "#F59E0B", "#EC4899", "#14B8A6", "#F97316"];

  useEffect(() => {
    const fetchBooths = async () => {
      const { data } = await supabase.from("booths").select("*").eq("event_id", event.id);
      setBooths(data || []);
    };
    fetchBooths();
  }, [event.id]);

  const handleMapUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const fileName = `${event.id}-${Math.random()}.${file.name.split(".").pop()}`;
    const { error: uploadError } = await supabase.storage.from("floor_maps").upload(fileName, file);
    if (uploadError) { console.error(uploadError); setIsUploading(false); return; }
    const { data: urlData } = supabase.storage.from("floor_maps").getPublicUrl(fileName);
    const url = urlData.publicUrl;
    await supabase.from("events").update({ floor_map_url: url }).eq("id", event.id);
    setFloorMap(url);
    setIsUploading(false);
  };

  const handleMapClick = async (e) => {
    if (!selectedType || !mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const newBooth = {
      event_id: event.id,
      booth_number: `${selectedType.name[0]}${booths.length + 1}`,
      x, y,
      price: selectedType.price,
      size: selectedType.size,
      color: selectedType.color,
      type_name: selectedType.name,
      status: "available"
    };
    const { data } = await supabase.from("booths").insert([newBooth]).select();
    setBooths(prev => [...prev, data[0]]);
  };

  const handleDeleteBooth = async (boothId, e) => {
    e.stopPropagation();
    await supabase.from("booths").delete().eq("id", boothId);
    setBooths(prev => prev.filter(b => b.id !== boothId));
  };

  const handleAddType = () => {
    if (!newType.name || !newType.price) return;
    setBoothTypes(prev => [...prev, { ...newType, id: Date.now() }]);
    setNewType({ name: "", color: colors[boothTypes.length % colors.length], price: "", size: "" });
    setShowTypeForm(false);
  };

  const inputStyle = {
    width: "100%", padding: "8px 12px", borderRadius: 10,
    border: "1px solid #eee", background: "#f8f8f8",
    fontSize: 13, outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", background: "#f8f8f8", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
        <span style={{ fontWeight: 700, fontSize: 16 }}>🗺️ Booth Map — {event.name}</span>
      </div>

      <div style={{ padding: 16 }}>

        {/* Booth Types Panel */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>🎨 Booth Types</div>
            <button
              onClick={() => setShowTypeForm(true)}
              style={{ padding: "4px 12px", borderRadius: 20, border: "none", background: Orange, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
            >
              + Add Type
            </button>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {boothTypes.map(type => (
              <div
                key={type.id}
                onClick={() => setSelectedType(selectedType?.id === type.id ? null : type)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "8px 14px", borderRadius: 20,
                  border: `2px solid ${selectedType?.id === type.id ? type.color : "#eee"}`,
                  background: selectedType?.id === type.id ? `${type.color}18` : "#f8f8f8",
                  cursor: "pointer", transition: "all 0.2s"
                }}
              >
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: type.color, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 12, color: "#111" }}>{type.name}</div>
                  <div style={{ fontSize: 10, color: "#999" }}>{type.price} · {type.size}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, padding: "8px 12px", background: "#f0f0f0", borderRadius: 10 }}>
            <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#aaa" }} />
            <span style={{ fontSize: 11, color: "#666" }}>Grey = Reserved</span>
          </div>
        </div>

        {/* Selected type indicator */}
        {selectedType && (
          <div style={{ background: `${selectedType.color}18`, border: `1px solid ${selectedType.color}`, borderRadius: 12, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: selectedType.color, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 16, height: 16, borderRadius: "50%", background: selectedType.color }} />
            Placing: {selectedType.name} — Click map to add · Deselect type then click dot to delete
          </div>
        )}

        {!selectedType && floorMap && (
          <div style={{ background: "#fff8e1", border: "1px solid #ffe082", borderRadius: 12, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: "#7c5800", fontWeight: 600 }}>
            👆 Select a booth type above to start placing booths
          </div>
        )}

        {/* Map */}
        {!floorMap ? (
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏢</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#111", marginBottom: 8 }}>Upload Floor Map</div>
            <label style={{ display: "inline-block", padding: "10px 24px", borderRadius: 14, background: Orange, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              {isUploading ? "Uploading..." : "📁 Choose Image"}
              <input type="file" accept="image/*" onChange={handleMapUpload} style={{ display: "none" }} />
            </label>
          </div>
        ) : (
          <>
           {/* Zoom controls */}
<div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 8 }}>
  <button
    onClick={() => setZoom(z => Math.min(z + 0.25, 3))}
    style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: "#fff", fontSize: 18, cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.15)", fontWeight: 700 }}
  >+</button>
  <button
    onClick={() => setZoom(z => Math.max(z - 0.25, 0.5))}
    style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: "#fff", fontSize: 18, cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.15)", fontWeight: 700 }}
  >−</button>
  <button
    onClick={() => setZoom(1)}
    style={{ padding: "0 12px", height: 36, borderRadius: 20, border: "none", background: "#fff", fontSize: 12, cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.15)", color: "#666" }}
  >Reset</button>
</div>

{/* Map container with zoom */}
<div style={{ overflow: "auto", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: 12, border: selectedType ? `2px solid ${selectedType.color}` : "2px solid transparent" }}>
  <div
    ref={mapRef}
    onClick={handleMapClick}
    style={{
      position: "relative",
      width: "100%",
      transform: `scale(${zoom})`,
      transformOrigin: "top left",
      cursor: selectedType ? "crosshair" : "default",
      transition: "transform 0.2s"
    }}
  >
    <img src={floorMap} alt="floor map" style={{ width: "100%", display: "block", pointerEvents: "none" }} />
    {booths.map(booth => (
      <div
        key={booth.id}
        onClick={(e) => {
  if (!selectedType) {
    handleDeleteBooth(booth.id, e);
  }
}}
        title={`${booth.type_name} | ${booth.price} | ${booth.size} — double-click to delete`}
        style={{
          position: "absolute",
          left: `${booth.x}%`,
          top: `${booth.y}%`,
          transform: "translate(-50%, -50%)",
          width: 10, height: 10,
          borderRadius: "50%",
          background: booth.status === "reserved" ? "#aaa" : booth.color || Orange,
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
          border: "0.5px solid #fff",
          zIndex: 2,
        }}
      />
    ))}
  </div>
</div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              <div style={{ flex: 1, background: "#fff", borderRadius: 14, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: Orange }}>{booths.length}</div>
                <div style={{ fontSize: 10, color: "#999" }}>Total</div>
              </div>
              <div style={{ flex: 1, background: "#fff", borderRadius: 14, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#22C55E" }}>{booths.filter(b => b.status === "available").length}</div>
                <div style={{ fontSize: 10, color: "#999" }}>Available</div>
              </div>
              <div style={{ flex: 1, background: "#fff", borderRadius: 14, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#aaa" }}>{booths.filter(b => b.status === "reserved").length}</div>
                <div style={{ fontSize: 10, color: "#999" }}>Reserved</div>
              </div>
            </div>

            <label style={{ display: "block", padding: "10px", borderRadius: 14, border: `1px solid ${Orange}`, color: Orange, fontSize: 13, fontWeight: 700, cursor: "pointer", textAlign: "center" }}>
              🔄 Change Floor Map
              <input type="file" accept="image/*" onChange={handleMapUpload} style={{ display: "none" }} />
            </label>
          </>
        )}
      </div>

      {/* Add Type Modal */}
      {showTypeForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "#fff", borderRadius: "24px 24px 0 0", padding: 24, width: "100%", maxWidth: 480 }}>
            <div style={{ width: 40, height: 4, background: "#eee", borderRadius: 2, margin: "0 auto 20px" }} />
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>🎨 Add Booth Type</div>

            <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>Type Name</label>
            <input style={{ ...inputStyle, marginBottom: 10 }} placeholder="e.g. Premium, Corner, VIP" value={newType.name} onChange={e => setNewType(p => ({ ...p, name: e.target.value }))} />

            <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 8 }}>Pick a Color</label>
            <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              {colors.map(color => (
                <div
                  key={color}
                  onClick={() => setNewType(p => ({ ...p, color }))}
                  style={{
                    width: 36, height: 36, borderRadius: "50%", background: color,
                    cursor: "pointer",
                    border: newType.color === color ? "3px solid #111" : "3px solid transparent",
                    boxShadow: newType.color === color ? "0 0 0 2px #fff, 0 0 0 4px #111" : "none",
                    transition: "all 0.2s"
                  }}
                />
              ))}
            </div>

            <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>Price</label>
            <input style={{ ...inputStyle, marginBottom: 10 }} placeholder="e.g. 250 KWD" value={newType.price} onChange={e => setNewType(p => ({ ...p, price: e.target.value }))} />

            <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>Size</label>
            <input style={{ ...inputStyle, marginBottom: 20 }} placeholder="e.g. 3x3m" value={newType.size} onChange={e => setNewType(p => ({ ...p, size: e.target.value }))} />

            <button onClick={handleAddType} style={{ width: "100%", padding: 14, borderRadius: 16, border: "none", background: newType.name && newType.price ? Orange : "#ccc", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}>
              ✓ Add Booth Type
            </button>
            <button onClick={() => setShowTypeForm(false)} style={{ width: "100%", padding: 10, borderRadius: 16, border: "none", background: "transparent", color: "#999", fontSize: 13, cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


function BoothMapViewer({ event, onClose, userEmail }) {
  //const isAr = lang === "ar";
  const [booths, setBooths] = useState([]);
  const [selectedBooth, setSelectedBooth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reserving, setReserving] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(userEmail || "");
  const mapRef = React.useRef(null);

  useEffect(() => {
    const fetchBooths = async () => {
      const { data } = await supabase
        .from("booths")
        .select("*")
        .eq("event_id", event.id);
      setBooths(data || []);
      setLoading(false);
    };
    fetchBooths();
  }, [event.id]);

  const handleReserveBooth = async () => {
    if (!name || !email) return;
    setReserving(true);
    try {
      // Save reservation
      await supabase.from("reservations").insert([{
        event_id: event.id,
        event_name: event.name,
        name,
        email,
        booth_type: `Booth ${selectedBooth.booth_number} (${selectedBooth.size || "Standard"})`,
        status: "pending"
      }]);

      // Update booth status to reserved
      await supabase.from("booths").update({ status: "reserved", reserved_by: email }).eq("id", selectedBooth.id);

      // Update local state
      setBooths(prev => prev.map(b => b.id === selectedBooth.id ? { ...b, status: "reserved" } : b));
      setReserved(true);
    } catch (err) {
      console.error(err);
    } finally {
      setReserving(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 12,
    border: "1px solid #eee", background: "#f8f8f8",
    fontSize: 13, outline: "none", boxSizing: "border-box",
  };

  if (reserved) return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100 }}>
      <div style={{ background: "#fff", borderRadius: "24px 24px 0 0", padding: 32, width: "100%", maxWidth: 480, textAlign: "center" }}>
        <div style={{ fontSize: 64 }}>🎉</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#111", marginTop: 12 }}>Booth Reserved!</div>
        <div style={{ fontSize: 13, color: "#999", marginTop: 8, marginBottom: 24 }}>
          Booth <strong>{selectedBooth.booth_number}</strong> has been reserved successfully!
        </div>
        <button onClick={onClose} style={{ width: "100%", padding: 14, borderRadius: 16, border: "none", background: Orange, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          Done
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "#f8f8f8", zIndex: 100, overflowY: "auto" }}>
      {/* Header */}
      <div style={{ background: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
        <span style={{ fontWeight: 700, fontSize: 16 }}>🗺️ Booth Map — {event.name}</span>
      </div>

      <div style={{ padding: 16 }}>
        {/* Legend */}
        <div style={{ display: "flex", gap: 12, marginBottom: 12, background: "#fff", borderRadius: 12, padding: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#666" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22C55E" }} />
Available (color varies by type)
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#666" }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, background: "#aaa" }} />
            Reserved
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#666" }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, background: "#06D6A0" }} />
            Selected
          </div>
        </div>

        {/* Map */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 40, color: Orange }}>⏳ Loading map...</div>
        ) : (
          <div
            ref={mapRef}
            style={{ position: "relative", width: "100%", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: 12 }}
          >
            <img src={event.floor_map_url} alt="floor map" style={{ width: "100%", display: "block" }} />
            {booths.map(booth => (
              <div
                key={booth.id}
                onClick={() => {
                  if (booth.status === "reserved") return;
                  setSelectedBooth(selectedBooth?.id === booth.id ? null : booth);
                }}
                style={{
                  position: "absolute",
                  left: `${booth.x}%`,
                  top: `${booth.y}%`,
                  transform: "translate(-50%, -50%)",
                  width: 10, height: 10,
                  borderRadius: 8,
                  background: booth.status === "reserved" ? "#aaa" : selectedBooth?.id === booth.id ? "#06D6A0" : Orange,
                 
                  cursor: booth.status === "reserved" ? "not-allowed" : "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                  border: selectedBooth?.id === booth.id ? "2px solid #fff" : "none",
                  zIndex: 2,
                  transition: "all 0.2s"
                }}
              >
                {/*{booth.booth_number}*/}
              </div>
            ))}
          </div>
        )}

        {/* Booth info + reservation form */}
        {selectedBooth && (
          <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#111", marginBottom: 12 }}>
              🎪 Booth {selectedBooth.booth_number}
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <div style={{ flex: 1, background: "#f8f8f8", borderRadius: 12, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: Orange }}>{selectedBooth.price}</div>
                <div style={{ fontSize: 10, color: "#999", marginTop: 2 }}>Price</div>
              </div>
              <div style={{ flex: 1, background: "#f8f8f8", borderRadius: 12, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#111" }}>{selectedBooth.size || "Standard"}</div>
                <div style={{ fontSize: 10, color: "#999", marginTop: 2 }}>Size</div>
              </div>
            </div>

            <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>Your Name</label>
            <input style={{ ...inputStyle, marginBottom: 10 }} placeholder="John Smith" value={name} onChange={e => setName(e.target.value)} />

            <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>Your Email</label>
            <input style={{ ...inputStyle, marginBottom: 16 }} placeholder="john@email.com" value={email} onChange={e => setEmail(e.target.value)} type="email" />

            <button
              onClick={handleReserveBooth}
              disabled={reserving || !name || !email}
              style={{
                width: "100%", padding: 14, borderRadius: 16, border: "none",
                background: reserving || !name || !email ? "#ccc" : Orange,
                color: "#fff", fontSize: 15, fontWeight: 700,
                cursor: reserving || !name || !email ? "not-allowed" : "pointer"
              }}
            >
              {reserving ? "Reserving..." : `🎪 Reserve Booth ${selectedBooth.booth_number}`}
            </button>
          </div>
        )}

        {!loading && booths.length === 0 && (
          <div style={{ textAlign: "center", color: "#999", padding: 40 }}>
            No booths set up for this event yet.
          </div>
        )}
      </div>
    </div>
  );
}


//Add VisitorProfile component

function VisitorProfile({ onClose, lang, visitorInfo, onSave, onLoginClick }) {
  const t = translations[lang];
  const isAr = lang === "ar";
  const [name, setName] = useState(visitorInfo.name || "");
  const [email, setEmail] = useState(visitorInfo.email || "");
  const [avatarUrl, setAvatarUrl] = useState(visitorInfo.avatar_url || null);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fileName = `visitor-${Math.random()}.${file.name.split(".").pop()}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(fileName);
      setAvatarUrl(urlData.publicUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    onSave({ name, email, avatar_url: avatarUrl });
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 1000);
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 12,
    border: "1px solid #eee", background: "#f8f8f8",
    fontSize: 13, outline: "none", boxSizing: "border-box",
    direction: isAr ? "rtl" : "ltr",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex" }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{ flex: 1, background: "rgba(0,0,0,0.5)" }} />
      {/* Side panel */}
      <div style={{
        width: 300, background: "#fff", padding: 24,
        overflowY: "auto", direction: isAr ? "rtl" : "ltr",
        animation: "slideIn 0.3s ease"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <span style={{ fontWeight: 700, fontSize: 18, color: "#111" }}>{t.visitorProfile}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#999" }}>✕</button>
        </div>

        {/* Avatar */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", background: `${Orange}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, border: `3px solid ${Orange}`, margin: "0 auto" }}>
              {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span>👤</span>
              )}
            </div>
            <label style={{
              position: "absolute", bottom: 0, right: 0,
              width: 26, height: 26, borderRadius: "50%",
              background: Orange, display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)", fontSize: 14
            }}>
              {uploading ? "⏳" : "📷"}
              <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: "none" }} />
            </label>
          </div>
        </div>

        {/* Name */}
        <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.visitorName}</label>
        <input style={{ ...inputStyle, marginBottom: 12 }} placeholder="John Smith" value={name} onChange={e => setName(e.target.value)} />

        {/* Email */}
        <label style={{ fontSize: 12, color: "#999", display: "block", marginBottom: 4 }}>{t.visitorEmail}</label>
        <input style={{ ...inputStyle, marginBottom: 24 }} placeholder="john@email.com" value={email} onChange={e => setEmail(e.target.value)} type="email" />

        {/* Save button */}
        <button onClick={handleSave} style={{
          width: "100%", padding: 14, borderRadius: 16, border: "none",
          background: saved ? "#06D6A0" : Orange,
          color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
          transition: "background 0.3s"
        }}>
          {saved ? `✅ ${t.visitorSaved}` : t.visitorSave}
        </button>

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <span style={{ fontSize: 12, color: "#999" }}>Want full access? </span>
          <button onClick={() => { onClose(); onLoginClick(); }} style={{ background: "none", border: "none", color: Orange, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
  Login / Sign Up
</button>
        </div>
      </div>
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
  const [isVisitor, setIsVisitor] = useState(false);
  const [visitorInfo, setVisitorInfo] = useState({ name: "", email: "", avatar_url: null });
const [showVisitorProfile, setShowVisitorProfile] = useState(false);


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

  

if (!user && !isVisitor) return <AuthScreen onAuth={(type) => { if (type === "visitor") setIsVisitor(true); }} lang={lang} />;
  if (selectedEvent) return <EventDetail event={selectedEvent} onBack={() => setSelectedEvent(null)} lang={lang} userEmail={user?.email} userId={user?.id} />;
  if (showAdmin) return <AdminScreen onBack={() => setShowAdmin(false)} lang={lang} onEventPublished={(e) => { setEvents(prev => [...prev, e]); setShowAdmin(false); }} user={user} />;
  if (showOrganizer) return <OrganizerScreen onBack={() => setShowOrganizer(false)} lang={lang} onEventPublished={(e) => { setEvents(prev => [...prev, e]); }} user={user} userProfile={userProfile} />;
  if (showProfile) return (
  <ProfileScreen
    user={user}
    userProfile={userProfile}
    onBack={() => setShowProfile(false)}
    onLogout={handleLogout}
    lang={lang}
    onProfileUpdate={(updated) => setUserProfile(updated)}
    onEventClick={(event) => { setShowProfile(false); setSelectedEvent(event); }}
  />
);

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

            <button
  onClick={() => { if (user) setShowProfile(true); else setShowVisitorProfile(true); }}
  style={{
    width: 32, height: 32, borderRadius: "50%", border: "none",
    background: `${Orange}22`, color: Orange, fontSize: 16, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    overflow: "hidden"
  }}
>
  
  {isVisitor && visitorInfo.avatar_url ? (
    <img src={visitorInfo.avatar_url} alt="visitor" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  ) : (
    "👤"
  )}
</button>
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
      
     {showVisitorProfile && (
  <VisitorProfile
    onClose={() => setShowVisitorProfile(false)}
    lang={lang}
    visitorInfo={visitorInfo}
    onSave={(info) => setVisitorInfo(info)}
    onLoginClick={() => { setShowVisitorProfile(false); setIsVisitor(false); }}
  />
)}
    </div>
  );
}