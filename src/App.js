import "./styles.css";
import React, { useEffect, useMemo, useState } from "react";
import { PDS_MAP } from "./data/pdsMap";
import { PDS_LIBRARY_INDEX } from "./data/pdsLibraryIndex";
import { supabase } from "./supabase";
const PRODUCT_DB = [
  {
    brand: "Shell",
    name: "Rotella T4 15W-40",
    category: "Heavy Duty Engine Oil",
    klondike: "Klondike SHD Plus 15W-40",
    tier: "Professional",
  },
  {
    brand: "Mobil",
    name: "Delvac MX 15W-40",
    category: "Heavy Duty Engine Oil",
    klondike: "Klondike SHD Plus 15W-40",
    tier: "Professional",
  },
  {
    brand: "Chevron",
    name: "Delo 400 15W-40",
    category: "Heavy Duty Engine Oil",
    klondike: "Klondike SHD Plus 15W-40",
    tier: "Advanced",
  },
];
const DEFAULT_INTRO = `Based on a review of your current lubrication program, equipment demands, and operating environment, we have identified opportunities to improve equipment reliability, streamline product selection, and reduce contamination risk.

This recommendation is designed to simplify your lubrication program while enhancing performance and supporting long-term operational efficiency.`;

const DEFAULT_CLOSING = `We appreciate the opportunity to support your operation and present this recommendation.

Our team is committed to delivering not only high-quality products, but also the technical expertise and support required to help you improve performance, reduce risk, and drive long-term results.

Your representative will follow up to review next steps and ensure a smooth implementation.`;

/**
 * Label OCR stub. Do not put API keys here — real OCR should call a Supabase Edge Function
 * (or other backend) so secrets stay off the client.
 * @param {File} imageFile
 * @returns {Promise<{ text: string }>}
 */
async function extractLabelTextFromImage(imageFile) {
  if (!imageFile) {
    return { text: "", error: "No image selected" };
  }
  try {
    const base64Image = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result || "");
        const payload = result.includes(",") ? result.split(",")[1] : result;
        resolve(payload);
      };
      reader.onerror = () => reject(reader.error || new Error("File read failed"));
      reader.readAsDataURL(imageFile);
    });

    const { data, error } = await supabase.functions.invoke("analyze-label-image", {
      body: {
        imageBase64: base64Image,
        filename: imageFile.name || null,
        contentType: imageFile.type || null,
      },
    });
    if (error) {
      console.error("OCR function invoke failed:", error);
      return { text: "", error: error.message || "OCR function failed" };
    }

    const detectedText = String(data?.text || "").trim();
    if (!detectedText) {
      return {
        text: "",
        error: String(data?.error || "No label text detected"),
      };
    }

    return {
      text: detectedText,
      error: "",
      brand: String(data?.brand || "").trim(),
      viscosity: String(data?.viscosity || "").trim(),
      confidence: data?.confidence,
      source: data?.source,
    };
  } catch (err) {
    console.error("OCR extraction failed:", err);
    return { text: "", error: "OCR function failed" };
  }
}

function extractViscosityFromText(text) {
  const m = String(text || "").match(/\b\d{1,2}W-\d{2}\b/i);
  return m ? m[0].toUpperCase() : "";
}

const OCR_FAILURE_RECOVERY_MESSAGE =
  "Could not confidently identify the product label.";
const OCR_FAILURE_RECOVERY_GUIDANCE =
  "Try another photo, edit the product text manually, or continue with manual cross-reference.";

async function logOcrScanEvent(payload) {
  try {
    const { error } = await supabase.from("ocr_scan_events").insert(payload);
    if (error) {
      console.error("OCR scan event log failed:", error.message || error);
    }
  } catch (err) {
    console.error("OCR scan event log failed:", err);
  }
}

const OCR_CROSSOVER_NORMALIZATION_RULES = [
  {
    name: "Shell Rotella T6",
    brandPatterns: [/shell/i],
    productPatterns: [/rotella/i, /\bt6\b/i],
    output: ({ viscosity }) =>
      ["Shell Rotella T6", viscosity].filter(Boolean).join(" ").trim(),
  },
  {
    name: "Shell Rotella T4",
    brandPatterns: [/shell/i],
    productPatterns: [/rotella/i, /\bt4\b/i],
    output: ({ viscosity }) =>
      ["Shell Rotella T4", viscosity].filter(Boolean).join(" ").trim(),
  },
  {
    name: "Mobil Delvac",
    brandPatterns: [/mobil/i],
    productPatterns: [/delvac/i],
    output: ({ viscosity, raw }) =>
      [
        "Mobil Delvac",
        /\bmx\b/i.test(raw) ? "MX" : "",
        /\bextreme\b/i.test(raw) ? "Extreme" : "",
        viscosity,
      ]
        .filter(Boolean)
        .join(" ")
        .trim(),
  },
  {
    name: "Chevron Delo",
    brandPatterns: [/chevron/i],
    productPatterns: [/delo/i],
    output: ({ viscosity }) =>
      ["Chevron Delo", viscosity].filter(Boolean).join(" ").trim(),
  },
  {
    name: "Castrol Vecton",
    brandPatterns: [/castrol/i],
    productPatterns: [/vecton/i],
    output: ({ viscosity }) =>
      ["Castrol Vecton", viscosity].filter(Boolean).join(" ").trim(),
  },
  {
    name: "Petro-Canada Duron",
    brandPatterns: [/petro[-\s]?canada/i, /petro\s?can/i],
    productPatterns: [/duron/i],
    output: ({ viscosity }) =>
      ["Petro-Canada Duron", viscosity].filter(Boolean).join(" ").trim(),
  },
  {
    name: "Valvoline Premium Blue",
    brandPatterns: [/valvoline/i],
    productPatterns: [/premium\s+blue/i],
    output: ({ viscosity }) =>
      ["Valvoline Premium Blue", viscosity].filter(Boolean).join(" ").trim(),
  },
];

function normalizeOcrCrossoverText(text) {
  const raw = String(text || "").trim();
  if (!raw) return "";

  const viscosityMatch = raw.match(/\b\d{1,2}W-\d{2}\b/i);
  const viscosity = viscosityMatch ? viscosityMatch[0].toUpperCase() : "";
  const matchedRule = OCR_CROSSOVER_NORMALIZATION_RULES.find((rule) => {
    const brandOk = (rule.brandPatterns || []).some((rx) => rx.test(raw));
    const productOk = (rule.productPatterns || []).some((rx) => rx.test(raw));
    return brandOk && productOk;
  });

  const noisePattern =
    /\b(full\s+synthetic|synthetic|sae|heavy\s+duty|diesel|engine\s+oil|motor\s+oil)\b/gi;

  let normalized = matchedRule
    ? matchedRule.output({ viscosity, raw })
    : raw
        .replace(noisePattern, " ")
        .replace(/[()]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

  if (viscosity && !new RegExp(`\\b${viscosity}\\b`, "i").test(normalized)) {
    normalized = `${normalized} ${viscosity}`.trim();
  }

  return normalized;
}

function LeaderboardBadgeTray({
  index,
  proposals,
  approvalRate,
  quotes,
  responses,
  revenue,
  approved,
}) {
  const p = Number(proposals) || 0;
  const q = quotes != null ? Number(quotes) : NaN;
  const resp = responses != null ? Number(responses) : NaN;
  const rev = revenue != null ? Number(revenue) : NaN;
  const app =
    approved != null && approved !== "" ? Number(approved) : NaN;
  const ar =
    approvalRate != null && approvalRate !== ""
      ? Number(approvalRate)
      : NaN;
  const hasRate = Number.isFinite(ar);

  const badges = [];

  if (index === 0) {
    badges.push({
      key: "top",
      className: "kd-lb-badge kd-lb-badge--top",
      label: "Rank #1 — top performer",
      node: (
        <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden>
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.85"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM7 8H5a2 2 0 004 0m6-4h2a2 2 0 01-4 0"
          />
        </svg>
      ),
    });
  }

  if (hasRate) {
    if (ar >= 78) {
      badges.push({
        key: "fire",
        className: "kd-lb-badge kd-lb-badge--fire",
        label: "Strong approval rate",
        node: (
          <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden>
            <path
              fill="currentColor"
              d="M12 2c0 4-4 6-3 11 1 4 5 5 8 3-2 2-6 3-9 1C5 14 6 9 9 6 10 5 12 2 12 2z"
            />
          </svg>
        ),
      });
    }
    if (ar >= 52 && p >= 3 && (!Number.isFinite(app) || app >= 2)) {
      badges.push({
        key: "target",
        className: "kd-lb-badge kd-lb-badge--target",
        label: "Solid conversion on decisions",
        node: (
          <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden>
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="12"
              cy="12"
              r="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        ),
      });
    }
    if (
      index === 0 &&
      ar >= 82 &&
      p >= 6 &&
      Number.isFinite(rev) &&
      rev > 0
    ) {
      badges.push({
        key: "elite",
        className: "kd-lb-badge kd-lb-badge--elite",
        label: "Elite performance",
        node: (
          <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden>
            <path
              fill="currentColor"
              d="M12 3l2 5 5 .5-4 3.5 1 5L12 15l-4 2 1-5-4-3.5L10 8l2-5z"
            />
          </svg>
        ),
      });
    }
  } else {
    if (Number.isFinite(resp) && resp >= 6 && p >= 3) {
      badges.push({
        key: "fire",
        className: "kd-lb-badge kd-lb-badge--fire",
        label: "High customer response activity",
        node: (
          <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden>
            <path
              fill="currentColor"
              d="M12 2c0 4-4 6-3 11 1 4 5 5 8 3-2 2-6 3-9 1C5 14 6 9 9 6 10 5 12 2 12 2z"
            />
          </svg>
        ),
      });
    }
    if (Number.isFinite(q) && q >= 8 && p >= 4) {
      badges.push({
        key: "target",
        className: "kd-lb-badge kd-lb-badge--target",
        label: "Strong quote-to-proposal momentum",
        node: (
          <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden>
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="12"
              cy="12"
              r="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        ),
      });
    }
    if (
      index === 0 &&
      p >= 8 &&
      Number.isFinite(q) &&
      q >= 10 &&
      Number.isFinite(rev) &&
      rev > 0
    ) {
      badges.push({
        key: "elite",
        className: "kd-lb-badge kd-lb-badge--elite",
        label: "Elite coverage",
        node: (
          <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden>
            <path
              fill="currentColor"
              d="M12 3l2 5 5 .5-4 3.5 1 5L12 15l-4 2 1-5-4-3.5L10 8l2-5z"
            />
          </svg>
        ),
      });
    }
  }

  if (p >= 7) {
    badges.push({
      key: "bolt",
      className: "kd-lb-badge kd-lb-badge--bolt",
      label: "High proposal activity",
      node: (
        <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden>
          <path
            fill="currentColor"
            d="M11 3L4 14h6l-1 7 9-11h-6l2.5-7H11z"
          />
        </svg>
      ),
    });
  }

  const seen = new Set();
  const uniq = badges.filter((b) =>
    seen.has(b.key) ? false : (seen.add(b.key), true)
  );

  const priority = ["top", "elite", "fire", "target", "bolt"];
  const capped = [...uniq]
    .sort((a, b) => priority.indexOf(a.key) - priority.indexOf(b.key))
    .slice(0, 4);

  if (capped.length === 0) return null;

  return (
    <span
      className="kd-lb-tray"
      role="list"
      aria-label="Performance highlights"
    >
      {capped.map((b) => (
        <span
          key={b.key}
          className={b.className}
          role="listitem"
          title={b.label}
        >
          {b.node}
        </span>
      ))}
    </span>
  );
}

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [appLoading, setAppLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [memberships, setMemberships] = useState([]);
  const [activeOrgId, setActiveOrgId] = useState("");
  const [activeMembership, setActiveMembership] = useState(null);

  const [dealerOrganizations, setDealerOrganizations] = useState([]);
  const [dealerProfile, setDealerProfile] = useState(null);
  const [repProfiles, setRepProfiles] = useState([]);
  const [managerMembers, setManagerMembers] = useState([]);
  const [teamAssignments, setTeamAssignments] = useState([]);

  const [recentInvites, setRecentInvites] = useState([]);
  const [recentAccessRequests, setRecentAccessRequests] = useState([]);

  const [inviteOrgId, setInviteOrgId] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("dealer_admin");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteMessage, setInviteMessage] = useState("");

  const [newDealerName, setNewDealerName] = useState("");
  const [newDealerSlug, setNewDealerSlug] = useState("");
  const [newDealerAdminEmail, setNewDealerAdminEmail] = useState("");
  const [newDealerLoading, setNewDealerLoading] = useState(false);
  const [newDealerMessage, setNewDealerMessage] = useState("");
const [dealerLogoFile, setDealerLogoFile] = useState(null);
const [dealerLogoPreview, setDealerLogoPreview] = useState("");
const [dealerLogoUrl, setDealerLogoUrl] = useState("");
const currentDealerLogoUrl =
  dealerLogoPreview || dealerLogoUrl || dealerProfile?.logo_url || "";
  const [requestName, setRequestName] = useState("");
  const [requestEmail, setRequestEmail] = useState("");
  const [requestRole, setRequestRole] = useState("rep");
  const [requestManagerId, setRequestManagerId] = React.useState("");
  const [approvedManagers, setApprovedManagers] = React.useState([]);
  const [requestReason, setRequestReason] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");

  const [reviewLoadingId, setReviewLoadingId] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
const [dealerEnrollmentStarted, setDealerEnrollmentStarted] = React.useState(false);
  const [dealerCompanyName, setDealerCompanyName] = useState("");
  const [dealerPhone, setDealerPhone] = useState("");
  const [dealerWebsite, setDealerWebsite] = useState("");
  const [dealerAddress, setDealerAddress] = useState("");
  const [dealerCity, setDealerCity] = useState("");
  const [dealerProvinceState, setDealerProvinceState] = useState("");
  const [dealerPostalCode, setDealerPostalCode] = useState("");
  const [dealerIntroStatement, setDealerIntroStatement] = useState("");
  const [dealerClosingStatement, setDealerClosingStatement] = useState("");
  const [useDefaultIntro, setUseDefaultIntro] = useState(true);
const [useDefaultClosing, setUseDefaultClosing] = useState(true);
const [dealerAdminTab, setDealerAdminTab] = useState("dashboard");
const [dealerPerformance, setDealerPerformance] = useState({
  quotesCreated: 0,
  proposalsSent: 0,
  customerResponses: 0,
  revenueWon: 0,
  approvalRate: 0,
  leaderboard: [],
  productMix: [],
  followUps: [],
});
const [dealerNetworkPerformance, setDealerNetworkPerformance] = useState([]);
const [selectedDealerPerformance, setSelectedDealerPerformance] = useState(null);
  const [dealerSaving, setDealerSaving] = useState(false);
  const [dealerSaveMessage, setDealerSaveMessage] = useState("");
  const [activeTab, setActiveTab] = React.useState("quote");
  const [repFirstName, setRepFirstName] = useState("");
  const [repLastName, setRepLastName] = useState("");
  const [repTitle, setRepTitle] = useState("");
  const [repPhone, setRepPhone] = useState("");
  const [repEmailAddress, setRepEmailAddress] = useState("");
  const [repSaving, setRepSaving] = useState(false);
  const [repSaveMessage, setRepSaveMessage] = useState("");
  const [assignManagerId, setAssignManagerId] = useState("");
  const [assignRepId, setAssignRepId] = useState("");
  const [assignmentSaving, setAssignmentSaving] = useState(false);
  const [assignmentMessage, setAssignmentMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordResetMessage, setPasswordResetMessage] = useState("");
  const [passwordResetLoading, setPasswordResetLoading] = useState(false);
  const [publicReviewToken, setPublicReviewToken] = useState(null);

useEffect(() => {
  const path = window.location.pathname;

  if (path.startsWith("/review/")) {
    const token = path.split("/review/")[1];
    setPublicReviewToken(token);
  }
}, []);
  const isPlatformAdmin = useMemo(
    () => memberships.some((m) => m.role === "platform_admin"),
    [memberships]
  );
  // ===============================
  // PLATFORM ADMIN HANDLERS
  // ===============================

  // form state
  const [dealerName, setDealerName] = React.useState("");
  const [dealerAdminEmail, setDealerAdminEmail] = React.useState("");
  const [dealerAdminName, setDealerAdminName] = React.useState("");

  const [newUserName, setNewUserName] = React.useState("");
  const [newUserEmail, setNewUserEmail] = React.useState("");
  const [newUserRole, setNewUserRole] = React.useState("rep");
  const [klondikeAdminTab, setKlondikeAdminTab] = useState("dashboard");
  const [ocrSnapshotLoading, setOcrSnapshotLoading] = React.useState(false);
  const [ocrSnapshot, setOcrSnapshot] = React.useState({
    totalScans: 0,
    matchSuccessRate: 0,
    topViscosity: "",
    topBrand: "",
    topBrands: [],
    topViscosities: [],
  });

  const [dealerMessage, setDealerMessage] = React.useState("");
  const [userMessage, setUserMessage] = React.useState("");

  // mock data (you can wire to DB later)
  const [accessRequests, setAccessRequests] = React.useState([]);
  const [managerAssignments, setManagerAssignments] = React.useState({});
  const [organizations, setOrganizations] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);

  const [searchResults, setSearchResults] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  // ===============================
  // CREATE DEALER
  // ===============================
  const handleCreateDealer = async (e) => {
    e.preventDefault();

    try {
      console.log("Creating dealer:", dealerName);

      // TODO: replace with Supabase insert later
      setOrganizations((prev) => [
        ...prev,
        { id: Date.now(), name: dealerName },
      ]);

      setDealerMessage("Dealer created successfully ✅");
      setDealerName("");
      setDealerAdminEmail("");
      setDealerAdminName("");
    } catch (err) {
      console.error(err);
      setDealerMessage("Failed to create dealer ❌");
    }
  };

  // ===============================
  // CREATE USER
  // ===============================
  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      console.log("Creating user:", newUserEmail);

      // TODO: replace with Supabase invite
      setAllUsers((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: newUserName,
          email: newUserEmail,
          role: newUserRole,
        },
      ]);

      setUserMessage("User created & invite sent ✅");
      setNewUserName("");
      setNewUserEmail("");
      setNewUserRole("rep");
    } catch (err) {
      console.error(err);
      setUserMessage("Failed to create user ❌");
    }
  };

  // ===============================
  // APPROVE REQUEST
  // ===============================
  const handleApproveRequest = async (req) => {
    try {
      console.log("Approving:", req);

      // simulate adding user
      setAllUsers((prev) => [...prev, req]);

      // remove from requests
      setAccessRequests((prev) => prev.filter((r) => r.id !== req.id));
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // REJECT REQUEST
  // ===============================
  const handleRejectRequest = async (id) => {
    try {
      setAccessRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  const roleLabel = (role) => (role ? role.replaceAll("_", " ") : "no role");

  const orgNameById = useMemo(() => {
    const map = {};
    memberships.forEach((m) => {
      if (m.organization?.id) map[m.organization.id] = m.organization.name;
    });
    dealerOrganizations.forEach((org) => {
      if (org?.id) map[org.id] = org.name;
    });
    return map;
  }, [memberships, dealerOrganizations]);

  useEffect(() => {
    let mounted = true;

    const boot = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      if (!mounted) return;
      setSession(currentSession);
      setAppLoading(false);
    };

    boot();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const loadCore = async () => {
      if (!session?.user?.id) {
        setProfile(null);
        setMemberships([]);
        setActiveOrgId("");
        setActiveMembership(null);
        setDealerOrganizations([]);
        setDealerProfile(null);
        setRepProfiles([]);
        setManagerMembers([]);
        setTeamAssignments([]);
        setRecentInvites([]);
        setRecentAccessRequests([]);
        return;
      }

      setAppLoading(true);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      const { data: membershipData, error: membershipError } = await supabase
        .from("organization_members")
        .select(
          `
          id,
          user_id,
          role,
          is_active,
          organization_id,
          organizations (
            id,
            name,
            slug,
            organization_type,
            phone,
            website,
            address,
            city,
            province_state,
            postal_code,
            intro_statement,
            closing_statement,
            setup_completed
          )
        `
        )
        .eq("user_id", session.user.id)
        .eq("is_active", true);

      if (membershipError) {
        setAuthMessage(membershipError.message);
      }

      const cleanedMemberships = (membershipData || []).map((m) => ({
        id: m.id,
        user_id: m.user_id,
        role: m.role,
        is_active: m.is_active,
        organization_id: m.organization_id,
        organization: Array.isArray(m.organizations)
          ? m.organizations[0]
          : m.organizations,
      }));

      setProfile(profileData || null);
      setMemberships(cleanedMemberships);

      if (cleanedMemberships.length > 0) {
        setActiveOrgId((prev) => {
          const stillExists = cleanedMemberships.some(
            (m) => m.organization_id === prev
          );
          return stillExists ? prev : cleanedMemberships[0].organization_id;
        });
      } else {
        setActiveOrgId("");
      }

      setAppLoading(false);
    };

    loadCore();
  }, [session]);

  useEffect(() => {
    const nextMembership =
      memberships.find((m) => m.organization_id === activeOrgId) || null;
    setActiveMembership(nextMembership);
  }, [memberships, activeOrgId]);

  const refreshDealerOrganizations = async () => {
    const { data, error } = await supabase
      .from("organizations")
      .select("id, name, slug, organization_type")
      .eq("organization_type", "dealer")
      .order("name", { ascending: true });

    if (error) {
      console.error("Failed to load dealer organizations:", error.message);
      setDealerOrganizations([]);
      return;
    }

    setDealerOrganizations(data || []);
  };
  const loadDealerNetworkPerformance = async () => {
    const { data: dealerOrgs, error: orgError } = await supabase
      .from("organizations")
      .select("id, name, slug")
      .eq("organization_type", "dealer")
      .order("name", { ascending: true });

    if (orgError) {
      console.error("Dealer network org load error:", orgError);
      setDealerNetworkPerformance([]);
      return;
    }

    const orgIds = (dealerOrgs || []).map((org) => org.id).filter(Boolean);

    if (orgIds.length === 0) {
      setDealerNetworkPerformance([]);
      return;
    }

    const { data: quoteRows } = await supabase
      .from("quotes")
      .select("*")
      .in("organization_id", orgIds);

    const quotes = quoteRows || [];
    const quoteIds = quotes.map((q) => q.id).filter(Boolean);

       let responseRows = [];
    let itemRows = [];

    if (quoteIds.length > 0) {
      const { data: responses } = await supabase
        .from("proposal_responses")
        .select("*")
        .in("quote_id", quoteIds);

      responseRows = responses || [];

      const { data: items } = await supabase
        .from("quote_items")
        .select("*")
        .in("quote_id", quoteIds);

      itemRows = items || [];
    }

    const { data: memberRows } = await supabase
      .from("organization_members")
      .select("id, organization_id, role, is_active")
      .in("organization_id", orgIds)
      .eq("is_active", true);

    const orgPerformance = (dealerOrgs || []).map((org) => {
      const orgQuotes = quotes.filter((q) => q.organization_id === org.id);
      const orgQuoteIds = orgQuotes.map((q) => q.id);

      const orgResponses = responseRows.filter((r) =>
        orgQuoteIds.includes(r.quote_id)
      );

      const allResponseItems = orgResponses.flatMap((row) => {
        const decisionData = row.decision_data || {};
        const productResponses = Array.isArray(decisionData.responses)
          ? decisionData.responses
          : Array.isArray(row.responses)
          ? row.responses
          : [];

        const equipmentResponses = Array.isArray(decisionData.equipment)
          ? decisionData.equipment
          : Array.isArray(row.equipment)
          ? row.equipment
          : [];

        return [...productResponses, ...equipmentResponses];
      });

      const approvedItems = allResponseItems.filter(
        (item) => item.decision === "approved"
      );

      const revenueWon = approvedItems.reduce(
        (sum, item) => sum + Number(item.price || 0),
        0
      );

      const teamMembers = (memberRows || []).filter(
        (member) => member.organization_id === org.id
      );

            const repMap = {};

      orgQuotes.forEach((quote) => {
        const repKey = quote.rep_email || quote.user_id || "Unassigned Rep";

        if (!repMap[repKey]) {
          repMap[repKey] = {
            name: quote.rep_name || quote.rep_email || "Unassigned Rep",
            quotes: 0,
            proposals: 0,
            responses: 0,
            revenue: 0,
          };
        }

        repMap[repKey].quotes += 1;

        if (quote.status === "sent" || quote.review_status || quote.rep_email) {
          repMap[repKey].proposals += 1;
        }
      });

      orgResponses.forEach((row) => {
        const quote = orgQuotes.find((q) => q.id === row.quote_id);
        const repKey = quote?.rep_email || quote?.user_id || "Unassigned Rep";

        if (!repMap[repKey]) return;

        repMap[repKey].responses += 1;

        const decisionData = row.decision_data || {};
        const productResponses = Array.isArray(decisionData.responses)
          ? decisionData.responses
          : Array.isArray(row.responses)
          ? row.responses
          : [];

        const equipmentResponses = Array.isArray(decisionData.equipment)
          ? decisionData.equipment
          : Array.isArray(row.equipment)
          ? row.equipment
          : [];

        repMap[repKey].revenue += [...productResponses, ...equipmentResponses]
          .filter((item) => item.decision === "approved")
          .reduce((sum, item) => sum + Number(item.price || 0), 0);
      });

      const productBuckets = {
        "Heavy Duty": 0,
        Automotive: 0,
        "Hydraulic Fluids": 0,
        Grease: 0,
        Coolants: 0,
        "Transmission Fluids": 0,
        Equipment: 0,
      };

      itemRows
        .filter((item) => orgQuoteIds.includes(item.quote_id))
        .forEach((item) => {
          const name = `${item.product_name || item.klondike_product || ""}`.toLowerCase();

          if (name.includes("grease")) productBuckets.Grease += 1;
          else if (name.includes("coolant")) productBuckets.Coolants += 1;
          else if (name.includes("hydraulic")) productBuckets["Hydraulic Fluids"] += 1;
          else if (name.includes("transmission") || name.includes("atf")) productBuckets["Transmission Fluids"] += 1;
          else if (
            name.includes("diesel") ||
            name.includes("engine") ||
            name.includes("15w") ||
            name.includes("10w")
          )
            productBuckets["Heavy Duty"] += 1;
          else productBuckets.Automotive += 1;
        });

      const totalProductCount =
        Object.values(productBuckets).reduce((sum, count) => sum + count, 0) || 1;

      return {
        organization_id: org.id,
        name: org.name,
        slug: org.slug,
        quotesCreated: orgQuotes.length,
        proposalsSent: orgQuotes.filter(
          (q) => q.status === "sent" || q.rep_signature || q.rep_email
        ).length,
        customerResponses: orgResponses.length,
        revenueWon,
        approvalRate:
          allResponseItems.length > 0
            ? Math.round((approvedItems.length / allResponseItems.length) * 100)
            : 0,
        teamMembers: teamMembers.length,
        leaderboard: Object.values(repMap).sort((a, b) => b.revenue - a.revenue),
        productMix: Object.entries(productBuckets).map(([name, count]) => ({
          name,
          percent: Math.round((count / totalProductCount) * 100),
          count,
        })),
        followUps: orgQuotes
          .filter((q) => q.status === "sent" || q.review_status === "open")
          .slice(0, 5),
        rawQuotes: orgQuotes,
        rawResponses: orgResponses,
      };
    });

    setDealerNetworkPerformance(orgPerformance);
  };
  const refreshRecentInvites = async () => {
    const { data, error } = await supabase
      .from("user_invitations")
      .select(
        "id, organization_id, invited_email, invited_role, status, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(20);

    if (!error) setRecentInvites(data || []);
  };

 const refreshRecentAccessRequests = async () => {
  const { data, error } = await supabase
    .from("access_requests")
    .select(
      "id, organization_id, requester_name, requester_email, requested_role, reason, status, created_at, assigned_manager_profile_id"
    )
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Access request load error:", error);
    setRecentAccessRequests([]);
    return;
  }

  const requests = data || [];
  setRecentAccessRequests(requests);

  const orgIds = [
    ...new Set(
      requests
        .filter((req) => req.status === "pending")
        .map((req) => req.organization_id)
        .filter(Boolean)
    ),
  ];

  if (orgIds.length === 0) {
    setAllUsers([]);
    return;
  }

  const { data: managers, error: managerError } = await supabase
    .from("organization_members_with_emails")
    .select("*")
    .in("organization_id", orgIds)
    .eq("role", "manager")
    .eq("is_active", true);

  if (managerError) {
    console.error("Pending request manager load error:", managerError);
    setAllUsers([]);
    return;
  }

  setAllUsers(managers || []);
};
  const refreshRepProfiles = async () => {
    if (!activeMembership?.organization_id) {
      setRepProfiles([]);
      return;
    }

    const { data, error } = await supabase
      .from("rep_profiles")
      .select("*")
      .eq("organization_id", activeMembership.organization_id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load rep profiles:", error.message);
      setRepProfiles([]);
      return;
    }

    setRepProfiles(data || []);
  };

  const refreshManagerMembers = async () => {
    if (!activeMembership?.organization_id) {
      setManagerMembers([]);
      return;
    }

    const { data: memberRows, error: memberError } = await supabase
      .from("organization_members")
      .select("id, user_id, role, is_active, organization_id")
      .eq("organization_id", activeMembership.organization_id)
      .eq("role", "manager")
      .eq("is_active", true);

    if (memberError) {
      console.error("Failed to load managers:", memberError.message);
      setManagerMembers([]);
      return;
    }

    const userIds = (memberRows || []).map((m) => m.user_id).filter(Boolean);

    if (userIds.length === 0) {
      setManagerMembers([]);
      return;
    }

    const { data: profileRows, error: profileError } = await supabase
      .from("profiles")
      .select("id, email, full_name")
      .in("id", userIds);

    if (profileError) {
      console.error("Failed to load manager profiles:", profileError.message);
    }

    const profileMap = {};
    (profileRows || []).forEach((p) => {
      profileMap[p.id] = p;
    });

    const cleaned = (memberRows || []).map((m) => ({
      ...m,
      profile: profileMap[m.user_id] || null,
    }));

    setManagerMembers(cleaned);
  };

  const refreshTeamAssignments = async () => {
    if (!activeMembership?.organization_id) {
      setTeamAssignments([]);
      return;
    }

    const { data, error } = await supabase
      .from("rep_team_assignments")
      .select("*")
      .eq("organization_id", activeMembership.organization_id)
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load team assignments:", error.message);
      setTeamAssignments([]);
      return;
    }

    setTeamAssignments(data || []);
  };

  useEffect(() => {
    if (session?.user?.id) {
      refreshDealerOrganizations();
      refreshRecentInvites();
      refreshRecentAccessRequests();
      loadApprovedManagers();
      loadDealerNetworkPerformance();
    }
  }, [session]);

  useEffect(() => {
    const loadDealerProfile = async () => {
      if (!activeMembership?.organization_id) {
        setDealerProfile(null);
        return;
      }

      const orgType = activeMembership?.organization?.organization_type;
      if (orgType !== "dealer") {
        setDealerProfile(null);
        return;
      }

      const { data, error } = await supabase
        .from("dealer_profiles")
        .select("*")
        .eq("organization_id", activeMembership.organization_id)
        .maybeSingle();

      if (error) {
        console.error("Failed to load dealer profile:", error.message);
        setDealerProfile(null);
        return;
      }

      setDealerProfile(data || null);
    };

    loadDealerProfile();
    refreshRepProfiles();
    refreshManagerMembers();
    refreshTeamAssignments();
  }, [activeMembership]);

  useEffect(() => {
    setDealerCompanyName(dealerProfile?.company_name || "");
    setDealerPhone(dealerProfile?.phone || "");
    setDealerWebsite(dealerProfile?.website || "");
   setDealerLogoUrl(profile?.logo_url || "");
    setDealerAddress(dealerProfile?.address || "");
    setDealerCity(dealerProfile?.city || "");
    setDealerProvinceState(dealerProfile?.province_state || "");
    setDealerPostalCode(dealerProfile?.postal_code || "");
    setDealerIntroStatement(dealerProfile?.intro_statement || "");
    setDealerClosingStatement(dealerProfile?.closing_statement || "");
  }, [dealerProfile]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthMessage("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthMessage(error.message);
      }
    } catch (err) {
      setAuthMessage(err?.message || "Network error while signing in.");
    } finally {
      setAuthLoading(false);
    }
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setPasswordResetMessage("");

    if (!newPassword || !confirmNewPassword) {
      setPasswordResetMessage("Please enter and confirm your new password.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordResetMessage("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordResetMessage("Password must be at least 8 characters.");
      return;
    }

    setPasswordResetLoading(true);

    const { error: passwordError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (passwordError) {
      setPasswordResetLoading(false);
      setPasswordResetMessage(passwordError.message);
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ must_reset_password: false })
      .eq("id", session?.user?.id);

    setPasswordResetLoading(false);

    if (profileError) {
      setPasswordResetMessage(profileError.message);
      return;
    }

    setProfile((prev) =>
      prev ? { ...prev, must_reset_password: false } : prev
    );

    setNewPassword("");
    setConfirmNewPassword("");
    setPasswordResetMessage("Password updated successfully.");
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
    setMemberships([]);
    setActiveOrgId("");
    setActiveMembership(null);
    setDealerOrganizations([]);
    setDealerProfile(null);
    setRepProfiles([]);
    setManagerMembers([]);
    setTeamAssignments([]);
    setRecentInvites([]);
    setRecentAccessRequests([]);
    setInviteMessage("");
    setRequestMessage("");
    setReviewMessage("");
    setDealerSaveMessage("");
    setRepSaveMessage("");
    setAssignmentMessage("");
  };

  const handleCreateDealerAccount = async (e) => {
    e.preventDefault();
    setNewDealerMessage("");

    if (!newDealerName.trim() || !newDealerAdminEmail.trim()) {
      setNewDealerMessage("Dealer name and dealer admin email are required.");
      return;
    }

    setNewDealerLoading(true);

    try {
      const slug =
        (newDealerSlug || newDealerName)
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "") || "dealer";
      const { data, error } = await supabase.functions.invoke(
        "create-dealer-account",
        {
          body: {
  dealerName: newDealerName.trim(),
  dealerSlug: slug,
  dealerAdminEmail: newDealerAdminEmail.trim().toLowerCase(),

  dealer_name: newDealerName.trim(),
  dealer_slug: slug,
  dealer_admin_email: newDealerAdminEmail.trim().toLowerCase(),
}
        }
      );

      console.log("create-dealer-account data:", data);
      console.log("create-dealer-account error:", error);

      if (error) {
        setNewDealerMessage(
          data?.error || error.message || "Failed to create dealer."
        );
        return;
      }

      setNewDealerMessage(
        data?.message
          ? data.tempPassword
            ? `${data.message} Temporary password: ${data.tempPassword}`
            : data.message
          : data?.tempPassword
          ? `Dealer account created successfully. Temporary password: ${data.tempPassword}`
          : "Dealer account created successfully."
      );

      setNewDealerName("");
      setNewDealerSlug("");
      setNewDealerAdminEmail("");

      await refreshDealerOrganizations();
      await refreshRecentInvites();
    } catch (err) {
      setNewDealerMessage(err?.message || "Unexpected create dealer error.");
    } finally {
      setNewDealerLoading(false);
    }
  };

  const handleInviteUser = async (e) => {
    e.preventDefault();
    setInviteMessage("");

    if (!inviteOrgId || !inviteEmail.trim() || !inviteRole) {
      setInviteMessage("Please select a dealer, email, and role.");
      return;
    }

    setInviteLoading(true);

    try {
      const normalizedEmail = inviteEmail.trim().toLowerCase();

      const { data, error } = await supabase.functions.invoke(
        "send-user-invite",
        {
          body: {
            organization_id: inviteOrgId,
            email: normalizedEmail,
            role: inviteRole,
          },
        }
      );

      if (error) {
        let edgeErrorMessage = error.message || "Failed to create user.";

        try {
          const errorBody = await error.context.json();
          edgeErrorMessage = errorBody?.error || edgeErrorMessage;
        } catch (_) {}

        setInviteMessage(edgeErrorMessage);
        return;
      }

      if (data?.error) {
        setInviteMessage(
          typeof data.error === "string"
            ? data.error
            : data.error?.message || JSON.stringify(data.error)
        );
        return;
      }

      setInviteMessage(
        data?.tempPassword
          ? `User created. Temporary password: ${data.tempPassword}`
          : `User invite sent to ${normalizedEmail}`
      );

      setInviteEmail("");
      setInviteRole("dealer_admin");
      await refreshRecentInvites();
      await refreshRecentAccessRequests();
    } catch (err) {
      setInviteMessage(err?.message || "Unexpected invite error.");
    } finally {
      setInviteLoading(false);
    }
  };

  const handleAccessRequest = async (e) => {
    e.preventDefault();
    setRequestMessage("");

    if (!requestEmail.trim() || !requestRole || !requestReason.trim()) {
      setRequestMessage("Please complete email, requested role, and reason.");
      return;
    }

    setRequestLoading(true);

    try {
      const normalizedEmail = requestEmail.trim().toLowerCase();

      const { data: existingPending, error: checkError } = await supabase
        .from("access_requests")
        .select("id")
        .eq("organization_id", activeMembership?.organization_id)
        .eq("requester_email", normalizedEmail)
        .eq("requested_role", requestRole)
        .eq("status", "pending")
        .limit(1);

      if (checkError) {
        setRequestMessage(checkError.message);
        return;
      }

      if (existingPending && existingPending.length > 0) {
        setRequestMessage(
          "A pending request already exists for this email and role."
        );
        return;
      }

      const { error } = await supabase.from("access_requests").insert([
        {
          organization_id: activeMembership?.organization_id || null,
          requester_user_id: profile?.id || null,
          requester_name: requestName || profile?.full_name || null,
          requester_email: normalizedEmail,
          requested_role: requestRole,
          reason: requestReason.trim(),
          status: "pending",
        },
      ]);

      if (error) {
        setRequestMessage(error.message);
        return;
      }

      setRequestMessage("Access request submitted successfully.");
      setRequestName("");
      setRequestEmail("");
      setRequestRole("rep");
      setRequestReason("");
      setRequestManagerId("");

      await refreshRecentAccessRequests();
    } catch (err) {
      setRequestMessage(err?.message || "Unexpected request error.");
    } finally {
      setRequestLoading(false);
    }
  };
  const handleReviewAccessRequest = async (request, decision) => {
    setReviewLoadingId(request.id);
    setReviewMessage("");

    try {
      const nextStatus = decision === "denied" ? "denied" : "approved";

      // Update matching pending requests first so duplicates do not reappear
      const { error: updateError } = await supabase
        .from("access_requests")
        .update({ status: nextStatus })
        .eq("organization_id", request.organization_id)
        .eq("requested_role", request.requested_role)
        .ilike("requester_email", request.requester_email)
        .eq("status", "pending");

      if (updateError) {
        setReviewMessage(updateError.message);
        return;
      }

      let inviteWarning = "";
      let inviteData = null;

      if (nextStatus === "approved") {
        const { data: inviteResult, error: inviteError } =
          await supabase.functions.invoke("send-user-invite", {
            body: {
              organization_id: request.organization_id,
              email: request.requester_email,
              role: request.requested_role,
            },
          });

        inviteData = inviteResult;
// create rep -> manager assignment
if (
  request.requested_role === "rep" &&
  managerAssignments[request.id] || request.assigned_manager_profile_id
) {
  const managerProfileId = managerAssignments[request.id] || request.assigned_manager_profile_id

  const repProfileId =
    inviteResult?.profile_id ||
    inviteResult?.rep_profile_id ||
    inviteResult?.user_profile_id;

  if (managerProfileId && repProfileId) {
    await supabase.from("rep_team_assignments").insert({
      organization_id: request.organization_id,
      manager_profile_id: managerProfileId,
      rep_profile_id: repProfileId,
      is_active: true,
    });
  }
}
        if (inviteError) {
          inviteWarning = inviteError.message || "Failed to send user invite.";
        }

        if (inviteResult?.error) {
          inviteWarning =
            typeof inviteResult.error === "string"
              ? inviteResult.error
              : inviteResult.error?.message ||
                JSON.stringify(inviteResult.error);
        }

        if (request.requested_role === "rep") {
          const safeName = (request.requester_name || "").trim();
          const parts = safeName.split(" ").filter(Boolean);
          const firstName = parts[0] || "New";
          const lastName = parts.slice(1).join(" ") || "Rep";

          const { error: repProfileError } = await supabase
            .from("rep_profiles")
            .upsert(
              {
                organization_id: request.organization_id,
                first_name: firstName,
                last_name: lastName,
                title: "Rep",
                email: request.requester_email,
                phone: null,
              },
              { onConflict: "organization_id,email" }
            );

          if (repProfileError) {
            console.error(
              "Failed to upsert rep profile:",
              repProfileError.message
            );
          }
        }
      }

      // Remove all matching pending rows from UI immediately
      setRecentAccessRequests((prev) =>
        prev.filter(
          (r) =>
            !(
              r.organization_id === request.organization_id &&
              String(r.requested_role || "")
                .trim()
                .toLowerCase() ===
                String(request.requested_role || "")
                  .trim()
                  .toLowerCase() &&
              String(r.requester_email || "")
                .trim()
                .toLowerCase() ===
                String(request.requester_email || "")
                  .trim()
                  .toLowerCase() &&
              String(r.status || "")
                .trim()
                .toLowerCase() === "pending"
            )
        )
      );

      setReviewMessage(
        nextStatus === "approved"
          ? inviteData?.tempPassword
            ? `${
                inviteData?.message || `Approved ${request.requester_email}.`
              } Temporary password: ${inviteData.tempPassword}`
            : inviteWarning
            ? `Approved ${request.requester_email}, but invite provisioning returned: ${inviteWarning}`
            : inviteData?.message || `Approved ${request.requester_email}.`
          : `Denied ${request.requester_email}.`
      );

      await refreshRecentInvites();
      await refreshRecentAccessRequests();
      await refreshRepProfiles();
      await refreshManagerMembers();
    } catch (err) {
      setReviewMessage(err?.message || "Unexpected review error.");
    } finally {
      setReviewLoadingId("");
    }
  };
  const handleSaveDealerProfile = async (e) => {
    e.preventDefault();
    setDealerSaveMessage("");

    if (!activeMembership?.organization_id) {
      setDealerSaveMessage("No active dealer organization selected.");
      return;
    }

    setDealerSaving(true);

    try {
      let uploadedLogoUrl = dealerLogoUrl || dealerProfile?.logo_url || "";

if (dealerLogoFile) {
  const fileExt = dealerLogoFile.name.split(".").pop();
  const filePath = `${activeMembership.organization_id}/dealer-logo.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("dealer-logos")
    .upload(filePath, dealerLogoFile, {
      upsert: true,
    });

  if (uploadError) {
    setDealerSaveMessage(uploadError.message);
    setDealerSaving(false);
    return;
  }

  const { data: publicUrlData } = supabase.storage
    .from("dealer-logos")
    .getPublicUrl(filePath);

  uploadedLogoUrl = publicUrlData.publicUrl;
}
      const payload = {
        organization_id: activeMembership.organization_id,
        company_name:
          dealerCompanyName ||
          activeMembership?.organization?.name ||
          "Dealer Company",
          logo_url: uploadedLogoUrl || null,
        phone: dealerPhone || null,
        website: dealerWebsite || null,
        address: dealerAddress || null,
        city: dealerCity || null,
        province_state: dealerProvinceState || null,
        postal_code: dealerPostalCode || null,
       intro_statement: useDefaultIntro ? DEFAULT_INTRO : dealerIntroStatement,
closing_statement: useDefaultClosing ? DEFAULT_CLOSING : dealerClosingStatement,

use_default_intro: useDefaultIntro,
use_default_closing: useDefaultClosing,

setup_completed: true,
        setup_completed: true,
      };

      const { data, error } = await supabase
        .from("dealer_profiles")
        .upsert(payload, { onConflict: "organization_id" })
        .select("*")
        .maybeSingle();

      if (error) {
        setDealerSaveMessage(error.message);
        return;
      }

      setDealerProfile(data || payload);
      setDealerLogoUrl(uploadedLogoUrl);
setDealerLogoFile(null);
setDealerLogoPreview("");
      setDealerSaveMessage("Dealer profile saved.");
    } catch (err) {
      setDealerSaveMessage(err?.message || "Unexpected save error.");
    } finally {
      setDealerSaving(false);
    }
  };
const handleFinishDealerEnrollment = async () => {
  const { error } = await supabase
    .from("dealer_profiles")
    .upsert(
      {
        organization_id: activeMembership.organization_id,
        setup_completed: true,
      },
      { onConflict: "organization_id" }
    );

  if (error) {
    alert(error.message);
    return;
  }

  // ✅ Leave enrollment mode
  setDealerEnrollmentStarted(false);

  // ✅ Clear any stale UI state
  setDealerSaveMessage("");

  // 🔥 Force full UI refresh → shows real dashboard
  window.location.reload();
};
  const handleSaveRepEnrollment = async (e) => {
    e.preventDefault();
    setRepSaveMessage("");

    if (!activeMembership?.organization_id) {
      setRepSaveMessage("No active organization selected.");
      return;
    }

    if (
      !repFirstName.trim() ||
      !repLastName.trim() ||
      !repEmailAddress.trim()
    ) {
      setRepSaveMessage("First name, last name, and email are required.");
      return;
    }

    setRepSaving(true);

    try {
      const payload = {
        organization_id: activeMembership.organization_id,
        first_name: repFirstName.trim(),
        last_name: repLastName.trim(),
        title: repTitle.trim() || null,
        phone: repPhone.trim() || null,
        email: repEmailAddress.trim().toLowerCase(),
      };

      const { error } = await supabase
        .from("rep_profiles")
        .upsert(payload, { onConflict: "organization_id,email" });

      if (error) {
        setRepSaveMessage(error.message);
        return;
      }

      setRepSaveMessage("Rep saved.");
      setRepFirstName("");
      setRepLastName("");
      setRepTitle("");
      setRepPhone("");
      setRepEmailAddress("");

      await refreshRepProfiles();
    } catch (err) {
      setRepSaveMessage(err?.message || "Unexpected rep save error.");
    } finally {
      setRepSaving(false);
    }
  };

  const handleAssignRepToManager = async (e) => {
    e.preventDefault();
    setAssignmentMessage("");

    if (!activeMembership?.organization_id) {
      setAssignmentMessage("No active organization selected.");
      return;
    }

    if (!assignManagerId || !assignRepId) {
      setAssignmentMessage("Select both a manager and a rep.");
      return;
    }

    setAssignmentSaving(true);

    try {
      const { error } = await supabase.from("rep_team_assignments").upsert(
        {
          organization_id: activeMembership.organization_id,
          manager_profile_id: assignManagerId,
          rep_profile_id: assignRepId,
          is_active: true,
        },
        { onConflict: "organization_id,manager_profile_id,rep_profile_id" }
      );

      if (error) {
        setAssignmentMessage(error.message);
        return;
      }

      setAssignmentMessage("Rep assigned to manager.");
      setAssignManagerId("");
      setAssignRepId("");
      await refreshTeamAssignments();
    } catch (err) {
      setAssignmentMessage(err?.message || "Unexpected assignment error.");
    } finally {
      setAssignmentSaving(false);
    }
  };

  const pendingAccessRequests = recentAccessRequests.filter(
    (req) =>
      String(req.status || "")
        .trim()
        .toLowerCase() === "pending"
  );

  useEffect(() => {
    if (!isPlatformAdmin || klondikeAdminTab !== "dashboard") return;
    let cancelled = false;

    const loadOcrSnapshot = async () => {
      setOcrSnapshotLoading(true);
      try {
        const { data, error } = await supabase
          .from("ocr_scan_events")
          .select("detected_brand, detected_viscosity, match_success")
          .order("created_at", { ascending: false })
          .limit(1000);

        if (error) {
          if (!cancelled) {
            setOcrSnapshot({
              totalScans: 0,
              matchSuccessRate: 0,
              topViscosity: "",
              topBrand: "",
              topBrands: [],
              topViscosities: [],
            });
          }
          return;
        }

        const rows = data || [];
        const totalScans = rows.length;
        const matchedCount = rows.filter((row) => row?.match_success === true).length;
        const matchSuccessRate = totalScans
          ? Math.round((matchedCount / totalScans) * 100)
          : 0;

        const countTopValue = (values) => {
          const counts = values.reduce((acc, rawValue) => {
            const key = String(rawValue || "").trim();
            if (!key) return acc;
            acc[key] = (acc[key] || 0) + 1;
            return acc;
          }, {});
          const [top] = Object.entries(counts).sort((a, b) => b[1] - a[1]);
          return top?.[0] || "";
        };
        const countTopList = (values, limit = 5) => {
          const counts = values.reduce((acc, rawValue) => {
            const key = String(rawValue || "").trim();
            if (!key) return acc;
            acc[key] = (acc[key] || 0) + 1;
            return acc;
          }, {});
          return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([value, count]) => ({ value, count }));
        };

        const topViscosity = countTopValue(rows.map((row) => row?.detected_viscosity));
        const topBrand = countTopValue(rows.map((row) => row?.detected_brand));
        const topBrands = countTopList(rows.map((row) => row?.detected_brand), 5);
        const topViscosities = countTopList(
          rows.map((row) => row?.detected_viscosity),
          5
        );

        if (!cancelled) {
          setOcrSnapshot({
            totalScans,
            matchSuccessRate,
            topViscosity,
            topBrand,
            topBrands,
            topViscosities,
          });
        }
      } finally {
        if (!cancelled) {
          setOcrSnapshotLoading(false);
        }
      }
    };

    loadOcrSnapshot();

    return () => {
      cancelled = true;
    };
  }, [isPlatformAdmin, klondikeAdminTab]);

  const renderRoleBadge = (role) => (
    <span style={styles.roleBadge}>{roleLabel(role)}</span>
  );

  const renderRoleSummaryStrip = () => (
    <div style={styles.summaryGrid}>
      <div style={styles.summaryCard}>
        <div style={styles.summaryLabel}>Active Role</div>
        <div style={styles.summaryValue}>
          {roleLabel(activeMembership?.role)}
        </div>
      </div>
      <div style={styles.summaryCard}>
        <div style={styles.summaryLabel}>Organization</div>
        <div style={styles.summaryValue}>
          {activeMembership?.organization?.name || "No organization selected"}
        </div>
      </div>
      <div style={styles.summaryCard}>
        <div style={styles.summaryLabel}>Demo Status</div>
        <div style={styles.summaryValue}>Ready</div>
      </div>
    </div>
  );
  const renderPlatformAdminView = () => (
    <div style={styles.grid24}>
      <div style={styles.heroCard}>
        <div style={styles.eyebrow}>KLONDIKE ADMIN</div>
        <h2 style={styles.heroTitle}>Platform Control Center</h2>
        <p style={styles.heroText}>
          Manage dealer onboarding, create users, approve access requests, and
          monitor platform activity.
        </p>
      </div>

      <div style={styles.workflowTabBar}>
        {[
          { id: "dashboard", label: "DASHBOARD" },
          { id: "dealers", label: "DEALERS" },
          { id: "create_dealer", label: "CREATE DEALER" },
          { id: "create_dealer_user", label: "CREATE DEALER USER" },
          { id: "approvals", label: "APPROVALS" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setKlondikeAdminTab(tab.id)}
            style={{
              ...styles.workflowTab,
              ...(klondikeAdminTab === tab.id ? styles.workflowTabActive : {}),
              textTransform: "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {klondikeAdminTab === "dashboard" && (
      <div style={styles.grid3}>
        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Dealers</div>
          <div style={styles.summaryValue}>{dealerOrganizations.length}</div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Pending Requests</div>
          <div style={styles.summaryValue}>{pendingAccessRequests.length}</div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Recent Invites</div>
          <div style={styles.summaryValue}>{recentInvites.length}</div>
        </div>
      </div>
      )}

      {klondikeAdminTab === "dashboard" && (
      <div style={styles.card}>
        <div style={styles.eyebrow}>DEALER NETWORK PERFORMANCE</div>
        <h3 style={styles.cardTitle}>Dealer Network Performance</h3>
        <p style={styles.cardBody}>
          Combined network visibility using currently loaded dealer performance
          metrics.
        </p>

        {dealerNetworkPerformance.length > 0 ? (
          <div style={styles.grid3}>
            <div style={styles.summaryCard}>
              <div style={styles.summaryLabel}>Quotes Created</div>
              <div style={styles.summaryValue}>
                {dealerNetworkPerformance.reduce(
                  (sum, dealer) => sum + Number(dealer.quotesCreated || 0),
                  0
                )}
              </div>
            </div>

            <div style={styles.summaryCard}>
              <div style={styles.summaryLabel}>Proposals Sent</div>
              <div style={styles.summaryValue}>
                {dealerNetworkPerformance.reduce(
                  (sum, dealer) => sum + Number(dealer.proposalsSent || 0),
                  0
                )}
              </div>
            </div>

            <div style={styles.summaryCard}>
              <div style={styles.summaryLabel}>Customer Responses</div>
              <div style={styles.summaryValue}>
                {dealerNetworkPerformance.reduce(
                  (sum, dealer) => sum + Number(dealer.customerResponses || 0),
                  0
                )}
              </div>
            </div>

            <div style={styles.summaryCard}>
              <div style={styles.summaryLabel}>Approved Revenue</div>
              <div style={styles.summaryValue}>
                $
                {dealerNetworkPerformance
                  .reduce(
                    (sum, dealer) => sum + Number(dealer.revenueWon || 0),
                    0
                  )
                  .toLocaleString()}
              </div>
            </div>

            <div style={styles.summaryCard}>
              <div style={styles.summaryLabel}>Average Approval Rate</div>
              <div style={styles.summaryValue}>
                {Math.round(
                  dealerNetworkPerformance.reduce(
                    (sum, dealer) => sum + Number(dealer.approvalRate || 0),
                    0
                  ) / dealerNetworkPerformance.length
                )}
                %
              </div>
            </div>

            <div style={styles.summaryCard}>
              <div style={styles.summaryLabel}>Active Teams</div>
              <div style={styles.summaryValue}>
                {dealerNetworkPerformance.reduce(
                  (sum, dealer) => sum + Number(dealer.teamMembers || 0),
                  0
                )}
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.grid3}>
            <div style={styles.summaryCard}>
              <div style={styles.summaryLabel}>Quotes Created</div>
              <div style={styles.summaryValue}>—</div>
              <div style={styles.listMeta}>Coming from dealer proposal activity</div>
            </div>
            <div style={styles.summaryCard}>
              <div style={styles.summaryLabel}>Proposals Sent</div>
              <div style={styles.summaryValue}>—</div>
              <div style={styles.listMeta}>Coming from dealer proposal activity</div>
            </div>
            <div style={styles.summaryCard}>
              <div style={styles.summaryLabel}>Customer Responses</div>
              <div style={styles.summaryValue}>—</div>
              <div style={styles.listMeta}>Coming from dealer proposal activity</div>
            </div>
          </div>
        )}
      </div>
      )}

      {klondikeAdminTab === "dashboard" && (
        <div style={styles.card}>
          <div style={styles.eyebrow}>OCR INTELLIGENCE SNAPSHOT</div>
          <h3 style={styles.cardTitle}>OCR Intelligence Snapshot</h3>
          <p style={styles.cardBody}>
            Executive view of recent OCR scan analytics from field activity.
          </p>
          {ocrSnapshotLoading ? (
            <p style={styles.muted}>Loading OCR scan activity...</p>
          ) : ocrSnapshot.totalScans === 0 ? (
            <p style={styles.muted}>No OCR scan activity yet.</p>
          ) : (
            <>
              <div style={styles.grid3}>
                <div style={styles.summaryCard}>
                  <div style={styles.summaryLabel}>Total OCR Scans</div>
                  <div style={styles.summaryValue}>{ocrSnapshot.totalScans}</div>
                </div>
                <div style={styles.summaryCard}>
                  <div style={styles.summaryLabel}>Match Success Rate</div>
                  <div style={styles.summaryValue}>{ocrSnapshot.matchSuccessRate}%</div>
                </div>
                <div style={styles.summaryCard}>
                  <div style={styles.summaryLabel}>Most Scanned Viscosity</div>
                  <div style={styles.summaryValue}>
                    {ocrSnapshot.topViscosity || "—"}
                  </div>
                </div>
                <div style={styles.summaryCard}>
                  <div style={styles.summaryLabel}>Most Scanned Competitor Brand</div>
                  <div style={styles.summaryValue}>{ocrSnapshot.topBrand || "—"}</div>
                </div>
              </div>
              <div style={{ ...styles.grid3, marginTop: 14 }}>
                <div style={styles.summaryCard}>
                  <div style={styles.summaryLabel}>Top 5 Scanned Competitor Brands</div>
                  {(ocrSnapshot.topBrands || []).length > 0 ? (
                    <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
                      {ocrSnapshot.topBrands.map((item, idx) => (
                        <div
                          key={`${item.value}-${idx}`}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: 13,
                            color: "#0f172a",
                            gap: 10,
                          }}
                        >
                          <span>{item.value}</span>
                          <span style={{ fontWeight: 800 }}>{item.count}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ ...styles.muted, marginTop: 10 }}>—</div>
                  )}
                </div>
                <div style={styles.summaryCard}>
                  <div style={styles.summaryLabel}>Top 5 Scanned Viscosities</div>
                  {(ocrSnapshot.topViscosities || []).length > 0 ? (
                    <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
                      {ocrSnapshot.topViscosities.map((item, idx) => (
                        <div
                          key={`${item.value}-${idx}`}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: 13,
                            color: "#0f172a",
                            gap: 10,
                          }}
                        >
                          <span>{item.value}</span>
                          <span style={{ fontWeight: 800 }}>{item.count}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ ...styles.muted, marginTop: 10 }}>—</div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {klondikeAdminTab === "dashboard" && (
        <>
          <div style={{ ...styles.card, marginTop: 4 }}>
            <div style={styles.eyebrow}>PRODUCT LINE PERFORMANCE</div>
            <h3 style={styles.cardTitle}>Product Line Performance</h3>
            <p style={styles.cardBody}>
              Executive snapshot of lubricant category momentum across the
              Klondike dealer network.
            </p>
            <p style={{ ...styles.muted, marginBottom: 18 }}>
              Mock data — will connect to quote item activity
            </p>

            <div style={{ overflowX: "auto" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(200px, 1.4fr) repeat(3, minmax(88px, 1fr))",
                  gap: 12,
                  paddingBottom: 10,
                  borderBottom: "1px solid #e7edf3",
                  fontSize: 11,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#64748b",
                }}
              >
                <div>Product line</div>
                <div style={{ textAlign: "right" }}>Quotes</div>
                <div style={{ textAlign: "right" }}>Revenue</div>
                <div style={{ textAlign: "right" }}>Network mix %</div>
              </div>
              {[
                {
                  line: "Heavy Duty Engine Oils",
                  quotes: 142,
                  revenue: 428600,
                  mix: 21,
                },
                {
                  line: "Hydraulic Fluids",
                  quotes: 98,
                  revenue: 251400,
                  mix: 17,
                },
                { line: "Automotive", quotes: 76, revenue: 189200, mix: 14 },
                { line: "Grease", quotes: 61, revenue: 97200, mix: 11 },
                { line: "Gear Oils", quotes: 54, revenue: 118400, mix: 10 },
                {
                  line: "Transmission Fluids",
                  quotes: 47,
                  revenue: 86200,
                  mix: 9,
                },
                {
                  line: "Coolants / Chemicals",
                  quotes: 39,
                  revenue: 71400,
                  mix: 8,
                },
              ].map((row, i) => (
                <div
                  key={row.line}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "minmax(200px, 1.4fr) repeat(3, minmax(88px, 1fr))",
                    gap: 12,
                    alignItems: "center",
                    padding: "14px 0",
                    borderBottom:
                      i < 6 ? "1px solid #f1f5f9" : "none",
                    fontSize: 14,
                  }}
                >
                  <div style={{ fontWeight: 800, color: "#0f172a" }}>
                    {row.line}
                  </div>
                  <div style={{ textAlign: "right", fontWeight: 700 }}>
                    {row.quotes.toLocaleString()}
                  </div>
                  <div style={{ textAlign: "right", fontWeight: 700 }}>
                    ${row.revenue.toLocaleString()}
                  </div>
                  <div style={{ textAlign: "right", fontWeight: 800, color: "#c2410c" }}>
                    {row.mix}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.eyebrow}>TERRITORY LEADERBOARD</div>
            <h3 style={styles.cardTitle}>Territory Rep Top 10</h3>
            <p style={styles.cardBody}>
              Recognition rankings for incentive trips, contests, prizes, and
              territory performance — network-wide across dealers.
            </p>
            <p style={{ ...styles.muted, marginBottom: 18 }}>
              Mock leaderboard — will connect to rep performance activity
            </p>

            <div style={{ overflowX: "auto" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "44px minmax(120px, 1fr) minmax(140px, 1fr) minmax(96px, 0.9fr) minmax(100px, 0.85fr) minmax(140px, 1.1fr)",
                  gap: 10,
                  paddingBottom: 10,
                  borderBottom: "1px solid #e7edf3",
                  fontSize: 11,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#64748b",
                }}
              >
                <div>#</div>
                <div>Rep</div>
                <div>Dealer</div>
                <div style={{ textAlign: "right" }}>Revenue</div>
                <div style={{ textAlign: "right" }}>Approval</div>
                <div>Status</div>
              </div>
              {[
                {
                  rank: 1,
                  rep: "Jordan Ellis",
                  dealer: "Northern Fluid Partners",
                  revenue: 582400,
                  approval: 91,
                  badge: "#1 Trophy",
                  badgeStyle: { background: "#fff7ed", color: "#c2410c", border: "1px solid #fdba74" },
                },
                {
                  rank: 2,
                  rep: "Priya Desai",
                  dealer: "Atlas Fleet Supply",
                  revenue: 519200,
                  approval: 88,
                  badge: "Hot Streak",
                  badgeStyle: { background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" },
                },
                {
                  rank: 3,
                  rep: "Marcus Webb",
                  dealer: "Great Lakes Lubricants",
                  revenue: 476800,
                  approval: 86,
                  badge: "High Conversion",
                  badgeStyle: { background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" },
                },
                {
                  rank: 4,
                  rep: "Elena Vasquez",
                  dealer: "Prairie Industrial Co.",
                  revenue: 441100,
                  approval: 84,
                  badge: "Rising Rep",
                  badgeStyle: { background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" },
                },
                {
                  rank: 5,
                  rep: "Daniel Okonkwo",
                  dealer: "Maritime Equipment Ltd.",
                  revenue: 398600,
                  approval: 82,
                  badge: "Hot Streak",
                  badgeStyle: { background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" },
                },
                {
                  rank: 6,
                  rep: "Sarah Chen",
                  dealer: "Mountain West Distributors",
                  revenue: 362900,
                  approval: 79,
                  badge: "High Conversion",
                  badgeStyle: { background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" },
                },
                {
                  rank: 7,
                  rep: "Chris Duarte",
                  dealer: "Pacific Rim Services",
                  revenue: 328400,
                  approval: 77,
                  badge: "Rising Rep",
                  badgeStyle: { background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" },
                },
                {
                  rank: 8,
                  rep: "Taylor Brooks",
                  dealer: "Central Plains Supply",
                  revenue: 294200,
                  approval: 74,
                  badge: "—",
                  badgeStyle: { background: "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0" },
                },
                {
                  rank: 9,
                  rep: "Alex Rivera",
                  dealer: "Sunbelt Commercial Fluids",
                  revenue: 261500,
                  approval: 72,
                  badge: "—",
                  badgeStyle: { background: "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0" },
                },
                {
                  rank: 10,
                  rep: "Jamie Foster",
                  dealer: "Heartland Lubrication Group",
                  revenue: 238700,
                  approval: 70,
                  badge: "—",
                  badgeStyle: { background: "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0" },
                },
              ].map((row, i) => (
                <div
                  key={row.rank}
                  style={{
                    ...styles.dashboardLeaderboardRow,
                    display: "grid",
                    gridTemplateColumns:
                      "44px minmax(120px, 1fr) minmax(140px, 1fr) minmax(96px, 0.9fr) minmax(100px, 0.85fr) minmax(140px, 1.1fr)",
                    gap: 10,
                    alignItems: "center",
                    marginBottom: i < 9 ? 8 : 0,
                  }}
                >
                  <div style={{ fontWeight: 900, color: "#0f172a" }}>
                    {row.rank}
                  </div>
                  <div style={styles.listTitle}>{row.rep}</div>
                  <div style={styles.listMeta}>{row.dealer}</div>
                  <div style={{ textAlign: "right", fontWeight: 800 }}>
                    ${row.revenue.toLocaleString()}
                  </div>
                  <div style={{ textAlign: "right", fontWeight: 700 }}>
                    {row.approval}%
                  </div>
                  <div>
                    <span
                      style={{
                        ...styles.statusPill,
                        fontSize: 11,
                        padding: "4px 10px",
                        ...row.badgeStyle,
                      }}
                    >
                      {row.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {klondikeAdminTab === "dealers" && (
      <div style={styles.card}>
        <div style={styles.eyebrow}>DEALER PERFORMANCE COMMAND CENTER</div>
        <h3 style={styles.cardTitle}>Dealer Account Snapshots</h3>
        <p style={styles.cardBody}>
          Monitor dealer activity across quotes, proposals, customer responses,
          approved revenue, approval rate, and platform adoption.
        </p>

        <div style={styles.stack}>
          {dealerNetworkPerformance.length === 0 && (
            <p style={styles.muted}>No dealer performance data loaded yet.</p>
          )}

          {dealerNetworkPerformance.map((dealer) => (
            <button
              key={dealer.organization_id}
              type="button"
              onClick={() => setSelectedDealerPerformance(dealer)}
              style={{
                ...styles.listRow,
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
                background:
                  selectedDealerPerformance?.organization_id === dealer.organization_id
                    ? "#fffbea"
                    : "#ffffff",
                border:
                  selectedDealerPerformance?.organization_id === dealer.organization_id
                    ? "2px solid #f6a531"
                    : "1px solid #e7edf3",
                padding: 18,
              }}
            >
              <div style={{ minWidth: 240, flex: "1 1 260px" }}>
                <div style={styles.listTitle}>{dealer.name}</div>
                <div style={styles.listMeta}>
                  {dealer.slug || "dealer-account"} • Click for dealer dashboard
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(6, minmax(90px, 1fr))",
                  gap: 12,
                  flex: "3 1 680px",
                  width: "100%",
                }}
              >
                <div>
                  <div style={styles.summaryLabel}>Quotes</div>
                  <div style={styles.summaryValue}>{dealer.quotesCreated}</div>
                </div>

                <div>
                  <div style={styles.summaryLabel}>Proposals</div>
                  <div style={styles.summaryValue}>{dealer.proposalsSent}</div>
                </div>

                <div>
                  <div style={styles.summaryLabel}>Responses</div>
                  <div style={styles.summaryValue}>{dealer.customerResponses}</div>
                </div>

                <div>
                  <div style={styles.summaryLabel}>Revenue</div>
                  <div style={styles.summaryValue}>
                    ${Number(dealer.revenueWon || 0).toLocaleString()}
                  </div>
                </div>

                <div>
                  <div style={styles.summaryLabel}>Approval</div>
                  <div style={styles.summaryValue}>{dealer.approvalRate}%</div>
                </div>

                <div>
                  <div style={styles.summaryLabel}>Team</div>
                  <div style={styles.summaryValue}>{dealer.teamMembers}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      )}

      {klondikeAdminTab === "dealers" && selectedDealerPerformance && (
        <>
          <div style={styles.card}>
            <div style={styles.eyebrow}>DEALER ADMIN DASHBOARD VIEW</div>
            <h3 style={styles.cardTitle}>{selectedDealerPerformance.name}</h3>
            <p style={styles.cardBody}>
              Klondike Admin is viewing the same dealer-level performance dashboard
              the Dealer Admin sees.
            </p>

            <div style={styles.grid3}>
              <div style={styles.summaryCard}>
                <div style={styles.summaryLabel}>Quotes Created</div>
                <div style={styles.summaryValue}>
                  {selectedDealerPerformance.quotesCreated}
                </div>
              </div>

              <div style={styles.summaryCard}>
                <div style={styles.summaryLabel}>Proposals Sent</div>
                <div style={styles.summaryValue}>
                  {selectedDealerPerformance.proposalsSent}
                </div>
              </div>

              <div style={styles.summaryCard}>
                <div style={styles.summaryLabel}>Customer Responses</div>
                <div style={styles.summaryValue}>
                  {selectedDealerPerformance.customerResponses}
                </div>
              </div>

              <div style={styles.summaryCard}>
                <div style={styles.summaryLabel}>Approved Revenue</div>
                <div style={styles.summaryValue}>
                  ${Number(selectedDealerPerformance.revenueWon || 0).toLocaleString()}
                </div>
              </div>

              <div style={styles.summaryCard}>
                <div style={styles.summaryLabel}>Approval Rate</div>
                <div style={styles.summaryValue}>
                  {selectedDealerPerformance.approvalRate}%
                </div>
              </div>

              <div style={styles.summaryCard}>
                <div style={styles.summaryLabel}>Team Members</div>
                <div style={styles.summaryValue}>
                  {selectedDealerPerformance.teamMembers}
                </div>
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.eyebrow}>DEALER LEADERBOARD</div>
            <h3 style={styles.cardTitle}>Rep Performance Rankings</h3>

            <div style={styles.stack}>
              {selectedDealerPerformance.leaderboard?.length === 0 ? (
                <p style={styles.muted}>No representative performance data yet.</p>
              ) : (
                selectedDealerPerformance.leaderboard?.map((rep, index) => (
                  <div
                    key={rep.name || index}
                    style={{
                      ...styles.listRow,
                      background: index === 0 ? "#fffbea" : "#f8fafc",
                      border:
                        index === 0
                          ? "2px solid #f6a531"
                          : "1px solid #e7edf3",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: 10,
                          marginBottom: 4,
                        }}
                      >
                        <div style={styles.listTitle}>
                          #{index + 1} {rep.name}
                        </div>
                        <LeaderboardBadgeTray
                          index={index}
                          proposals={rep.proposals}
                          quotes={rep.quotes}
                          responses={rep.responses}
                          revenue={rep.revenue}
                        />
                      </div>
                      <div style={styles.listMeta}>
                        {rep.quotes} quote(s) • {rep.proposals} proposal(s) •{" "}
                        {rep.responses} response(s)
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={styles.listTitle}>
                        ${Number(rep.revenue || 0).toLocaleString()}
                      </div>
                      <div style={styles.listMeta}>Approved Revenue</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.eyebrow}>PIPELINE</div>
            <h3 style={styles.cardTitle}>Dealer Opportunity Pipeline</h3>

            <div style={styles.grid2}>
              <div style={{ ...styles.summaryCard, ...styles.pipelineAwaiting }}>
                <div style={styles.summaryLabel}>Awaiting Review</div>
                <div style={styles.summaryValue}>
                  {
                    selectedDealerPerformance.followUps?.filter(
                      (q) => q.review_status !== "submitted"
                    ).length
                  }
                </div>
                <div style={styles.listMeta}>Proposals waiting on customer</div>
              </div>

              <div style={{ ...styles.summaryCard, ...styles.pipelineReviewed }}>
                <div style={styles.summaryLabel}>Reviewed</div>
                <div style={styles.summaryValue}>
                  {selectedDealerPerformance.customerResponses}
                </div>
                <div style={styles.listMeta}>Customer has responded</div>
              </div>

              <div style={{ ...styles.summaryCard, ...styles.pipelineApproved }}>
                <div style={styles.summaryLabel}>Approval Rate</div>
                <div style={styles.summaryValue}>
                  {selectedDealerPerformance.approvalRate}%
                </div>
                <div style={styles.listMeta}>Proposal approval rate</div>
              </div>

              <div style={{ ...styles.summaryCard, ...styles.pipelineFollowUp }}>
                <div style={styles.summaryLabel}>Needs Follow-Up</div>
                <div style={styles.summaryValue}>
                  {
                    selectedDealerPerformance.followUps?.filter(
                      (q) => q.review_status !== "submitted"
                    ).length
                  }
                </div>
                <div style={styles.listMeta}>
                  Open opportunities requiring attention
                </div>
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.eyebrow}>PRODUCT LINE PERFORMANCE</div>
            <h3 style={styles.cardTitle}>Dealer Product Mix</h3>

            <div style={styles.grid3}>
              {selectedDealerPerformance.productMix?.map((line) => (
                <div key={line.name} style={styles.summaryCard}>
                  <div style={styles.summaryLabel}>{line.name}</div>
                  <div style={styles.summaryValue}>{line.percent}%</div>
                  <div style={styles.listMeta}>{line.count} quoted item(s)</div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.eyebrow}>CUSTOMER RESPONSES</div>
            <h3 style={styles.cardTitle}>Follow-Up Items</h3>

            <div style={styles.stack}>
              {selectedDealerPerformance.followUps?.length === 0 ? (
                <p style={styles.muted}>No current follow-up items.</p>
              ) : (
                selectedDealerPerformance.followUps?.map((quote, index) => (
                  <div key={quote.id || index} style={styles.listRow}>
                    <div>
                      <div style={styles.listTitle}>
                        {quote.customer_name || "Customer"}
                      </div>

                      <div style={styles.listMeta}>
                        {quote.status || "draft"} • {quote.review_status || "open"}
                      </div>
                    </div>

                    <span style={styles.statusPill}>
                      {quote.customer_email || "No customer email"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
      {(klondikeAdminTab === "create_dealer" ||
        klondikeAdminTab === "create_dealer_user") && (
      <div>
        <div style={styles.sectionHeader}>Primary Actions</div>

        <div style={styles.grid2}>
          {klondikeAdminTab === "create_dealer" && (
          <div style={styles.card}>
            <div style={styles.eyebrow}>CREATE DEALER</div>
            <h3 style={styles.cardTitle}>Create Dealer Organization</h3>
            <p style={styles.cardBody}>
              Launch a new dealer organization and provision the first dealer
              admin.
            </p>

            <form onSubmit={handleCreateDealerAccount} style={styles.form}>
              <div>
                <label style={styles.label}>Dealer Name</label>
                <input
                  style={styles.input}
                  value={newDealerName}
                  onChange={(e) => setNewDealerName(e.target.value)}
                  placeholder="Example Dealer"
                />
              </div>

              <div>
                <label style={styles.label}>Slug Optional</label>
                <input
                  style={styles.input}
                  value={newDealerSlug}
                  onChange={(e) => setNewDealerSlug(e.target.value)}
                  placeholder="example-dealer"
                />
              </div>

              <div>
                <label style={styles.label}>Dealer Admin Email</label>
                <input
                  style={styles.input}
                  type="email"
                  value={newDealerAdminEmail}
                  onChange={(e) => setNewDealerAdminEmail(e.target.value)}
                  placeholder="admin@dealer.com"
                />
              </div>

              <button
                type="submit"
                disabled={newDealerLoading}
                style={styles.primaryButton}
              >
                {newDealerLoading ? "Creating..." : "Create Dealer Account"}
              </button>
            </form>

            {newDealerMessage && (
              <p style={styles.message}>{newDealerMessage}</p>
            )}
          </div>
          )}

          {klondikeAdminTab === "create_dealer_user" && (
          <div style={styles.card}>
            <div style={styles.eyebrow}>CREATE USER</div>
            <h3 style={styles.cardTitle}>Provision Dealer User</h3>
            <p style={styles.cardBody}>
              Add dealer admins, managers, or reps to an existing dealer
              organization.
            </p>

            <form onSubmit={handleInviteUser} style={styles.form}>
              <div>
                <label style={styles.label}>Dealer Organization</label>
                <select
                  style={styles.input}
                  value={inviteOrgId}
                  onChange={(e) => setInviteOrgId(e.target.value)}
                >
                  <option value="">Select organization</option>
                  {dealerOrganizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={styles.label}>User Email</label>
                <input
                  style={styles.input}
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="user@dealer.com"
                />
              </div>

              <div>
                <label style={styles.label}>Role</label>
                <select
                  style={styles.input}
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                >
                  <option value="dealer_admin">Dealer Admin</option>
                  <option value="manager">Manager</option>
                  <option value="rep">Rep</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={inviteLoading}
                style={styles.primaryButton}
              >
                {inviteLoading ? "Creating..." : "Create User"}
              </button>
            </form>

            {inviteMessage && <p style={styles.message}>{inviteMessage}</p>}
          </div>
          )}
        </div>
      </div>
      )}

      {klondikeAdminTab === "approvals" && (
      <div>
  <div style={styles.sectionHeader}>Access Approvals</div>

  <div style={styles.card}>
    <div style={styles.eyebrow}>PENDING REQUESTS</div>
    <h3 style={styles.cardTitle}>Approve Dealer Access</h3>
    <p style={styles.cardBody}>
      Dealer admins and managers submit access requests here. Approval creates
      the user, provisions the role, and removes the pending request.
    </p>

    <div style={styles.stack}>
      {pendingAccessRequests.length === 0 && (
        <p style={styles.muted}>No pending access requests.</p>
      )}

      {pendingAccessRequests.map((req) => {
        const managerOptions = [
          ...(approvedManagers || []),
          ...(allUsers || []),
        ]
          .filter((manager) => manager.role === "manager")
          .filter(
            (manager) =>
              !manager.organization_id ||
              manager.organization_id === req.organization_id
          )
          .filter((manager, index, arr) => {
            const managerId = manager.user_id || manager.id;
            return (
              arr.findIndex((item) => (item.user_id || item.id) === managerId) ===
              index
            );
          });

        return (
          <div key={req.id} style={styles.listRow}>
            <div style={{ flex: 1 }}>
              <div style={styles.listTitle}>
                {req.requester_name || req.requester_email}
              </div>

              <div style={styles.listMeta}>
                {(orgNameById[req.organization_id] || "Unknown organization") +
                  " • " +
                  roleLabel(req.requested_role)}
              </div>

              <div style={styles.listMeta}>{req.requester_email}</div>

              {req.reason && (
                <div style={styles.listReason}>{req.reason}</div>
              )}

              {req.requested_role === "rep" && (
                <div style={{ marginTop: 12 }}>
                  <label style={styles.label}>Assign Manager Optional</label>

                  <select
                    style={styles.input}
                    value={
                      managerAssignments[req.id] ||
                      req.assigned_manager_profile_id ||
                      ""
                    }
                    onChange={(e) =>
                      setManagerAssignments((prev) => ({
                        ...prev,
                        [req.id]: e.target.value,
                      }))
                    }
                  >
                    <option value="">
                      No manager / Dealer Admin manages directly
                    </option>

                    {managerOptions.map((manager) => (
                      <option
                        key={manager.user_id || manager.id}
                        value={manager.user_id || manager.id}
                      >
                        {manager.full_name || manager.email || "Manager"}
                      </option>
                    ))}
                  </select>

                  <div style={styles.listMeta}>
                    Available managers: {managerOptions.length}
                  </div>
                </div>
              )}
            </div>

            <div style={styles.rowButtons}>
              <button
                type="button"
                style={styles.approveButton}
                disabled={reviewLoadingId === req.id}
                onClick={() => handleReviewAccessRequest(req, "approved")}
              >
                {reviewLoadingId === req.id ? "Working..." : "Approve"}
              </button>

              <button
                type="button"
                style={styles.rejectButton}
                disabled={reviewLoadingId === req.id}
                onClick={() => handleReviewAccessRequest(req, "denied")}
              >
                {reviewLoadingId === req.id ? "Working..." : "Reject"}
              </button>
            </div>
          </div>
        );
      })}
    </div>

    {reviewMessage && <p style={styles.message}>{reviewMessage}</p>}
  </div>
      </div>
      )}
        {klondikeAdminTab === "approvals" && (
        <div>
          <div style={styles.sectionHeader}>Recent Activity</div>

          <div style={styles.card}>
            <div style={styles.eyebrow}>RECENT INVITES</div>
            <h3 style={styles.cardTitle}>Provisioning History</h3>

            <div style={styles.stack}>
              {recentInvites.length === 0 && (
                <p style={styles.muted}>No invites yet.</p>
              )}

              {recentInvites.map((invite) => (
                <div key={invite.id} style={styles.listRow}>
                  <div>
                    <div style={styles.listTitle}>{invite.invited_email}</div>
                    <div style={styles.listMeta}>
                      {(orgNameById[invite.organization_id] ||
                        invite.organization_id) +
                        " • " +
                        roleLabel(invite.invited_role)}
                    </div>
                  </div>

                  <span style={styles.statusPill}>{invite.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}

          {klondikeAdminTab === "dealers" && (
          <div style={styles.card}>
            <div style={styles.eyebrow}>DEALER NETWORK</div>
            <h3 style={styles.cardTitle}>Dealer Organizations</h3>

            <div style={styles.stack}>
              {dealerOrganizations.length === 0 && (
                <p style={styles.muted}>No dealers created yet.</p>
              )}

              {dealerOrganizations.map((org) => (
                <div key={org.id} style={styles.listRow}>
                  <div>
                    <div style={styles.listTitle}>{org.name}</div>
                    <div style={styles.listMeta}>
                      {org.slug || "No slug"} •{" "}
                      {org.organization_type || "dealer"}
                    </div>
                  </div>

                  <span style={styles.statusPill}>active</span>
                </div>
              ))}
            </div>
          </div>
          )}
    </div>
  );
  const loadDealerPerformance = async () => {
  if (!activeMembership?.organization_id) return;

  const { data: quoteRows, error: quoteError } = await supabase
    .from("quotes")
    .select("*")
    .eq("organization_id", activeMembership.organization_id);

  if (quoteError) {
    console.error("Dealer performance quote load error:", quoteError);
    return;
  }

  const dealerQuotes = quoteRows || [];
  const quoteIds = dealerQuotes.map((q) => q.id).filter(Boolean);

  let responseRows = [];
  let itemRows = [];

  if (quoteIds.length > 0) {
    const { data: responses } = await supabase
      .from("proposal_responses")
      .select("*")
      .in("quote_id", quoteIds);

    responseRows = responses || [];

    const { data: items } = await supabase
      .from("quote_items")
      .select("*")
      .in("quote_id", quoteIds);

    itemRows = items || [];
  }

  const approvedResponses = responseRows.flatMap((row) => {
    const productResponses = Array.isArray(row.responses) ? row.responses : [];
    const equipmentResponses = Array.isArray(row.equipment) ? row.equipment : [];
    return [...productResponses, ...equipmentResponses].filter(
      (item) => item.decision === "approved"
    );
  });

  const totalResponses = responseRows.flatMap((row) => {
    const productResponses = Array.isArray(row.responses) ? row.responses : [];
    const equipmentResponses = Array.isArray(row.equipment) ? row.equipment : [];
    return [...productResponses, ...equipmentResponses];
  });

  const revenueWon = approvedResponses.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  const repMap = {};

  dealerQuotes.forEach((quote) => {
    const repKey = quote.rep_email || quote.user_id || "Unassigned Rep";

    if (!repMap[repKey]) {
      repMap[repKey] = {
        name: quote.rep_name || quote.rep_email || "Unassigned Rep",
        quotes: 0,
        proposals: 0,
        responses: 0,
        revenue: 0,
      };
    }

    repMap[repKey].quotes += 1;

    if (quote.status === "sent" || quote.review_status) {
      repMap[repKey].proposals += 1;
    }
  });

  responseRows.forEach((row) => {
    const quote = dealerQuotes.find((q) => q.id === row.quote_id);
    const repKey = quote?.rep_email || quote?.user_id || "Unassigned Rep";

    if (repMap[repKey]) {
      repMap[repKey].responses += 1;

      const productResponses = Array.isArray(row.responses) ? row.responses : [];
      const equipmentResponses = Array.isArray(row.equipment) ? row.equipment : [];

      repMap[repKey].revenue += [...productResponses, ...equipmentResponses]
        .filter((item) => item.decision === "approved")
        .reduce((sum, item) => sum + Number(item.price || 0), 0);
    }
  });

  const productBuckets = {
    "Heavy Duty": 0,
    Automotive: 0,
    "Hydraulic Fluids": 0,
    Grease: 0,
    Coolants: 0,
    "Transmission Fluids": 0,
    Equipment: 0,
  };

  itemRows.forEach((item) => {
    const name = `${item.product_name || item.klondike_product || ""}`.toLowerCase();

    if (name.includes("grease")) productBuckets.Grease += 1;
    else if (name.includes("coolant")) productBuckets.Coolants += 1;
    else if (name.includes("hydraulic")) productBuckets["Hydraulic Fluids"] += 1;
    else if (name.includes("transmission") || name.includes("atf")) productBuckets["Transmission Fluids"] += 1;
    else if (name.includes("diesel") || name.includes("engine") || name.includes("15w") || name.includes("10w")) productBuckets["Heavy Duty"] += 1;
    else productBuckets.Automotive += 1;
  });

  const totalProductCount =
    Object.values(productBuckets).reduce((sum, count) => sum + count, 0) || 1;

  setDealerPerformance({
    quotesCreated: dealerQuotes.length,
    proposalsSent: dealerQuotes.filter((q) => q.status === "sent").length,
    customerResponses: responseRows.length,
    revenueWon,
    approvalRate:
      totalResponses.length > 0
        ? Math.round((approvedResponses.length / totalResponses.length) * 100)
        : 0,
    leaderboard: Object.values(repMap).sort((a, b) => b.revenue - a.revenue),
    productMix: Object.entries(productBuckets).map(([name, count]) => ({
      name,
      percent: Math.round((count / totalProductCount) * 100),
      count,
    })),
    followUps: dealerQuotes
      .filter((q) => q.status === "sent" || q.review_status === "open")
      .slice(0, 5),
  });
};
useEffect(() => {
  loadDealerPerformance();
  loadApprovedManagers();
}, [activeMembership?.organization_id, dealerAdminTab]);
 const loadApprovedManagers = async () => {
  if (!activeMembership?.organization_id) {
    setApprovedManagers([]);
    return;
  }

  const { data: memberRows, error: memberError } = await supabase
    .from("organization_members")
    .select("id, user_id, role, is_active, organization_id")
    .eq("organization_id", activeMembership.organization_id)
    .eq("role", "manager")
    .eq("is_active", true);

  if (memberError) {
    console.error("Approved manager member load error:", memberError);
    setApprovedManagers([]);
    return;
  }

  const userIds = (memberRows || []).map((row) => row.user_id).filter(Boolean);

  if (userIds.length === 0) {
    setApprovedManagers([]);
    return;
  }

  const { data: profileRows, error: profileError } = await supabase
    .from("profiles")
    .select("id, email, full_name")
    .in("id", userIds);

  if (profileError) {
    console.error("Approved manager profile load error:", profileError);
  }

  const profileMap = {};
  (profileRows || []).forEach((profile) => {
    profileMap[profile.id] = profile;
  });

  setApprovedManagers(
    (memberRows || []).map((member) => ({
      ...member,
      user_id: member.user_id,
      full_name: profileMap[member.user_id]?.full_name || "",
      email: profileMap[member.user_id]?.email || "",
    }))
  );
};
const renderDealerAdminView = () => (
  <div style={styles.grid24}>
    {!dealerProfile?.setup_completed && !dealerEnrollmentStarted ? (
      <div
        style={{
          minHeight: "82vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 32,
          borderRadius: 28,
          background:
            "radial-gradient(circle at 50% 18%, #143b66 0%, #082846 32%, #04192d 65%, #010b14 100%)",
          color: "#fff",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 620 }}>
          <img
            src="/klondike-full-logo.png"
            alt="Klondike"
            style={{ width: 190, marginBottom: 18 }}
          />

          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              fontWeight: 900,
              opacity: 0.72,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Klondike Dealer Platform
          </div>

          <h1
            style={{
              fontSize: 48,
              lineHeight: 1.02,
              fontWeight: 1000,
              margin: "0 0 18px",
              textTransform: "uppercase",
            }}
          >
            We Grow
            <br />
            Independent
            <br />
            Business
          </h1>

          <p
            style={{
              fontSize: 15,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.84)",
              margin: "0 auto 18px",
              maxWidth: 500,
            }}
          >
            Congratulations on becoming an official Klondike Lubricants
            distributor. You now have access to the Klondike Dealer Growth
            Platform — built to help you win more business, streamline product
            selection, and deliver premium lubrication solutions to your
            customers.
          </p>

          <div
            style={{
              color: "#f6a531",
              fontWeight: 1000,
              fontStyle: "italic",
              letterSpacing: "0.04em",
              marginBottom: 28,
            }}
          >
            BRAVING THE FORCE OF MOVEMENT
          </div>

          <img
            src="/products.png"
            alt="Klondike Products"
            style={{
              width: "100%",
              maxWidth: 430,
              marginBottom: 30,
            }}
          />

          <button
            type="button"
            onClick={() => setDealerEnrollmentStarted(true)}
            style={{
              padding: "15px 26px",
              borderRadius: 999,
              border: "none",
              background: "linear-gradient(180deg, #f6a531 0%, #d87400 100%)",
              color: "#fff",
              fontWeight: 1000,
              cursor: "pointer",
              boxShadow: "0 14px 30px rgba(246,165,49,0.35)",
            }}
          >
            Begin Dealer Enrollment
          </button>
        </div>
      </div>
    ) : dealerProfile?.setup_completed ? (
      <>
        <div style={styles.heroCard}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
 {currentDealerLogoUrl && (
  <img
  src={currentDealerLogoUrl}
  alt="Dealer Logo"
  style={{
    width: 72,
    height: 72,
    objectFit: "contain",
    borderRadius: 12,
    background: "#fff",
    padding: 8,
  }}
/>
)}

  <div>
    <div style={styles.eyebrow}>DEALER ADMIN</div>

    <h2 style={styles.heroTitle}>
      {activeMembership?.organization?.name || "Dealer"} Dashboard
   </h2>
</div>

{activeMembership?.role && (
  <div style={{ marginLeft: "auto" }}>
    {renderRoleBadge(activeMembership.role)}
  </div>
)}
</div>

<p style={styles.heroText}>
            Manage your dealer profile, team access, reps, performance, and
            customer-facing proposal settings.
          </p>
        </div>

        <div style={styles.workflowTabBar}>
          {["dashboard", "team", "add_users", "profile"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setDealerAdminTab(tab)}
              style={{
                ...styles.workflowTab,
                ...(dealerAdminTab === tab ? styles.workflowTabActive : {}),
              }}
            >
              {tab === "add_users"
  ? "Add Users"
  : tab === "team"
  ? "Team"
  : tab}
            </button>
          ))}
        </div>

        {dealerAdminTab === "dashboard" && (
  <>
    <div style={styles.card}>
      <div style={styles.eyebrow}>PERFORMANCE SNAPSHOT</div>
      <h3 style={styles.cardTitle}>Dealer Performance Overview</h3>

      <div style={styles.grid3}>
        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Quotes Created</div>
          <div style={styles.summaryValue}>{dealerPerformance.quotesCreated}</div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Proposals Sent</div>
          <div style={styles.summaryValue}>{dealerPerformance.proposalsSent}</div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Customer Responses</div>
          <div style={styles.summaryValue}>{dealerPerformance.customerResponses}</div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Approved Revenue</div>
          <div style={styles.summaryValue}>
            ${Number(dealerPerformance.revenueWon || 0).toLocaleString()}
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Approval Rate</div>
          <div style={styles.summaryValue}>{dealerPerformance.approvalRate}%</div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Team Members</div>
          <div style={styles.summaryValue}>{repProfiles.length}</div>
        </div>
      </div>
    </div>

    <div style={styles.card}>
      <div style={styles.eyebrow}>DEALER LEADERBOARD</div>
      <h3 style={styles.cardTitle}>Rep Performance Rankings</h3>

      <div style={styles.stack}>
        {dealerPerformance.leaderboard.length === 0 ? (
          <p style={styles.cardBody}>No representative performance data yet.</p>
        ) : (
          dealerPerformance.leaderboard.map((rep, index) => (
            <div
              key={rep.name || index}
              style={{
                ...styles.listRow,
                background: index === 0 ? "#fffbea" : "#f8fafc",
                border:
                  index === 0
                    ? "2px solid #f6a531"
                    : "1px solid #e7edf3",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 10,
                    marginBottom: 4,
                  }}
                >
                  <div style={styles.listTitle}>
                    #{index + 1} {rep.name}
                  </div>
                  <LeaderboardBadgeTray
                    index={index}
                    proposals={rep.proposals}
                    quotes={rep.quotes}
                    responses={rep.responses}
                    revenue={rep.revenue}
                  />
                </div>
                <div style={styles.listMeta}>
                  {rep.quotes} quote(s) • {rep.proposals} proposal(s) •{" "}
                  {rep.responses} response(s)
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={styles.listTitle}>
                  ${Number(rep.revenue || 0).toLocaleString()}
                </div>
                <div style={styles.listMeta}>Approved Revenue</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>

    <div style={styles.card}>
      <div style={styles.eyebrow}>PIPELINE</div>
      <h3 style={styles.cardTitle}>Dealer Opportunity Pipeline</h3>

      <div style={styles.grid2}>
        <div style={{ ...styles.summaryCard, borderLeft: "5px solid #94a3b8" }}>
          <div style={styles.summaryLabel}>Awaiting Review</div>
          <div style={styles.summaryValue}>
            {dealerPerformance.followUps.filter((q) => q.review_status !== "submitted").length}
          </div>
          <div style={styles.listMeta}>Proposals waiting on customer</div>
        </div>

        <div style={{ ...styles.summaryCard, borderLeft: "5px solid #3b82f6" }}>
          <div style={styles.summaryLabel}>Reviewed</div>
          <div style={styles.summaryValue}>{dealerPerformance.customerResponses}</div>
          <div style={styles.listMeta}>Customer has responded</div>
        </div>

        <div style={{ ...styles.summaryCard, borderLeft: "5px solid #22c55e" }}>
          <div style={styles.summaryLabel}>Approval Rate</div>
          <div style={styles.summaryValue}>{dealerPerformance.approvalRate}%</div>
          <div style={styles.listMeta}>Proposal approval rate</div>
        </div>

        <div style={{ ...styles.summaryCard, borderLeft: "5px solid #ef4444" }}>
          <div style={styles.summaryLabel}>Needs Follow-Up</div>
          <div style={styles.summaryValue}>
            {dealerPerformance.followUps.filter((q) => q.review_status !== "submitted").length}
          </div>
          <div style={styles.listMeta}>Open opportunities requiring attention</div>
        </div>
      </div>
    </div>

    <div style={styles.card}>
      <div style={styles.eyebrow}>PRODUCT LINE PERFORMANCE</div>
      <h3 style={styles.cardTitle}>Dealer Product Mix</h3>

      <div style={styles.grid3}>
        {dealerPerformance.productMix.map((line) => (
          <div key={line.name} style={styles.summaryCard}>
            <div style={styles.summaryLabel}>{line.name}</div>
            <div style={styles.summaryValue}>{line.percent}%</div>
            <div style={styles.listMeta}>{line.count} quoted item(s)</div>
          </div>
        ))}
      </div>
    </div>
  </>
)}

      {dealerAdminTab === "profile" && (
  <>
    <div style={styles.card}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 18, alignItems: "center" }}>
        <div>
          <div style={styles.eyebrow}>DEALER PROFILE</div>
          <h3 style={styles.cardTitle}>Branding & Proposal Settings</h3>
          <p style={styles.cardBody}>
            Control how this dealer appears across dashboards and customer-facing proposals.
          </p>
        </div>

        {dealerLogoPreview || dealerLogoUrl || dealerProfile?.logo_url ? (
          <img
            src={dealerLogoPreview || dealerLogoUrl || dealerProfile?.logo_url}
            alt="Dealer Logo"
            style={{
              width: 88,
              height: 88,
              objectFit: "contain",
              background: "#f8fafc",
              border: "1px solid #e5e7eb",
              borderRadius: 18,
              padding: 10,
            }}
          />
        ) : null}
      </div>
    </div>

    <div style={styles.card}>
      <div style={styles.eyebrow}>DEALER BRANDING</div>

      <div style={styles.grid2}>
        <div>
          <label style={styles.label}>Dealer Company Name</label>
          <input
            style={styles.input}
            value={dealerCompanyName}
            onChange={(e) => setDealerCompanyName(e.target.value)}
            placeholder="Dealer Company"
          />
        </div>

        <div>
          <label style={styles.label}>Dealer Logo</label>
          <input
            type="file"
            accept="image/*"
            style={styles.input}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setDealerLogoFile(file);
              setDealerLogoPreview(URL.createObjectURL(file));
            }}
          />
          <div style={styles.listMeta}>
            Upload a PNG or JPG logo for portal and proposal branding.
          </div>
        </div>
      </div>
    </div>

    <div style={styles.card}>
      <div style={styles.eyebrow}>BUSINESS CONTACT</div>

      <div style={styles.grid2}>
        <div>
          <label style={styles.label}>Dealer Phone</label>
          <input style={styles.input} value={dealerPhone} onChange={(e) => setDealerPhone(e.target.value)} />
        </div>

        <div>
          <label style={styles.label}>Dealer Website</label>
          <input style={styles.input} value={dealerWebsite} onChange={(e) => setDealerWebsite(e.target.value)} />
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        <label style={styles.label}>Dealer Address</label>
        <input style={styles.input} value={dealerAddress} onChange={(e) => setDealerAddress(e.target.value)} />
      </div>

      <div style={{ ...styles.grid3, marginTop: 14 }}>
        <div>
          <label style={styles.label}>City</label>
          <input style={styles.input} value={dealerCity} onChange={(e) => setDealerCity(e.target.value)} />
        </div>

        <div>
          <label style={styles.label}>Province/State</label>
          <input style={styles.input} value={dealerProvinceState} onChange={(e) => setDealerProvinceState(e.target.value)} />
        </div>

        <div>
          <label style={styles.label}>Postal Code</label>
          <input style={styles.input} value={dealerPostalCode} onChange={(e) => setDealerPostalCode(e.target.value)} />
        </div>
      </div>
    </div>

    <div style={styles.card}>
      <div style={styles.eyebrow}>PROPOSAL DEFAULTS</div>
      <p style={styles.cardBody}>
        Use Klondike recommended language or create dealer-specific proposal messaging.
      </p>

      <label style={{ ...styles.label, display: "flex", gap: 10 }}>
        <input
          type="checkbox"
          checked={useDefaultIntro}
          onChange={(e) => {
            const checked = e.target.checked;
            setUseDefaultIntro(checked);
            if (checked) setDealerIntroStatement(DEFAULT_INTRO);
          }}
        />
        Use Klondike recommended intro
      </label>

      <textarea
        style={{
          ...styles.textarea,
          backgroundColor: useDefaultIntro ? "#f1f5f9" : "#fff",
        }}
        value={useDefaultIntro ? DEFAULT_INTRO : dealerIntroStatement}
        onChange={(e) => setDealerIntroStatement(e.target.value)}
        disabled={useDefaultIntro}
      />

      <label style={{ ...styles.label, display: "flex", gap: 10, marginTop: 16 }}>
        <input
          type="checkbox"
          checked={useDefaultClosing}
          onChange={(e) => {
            const checked = e.target.checked;
            setUseDefaultClosing(checked);
            if (checked) setDealerClosingStatement(DEFAULT_CLOSING);
          }}
        />
        Use Klondike recommended closing
      </label>

      <textarea
        style={{
          ...styles.textarea,
          backgroundColor: useDefaultClosing ? "#f1f5f9" : "#fff",
        }}
        value={useDefaultClosing ? DEFAULT_CLOSING : dealerClosingStatement}
        onChange={(e) => setDealerClosingStatement(e.target.value)}
        disabled={useDefaultClosing}
      />

      <button
        type="button"
        onClick={handleSaveDealerProfile}
        disabled={dealerSaving}
        style={{ ...styles.primaryButton, marginTop: 18 }}
      >
        {dealerSaving ? "Saving..." : "Save Dealer Profile"}
      </button>

      {dealerSaveMessage && <p style={styles.message}>{dealerSaveMessage}</p>}
    </div>
  </>
)}
            {dealerAdminTab === "add_users" && (
  <>
    <div style={styles.card}>
      <div style={styles.eyebrow}>TEAM ACCESS</div>
      <h3 style={styles.cardTitle}>Request Manager / Rep Access</h3>
      <p style={styles.cardBody}>
        Add the people who should receive access to this dealer workspace.
        Klondike Admin approval is required before access is granted.
      </p>

      <form onSubmit={handleAccessRequest} style={styles.form}>
        <div style={styles.grid3}>
          <input
            style={styles.input}
            value={requestName}
            onChange={(e) => setRequestName(e.target.value)}
            placeholder="Full name"
          />

          <input
            style={styles.input}
            type="email"
            value={requestEmail}
            onChange={(e) => setRequestEmail(e.target.value)}
            placeholder="user@dealer.com"
          />

          <select
            style={styles.input}
            value={requestRole}
            onChange={(e) => {
              setRequestRole(e.target.value);
            }}
          >
            <option value="manager">Manager</option>
            <option value="rep">Rep</option>
          </select>
        </div>

        <textarea
          style={styles.textarea}
          value={requestReason}
          onChange={(e) => setRequestReason(e.target.value)}
          placeholder="Why does this person need access?"
        />

        <button
          type="submit"
          disabled={requestLoading}
          style={styles.primaryButton}
        >
          {requestLoading ? "Submitting..." : "Add Additional User Request"}
        </button>
      </form>

      {requestMessage && <p style={styles.message}>{requestMessage}</p>}
    </div>

    {recentAccessRequests.filter((req) => req.status === "pending").length >
      0 && (
      <div style={styles.card}>
        <div style={styles.eyebrow}>PENDING REQUESTS</div>
        <h3 style={styles.cardTitle}>Pending Team Access</h3>

        {recentAccessRequests
          .filter((req) => req.status === "pending")
          .map((req) => (
            <div key={req.id} style={styles.listItem}>
              <div>
                <strong>{req.full_name || req.requester_name}</strong>{" "}
                ({req.requested_role})
              </div>
              <div style={styles.listMeta}>
                {req.email || req.requester_email}
              </div>
              {req.reason && <div style={styles.listMeta}>{req.reason}</div>}
            </div>
          ))}
      </div>
    )}
  </>
)}
{dealerAdminTab === "team" && (
  <div style={styles.card}>
    <div style={styles.eyebrow}>TEAM</div>
    <h3 style={styles.cardTitle}>Current Platform Users</h3>
    <p style={styles.cardBody}>
      View active managers and reps currently approved for this dealer platform.
    </p>

    <div style={styles.stack}>
      {managerMembers.length === 0 && repProfiles.length === 0 && (
        <p style={styles.muted}>No approved team members yet.</p>
      )}

      {managerMembers.map((manager) => (
        <div key={manager.id || manager.user_id} style={styles.listRow}>
          <div>
            <div style={styles.listTitle}>
              {manager.profile?.full_name || manager.profile?.email || "Manager"}
            </div>
            <div style={styles.listMeta}>
              {manager.profile?.email || "No email listed"}
            </div>
          </div>

          <span style={styles.statusPill}>Manager</span>
        </div>
      ))}

      {repProfiles.map((rep) => (
        <div key={rep.id || rep.email} style={styles.listRow}>
          <div>
            <div style={styles.listTitle}>
              {`${rep.first_name || ""} ${rep.last_name || ""}`.trim() ||
                rep.email ||
                "Representative"}
            </div>
            <div style={styles.listMeta}>
              {rep.email || "No email listed"}
            </div>
          </div>

          <span style={styles.statusPill}>Rep</span>
        </div>
      ))}
    </div>
  </div>
)}
</>
) : (
      <>
        <div style={styles.heroCard}>
          <div style={styles.eyebrow}>KLONDIKE DEALER GROWTH PLATFORM</div>
          <h2 style={styles.heroTitle}>Dealer Enrollment</h2>
          <p style={styles.heroText}>
            Add your dealer profile, branding, default proposal settings, and
            team access requests.
          </p>
        </div>

        <form onSubmit={handleSaveDealerProfile} style={styles.form}>
          <div style={styles.card}>
            <div style={styles.eyebrow}>DEALER BRANDING</div>

            <div style={styles.grid2}>
              <div>
                <label style={styles.label}>Dealer Company Name</label>
                <input
                  style={styles.input}
                  value={dealerCompanyName}
                  onChange={(e) => setDealerCompanyName(e.target.value)}
                  placeholder="Dealer Company"
                />
              </div>

              <div>
                <label style={styles.label}>Dealer Logo</label>
                <input
  type="file"
  accept="image/png,image/jpeg"
  style={styles.input}
  onChange={(e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setDealerLogoFile(file);
    setDealerLogoPreview(URL.createObjectURL(file));
  }}
/>
                <div style={styles.listMeta}>
                  Upload a PNG or JPG logo for use in portal and proposal
                  documents.
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 16,
                border: "1px dashed #cbd5e1",
                borderRadius: 14,
                minHeight: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
                background: "#f8fafc",
              }}
            >
              Logo Preview
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.eyebrow}>DEALER CONTACT & BUSINESS INFO</div>

            <div style={styles.grid2}>
              <div>
                <label style={styles.label}>Dealer Phone</label>
                <input
                  style={styles.input}
                  value={dealerPhone}
                  onChange={(e) => setDealerPhone(e.target.value)}
                  placeholder="555-555-5555"
                />
              </div>

              <div>
                <label style={styles.label}>Dealer Website</label>
                <input
                  style={styles.input}
                  value={dealerWebsite}
                  onChange={(e) => setDealerWebsite(e.target.value)}
                  placeholder="https://dealer.com"
                />
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              <label style={styles.label}>Dealer Address</label>
              <input
                style={styles.input}
                value={dealerAddress}
                onChange={(e) => setDealerAddress(e.target.value)}
                placeholder="Street address"
              />
            </div>

            <div style={{ ...styles.grid3, marginTop: 14 }}>
              <div>
                <label style={styles.label}>Dealer City</label>
                <input
                  style={styles.input}
                  value={dealerCity}
                  onChange={(e) => setDealerCity(e.target.value)}
                  placeholder="City"
                />
              </div>

              <div>
                <label style={styles.label}>Dealer Province/State</label>
                <input
                  style={styles.input}
                  value={dealerProvinceState}
                  onChange={(e) => setDealerProvinceState(e.target.value)}
                  placeholder="Province or State"
                />
              </div>

              <div>
                <label style={styles.label}>Dealer Postal Code</label>
                <input
                  style={styles.input}
                  value={dealerPostalCode}
                  onChange={(e) => setDealerPostalCode(e.target.value)}
                  placeholder="Postal code"
                />
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.eyebrow}>PROPOSAL DEFAULTS</div>

            <p style={styles.cardBody}>
              Choose whether to use Klondike recommended proposal language or
              create your own dealer-specific messaging.
            </p>

            <label style={{ ...styles.label, display: "flex", gap: 10 }}>
              <input
                type="checkbox"
                checked={useDefaultIntro}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setUseDefaultIntro(checked);
                  if (checked) setDealerIntroStatement(DEFAULT_INTRO);
                }}
              />
              Use Klondike recommended intro
            </label>

            <label style={styles.label}>Dealer Intro Statement</label>
            <textarea
              style={{
                ...styles.textarea,
                background: useDefaultIntro ? "#f1f5f9" : "#fff",
              }}
              value={useDefaultIntro ? DEFAULT_INTRO : dealerIntroStatement}
              onChange={(e) => setDealerIntroStatement(e.target.value)}
              disabled={useDefaultIntro}
            />

            <label
              style={{
                ...styles.label,
                display: "flex",
                gap: 10,
                marginTop: 16,
              }}
            >
              <input
                type="checkbox"
                checked={useDefaultClosing}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setUseDefaultClosing(checked);
                  if (checked) setDealerClosingStatement(DEFAULT_CLOSING);
                }}
              />
              Use Klondike recommended closing
            </label>

            <label style={styles.label}>Dealer Closing Statement</label>
            <textarea
              style={{
                ...styles.textarea,
                background: useDefaultClosing ? "#f1f5f9" : "#fff",
              }}
              value={useDefaultClosing ? DEFAULT_CLOSING : dealerClosingStatement}
              onChange={(e) => setDealerClosingStatement(e.target.value)}
              disabled={useDefaultClosing}
            />

            <button
              type="submit"
              disabled={dealerSaving}
              style={{ ...styles.primaryButton, marginTop: 16 }}
            >
              {dealerSaving ? "Saving..." : "Save Dealer Profile / Continue"}
            </button>

            {dealerSaveMessage && <p style={styles.message}>{dealerSaveMessage}</p>}
          </div>
        </form>

        <div style={styles.card}>
          <div style={styles.eyebrow}>TEAM ACCESS</div>
          <h3 style={styles.cardTitle}>Request Manager / Rep Access</h3>
          <p style={styles.cardBody}>
            Add the people who should receive access to this dealer workspace.
            Klondike Admin approval is required before access is granted.
          </p>

          <form onSubmit={handleAccessRequest} style={styles.form}>
            <div style={styles.grid3}>
              <input
                style={styles.input}
                value={requestName}
                onChange={(e) => setRequestName(e.target.value)}
                placeholder="Full name"
              />

              <input
                style={styles.input}
                type="email"
                value={requestEmail}
                onChange={(e) => setRequestEmail(e.target.value)}
                placeholder="user@dealer.com"
              />

              <select
                style={styles.input}
                value={requestRole}
                onChange={(e) => setRequestRole(e.target.value)}
              >
                <option value="manager">Manager</option>
                <option value="rep">Rep</option>
              </select>
           {true && (
  <div style={{ gridColumn: "1 / -1" }}>
    <label style={styles.label}>Assign Manager Optional</label>

    <select
      style={styles.input}
      value={requestManagerId}
      onChange={(e) => setRequestManagerId(e.target.value)}
    >
      <option value="">No manager / Dealer Admin manages directly</option>

      {allUsers
  .filter((user) => user.role === "manager")
  .map((manager) => (
          <option key={manager.id} value={manager.id}>
            {manager.full_name || manager.email || "Manager"}
          </option>
        ))}
    </select>

    <div style={styles.listMeta}>
      Optional. Small dealers can invite reps without assigning a manager.
    </div>
  </div>
)}
            </div>

            <textarea
              style={styles.textarea}
              value={requestReason}
              onChange={(e) => setRequestReason(e.target.value)}
              placeholder="Why does this person need access?"
            />

            <button
              type="submit"
              disabled={requestLoading}
              style={styles.primaryButton}
            >
              {requestLoading ? "Submitting..." : "Add Additional User Request"}
            </button>

            <button
              type="button"
              onClick={handleFinishDealerEnrollment}
              style={{
                ...styles.primaryButton,
                marginTop: 12,
              }}
            >
              Finish Enrollment / Go to Dealer Dashboard
            </button>
          </form>

          {requestMessage && <p style={styles.message}>{requestMessage}</p>}
        </div>
      </>
    )}
  </div>
);
  const renderManagerView = () => (
    <div style={styles.grid24}>
      <div style={styles.heroCard}>
        <div style={styles.eyebrow}>MANAGER</div>
        <h2 style={styles.heroTitle}>
          {activeMembership?.organization?.name || "Dealer"} Manager Dashboard
        </h2>
        <p style={styles.heroText}>
          View your dealer activity and manage your assigned team.
        </p>
      </div>

      <div style={styles.grid3}>
        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>My Organization</div>
          <div style={styles.summaryValue}>
            {activeMembership?.organization?.name || "—"}
          </div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>My Role</div>
          <div style={styles.summaryValue}>Manager</div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Assigned Reps</div>
          <div style={styles.summaryValue}>{teamAssignments.length}</div>
        </div>
      </div>
    </div>
  );
  function DealerPortalShell({ activeMembership, activeTab, setActiveTab }) {
    const role = activeMembership?.role || "";
    const orgName = activeMembership?.organization?.name || "Dealer";

    const isRep = role === "rep";
    const isManager = role === "manager";
    const isDealerAdmin = role === "dealer_admin";
        const [dealerActiveTab, setDealerActiveTab] = React.useState(
      isRep ? activeTab || "quote" : "dashboard"
    );
    const [managerTab, setManagerTab] = useState("dashboard");
    const [quoteStep, setQuoteStep] = React.useState(1);
    const [quoteItems, setQuoteItems] = React.useState([]);
  
    const [pricingMap, setPricingMap] = React.useState({});
    const [proposalPreviewItems, setProposalPreviewItems] = React.useState([]);
    const [proposalResponses, setProposalResponses] = React.useState([]);
    const [selectedResponse, setSelectedResponse] = React.useState(null);
    const [activePipelineStage, setActivePipelineStage] = React.useState(null);
    const [pipeline, setPipeline] = React.useState({
  awaiting: [],
  reviewed: [],
  approved: [],
  followUp: [],
});
    const [repSnapshot, setRepSnapshot] = React.useState({
  quotes: 0,
  proposalsSent: 0,
  responses: 0,
  approvedRevenue: 0,
  approvalRate: 0,
});

const [leaderboard, setLeaderboard] = React.useState([]);
  React.useEffect(() => {
  const loadResponses = async () => {
    const { data: responses, error } = await supabase
      .from("proposal_responses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return;

    const quoteIds = [...new Set((responses || []).map((r) => r.quote_id))];

    const { data: quotes } = await supabase
      .from("quotes")
      .select("id, customer_name, customer_email")
      .in("id", quoteIds);

    const quoteMap = {};
    (quotes || []).forEach((q) => {
      quoteMap[q.id] = q;
    });

    setProposalResponses(
      (responses || []).map((res) => ({
        ...res,
        quote: quoteMap[res.quote_id] || null,
      }))
    );
  };

  loadResponses();
}, []);
React.useEffect(() => {
const loadDashboardMetrics = async () => {
  if (!activeMembership?.organization_id) return;

  const { data: quotes } = await supabase
    .from("quotes")
    .select("*")
    .eq("organization_id", activeMembership.organization_id);

  const { data: responses } = await supabase
    .from("proposal_responses")
    .select("*")
    .order("created_at", { ascending: false });

  const orgQuotes = quotes || [];
  const orgQuoteIds = orgQuotes.map((q) => q.id);

  const orgResponses = (responses || []).filter((r) =>
    orgQuoteIds.includes(r.quote_id)
  );

    const myEmail = session?.user?.email;

  const assignedRepProfileIds = (teamAssignments || [])
    .filter(
      (assignment) =>
        assignment.manager_profile_id === session?.user?.id ||
        assignment.manager_user_id === session?.user?.id
    )
    .map((assignment) => assignment.rep_profile_id)
    .filter(Boolean);

  const assignedRepEmails = (repProfiles || [])
    .filter(
      (rep) =>
        assignedRepProfileIds.includes(rep.id) ||
        assignedRepProfileIds.includes(rep.user_id)
    )
    .map((rep) => String(rep.email || "").toLowerCase())
    .filter(Boolean);

  const myQuotesForMetrics = isManager
    ? orgQuotes.filter((q) => {
        const quoteRepEmail = String(q.rep_email || "").toLowerCase();

        return (
          assignedRepProfileIds.includes(q.user_id) ||
          assignedRepEmails.includes(quoteRepEmail)
        );
      })
    : orgQuotes.filter(
        (q) => q.user_id === session?.user?.id || q.rep_email === myEmail
      );

  const myQuoteIds = myQuotesForMetrics.map((q) => q.id);

  const myResponses = orgResponses.filter((r) =>
    myQuoteIds.includes(r.quote_id)
  );

  const myResponseRows = myResponses.flatMap(
    (r) => r.decision_data?.responses || []
  );

  const myApproved = myResponseRows.filter(
    (row) => row.decision === "approved"
  );

  const myDeclined = myResponseRows.filter(
    (row) => row.decision === "declined"
  );

  const approvedRevenue = myApproved.reduce(
    (sum, row) => sum + Number(row.price || 0),
    0
  );

  setRepSnapshot({
    quotes: myQuotesForMetrics.length,
    proposalsSent: myQuotesForMetrics.filter((q) => q.rep_signature || q.rep_email)
      .length,
    responses: myResponses.length,
    approvedRevenue,
    approvalRate:
      myApproved.length + myDeclined.length > 0
        ? Math.round(
            (myApproved.length / (myApproved.length + myDeclined.length)) *
              100
          )
        : 0,
  });

  const repProfileByEmail = {};

  (repProfiles || []).forEach((rep) => {
    if (rep.email) {
      repProfileByEmail[String(rep.email).toLowerCase()] = `${
        rep.first_name || ""
      } ${rep.last_name || ""}`.trim();
    }
  });

  const getRepDisplayName = (quoteRecord) => {
    const email = String(quoteRecord?.rep_email || "").toLowerCase();
    const profileName = repProfileByEmail[email];

    const fallback =
      quoteRecord?.rep_name ||
      profileName ||
      quoteRecord?.rep_email ||
      "Unknown Rep";

    const looksLikeUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        String(fallback)
      );

    return looksLikeUuid ? "Unknown Rep" : fallback;
  };

  const repMap = {};

  orgQuotes.forEach((q) => {
    const repName = getRepDisplayName(q);

    if (!repMap[repName]) {
      repMap[repName] = {
        name: repName,
        proposals: 0,
        approved: 0,
        declined: 0,
        revenue: 0,
      };
    }

    repMap[repName].proposals += 1;
  });

  orgResponses.forEach((res) => {
    const quoteRecord = orgQuotes.find((q) => q.id === res.quote_id);
    if (!quoteRecord) return;

    const repName = getRepDisplayName(quoteRecord);

    if (!repMap[repName]) {
      repMap[repName] = {
        name: repName,
        proposals: 0,
        approved: 0,
        declined: 0,
        revenue: 0,
      };
    }

    const rows = res.decision_data?.responses || [];

    rows.forEach((row) => {
      if (row.decision === "approved") {
        repMap[repName].approved += 1;
        repMap[repName].revenue += Number(row.price || 0);
      }

      if (row.decision === "declined") {
        repMap[repName].declined += 1;
      }
    });
  });

  const sorted = Object.values(repMap)
    .map((rep) => ({
      ...rep,
      approvalRate:
        rep.approved + rep.declined > 0
          ? Math.round((rep.approved / (rep.approved + rep.declined)) * 100)
          : 0,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  setLeaderboard(sorted);

  const awaiting = myQuotesForMetrics.filter(
    (q) => !q.review_status || q.review_status === "open"
  );

  const reviewed = myResponses;

  const approvedDeals = myResponses.filter((res) =>
    (res.decision_data?.responses || []).some(
      (r) => r.decision === "approved"
    )
  );

  const needsFollowUp = myResponses.filter((res) =>
    (res.decision_data?.responses || []).some(
      (r) => r.decision === "declined"
    )
  );

  setPipeline({
    awaiting,
    reviewed,
    approved: approvedDeals,
    followUp: needsFollowUp,
  });
};

loadDashboardMetrics();
},[
  activeMembership?.organization_id,
  session?.user?.id,
  session?.user?.email,
  repProfiles,
  teamAssignments,
  isManager,
]);
    const [myQuotes, setMyQuotes] = React.useState([]);
    const [currentQuote, setCurrentQuote] = React.useState(null);
    React.useEffect(() => {
  const loadMyQuotes = async () => {
    if (!session?.user?.id || !activeMembership?.organization_id) return;

    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("organization_id", activeMembership.organization_id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Load quotes error:", error.message);
      return;
    }

    setMyQuotes(data || []);
  };

  loadMyQuotes();
}, [session?.user?.id, activeMembership?.organization_id]);
const [crossSearch, setCrossSearch] = useState("");
const [crossReferenceResult, setCrossReferenceResult] = useState(null);
const [crossCatalogMap, setCrossCatalogMap] = React.useState({});
const [selectedPackage, setSelectedPackage] = React.useState("");
    const labelScanInputRef = React.useRef(null);
    const scannedLabelTextAreaRef = React.useRef(null);
    const scannedLabelBlobRef = React.useRef(null);
    const [scannedLabelImage, setScannedLabelImage] = React.useState(null);
    const [scannedLabelPreview, setScannedLabelPreview] = React.useState(null);
    const [scannedLabelMessage, setScannedLabelMessage] = React.useState("");
    const [scannedLabelSource, setScannedLabelSource] = React.useState("generic");
    const [scannedLabelOcrLoading, setScannedLabelOcrLoading] =
      React.useState(false);
    const [scannedLabelExtractedText, setScannedLabelExtractedText] =
      React.useState("");
    const [scannedLabelConfidence, setScannedLabelConfidence] =
      React.useState("");
    const [scannedLabelDetectedBrand, setScannedLabelDetectedBrand] =
      React.useState("");
    const [scannedLabelDetectedViscosity, setScannedLabelDetectedViscosity] =
      React.useState("");
    React.useEffect(() => {
      return () => {
        if (scannedLabelBlobRef.current) {
          URL.revokeObjectURL(scannedLabelBlobRef.current);
          scannedLabelBlobRef.current = null;
        }
      };
    }, []);

    const clearScannedLabel = React.useCallback(() => {
      if (scannedLabelBlobRef.current) {
        URL.revokeObjectURL(scannedLabelBlobRef.current);
        scannedLabelBlobRef.current = null;
      }
      setScannedLabelPreview(null);
      setScannedLabelImage(null);
      setScannedLabelMessage("");
      setScannedLabelSource("generic");
      setScannedLabelOcrLoading(false);
      setScannedLabelExtractedText("");
      setScannedLabelConfidence("");
      setScannedLabelDetectedBrand("");
      setScannedLabelDetectedViscosity("");
    }, []);

    const handleOpenLabelScan = React.useCallback((source = "generic") => {
      setScannedLabelSource(source);
      labelScanInputRef.current?.click();
    }, []);

    const handleLabelScanFileChange = React.useCallback((e) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file || !String(file.type || "").startsWith("image/")) {
        return;
      }
      if (scannedLabelBlobRef.current) {
        URL.revokeObjectURL(scannedLabelBlobRef.current);
      }
      const url = URL.createObjectURL(file);
      const scanSource = scannedLabelSource;
      scannedLabelBlobRef.current = url;
      setScannedLabelPreview(url);
      setScannedLabelImage(file);
      setScannedLabelExtractedText("");
      setScannedLabelOcrLoading(false);
      setScannedLabelConfidence("");
      setScannedLabelDetectedBrand("");
      setScannedLabelDetectedViscosity("");
      setScannedLabelMessage(
        "Image captured. Review the detected label text and confirm the Klondike match."
      );
      if (scanSource === "step2") {
        setScannedLabelOcrLoading(true);
        setScannedLabelMessage("Analyzing product label...");
        void (async () => {
          try {
            const { text, confidence, brand, viscosity } =
              await extractLabelTextFromImage(file);
            const detectedText = String(text || "").trim();
            const detectedBrand = String(brand || "").trim();
            const detectedViscosity =
              String(viscosity || "").trim() || extractViscosityFromText(detectedText);
            const normalizedConfidence = String(confidence || "")
              .toLowerCase()
              .trim();
            const confidenceValue =
              normalizedConfidence === "high" ||
              normalizedConfidence === "medium" ||
              normalizedConfidence === "low"
                ? normalizedConfidence
                : detectedText
                ? "low"
                : "";
            setScannedLabelConfidence(confidenceValue);
            setScannedLabelDetectedBrand(detectedBrand);
            setScannedLabelDetectedViscosity(detectedViscosity);
            setScannedLabelExtractedText(detectedText);
            if (detectedText) {
              setCompetitor(detectedText);
              setCrossSearch(detectedText);
              setKlondike("");
              setPackageSize("");
              setSelectedProduct(null);
              setQuoteMessage("");
              const normalizedCrossoverText =
                normalizeOcrCrossoverText(detectedText);
              const matchResult = await quickCrossToQuote(
                normalizedCrossoverText || detectedText,
                "No confident match found. Please refine the detected product text or search manually."
              );
              void logOcrScanEvent({
                raw_ocr_text: detectedText,
                normalized_search_text: normalizedCrossoverText || detectedText,
                detected_brand: detectedBrand || null,
                detected_viscosity: detectedViscosity || null,
                confidence: confidenceValue || null,
                matched_klondike_product:
                  matchResult?.matchedKlondikeProduct || null,
                match_success: Boolean(matchResult?.matchSuccess),
                image_source_type: "step2_scan",
              });
            } else {
              setQuoteMessage("");
              setScannedLabelMessage(
                `${OCR_FAILURE_RECOVERY_MESSAGE} ${OCR_FAILURE_RECOVERY_GUIDANCE}`
              );
            }
            if (detectedText) {
              const confidenceMessage =
                confidenceValue === "high"
                  ? "High-confidence product match detected."
                  : confidenceValue === "medium"
                  ? "Review detected product before confirming."
                  : "Low-confidence label detection. Please verify product text manually.";
              setScannedLabelMessage(confidenceMessage);
            }
          } finally {
            setScannedLabelOcrLoading(false);
          }
        })();
      }
    }, [scannedLabelSource]);

    const [companyName, setCompanyName] = React.useState("");
    const [contactName, setContactName] = React.useState("");
    const [quoteContactEmail, setQuoteContactEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [city, setCity] = React.useState("");
    const [province, setProvince] = React.useState("");
    const [postalCode, setPostalCode] = React.useState("");
    const [industry, setIndustry] = React.useState("");
    const [subIndustry, setSubIndustry] = React.useState("");
    const [segment, setSegment] = React.useState("");
const [signature, setSignature] = React.useState(null);
const canvasRef = React.useRef(null);
const [isSigning, setIsSigning] = React.useState(false);
    const [competitor, setCompetitor] = React.useState("");
    const [quickMatches, setQuickMatches] = React.useState([]);
const [quickCrossLoading, setQuickCrossLoading] = React.useState(false);
    const [klondike, setKlondike] = React.useState("");
    const [tier, setTier] = React.useState("Good");
    const [equipmentType, setEquipmentType] = React.useState("");
    const [packageSize, setPackageSize] = React.useState("");
    const [quoteSearchResults, setQuoteSearchResults] = React.useState([]);
    const [selectedProduct, setSelectedProduct] = React.useState(null);

    const handleExtractLabelText = React.useCallback(async () => {
      if (!scannedLabelImage || scannedLabelOcrLoading) return;
      setScannedLabelOcrLoading(true);
      try {
        const { text, confidence, brand, viscosity } =
          await extractLabelTextFromImage(scannedLabelImage);
        const detectedText = String(text || "").trim();
        const detectedBrand = String(brand || "").trim();
        const detectedViscosity =
          String(viscosity || "").trim() || extractViscosityFromText(detectedText);
        const normalizedConfidence = String(confidence || "")
          .toLowerCase()
          .trim();
        const confidenceValue =
          normalizedConfidence === "high" ||
          normalizedConfidence === "medium" ||
          normalizedConfidence === "low"
            ? normalizedConfidence
            : detectedText
            ? "low"
            : "";
        setScannedLabelConfidence(confidenceValue);
        setScannedLabelDetectedBrand(detectedBrand);
        setScannedLabelDetectedViscosity(detectedViscosity);
        setScannedLabelExtractedText(detectedText);
        if (!detectedText) {
          setScannedLabelMessage(
            `${OCR_FAILURE_RECOVERY_MESSAGE} ${OCR_FAILURE_RECOVERY_GUIDANCE}`
          );
        } else {
          const confidenceMessage =
            confidenceValue === "high"
              ? "High-confidence product match detected."
              : confidenceValue === "medium"
              ? "Review detected product before confirming."
              : "Low-confidence label detection. Please verify product text manually.";
          setScannedLabelMessage(confidenceMessage);
        }
      } finally {
        setScannedLabelOcrLoading(false);
      }
    }, [scannedLabelImage, scannedLabelOcrLoading]);

    const handleUseTextForCrossReference = React.useCallback(async () => {
      const value = String(scannedLabelExtractedText || "").trim();
      if (!value) {
        setScannedLabelMessage(
          "Enter detected product text before running cross-reference."
        );
        return;
      }
      const normalizedCrossoverText = normalizeOcrCrossoverText(value);
      setCompetitor(value);
      setCrossSearch(value);
      setSelectedPackage("");
      setCrossReferenceResult(null);
      setCrossCatalogMap({});
      setKlondike("");
      setPackageSize("");
      setSelectedProduct(null);
      setQuoteMessage("");
      setQuoteStep(2);
      const matchResult = await quickCrossToQuote(
        normalizedCrossoverText || value,
        "No confident match found. Please refine the detected product text or search manually."
      );
      void logOcrScanEvent({
        raw_ocr_text: value,
        normalized_search_text: normalizedCrossoverText || value,
        detected_brand: scannedLabelDetectedBrand || null,
        detected_viscosity:
          scannedLabelDetectedViscosity || extractViscosityFromText(value) || null,
        confidence: scannedLabelConfidence || null,
        matched_klondike_product: matchResult?.matchedKlondikeProduct || null,
        match_success: Boolean(matchResult?.matchSuccess),
        image_source_type: "manual_edit",
      });
    }, [
      scannedLabelExtractedText,
      scannedLabelDetectedBrand,
      scannedLabelDetectedViscosity,
      scannedLabelConfidence,
    ]);

    const [proposalDecisions, setProposalDecisions] = React.useState({});
const [proposalFeedback, setProposalFeedback] = React.useState({});
    const [repProposalResponseSnapshot, setRepProposalResponseSnapshot] =
      React.useState(null);
    React.useEffect(() => {
      if (currentQuote?.id != null) {
        setRepProposalResponseSnapshot(null);
      }
    }, [currentQuote?.id]);
    const [quoteSaving, setQuoteSaving] = React.useState(false);
    const [quoteMessage, setQuoteMessage] = React.useState("");
    const [useFloorPrice, setUseFloorPrice] = React.useState(false);
    const [equipmentItems, setEquipmentItems] = React.useState([]);

const EQUIPMENT_OPTIONS = [
  "Drum Pump",
  "Tote Pump",
  "Drum Caddy",
  "EZEKEG Rack",
  "EZEBOX Rack",
];
   
    React.useEffect(() => {
      const loadPricing = async () => {
        if (!activeMembership?.organization_id) return;

const { data, error } = await supabase
  .from("product_catalog")
  .select("*")
  .eq("is_active", true);

        if (error) {
          console.error("Pricing load error:", error.message);
          return;
        }
console.log("Loaded product catalog records:", data?.length || 0);
console.log("Sample product catalog item:", data?.[0]);
        const map = {};

(data || []).forEach((item) => {
  const key = `${item.product_name.toLowerCase()}__${item.package_size.toLowerCase()}`;
  map[key] = item;
});

setPricingMap(map);
      };

      loadPricing();
    }, [activeMembership]);

    const industries = [
      "Construction",
      "Agriculture",
      "Transportation",
      "Industrial",
      "Mining",
      "Forestry",
      "Marine",
      "Automotive",
      "Manufacturing",
    ];

    const subIndustries = {
      Construction: ["Excavation", "Heavy Equipment", "Material Handling"],
      Agriculture: ["Farming", "Harvesting", "Equipment Maintenance"],
      Transportation: ["Trucking", "Fleet", "Long Haul"],
      Industrial: ["Plant Maintenance", "General Service"],
      Mining: ["Surface", "Underground"],
      Forestry: ["Logging", "Equipment Service"],
      Marine: ["Commercial Marine"],
      Automotive: ["Repair", "Dealership"],
      Manufacturing: ["Production", "Assembly"],
    };

    const segments = [
      "Heavy Duty",
      "Commercial",
      "Industrial",
      "Off-Highway",
      "Fleet",
      "Municipal",
      "Agriculture",
      "Retail Service",
    ];

    const packageOptions = [
      "1 Gallon Jug",
      "5 Gallon Pail",
      "5 Gallon EZE BOX",
      "14 Gallon EZE KEG",
      "55 Gallon Drum",
      "275 Gallon Tote",
    ];

    const tabs = isRep
      ? [
          { id: "dashboard", label: "Dashboard" },
          { id: "quote", label: "Start New Quote" },
          { id: "cross", label: "Cross Reference" },
          { id: "library", label: "Quote / Proposal Library" },
          { id: "pds", label: "PDS Library" },
          { id: "proposal_view", label: "Proposal Viewer (Demo)" },
        ]
            : isManager
      ? [
          { id: "dashboard", label: "Dashboard" },
          { id: "team", label: "Team" },
          { id: "request", label: "Add Users" },
        ]
      : [
          { id: "dashboard", label: "Dashboard" },
          { id: "company", label: "Company Performance" },
          { id: "team", label: "Team Overview" },
          { id: "request", label: "Request Access" },
        ];
const getTieredKlondikeProduct = (baseProduct, selectedTier) => {
  const product = String(baseProduct || "").toLowerCase();
  const tierName = String(selectedTier || "").toLowerCase();

  if (product.includes("15w-40")) {
    if (tierName === "good") {
      return "SAE 15W-40 CK-4 Professional Formula Heavy Duty Engine Oil";
    }

    if (tierName === "better") {
      return "SAE 15W-40 CK-4 Advanced Formula Heavy Duty Engine Oil";
    }

    if (tierName === "best") {
      return "SAE 15W-40 CK-4 Full Synthetic Heavy Duty Engine Oil";
    }
  }
  return baseProduct;
};
  const getPriceForItem = (item) => {
  const key = `${String(
    item.catalogProductName || item.klondike || ""
  ).toLowerCase()}__${String(item.packageSize || "").toLowerCase()}`;

  return pricingMap[key];
};
    function normalizeText(str) {
      return (str || "")
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .trim();
    }

    function extractViscosity(str) {
      const match = str.match(/\b\d{1,2}w-\d{1,2}\b/i);
      return match ? match[0].toLowerCase() : null;
    }

    function extractTier(str) {
      const lower = (str || "").toLowerCase();

      if (lower.includes("full synthetic")) return "Best";
      if (lower.includes("advanced")) return "Better";
      if (lower.includes("professional")) return "Good";

      return null;
    }

    function resolvePricingMatch(klondikeName, pricingMap) {
      if (!klondikeName || !pricingMap) return null;

      const normalizedTarget = normalizeText(klondikeName);
      const targetViscosity = extractViscosity(klondikeName);
      const targetTier = extractTier(klondikeName);

      const entries = Object.entries(pricingMap);

      // 1. Try exact match
      for (let [key, item] of entries) {
        if (normalizeText(key).includes(normalizedTarget)) {
          return item;
        }
      }

      // 2. Try viscosity + tier match
      for (let [key, item] of entries) {
        const keyLower = key.toLowerCase();

        if (
          targetViscosity &&
          keyLower.includes(targetViscosity) &&
          (!targetTier || keyLower.includes(targetTier.toLowerCase()))
        ) {
          return item;
        }
      }
      return null;
    }

    function getPdsLink(klondikeName) {
      if (!klondikeName) return null;

      const entry = PDS_MAP[klondikeName];
      return entry ? entry.url : null;
    }
  const getPackageStrategy = (pkg) => {
  if (!pkg) return null;

  const p = pkg.toLowerCase();

  if (p.includes("tote")) {
    return "Tote packaging is recommended for higher-volume lubricant use, helping reduce handling frequency, improve inventory efficiency, and support cleaner dispensing practices.";
  }

  if (p.includes("drum")) {
    return "Drum packaging provides a strong balance of volume efficiency and practical shop handling, making it a reliable choice for controlled lubricant dispensing.";
  }

  if (p.includes("pail")) {
    return "Pail packaging is ideal for lower-volume or multi-location use where portability, flexibility, and controlled handling are important.";
  }

  if (p.includes("ezebox") || p.includes("eze-box")) {
    return "EZEBOX packaging supports cleaner, more controlled dispensing while reducing open-container exposure and improving storage organization.";
  }

  if (p.includes("ezekeg") || p.includes("eze-keg")) {
    return "EZEKEG packaging provides a compact, clean dispensing format that improves handling efficiency and supports better lubricant control.";
  }

  if (p.includes("bulk")) {
    return "Bulk supply can support high-volume operations, but should be paired with proper filtration, clean transfer practices, and dedicated dispensing controls.";
  }

  return null;
};
const startDrawing = (e) => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  setIsSigning(true);
  ctx.beginPath();
  ctx.moveTo(
    e.nativeEvent.offsetX,
    e.nativeEvent.offsetY
  );
};

const draw = (e) => {
  if (!isSigning) return;

  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#0a2540";

  ctx.lineTo(
    e.nativeEvent.offsetX,
    e.nativeEvent.offsetY
  );
  ctx.stroke();
};

const stopDrawing = () => {
  setIsSigning(false);

  const canvas = canvasRef.current;
  const dataUrl = canvas.toDataURL();
  setSignature(dataUrl);
};

const clearSignature = () => {
  const canvas = canvasRef.current;

  if (canvas) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  setSignature(null);
};

const getContaminationNote = (pkg) => {
  if (!pkg) return null;

  const p = pkg.toLowerCase();

  if (p.includes("bulk")) {
    return "Traditional bulk systems can introduce contamination through transfer points, shared hoses, open vents, and poor tank housekeeping. Proper filtration, sealed storage, and dedicated dispensing equipment are recommended.";
  }

  if (p.includes("tote") || p.includes("drum")) {
    return "Reducing exposure to dust, moisture, and human handling is critical. Controlled dispensing from drums or totes helps preserve lubricant cleanliness and protect equipment life.";
  }

  if (p.includes("ezebox") || p.includes("eze-box") || p.includes("ezekeg") || p.includes("eze-keg")) {
    return "Closed or semi-closed packaging helps reduce contamination risk, improves workplace cleanliness, and supports better lubricant integrity from storage through dispensing.";
  }

  return null;
};
 const normalizeName = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[®™]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const normalize = (str) =>
  String(str || "")
    .toLowerCase()
    .replace(/[®™]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const findPds = (productName) => {
  if (!productName) return {};

  const normalized = normalize(productName);

  // 🔥 1. Exact key match
  if (PDS_MAP[productName]) {
    return PDS_MAP[productName];
  }

  // 🔥 2. Alias match (THIS IS THE KEY PART)
  for (const entry of Object.values(PDS_MAP)) {
    if (
      entry.aliases &&
      entry.aliases.some((alias) => normalize(alias) === normalized)
    ) {
      return entry;
    }
  }

  // 🔥 3. Optional debug
  console.warn("No PDS match for:", productName);

  return {};
};
 
  const getDisplayPrice = (priceData) => {
  const basePrice = Number(
    priceData?.account_price ??
    priceData?.accountPrice ??
    priceData?.resale_price ??
    priceData?.resalePrice ??
    priceData?.retail_price ??
    priceData?.retailPrice ??
    0
  );

  return useFloorPrice ? basePrice * 0.9 : basePrice;
};

   const formatMoney = (value) =>
  `$${Number(value || 0).toFixed(2)}`;

const getProposalItems = () => quoteItems;

const getQuoteTotal = () =>
  getProposalItems().reduce((sum, item) => {
    const basePrice = Number(item.price || item.resalePrice || 0);
    const finalPrice = useFloorPrice ? basePrice * 0.9 : basePrice;
    return sum + finalPrice;
  }, 0);

const getUpgradeReason = (tier) => {
  if (tier === "Good") {
    return "A reliable professional-grade recommendation for customers seeking proven protection and strong value.";
  }

  if (tier === "Better") {
    return "Recommended for improved wear protection, stronger oxidation stability, and better performance under demanding operating conditions.";
  }

  if (tier === "Best") {
    return "Recommended where maximum equipment protection, full synthetic performance, temperature stability, and extended service intervals are priorities.";
  }

  return "Recommended based on the customer's application, operating environment, and product requirements.";
};
const getRecommendationMessage = (item) => {
  const product = String(item.klondike || "").toLowerCase();

  if (product.includes("full synthetic")) {
    return "Selected to deliver maximum equipment protection, extended drain intervals, and consistent performance under high-load and high-temperature conditions. This option supports reduced downtime risk and improved long-term reliability.";
  }

  if (product.includes("synthetic blend")) {
    return "Recommended to improve wear protection, oxidation stability, and overall system performance compared to conventional products, while maintaining strong value and cost efficiency.";
  }

  if (product.includes("professional")) {
    return "A proven, reliable solution designed to meet standard equipment protection requirements while maintaining consistent performance across a wide range of operating conditions.";
  }

  return "Recommended based on your operating environment, equipment demands, and lubrication requirements to support reliable and efficient performance.";
};

const getEquipmentReason = (equipmentType) => {
  if (equipmentType === "Diesel Engines") return "Selected for diesel engine applications where soot control, wear protection, and reliable operation under load are priorities.";
  if (equipmentType === "Hydraulic Systems") return "Selected for hydraulic systems where clean operation, anti-wear protection, and consistent fluid performance are critical.";
  if (equipmentType === "Gearboxes") return "Selected for gear applications requiring film strength, load protection, and reliable lubrication under pressure.";
  if (equipmentType === "Grease Points") return "Selected for grease-lubricated components requiring adhesion, water resistance, and protection under load.";
  if (equipmentType === "Transmissions") return "Selected for transmission applications requiring smooth operation, friction control, and thermal stability.";
  if (equipmentType === "Mixed Fleet / Shop Use") return "Selected to simplify product selection across mixed equipment while supporting reliable lubrication performance.";
  return null;
};

const getPackageBenefit = (packageSize) => {
  const pkg = String(packageSize || "").toLowerCase();

  if (pkg.includes("tote")) {
    return "Tote packaging supports higher-volume use, improved inventory control, reduced handling, and cleaner dispensing versus smaller containers.";
  }

  if (pkg.includes("drum")) {
    return "Drum packaging is suited for steady product consumption while reducing per-unit handling compared to pails or cases.";
  }

  if (pkg.includes("pail")) {
    return "Pail packaging offers flexibility for lower-volume use, mobile service work, or locations without bulk dispensing equipment.";
  }

  if (pkg.includes("case") || pkg.includes("tube")) {
    return "Case packaging supports controlled grease usage, easy distribution to technicians, and convenient storage.";
  }

  if (pkg.includes("bulk")) {
    return "Traditional bulk supply may improve cost efficiency and reduce packaging waste, but requires clean storage, contamination control, and disciplined handling practices.";
  }

  return null;
};

const getContaminationMessage = (packageSize) => {
  const pkg = String(packageSize || "").toLowerCase();

  if (pkg.includes("bulk") || pkg.includes("tote") || pkg.includes("drum")) {
    return "For bulk-style handling, clean transfer practices are important. Dedicated pumps, sealed storage, clean breathers, and clearly labeled dispensing equipment help reduce contamination risk.";
  }

  return null;
};
  
    const handleSelectProduct = (product) => {
      setSelectedProduct(product);
      setCompetitor(product.name);
      setKlondike(product.klondike);
      setQuoteSearchResults([]);
      setQuoteStep(2);
      setQuoteMessage("");
    };
const normalizePackage = (pkg) =>
  String(pkg || "").toLowerCase().trim();
const getPackageOptionsForProduct = (productName) => {
  const target = String(productName || "").toLowerCase().trim();

  if (!target) return [];

  return Object.keys(pricingMap)
    .filter((key) => key.startsWith(target + "__"))
    .map((key) => key.split("__")[1])
    .filter(Boolean);
};

const handleAddProduct = () => {
  if (!selectedProduct) {
    setQuoteMessage("Select a competitor product first.");
    return;
  }

  if (!klondike || !packageSize) {
    setQuoteMessage("Please select a Klondike product and package size.");
    return;
  }

 const key = `${String(klondike || "").toLowerCase().trim()}__${String(
  packageSize || ""
).toLowerCase().trim()}`;

const catalogItem = pricingMap[key];
console.log("CATALOG ITEM USED FOR QUOTE:", catalogItem);

  if (!catalogItem) {
    setQuoteMessage("Please select a valid product and package size.");
    return;
  }

  const itemPrice =
    catalogItem.account_price ??
    catalogItem.accountPrice ??
    catalogItem.resale_price ??
    catalogItem.resalePrice ??
    catalogItem.retail_price ??
    catalogItem.retailPrice ??
    0;

  setQuoteItems((prev) => [
    ...prev,
    {
      competitor: selectedProduct.name,
      brand: selectedProduct.brand || "",
      category: selectedProduct.category || "",
      klondike,
      catalogProductName: klondike,
      tier,
      packageSize: catalogItem.package_size || packageSize || "",
partNumber: catalogItem.part_number || "",
      dealerCost:
        catalogItem.dealer_cost ||
        catalogItem.dealerCost ||
        0,
      resalePrice: itemPrice,
      price: itemPrice,
    },
  ]);

  setCompetitor("");
  setKlondike("");
  setSelectedProduct(null);
  setQuoteSearchResults([]);
  setPackageSize("");
  setQuoteMessage("");
  setQuoteStep(2);
};
const cleanTier = (value, productName = "") => {
  const text = `${value || ""} ${productName || ""}`.toLowerCase();

  if (text.includes("full synthetic")) return "Best";
  if (text.includes("synthetic blend")) return "Better";
  if (text.includes("advanced")) return "Better";
  if (text.includes("professional")) return "Good";

  return "Good";
};
const quickCrossToQuote = async (
  searchOverride,
  noMatchMessage = "No Klondike match found."
) => {
  const searchValue = String((searchOverride ?? competitor) || "").trim();
  if (!searchValue) {
    return { matchSuccess: false, matchedKlondikeProduct: null };
  }

  try {
    const { data, error } = await supabase
      .from("cross_references")
      .select("*")
      .or(
        `search_text.ilike.%${searchValue}%,competitor_product.ilike.%${searchValue}%,competitor_brand.ilike.%${searchValue}%`
      )
      .limit(1);

    if (error) {
      console.error("Quick cross-reference error:", error.message);
      setQuoteMessage("Cross reference search failed.");
      return { matchSuccess: false, matchedKlondikeProduct: null };
    }

    const row = data?.[0];

    if (!row?.klondike_product) {
      setKlondike("");
      setPackageSize("");
      setSelectedProduct(null);
      setQuoteMessage(noMatchMessage);
      return { matchSuccess: false, matchedKlondikeProduct: null };
    }

    const competitorName = `${row.competitor_brand || ""} ${
      row.competitor_product || ""
    }`.trim();

    setCompetitor(competitorName);
    setCrossSearch(competitorName);
    setKlondike(row.klondike_product);
   setTier(cleanTier(row.confidence, row.klondike_product));
    setPackageSize("");
    setQuoteMessage("");

    setSelectedProduct({
      brand: row.competitor_brand || "",
      name: competitorName,
      category: row.category || "",
      klondike: row.klondike_product,
     tier: cleanTier(row.confidence, row.klondike_product),
    });

    const { data: catalogRows, error: catalogError } = await supabase
      .from("product_catalog")
      .select("*")
      .eq("product_name", row.klondike_product)
      .eq("is_active", true)
      .order("package_size", { ascending: true });

    if (catalogError) {
      console.error("Quick catalog lookup error:", catalogError.message);
      return;
    }

    if (catalogRows?.length) {
      setPackageSize(catalogRows[0].package_size || "");
    }
    return {
      matchSuccess: true,
      matchedKlondikeProduct: row.klondike_product || null,
    };
  } catch (err) {
    console.error("quickCrossToQuote failed:", err);
    setQuoteMessage("Quick cross-reference failed.");
    return { matchSuccess: false, matchedKlondikeProduct: null };
  }
};
React.useEffect(() => {
  const searchValue = String(competitor || "").trim();

  if (searchValue.length < 3) {
    setQuickMatches([]);
    return;
  }

  const timer = setTimeout(async () => {
    setQuickCrossLoading(true);

    const { data, error } = await supabase
      .from("cross_references")
      .select("*")
      .or(
        `search_text.ilike.%${searchValue}%,competitor_product.ilike.%${searchValue}%,competitor_brand.ilike.%${searchValue}%`
      )
      .limit(8);

    setQuickCrossLoading(false);

    if (error) {
      console.error("Quick match search error:", error.message);
      setQuickMatches([]);
      return;
    }

    setQuickMatches(data || []);
    if (data && data.length > 0) {
  const first = data[0];

  const competitorName = `${first.competitor_brand || ""} ${first.competitor_product || ""}`.trim();

  setKlondike(first.klondike_product || "");
  setTier(first.confidence || "Good");

  setSelectedProduct({
    brand: first.competitor_brand || "",
    name: competitorName,
    category: first.category || "",
    klondike: first.klondike_product || "",
    tier: first.confidence || "Good",
  });
}
  }, 250);

  return () => clearTimeout(timer);
}, [competitor]);
const selectQuickCrossMatch = async (row) => {
  const competitorName = `${row.competitor_brand || ""} ${
    row.competitor_product || ""
  }`.trim();

  setCompetitor(competitorName);
  setCrossSearch(competitorName);
  setKlondike(row.klondike_product || "");
  setTier(cleanTier(row.confidence, row.klondike_product));
  setPackageSize("");
  setQuickMatches([]);
  setQuoteMessage("");

  setSelectedProduct({
    brand: row.competitor_brand || "",
    name: competitorName,
    category: row.category || "",
    klondike: row.klondike_product || "",
   tier: cleanTier(row.confidence, row.klondike_product),
  });

  const { data: catalogRows, error } = await supabase
    .from("product_catalog")
    .select("*")
    .eq("product_name", row.klondike_product)
    .eq("is_active", true)
    .order("package_size", { ascending: true });

  if (error) {
    console.error("Catalog lookup error:", error.message);
    return;
  }

  if (catalogRows?.length) {
    setPackageSize(catalogRows[0].package_size || "");
  }
};
const handleCrossReferenceSearch = async () => {
  const search = crossSearch.trim();
  setSelectedPackage("");
setCrossCatalogMap({});

  if (!search) {
    setCrossReferenceResult(null);
    return;
  }

  const { data, error } = await supabase
    .from("cross_references")
    .select("*")
    .or(
      `search_text.ilike.%${search}%,competitor_product.ilike.%${search}%,competitor_brand.ilike.%${search}%`
    )
    .limit(10);

  if (error) {
    console.error("Cross reference search error:", error.message);
    setCrossReferenceResult({
      competitor: crossSearch,
      recommendations: [],
      error: error.message,
    });
    return;
  }
const recommendations = (data || []).map((row) => ({
  tier: cleanTier(row.confidence, row.klondike_product),
  product: row.klondike_product,
  competitorProduct: row.competitor_product,
  competitorBrand: row.competitor_brand,
  category: row.category,
  matchStatus: row.match_status,
}));

const productNames = [...new Set(recommendations.map((r) => r.product))];

const { data: catalogRows, error: catalogError } = await supabase
  .from("product_catalog")
  .select("*")
  .in("product_name", productNames);

if (catalogError) {
  console.error("Product catalog lookup error:", catalogError.message);
}

const catalogMap = {};
(catalogRows || []).forEach((row) => {
  if (!catalogMap[row.product_name]) catalogMap[row.product_name] = [];
  catalogMap[row.product_name].push(row);
});

setCrossCatalogMap(catalogMap);

setCrossReferenceResult({
  competitor: crossSearch,
  recommendations,
});
};
const handleDeleteQuote = async (quoteId) => {
  const confirmDelete = window.confirm("Delete this quote?");
  if (!confirmDelete) return;

  // delete child rows first
  await supabase.from("quote_items").delete().eq("quote_id", quoteId);

  // delete parent
  const { error } = await supabase.from("quotes").delete().eq("id", quoteId);

  if (error) {
    alert("Failed to delete quote.");
    console.error(error);
    return;
  }

  // update UI
  setMyQuotes((prev) => prev.filter((q) => q.id !== quoteId));
};
const handleOpenSavedQuote = async (quote) => {
  setRepProposalResponseSnapshot(null);
  setQuoteMessage("");
  const { data, error } = await supabase
    .from("quote_items")
    .select("*")
    .eq("quote_id", quote.id)
    .order("created_at", { ascending: true });

  if (error) {
    setQuoteMessage(error.message);
    return;
  }

  setCompanyName(quote.customer_name || "");
  setQuoteContactEmail(quote.customer_email || "");
  setIndustry(quote.industry || "");

  setQuoteItems(
    (data || []).map((item) => ({
      competitor: item.competitor_name || "",
      brand: "",
      category: item.category || "",
      klondike: item.klondike_product || item.product_name || "",
      catalogProductName: item.product_name || item.klondike_product || "",
      tier: "Good",
      packageSize: item.package || "",
      partNumber: item.part_number || "",
      resalePrice: item.unit_price || 0,
      price: item.unit_price || 0,
    }))
  );

  setDealerActiveTab("quote");
  setQuoteStep(3);
};
  const handleSaveQuote = async () => {
  setQuoteMessage("");

  if (!session?.user?.id || !activeMembership?.organization_id) {
    setQuoteMessage("Missing user or organization context.");
    return;
  }

  if (!companyName.trim()) {
    setQuoteMessage("Company name is required.");
    setQuoteStep(1);
    return;
  }

  if (quoteItems.length === 0) {
    setQuoteMessage("Add at least one product before saving.");
    setQuoteStep(2);
    return;
  }

  const quoteItemsSnapshot = [...quoteItems];

  setQuoteSaving(true);

  const { data: quote, error: quoteError } = await supabase
    .from("quotes")
    .insert({
  user_id: session.user.id,
  organization_id: activeMembership.organization_id,
  customer_name: companyName.trim(),
  customer_email: quoteContactEmail.trim() || null,
  industry: industry || null,
  status: "draft",
  review_token: crypto.randomUUID(),

  // 🔥 DEALER SNAPSHOT
  dealer_name:
    dealerProfile?.company_name ||
    activeMembership?.organization?.name ||
    "Your Dealer",

  dealer_phone: dealerProfile?.phone || null,
  dealer_website: dealerProfile?.website || null,
  dealer_logo_url: currentDealerLogoUrl || null,

  dealer_address: dealerProfile?.address || null,
  dealer_city: dealerProfile?.city || null,
  dealer_province_state: dealerProfile?.province_state || null,
  dealer_postal_code: dealerProfile?.postal_code || null,

  // 🔥 PROPOSAL TEXT SNAPSHOT
  intro_statement: dealerProfile?.intro_statement || null,
  closing_statement: dealerProfile?.closing_statement || null,
})
    .select("*")
    .single();

  if (quoteError) {
    setQuoteSaving(false);
    setQuoteMessage(quoteError.message);
    return;
  }

  const itemsToInsert = quoteItemsSnapshot.map((item) => {
    const basePrice = Number(item.price || item.resalePrice || 0);
    const finalPrice = useFloorPrice ? basePrice * 0.9 : basePrice;

    return {
      quote_id: quote.id,
      competitor_name: item.competitor,
      klondike_product: item.klondike,
      package: item.packageSize || null,
      part_number: item.partNumber || item.part_number || item.sku || null,
      quantity: 1,
      unit_price: finalPrice,
      total_price: finalPrice,
      product_name: item.klondike,
      category: item.category || null,
    };
  });

  const { error: itemsError } = await supabase
    .from("quote_items")
    .insert(itemsToInsert);

  setQuoteSaving(false);

  if (itemsError) {
    setQuoteMessage(itemsError.message);
    return;
  }
if (itemsError) {
  setQuoteMessage(itemsError.message);
  return;
}

if (equipmentItems.length > 0) {
  const equipmentToInsert = equipmentItems.map((item) => ({
    quote_id: quote.id,
    equipment_name: item.name,
    quantity: Number(item.qty || 1),
    unit_price: Number(item.price || 0),
    total_price: Number(item.price || 0) * Number(item.qty || 1),
  }));

  const { error: equipmentError } = await supabase
    .from("quote_equipment")
    .insert(equipmentToInsert);

  if (equipmentError) {
    setQuoteMessage(equipmentError.message);
    return;
  }
}
  setProposalPreviewItems(quoteItemsSnapshot);
  setCurrentQuote(quote);
  setMyQuotes((prev) => [quote, ...prev]);
  setQuoteMessage("Quote saved successfully.");
setDealerActiveTab("proposal_view");
};
const handleSendProposalToCustomer = async () => {
  if (!quoteContactEmail) {
    alert("Customer email is required before sending proposal.");
    return;
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quoteContactEmail);

if (!emailOk) {
  alert("Please enter a valid customer email address before sending.");
  return;
}

  let quoteForSend = currentQuote;

if (!quoteForSend) {
  const { data: latestQuote, error: latestQuoteError } = await supabase
    .from("quotes")
    .select("*")
    .eq("customer_name", companyName)
    .eq("customer_email", quoteContactEmail)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (latestQuoteError || !latestQuote) {
    alert("Could not find the saved quote. Please click Save & Continue to Proposal again.");
    return;
  }

  quoteForSend = latestQuote;
  setCurrentQuote(latestQuote);
}

const reviewLink = `${window.location.origin}/review/${quoteForSend.review_token}`;
await supabase
  .from("quotes")
  .update({
    rep_name:
      `${repFirstName || ""} ${repLastName || ""}`.trim() ||
      "Sales Representative",
    rep_email: repEmailAddress || session?.user?.email,
    rep_signature: signature || null,
  })
  .eq("review_token", quoteForSend.review_token);
  const { data, error } = await supabase.functions.invoke(
    "send-proposal-to-customer",
    {
      body: {
        customerEmail: quoteContactEmail,
        customerName: contactName || companyName,
        companyName,
        repName:
          `${repFirstName || ""} ${repLastName || ""}`.trim() ||
          "Sales Representative",
        repEmail: repEmailAddress || session?.user?.email,
        reviewLink,
      },
    }
  );

  if (error) {
    console.error("Send proposal error:", error);
    alert("Proposal email failed to send.");
    return;
  }

  console.log("Proposal sent:", data);
  alert("Proposal sent to customer.");
};
const handleSubmitProposalDecisions = async () => {
  const items = getProposalItems();

  const missingDecisions = items.filter((_, index) => !proposalDecisions[index]);

  if (items.length === 0) {
    alert("No proposal items found.");
    return;
  }

  if (missingDecisions.length > 0) {
    alert("Please approve or decline every product recommendation before submitting.");
    return;
  }

  const approved = items
    .map((item, index) => ({
      item,
      decision: proposalDecisions[index],
      feedback: proposalFeedback[index] || "",
    }))
    .filter((row) => row.decision === "approved");

  const declined = items
    .map((item, index) => ({
      item,
      decision: proposalDecisions[index],
      feedback: proposalFeedback[index] || "",
    }))
    .filter((row) => row.decision === "declined");

  console.log("PROPOSAL DECISIONS SUBMITTED:", {
    customer: companyName,
    customerEmail: quoteContactEmail,
    approved,
    declined,
  });

  const { data, error } = await supabase.functions.invoke(
  "send-proposal-reviewed-email",
  {
    body: {
      repEmail: repEmailAddress || session?.user?.email,
      repName:
        `${repFirstName || ""} ${repLastName || ""}`.trim() ||
        "Sales Representative",
      customerName: companyName,
      customerEmail: quoteContactEmail,
      approved: approved.map((row) => ({
        product: row.item.klondike,
        packageSize: row.item.packageSize,
        partNumber: row.item.partNumber,
        price: row.item.price || row.item.resalePrice || 0,
      })),
      declined: declined.map((row) => ({
        product: row.item.klondike,
        packageSize: row.item.packageSize,
        partNumber: row.item.partNumber,
        price: row.item.price || row.item.resalePrice || 0,
        feedback: row.feedback || "",
      })),
    },
  }
);

if (error) {
  console.error("Proposal reviewed email error:", error);
  alert("Proposal submitted, but email notification failed.");
  return;
}

console.log("Proposal reviewed email sent:", data);

alert(
  `Proposal submitted.\n\nApproved: ${approved.length}\nDeclined: ${declined.length}\n\nRep notification sent.`
);
};
const customerSubmittedResponses =
  repProposalResponseSnapshot?.decision_data?.responses || [];
const repProposalReadOnlyCustomerDecisions =
  customerSubmittedResponses.length > 0;

const PortalButton = ({ tab }) => {
  const active = dealerActiveTab === tab.id;

  return (
    <button
      type="button"
      onClick={() => {
  if (tab.id === "proposal_view" && quoteItems.length > 0) {
    setProposalPreviewItems([...quoteItems]);
  }

  if (tab.id === "proposal_view" && dealerActiveTab !== "proposal_view") {
    setRepProposalResponseSnapshot(null);
  }

  setDealerActiveTab(tab.id)
}}
      style={{
        ...styles.portalTabButton,
        ...(active ? styles.portalTabButtonActive : {}),
      }}
    >
      {tab.label}
    </button>
  );
};

return (
      <div style={styles.grid24}>
        <div style={styles.heroCard}>
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      {(dealerLogoUrl || dealerProfile?.logo_url) && (
        <img
          src={dealerLogoUrl || dealerProfile?.logo_url}
          alt="Dealer Logo"
          style={{
            width: 58,
            height: 58,
            objectFit: "contain",
            borderRadius: 12,
            background: "#fff",
            padding: 8,
          }}
        />
      )}

      <div>
        <div style={styles.eyebrow}>
          {isRep
            ? "REP SELLING WORKSPACE"
            : isManager
            ? "MANAGER PERFORMANCE CENTER"
            : "DEALER EXECUTIVE DASHBOARD"}
        </div>

        <h2 style={styles.heroTitle}>{orgName}</h2>

        <p style={styles.heroText}>
          {isRep
            ? "Build quotes, run cross references, manage proposals, and track selling activity."
            : isManager
            ? "Monitor direct report performance and team activity."
            : "Review company performance, team activity, and access requests."}
        </p>
      </div>
    </div>

    {isManager && <div>{renderRoleBadge("manager")}</div>}
    {isRep && <div>{renderRoleBadge("rep")}</div>}
  </div>
</div>

        <div style={styles.portalCommandBar}>
          {tabs.map((tab) => (
            <PortalButton key={tab.id} tab={tab} />
          ))}
        </div>

        {isRep && (
          <input
            ref={labelScanInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            aria-hidden="true"
            tabIndex={-1}
            onChange={handleLabelScanFileChange}
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clip: "rect(0,0,0,0)",
              whiteSpace: "nowrap",
              border: 0,
            }}
          />
        )}

        {isRep &&
          dealerActiveTab === "quote" &&
          quoteStep === 2 &&
          scannedLabelPreview &&
          scannedLabelImage && (
          <div
            className="kd-label-scan-preview"
            style={{
              marginTop: 6,
              marginBottom: 4,
              padding: "14px 16px 16px",
              borderRadius: 16,
              background:
                "linear-gradient(148deg, #0f172a 0%, #1e293b 55%, #0f172a 100%)",
              border: "1px solid rgba(246, 165, 49, 0.25)",
              boxShadow:
                "0 14px 32px rgba(15, 23, 42, 0.22), inset 0 1px 0 rgba(255,255,255,0.04)",
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              alignItems: "flex-start",
              maxWidth: "100%",
            }}
          >
            <div
              className="kd-label-scan-thumb-wrap"
              style={{
                flex: "0 0 auto",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid rgba(226,232,240,0.15)",
                background: "#020617",
              }}
            >
              <img
                src={scannedLabelPreview}
                alt=""
                className="kd-label-scan-thumb"
                style={{
                  display: "block",
                  width: 96,
                  height: 96,
                  objectFit: "cover",
                }}
              />
            </div>
            <div style={{ flex: "1 1 200px", minWidth: 0 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  color: "#94a3b8",
                  marginBottom: 6,
                  textTransform: "uppercase",
                }}
              >
                Label capture
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#e2e8f0",
                  marginBottom: 6,
                  wordBreak: "break-word",
                }}
              >
                {scannedLabelImage.name || "Captured image"}
              </div>
              <p style={{ margin: "0 0 12px", fontSize: 13, color: "#cbd5e1", lineHeight: 1.5 }}>
                {scannedLabelMessage}
              </p>
              <div className="kd-label-scan-actions" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <button
                  type="button"
                  style={{
                    ...styles.secondaryButton,
                    fontSize: 14,
                    padding: "10px 16px",
                    minHeight: 44,
                  }}
                  onClick={clearScannedLabel}
                  disabled={scannedLabelOcrLoading}
                >
                  Clear image
                </button>
                <button
                  type="button"
                  style={{
                    ...styles.primaryButton,
                    fontSize: 14,
                    padding: "10px 16px",
                    minHeight: 44,
                  }}
                  onClick={() => handleOpenLabelScan("step2")}
                  disabled={scannedLabelOcrLoading}
                >
                  Try Another Photo
                </button>
                <button
                  type="button"
                  style={{
                    ...styles.secondaryButton,
                    fontSize: 14,
                    padding: "10px 16px",
                    minHeight: 44,
                  }}
                  onClick={() => scannedLabelTextAreaRef.current?.focus()}
                  disabled={scannedLabelOcrLoading}
                >
                  Edit Product Text Manually
                </button>
                <button
                  type="button"
                  style={{
                    ...styles.primaryButton,
                    fontSize: 14,
                    padding: "10px 16px",
                    minHeight: 44,
                    opacity: scannedLabelOcrLoading ? 0.65 : 1,
                  }}
                  onClick={handleExtractLabelText}
                  disabled={scannedLabelOcrLoading}
                >
                  {scannedLabelOcrLoading ? "Extracting…" : "Extract Label Text"}
                </button>
              </div>
              {scannedLabelOcrLoading && (
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#fbbf24",
                  }}
                >
                  Analyzing product label...
                </div>
              )}
              {!!scannedLabelConfidence && (
                <div
                  style={{
                    marginTop: 10,
                    marginBottom: 6,
                    padding: "8px 10px",
                    borderRadius: 10,
                    fontSize: 12,
                    fontWeight: 700,
                    border:
                      scannedLabelConfidence === "high"
                        ? "1px solid rgba(34, 197, 94, 0.35)"
                        : scannedLabelConfidence === "low"
                        ? "1px solid rgba(245, 158, 11, 0.4)"
                        : "1px solid rgba(148, 163, 184, 0.35)",
                    background:
                      scannedLabelConfidence === "high"
                        ? "rgba(34, 197, 94, 0.16)"
                        : scannedLabelConfidence === "low"
                        ? "rgba(245, 158, 11, 0.18)"
                        : "rgba(148, 163, 184, 0.18)",
                    color:
                      scannedLabelConfidence === "high"
                        ? "#dcfce7"
                        : scannedLabelConfidence === "low"
                        ? "#fde68a"
                        : "#e2e8f0",
                  }}
                >
                  {scannedLabelConfidence === "high"
                    ? "High-confidence product match detected."
                    : scannedLabelConfidence === "medium"
                    ? "Review detected product before confirming."
                    : "Low-confidence label detection. Please verify product text manually."}
                </div>
              )}
              <div style={{ marginTop: 14, width: "100%" }}>
                <p style={{ margin: "0 0 10px", fontSize: 12, color: "#94a3b8" }}>
                  Review the detected product and confirm the Klondike match before adding to quote.
                </p>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 900,
                    letterSpacing: "0.08em",
                    color: "#94a3b8",
                    marginBottom: 8,
                    textTransform: "uppercase",
                  }}
                >
                  Detected Label Text
                </div>
                <textarea
                  ref={scannedLabelTextAreaRef}
                  className="kd-label-scan-textarea"
                  value={scannedLabelExtractedText}
                  onChange={(e) => setScannedLabelExtractedText(e.target.value)}
                  placeholder='Run "Extract Label Text" or type here…'
                  rows={4}
                  disabled={scannedLabelOcrLoading}
                  style={{
                    ...styles.textarea,
                    width: "100%",
                    minHeight: 124,
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    fontSize: 15,
                    background: "#0f172a",
                    color: "#f1f5f9",
                    border: "1px solid rgba(148, 163, 184, 0.35)",
                    borderRadius: 12,
                  }}
                />
                <button
                  className="kd-label-scan-rerun-btn"
                  type="button"
                  style={{
                    ...styles.secondaryButton,
                    marginTop: 10,
                    fontSize: 14,
                    padding: "10px 16px",
                    minHeight: 44,
                  }}
                  disabled={scannedLabelOcrLoading}
                  onClick={handleUseTextForCrossReference}
                >
                  {String(scannedLabelExtractedText || "").trim()
                    ? "Re-run Cross Reference"
                    : "Continue With Manual Cross Reference"}
                </button>
              </div>
            </div>
          </div>
        )}

{dealerActiveTab === "dashboard" && isRep && (
  <>
    <div style={{ ...styles.card, ...styles.dashboardCard, marginBottom: 24 }}>
      <div style={styles.eyebrow}>REP DASHBOARD</div>
      <h3 style={{ ...styles.cardTitle, marginBottom: 14 }}>Performance Snapshot</h3>

      <div
        style={{
          ...styles.grid3,
          gap: "var(--kd-dashboard-metric-grid-gap)",
        }}
      >
        <div style={{ ...styles.summaryCard, ...styles.dashboardSummaryCard }}>
          <div style={styles.summaryLabel}>Quotes Created</div>
          <div style={styles.summaryValue}>{repSnapshot.quotes}</div>
        </div>

        <div style={{ ...styles.summaryCard, ...styles.dashboardSummaryCard }}>
          <div style={styles.summaryLabel}>Proposals Sent</div>
          <div style={styles.summaryValue}>{repSnapshot.proposalsSent}</div>
        </div>

        <div style={{ ...styles.summaryCard, ...styles.dashboardSummaryCard }}>
          <div style={styles.summaryLabel}>Customer Responses</div>
          <div style={styles.summaryValue}>{repSnapshot.responses}</div>
        </div>

        <div style={{ ...styles.summaryCard, ...styles.dashboardSummaryCard }}>
          <div style={styles.summaryLabel}>Approval Rate</div>
          <div style={styles.summaryValue}>{repSnapshot.approvalRate}%</div>
        </div>

        <div style={{ ...styles.summaryCard, ...styles.dashboardSummaryCard }}>
          <div style={styles.summaryLabel}>Approved Revenue</div>
          <div style={styles.summaryValue}>
            ${repSnapshot.approvedRevenue.toFixed(0)}
          </div>
        </div>

        <div style={{ ...styles.summaryCard, ...styles.dashboardSummaryCard }}>
          <div style={styles.summaryLabel}>Library</div>
          <div style={styles.summaryValue}>{myQuotes.length}</div>
        </div>
      </div>
{leaderboard.length > 0 && (
  <div style={{ ...styles.card, ...styles.dashboardCard, marginBottom: 24 }}>
    <div style={styles.eyebrow}>Dealer Leaderboard</div>
    <h3 style={{ ...styles.cardTitle, marginBottom: 14 }}>
      Rep Performance Rankings
    </h3>

    <div style={{ ...styles.stack, gap: 18 }}>
      {leaderboard.map((rep, index) => (
        <div
          key={rep.name}
          style={{
            ...styles.listRow,
            ...styles.dashboardLeaderboardRow,
            background: index === 0 ? "#fffbeb" : "#fcfdff",
            border: index === 0 ? "1px solid #f5d478" : styles.listRow.border,
            boxShadow:
              index === 0
                ? "var(--kd-dashboard-leaderboard-first-shadow)"
                : "var(--kd-dashboard-leaderboard-row-shadow)",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 10,
                marginBottom: 4,
              }}
            >
              <div style={styles.listTitle}>
                {index + 1}. {rep.name}
              </div>
              <LeaderboardBadgeTray
                index={index}
                proposals={rep.proposals}
                approvalRate={rep.approvalRate}
                revenue={rep.revenue}
                approved={rep.approved}
              />
            </div>

            <div style={styles.listMeta}>
              {rep.proposals} proposals • {rep.approvalRate}% approval •{" "}
              {rep.approved} approved / {rep.declined} declined
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={styles.listTitle}>
              ${rep.revenue.toFixed(0)}
            </div>
            <div style={styles.listMeta}>Approved Revenue</div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
<div style={{ ...styles.card, ...styles.dashboardCard }}>
  <div style={styles.eyebrow}>Pipeline</div>
  <h3 style={{ ...styles.cardTitle, marginBottom: 14 }}>Your Active Deals</h3>

  <div style={{ ...styles.grid2, gap: 18 }}>

    {/* Awaiting */}
    <div
      style={{
        ...styles.summaryCard,
        ...styles.dashboardPipelineCard,
        ...styles.pipelineAwaiting,
        cursor: "pointer",
        border: activePipelineStage === "awaiting" ? "2px solid #f6a531" : styles.summaryCard.border,
      }}
      onClick={() => setActivePipelineStage("awaiting")}
    >
      <div style={styles.summaryLabel}>Awaiting Review</div>
      <div style={{ ...styles.summaryValue, fontSize: 28, marginTop: 8 }}>{pipeline.awaiting.length}</div>
      <div style={styles.listMeta}>
        Proposals sent, waiting on customer
      </div>
    </div>

    {/* Reviewed */}
    <div
      style={{
        ...styles.summaryCard,
        ...styles.dashboardPipelineCard,
        ...styles.pipelineReviewed,
        cursor: "pointer",
        border: activePipelineStage === "reviewed" ? "2px solid #f6a531" : styles.summaryCard.border,
      }}
      onClick={() => setActivePipelineStage("reviewed")}
    >
      <div style={styles.summaryLabel}>Reviewed</div>
      <div style={{ ...styles.summaryValue, fontSize: 28, marginTop: 8 }}>{pipeline.reviewed.length}</div>
      <div style={styles.listMeta}>
        Customer has responded
      </div>
    </div>

    {/* Approved */}
    <div
      style={{
        ...styles.summaryCard,
        ...styles.dashboardPipelineCard,
        ...styles.pipelineApproved,
        cursor: "pointer",
        border: activePipelineStage === "approved" ? "2px solid #f6a531" : styles.summaryCard.border,
      }}
      onClick={() => setActivePipelineStage("approved")}
    >
      <div style={styles.summaryLabel}>Approved</div>
      <div style={{ ...styles.summaryValue, fontSize: 28, marginTop: 8 }}>{pipeline.approved.length}</div>
      <div style={styles.listMeta}>
        Deals moving forward
      </div>
    </div>

    {/* Follow-up */}
    <div
      style={{
        ...styles.summaryCard,
        ...styles.dashboardPipelineCard,
        ...styles.pipelineFollowUp,
        cursor: "pointer",
        border: activePipelineStage === "followUp" ? "2px solid #f6a531" : styles.summaryCard.border,
      }}
      onClick={() => setActivePipelineStage("followUp")}
    >
      <div style={styles.summaryLabel}>Needs Follow-Up</div>
      <div style={{ ...styles.summaryValue, fontSize: 28, marginTop: 8 }}>{pipeline.followUp.length}</div>
      <div style={styles.listMeta}>
        Declined items require attention
      </div>
    </div>

  </div>
</div>
      {isRep && myQuotes.length > 0 && (
        <button
          type="button"
          style={{ ...styles.primaryButton, marginTop: 18 }}
          onClick={() => setDealerActiveTab("library")}
        >
          Resume Saved Quote
        </button>
      )}
    </div>

{ (activePipelineStage === "awaiting" || activePipelineStage === "followUp") && (
  <div style={styles.card}>
    <div style={styles.eyebrow}>Top Priority Follow-Ups</div>

    <div style={styles.stack}>
      {pipeline[activePipelineStage]
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        .slice(0, 3)
        .map((item, index) => {
          const ageDays = Math.floor((new Date() - new Date(item.created_at)) / (1000 * 60 * 60 * 24));
          const badgeText = activePipelineStage === "awaiting" ? "Call First" : "Follow Up First";

          return (
            <div key={item.id || index} style={styles.listRow}>
              <div>
                <div style={styles.listTitle}>
                  {item.customer_name || item.quote?.customer_name || "Customer"}
                </div>

                <div style={styles.listMeta}>
                  {item.customer_email || item.quote?.customer_email || "No email"}
                </div>

                <div style={styles.listMeta}>
                  {ageDays} days old
                </div>
              </div>

              <span style={styles.statusPill}>
                {badgeText}
              </span>
            </div>
          );
        })}
    </div>
  </div>
)}

{activePipelineStage && (
  <div style={styles.card}>
    <div style={styles.eyebrow}>
      {activePipelineStage === "awaiting"
        ? "Awaiting Customer Review"
        : activePipelineStage === "reviewed"
        ? "Reviewed Proposals"
        : activePipelineStage === "approved"
        ? "Approved Deals"
        : "Needs Follow-Up"}
    </div>

    <div style={styles.stack}>
      {(pipeline[activePipelineStage] || []).length === 0 && (
        <p style={styles.muted}>No deals in this stage.</p>
      )}

      {(pipeline[activePipelineStage] || []).map((item) => (
        <div key={item.id} style={styles.listRow}>
          <div>
            <div style={styles.listTitle}>
              {item.customer_name ||
                item.decision_data?.customer_name ||
                "Customer"}
            </div>

            <div style={styles.listMeta}>
              {item.customer_email ||
                item.decision_data?.customer_email ||
                "No customer email"}
            </div>
          </div>
{(() => {
  const createdAt = item.created_at || item.decision_data?.created_at;
  const ageDays = createdAt
    ? Math.floor((Date.now() - new Date(createdAt).getTime()) / 86400000)
    : 0;

  if (activePipelineStage === "awaiting" && ageDays >= 3) {
    return <div style={styles.listMeta}>🔥 Hot follow-up: {ageDays} days old</div>;
  }

  if (activePipelineStage === "followUp") {
    return <div style={styles.listMeta}>⚠ Needs attention</div>;
  }

  return null;
})()}
          <div style={{ display: "flex", gap: 8 }}>
  <button
    type="button"
    style={styles.secondaryButton}
    onClick={async () => {
      const quoteForView = item.quote_id
        ? myQuotes.find((q) => q.id === item.quote_id) ?? {
            id: item.quote_id,
            customer_name:
              item.customer_name ?? item.decision_data?.customer_name ?? "",
            customer_email:
              item.customer_email ?? item.decision_data?.customer_email ?? "",
            industry: item.industry ?? "",
          }
        : item;
      if (!quoteForView?.id) return;
      await handleOpenSavedQuote(quoteForView);
      if (item.quote_id) setRepProposalResponseSnapshot(item);
      else setRepProposalResponseSnapshot(null);
      setDealerActiveTab("proposal_view");
    }}
  >
    View
  </button>

  {activePipelineStage === "followUp" && (
    <button
      style={styles.primaryButton}
      onClick={() => {
        if (item.id) {
          handleOpenSavedQuote(item);
          setDealerActiveTab("quote");
        }
      }}
    >
      Follow Up
    </button>
  )}
</div>
        </div>
      ))}
    </div>
  </div>
)}
    {proposalResponses.length > 0 && (
      <div style={styles.card}>
        <div style={styles.eyebrow}>Customer Responses</div>

        <div style={styles.stack}>
          {proposalResponses
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
            .map((res) => {
              const ageDays = Math.floor((new Date() - new Date(res.created_at)) / (1000 * 60 * 60 * 24));
              const urgencyLabel = ageDays >= 5 ? "🚨 Critical" : ageDays >= 3 ? "🔥 Hot" : null;

              return (
                <div
                  key={res.id}
                  style={{ ...styles.listRow, cursor: "pointer" }}
                  onClick={() => setSelectedResponse(res)}
                >
                  <div>
                    <div style={styles.listTitle}>
                      {res.quote?.customer_name || "Customer Response"}
                    </div>

                    <div style={styles.listMeta}>
                      {res.quote?.customer_email || "No customer email"}
                    </div>

                    <div style={styles.listMeta}>
                      Submitted: {new Date(res.created_at).toLocaleString()}
                    </div>

                    {urgencyLabel && (
                      <div style={styles.listMeta}>
                        {urgencyLabel}
                      </div>
                    )}
                  </div>

                  <span style={styles.statusPill}>
                    {(() => {
                      const responses = res.decision_data?.responses || [];
                      const approved = responses.filter(
                        (r) => r.decision === "approved"
                      ).length;
                      const declined = responses.filter(
                        (r) => r.decision === "declined"
                      ).length;

                      return `${approved} Approved • ${declined} Declined`;
                    })()}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    )}

    {selectedResponse && (
      <div style={styles.card}>
        <div style={styles.eyebrow}>Response Detail</div>

        <h3 style={styles.cardTitle}>
          {selectedResponse.quote?.customer_name || "Customer"}
        </h3>

        <div style={styles.stack}>
          {(selectedResponse.decision_data?.responses || []).map((item, i) => (
            <div key={i} style={styles.listRow}>
              <div>
                <div style={styles.listTitle}>{item.product}</div>

                <div style={styles.listMeta}>
                  {item.package} • ${Number(item.price || 0).toFixed(2)}
                </div>

                {item.feedback && (
                  <div style={styles.listMeta}>Feedback: {item.feedback}</div>
                )}
              </div>

              <span
                style={{
                  ...styles.statusPill,
                  background:
                    item.decision === "approved" ? "#dcfce7" : "#fee2e2",
                  color:
                    item.decision === "approved" ? "#166534" : "#991b1b",
                }}
              >
                {item.decision}
              </span>
            </div>
          ))}
        </div>
      </div>
    )}
  </>
)}
        {isRep && dealerActiveTab === "quote" && (
  <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "280px 1fr",
              gap: 24,
            }}
          >
            <div
              style={{
                background: "#1e2f4a",
                borderRadius: 16,
                padding: 20,
                color: "#fff",
                height: "fit-content",
              }}
            >
              <div style={{ fontSize: 12, letterSpacing: 2, opacity: 0.7 }}>
                WORKFLOW
              </div>
              <h3 style={{ marginTop: 6 }}>Quote Journey</h3>

              {[
                { step: 1, label: "Customer Information" },
                { step: 2, label: "Product Selection" },
                { step: 3, label: "Build the Quote" },
              ].map(({ step, label }) => (
                <div
                  key={step}
                  onClick={() => setQuoteStep(step)}
                  style={{
                    marginTop: 12,
                    padding: 12,
                    borderRadius: 10,
                    cursor: "pointer",
                    background:
                      quoteStep === step ? "#f6a531" : "rgba(255,255,255,0.06)",
                    color: quoteStep === step ? "#0a2540" : "#fff",
                    fontWeight: 900,
                  }}
                >
                  <div style={{ fontSize: 12, opacity: 0.75 }}>STEP {step}</div>
                  {label}
                </div>
              ))}
            </div>

            <div style={styles.card}>
          
              {quoteStep === 1 && (
                <div>
                  <div style={styles.eyebrow}>STEP 1</div>
                  <h3 style={styles.cardTitle}>Customer Information</h3>
                  <p style={styles.cardBody}>
                    Capture customer details to begin the quote.
                  </p>

                  <div style={styles.grid2}>
                    <input
                      style={styles.input}
                      placeholder="Company Name"
                      value={companyName || ""}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <input
                      style={styles.input}
                      placeholder="Contact Name"
                      value={contactName || ""}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                    <input
                      style={styles.input}
                      placeholder="Email"
                      value={quoteContactEmail}
                      onChange={(e) => setQuoteContactEmail(e.target.value)}
                    />
                    <input
                      style={styles.input}
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <input
                    style={{ ...styles.input, marginTop: 14 }}
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />

                  <div style={{ ...styles.grid3, marginTop: 14 }}>
                    <input
                      style={styles.input}
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                      style={styles.input}
                      placeholder="Province / State"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                    />
                    <input
                      style={styles.input}
                      placeholder="Postal Code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>

                  <div style={{ ...styles.grid3, marginTop: 14 }}>
                    <select
                      style={styles.input}
                      value={industry}
                      onChange={(e) => {
                        setIndustry(e.target.value);
                        setSubIndustry("");
                      }}
                    >
                      <option value="">Select Industry</option>
                      {industries.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>

                    <select
                      style={styles.input}
                      value={subIndustry}
                      onChange={(e) => setSubIndustry(e.target.value)}
                      disabled={!industry}
                    >
                      <option value="">Select Sub-Industry</option>
                      {(subIndustries[industry] || []).map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>

                    <select
                      style={styles.input}
                      value={segment}
                      onChange={(e) => setSegment(e.target.value)}
                    >
                      <option value="">Select Market Segment</option>
                      {segments.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    style={{ ...styles.primaryButton, marginTop: 18 }}
                    onClick={() => setQuoteStep(2)}
                  >
                    Next
                  </button>
                </div>
              )}
             {quoteStep === 2 && (
  <div style={styles.card}>
    <div style={styles.eyebrow}>STEP 2</div>
    <h3 style={styles.cardTitle}>Product Selection</h3>
    <p style={styles.cardBody}>
      Type a competitor product, press Enter to cross-reference it, then select
      package and add it to the quote.
    </p>

    {/* INPUT ROW */}
    <div style={styles.grid2}>
     <div style={{ position: "relative" }}>
  <input
    style={styles.input}
    placeholder="Competitor Product (e.g. Chevron Delo 400)"
    value={competitor || ""}
    onChange={(e) => {
      const value = e.target.value;
      setCompetitor(value);
      setCrossSearch(value);
      setKlondike("");
      setPackageSize("");
      setSelectedProduct(null);
      setQuoteMessage("");
    }}
  />

  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 10,
      alignItems: "center",
    }}
  >
    <button
      type="button"
      style={{
        ...styles.secondaryButton,
        flex: "0 1 auto",
        whiteSpace: "nowrap",
        minHeight: 46,
        fontSize: 14,
        padding: "10px 16px",
      }}
      onClick={() => handleOpenLabelScan("step2")}
    >
      📷 Scan Product Label
    </button>
  </div>

  {quickCrossLoading && (
    <div style={{ ...styles.listMeta, marginTop: 6 }}>
      Searching matches...
    </div>
  )}

  {quickMatches.length > 0 && (
    <div
      style={{
        position: "absolute",
        zIndex: 20,
        top: 54,
        left: 0,
        right: 0,
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        boxShadow: "0 12px 28px rgba(15, 23, 42, 0.16)",
        overflow: "hidden",
      }}
    >
      {quickMatches.map((row) => (
        <button
          key={row.id}
          type="button"
          onClick={() => selectQuickCrossMatch(row)}
          style={{
            width: "100%",
            textAlign: "left",
            padding: "12px 14px",
            border: "none",
            borderBottom: "1px solid #eef2f7",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          <div style={{ fontWeight: 900, color: "#0a2540" }}>
           <strong>{row.competitor_brand}</strong> {row.competitor_product}
          </div>

          <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
            → {row.klondike_product || "No Klondike match listed"}
          </div>
        </button>
      ))}
    </div>
  )}
</div>

      <input
        style={styles.input}
        placeholder="Klondike Match"
        value={klondike || ""}
        readOnly
      />
    </div>

    {/* TIER + PACKAGE */}
    <div style={{ ...styles.grid3, marginTop: 14 }}>
      <select
        style={styles.input}
        value={tier}
        onChange={(e) => {
          const nextTier = e.target.value;
          setTier(nextTier);

          const nextKlondike = getTieredKlondikeProduct(klondike, nextTier);

          setKlondike(nextKlondike);
          setSelectedProduct((prev) =>
            prev ? { ...prev, klondike: nextKlondike, tier: nextTier } : prev
          );
          setPackageSize("");
        }}
      >
        <option>Good</option>
        <option>Better</option>
        <option>Best</option>
      </select>

      <select
        style={styles.input}
        value={packageSize}
        onChange={(e) => setPackageSize(e.target.value)}
        disabled={!klondike}
      >
        <option value="">Select Package</option>
        {[...new Set(getPackageOptionsForProduct(klondike))].map(
          (pkg, index) => (
            <option key={index} value={pkg}>
              {pkg}
            </option>
          )
        )}
      </select>
    </div>

    {/* ADD BUTTON */}
    <div style={{ marginTop: 12 }}>
      <button style={styles.primaryButton} onClick={handleAddProduct}>
        Add Product
      </button>
    </div>

    {quoteMessage && <p style={styles.message}>{quoteMessage}</p>}

    {/* CURRENT ITEMS */}
    <div style={{ marginTop: 18 }}>
      {quoteItems.length === 0 && (
        <p style={styles.muted}>No products added yet.</p>
      )}

      {quoteItems.map((item, index) => (
        <div key={item.id || index} style={styles.listRow}>
          <div>
            <div style={styles.listTitle}>{item.klondike}</div>

            <div style={styles.listMeta}>Replaces: {item.competitor}</div>

            <div style={styles.listMeta}>
              {item.tier} • {item.packageSize || "No package"}
            </div>
          </div>

          <button
            style={styles.secondaryButton}
            onClick={() => {
              setQuoteItems((prev) => prev.filter((_, i) => i !== index));
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>

    {/* EQUIPMENT NEEDS */}
    <div style={{ marginTop: 24 }}>
      <div style={styles.eyebrow}>EQUIPMENT NEEDS</div>

      <p style={{ ...styles.cardBody, marginBottom: 12 }}>
        Select supporting equipment required for proper lubricant handling and
        storage.
      </p>

      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 100px 140px",
            background: "#f8fafc",
            padding: "10px 12px",
            fontSize: 12,
            fontWeight: 600,
            color: "#64748b",
          }}
        >
          <div>EQUIPMENT ITEM</div>
          <div style={{ textAlign: "center" }}>QTY</div>
          <div style={{ textAlign: "center" }}>DEALER PRICE</div>
        </div>

        {EQUIPMENT_OPTIONS.map((item) => {
          const existing = equipmentItems.find((e) => e.name === item);

          return (
            <div
              key={item}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 100px 140px",
                padding: "10px 12px",
                borderTop: "1px solid #e2e8f0",
                alignItems: "center",
              }}
            >
              <div>
                <label
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <input
                    type="checkbox"
                    checked={!!existing}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setEquipmentItems((prev) => [
                          ...prev,
                          { name: item, qty: 1, price: "" },
                        ]);
                      } else {
                        setEquipmentItems((prev) =>
                          prev.filter((p) => p.name !== item)
                        );
                      }
                    }}
                  />
                  {item}
                </label>
              </div>

              <div style={{ textAlign: "center" }}>
                {existing && (
                  <input
                    type="number"
                    min={1}
                    value={existing.qty}
                    onChange={(e) => {
                      const val = Number(e.target.value || 1);
                      setEquipmentItems((prev) =>
                        prev.map((p) =>
                          p.name === item ? { ...p, qty: val } : p
                        )
                      );
                    }}
                    style={{
                      width: 70,
                      padding: 6,
                      borderRadius: 6,
                      border: "1px solid #cbd5e1",
                      textAlign: "center",
                    }}
                  />
                )}
              </div>

              <div style={{ textAlign: "center" }}>
                {existing && (
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="$"
                    value={existing.price || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEquipmentItems((prev) =>
                        prev.map((p) =>
                          p.name === item ? { ...p, price: val } : p
                        )
                      );
                    }}
                    style={{
                      width: 100,
                      padding: 6,
                      borderRadius: 6,
                      border: "1px solid #cbd5e1",
                      textAlign: "center",
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* NAV BUTTONS */}
    <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
      <button style={styles.secondaryButton} onClick={() => setQuoteStep(1)}>
        Back
      </button>

      <button
        style={styles.primaryButton}
        onClick={() => setQuoteStep(3)}
        disabled={quoteItems.length === 0}
      >
        Next
      </button>
    </div>
  </div>
)}
              {quoteStep === 3 && (
                <div>
                  <div style={styles.eyebrow}>STEP 3</div>
                  <h3 style={styles.cardTitle}>Build the Quote</h3>
                  <p style={styles.cardBody}>
                    Review customer details, product recommendations, packages,
                    and proposal content before saving.
                  </p>

                  <div style={styles.grid2}>
                    <div style={styles.summaryCard}>
                      <div style={styles.summaryLabel}>Customer</div>
                      <div style={styles.summaryValue}>
                        {companyName || "No company entered"}
                      </div>
                      <div style={styles.listMeta}>
                        {contactName || "No contact"} •{" "}
                        {quoteContactEmail || "No email"}
                      </div>
                    </div>

                    <div style={styles.summaryCard}>
                      <div style={styles.summaryLabel}>Business Profile</div>
                      <div style={styles.summaryValue}>
                        {industry || "No industry"}
                      </div>
                      <div style={styles.listMeta}>
                        {subIndustry || "No sub-industry"} •{" "}
                        {segment || "No segment"}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: 18, marginBottom: 18 }}>
                    <label
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <input
                        type="checkbox"
                        checked={useFloorPrice}
                        onChange={(e) => setUseFloorPrice(e.target.checked)}
                      />
                      Apply Floor Price (-10%)
                    </label>

                    {useFloorPrice && (
                      <div style={styles.listMeta}>
                        Floor pricing applied for competitive situations.
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <div style={styles.eyebrow}>SELECTED PRODUCTS</div>

                    <div style={styles.stack}>
                      {quoteItems.length === 0 && (
                        <p style={styles.muted}>No products added yet.</p>
                      )}

                      {quoteItems.map((item, index) => {
                       const basePrice = Number(item.price || item.resalePrice || 0);
const price = useFloorPrice ? basePrice * 0.9 : basePrice;

                        return (
                          <div
                            key={`${item.competitor}-${index}`}
                            style={styles.listRow}
                          >
                            <div>
                              <div style={styles.listTitle}>
                                {item.klondike}
                              </div>

                              <div style={styles.listMeta}>
                                Replaces: {item.brand} {item.competitor}
                              </div>

                              <div style={styles.listMeta}>
                                Tier: {item.tier} • Package:{" "}
                                {item.packageSize || "No package selected"}
                              </div>
                              {item.tier !== "Best" && (
  <button
    style={{ ...styles.secondaryButton, marginTop: 8 }}
    onClick={() => {
      const nextTier =
        item.tier === "Good"
          ? "Better"
          : item.tier === "Better"
          ? "Best"
          : null;

      if (!nextTier) return;

      const upgradedProduct = getTieredKlondikeProduct(
        item.catalogProductName || item.klondike,
        nextTier
      );

      const key = `${String(upgradedProduct).toLowerCase().trim()}__${String(
        item.packageSize || ""
      )
        .toLowerCase()
        .trim()}`;

      const upgradedCatalog = pricingMap[key];

      const newPrice =
        upgradedCatalog?.account_price ??
        upgradedCatalog?.resale_price ??
        upgradedCatalog?.retail_price ??
        0;

      setQuoteItems((prev) =>
        prev.map((q, i) =>
          i === index
            ? {
                ...q,
                tier: nextTier,
                klondike: upgradedProduct,
                catalogProductName: upgradedProduct,
                price: newPrice,
                resalePrice: newPrice,
              }
            : q
        )
      );
    }}
  >
    Upgrade to {item.tier === "Good" ? "Better" : "Best"}
  </button>
)}
                              {getPdsLink(item.klondike) && (
                                <div style={{ marginTop: 6 }}>
                                  <a
                                    href={getPdsLink(item.klondike)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      color: "#f6a531",
                                      fontWeight: 800,
                                      textDecoration: "none",
                                    }}
                                  >
                                    View Product Data Sheet →
                                  </a>
                                </div>
                              )}
                            </div>

                            <div style={{ textAlign: "right" }}>
                              <div style={styles.listTitle}>
                               ${Number(price || 0).toFixed(2)}
                              </div>
                              <div style={styles.listMeta}>
                                {useFloorPrice
                                  ? "Floor price applied"
                                  : "Price"}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div
                      style={{ marginTop: 16, fontWeight: 900, fontSize: 18 }}
                    >
                      Total: $
                      {Number(getQuoteTotal() || 0).toFixed(2)}
                    </div>
                  </div>
{equipmentItems.length > 0 && (
  <div style={{ marginTop: 20 }}>
    <div style={styles.eyebrow}>SELECTED EQUIPMENT</div>

    <div style={styles.stack}>
      {equipmentItems.map((item, index) => (
        <div key={index} style={styles.listRow}>
          <div>
            <div style={styles.listTitle}>{item.name}</div>
            <div style={styles.listMeta}>Qty: {item.qty || 1}</div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={styles.listTitle}>
              {formatMoney(Number(item.price || 0) * Number(item.qty || 1))}
            </div>
            <div style={styles.listMeta}>
              {formatMoney(Number(item.price || 0))} each
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
                  <div style={{ marginTop: 20 }}>
                    <div style={styles.eyebrow}>PROPOSAL DEFAULTS</div>

                    <div style={styles.cardBody}>
                      <strong>Intro Statement</strong>
                      <p>
                        Based on our review of your current lubrication program
                        and operating requirements,{" "}
                        {companyName || "[customer name]"} may benefit from a
                        simplified, high-performance Klondike lubrication
                        solution tailored to your operation.
                      </p>

                      <strong>Closing Statement</strong>
                      <p>
                        We appreciate the opportunity to support your business
                        and look forward to helping improve reliability, product
                        selection, and long-term operating performance.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
                    <button
                      type="button"
                      style={styles.secondaryButton}
                      onClick={() => setQuoteStep(2)}
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      disabled={quoteSaving}
                      style={styles.primaryButton}
                      onClick={handleSaveQuote}
                    >
                      {quoteSaving ? "Saving..." : "Save & Continue to Proposal"}
                    </button>
                  </div>

                  {quoteMessage && <p style={styles.message}>{quoteMessage}</p>}
                </div>
              )}
            </div>
                    </div>
        </div>
      )}

        {dealerActiveTab === "proposal_view" && isRep && (
  <div className="proposal-print-area" style={{ background: "#f8fafc", minHeight: "100vh", paddingBottom: 40 }}>
    {/* DEALER BRANDED HEADER */}
<div
  style={{
    background: "linear-gradient(135deg, #0a2540 0%, #1a3f5e 100%)",
    color: "#fff",
    borderBottom: "6px solid #f6a531",
  }}
>
  <div style={{ maxWidth: 1000, margin: "0 auto", padding: "36px 32px" }}>
    
    {/* TOP ROW */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
      }}
    >
      <div>
        <div style={{ fontSize: 28, fontWeight: 900 }}>
          {dealerProfile?.company_name || "Your Dealer"}
        </div>

        <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>
          Lubrication Program Recommendation
        </div>
      </div>

      {/* DEALER LOGO */}
      {(dealerProfile?.logo_url || dealerProfile?.dealer_logo_url) && (
        <img
          src={
            dealerProfile?.logo_url ||
            dealerProfile?.dealer_logo_url
          }
          alt="Dealer Logo"
          style={{
            height: 60,
            objectFit: "contain",
            background: "#fff",
            padding: 6,
            borderRadius: 8,
          }}
        />
      )}
    </div>

    {/* HEADLINE */}
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          fontSize: 36,
          fontWeight: 900,
          lineHeight: 1.2,
          marginBottom: 10,
        }}
      >
        Improving Equipment Reliability &
        <br />
        Reducing Operating Cost
      </div>

      <div style={{ fontSize: 15, opacity: 0.85 }}>
        Prepared for{" "}
        <strong>{companyName || "Your Company"}</strong>
      </div>
    </div>

    {/* CONTACT STRIP */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 20,
        fontSize: 13,
        opacity: 0.9,
      }}
    >
      {dealerProfile?.phone && (
        <div>
          <div style={{ opacity: 0.7 }}>PHONE</div>
          <div style={{ fontWeight: 700 }}>
            {dealerProfile.phone}
          </div>
        </div>
      )}

      {dealerProfile?.website && (
        <div>
          <div style={{ opacity: 0.7 }}>WEBSITE</div>
          <div style={{ fontWeight: 700 }}>
            {dealerProfile.website}
          </div>
        </div>
      )}

      {(dealerProfile?.city || dealerProfile?.province_state) && (
        <div>
          <div style={{ opacity: 0.7 }}>LOCATION</div>
          <div style={{ fontWeight: 700 }}>
            {dealerProfile?.city}
            {dealerProfile?.city && dealerProfile?.province_state
              ? ", "
              : ""}
            {dealerProfile?.province_state}
          </div>
        </div>
      )}

      {dealerProfile?.address && (
        <div>
          <div style={{ opacity: 0.7 }}>ADDRESS</div>
          <div style={{ fontWeight: 700 }}>
            {dealerProfile.address}
          </div>
        </div>
      )}
    </div>
  </div>
</div>

{/* EXECUTIVE SUMMARY */}
<div
  style={{
    maxWidth: 1000,
    margin: "0 auto",
    padding: "28px 32px",
    background: "#fff",
    borderBottom: "1px solid #e5e7eb",
  }}
>
  <div
    style={{
      fontSize: 12,
      fontWeight: 900,
      textTransform: "uppercase",
      color: "#64748b",
      marginBottom: 12,
    }}
  >
    Executive Summary
  </div>

  <p
    style={{
      fontSize: 16,
      lineHeight: 1.9,
      color: "#1f2937",
      margin: 0,
    }}
  >
    {dealerProfile?.intro_statement
      ? dealerProfile.intro_statement.replace(
          /\[Customer Name\]/g,
          companyName || "your company"
        )
      : `Based on our review of your operation, we have identified opportunities to improve equipment reliability, streamline product selection, and enhance overall performance. This recommendation outlines a lubrication program designed to reduce downtime, extend equipment life, and deliver consistent results across your operation.`}
  </p>
</div>

    {/* MAIN CONTENT */}
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px" }}>
      {/* TITLE SECTION */}
      <div style={{ background: "#fff", borderRadius: 0, padding: "40px 0", borderBottom: "2px solid #e5e7eb", marginTop: 0 }}>
        <div style={{ fontSize: 13, letterSpacing: 2.5, textTransform: "uppercase", color: "#f6a531", fontWeight: 900, marginBottom: 12 }}>
          Lubrication Recommendation
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: "#0a2540", margin: "0 0 12px 0" }}>
          Prepared for {companyName ? `${companyName}` : "Your Company"}
        </h1>
        <p style={{ fontSize: 15, color: "#64748b", margin: 0, marginTop: 8 }}>
          A tailored lubrication strategy to optimize equipment performance and reduce operating costs
        </p>
        {repProposalReadOnlyCustomerDecisions && (
          <div
            style={{
              marginTop: 16,
              padding: "10px 14px",
              borderRadius: 10,
              background: "#f1f5f9",
              border: "1px solid #e2e8f0",
              fontSize: 13,
              fontWeight: 700,
              color: "#334155",
            }}
          >
            Submitted customer responses — read-only
          </div>
        )}
      </div>

      {/* CUSTOMER INFO CARD */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 28, marginTop: 24, marginBottom: 32, border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase", color: "#64748b", letterSpacing: 1, marginBottom: 16 }}>
          Customer Profile
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, fontSize: 14 }}>
          {companyName && (
            <div>
              <div style={{ color: "#64748b", fontWeight: 700, marginBottom: 6 }}>Company Name</div>
              <div style={{ fontWeight: 900, color: "#0a2540", fontSize: 16 }}>{companyName}</div>
            </div>
          )}
          {contactName && (
            <div>
              <div style={{ color: "#64748b", fontWeight: 700, marginBottom: 6 }}>Contact</div>
              <div style={{ fontWeight: 900, color: "#0a2540", fontSize: 16 }}>{contactName}</div>
            </div>
          )}
          {quoteContactEmail && (
            <div>
              <div style={{ color: "#64748b", fontWeight: 700, marginBottom: 6 }}>Email</div>
              <div style={{ fontWeight: 700, color: "#0a2540", fontSize: 15 }}>{quoteContactEmail}</div>
            </div>
          )}
          {industry && (
            <div>
              <div style={{ color: "#64748b", fontWeight: 700, marginBottom: 6 }}>Industry</div>
              <div style={{ fontWeight: 900, color: "#0a2540", fontSize: 16 }}>{industry}</div>
            </div>
          )}
          {subIndustry && (
            <div>
              <div style={{ color: "#64748b", fontWeight: 700, marginBottom: 6 }}>Sub-Industry</div>
              <div style={{ fontWeight: 700, color: "#0a2540", fontSize: 15 }}>{subIndustry}</div>
            </div>
          )}
          {segment && (
            <div>
              <div style={{ color: "#64748b", fontWeight: 700, marginBottom: 6 }}>Segment</div>
              <div style={{ fontWeight: 900, color: "#0a2540", fontSize: 16 }}>{segment}</div>
            </div>
          )}
        </div>
      </div>

      {/* EXECUTIVE SUMMARY */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 28, marginBottom: 32, border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", borderLeft: "6px solid #f6a531" }}>
        <div style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase", color: "#64748b", letterSpacing: 1, marginBottom: 14 }}>
          Our Recommendation
        </div>
        <p
  style={{
    fontSize: 16,
    lineHeight: 1.9,
    color: "#1f2937",
    margin: 0,
  }}
>
  After reviewing your current lubrication program, operating conditions, and equipment demands, we have identified opportunities to improve overall reliability, reduce contamination risk, and simplify product selection across your operation.

  The following recommendations are designed to align lubricant performance with application requirements, optimize handling and storage practices, and support long-term equipment protection. By implementing a more structured lubrication approach, your operation can benefit from improved uptime, more consistent performance, and reduced maintenance-related costs.
</p>
      </div>
<div className="page-break" />
     {/* PRODUCT RECOMMENDATIONS SECTION */}
{getProposalItems().length > 0 && (
  <div style={{ marginBottom: 32 }}>
    <div
      style={{
        fontSize: 13,
        fontWeight: 900,
        textTransform: "uppercase",
        color: "#0a2540",
        letterSpacing: 1,
        marginBottom: 20,
      }}
    >
      Product Recommendations
    </div>

    <div style={{ display: "grid", gap: 16 }}>
      {getProposalItems().map((item, index) => {
        const pds = findPds(item.catalogProductName || item.klondike);

        const basePrice = Number(item.price || item.resalePrice || 0);
        const unitPrice = useFloorPrice ? basePrice * 0.9 : basePrice;

        return (
          <div
  className="avoid-break"
  key={`${item.klondike}-${index}`}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 18,
              background: "#fff",
            }}
          >
            {/* HEADER ROW */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#0a2540" }}>
                  {item.klondike}
                </div>

                <div style={{ fontSize: 13, color: "#64748b" }}>
                  Replaces: {item.brand} {item.competitor}
                </div>
              </div>

              <div
                style={{
                  background:
                    item.tier === "Best"
                      ? "#f6a531"
                      : item.tier === "Better"
                      ? "#f97316"
                      : "#e8b24e",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 900,
                }}
              >
                {item.tier}
              </div>
            </div>
{/* DETAILS ROW */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
    fontSize: 13,
    marginBottom: 10,
  }}
>
  <div>
    <div style={{ color: "#64748b" }}>Package</div>
    <div style={{ fontWeight: 900, color: "#0a2540", marginTop: 4 }}>
      {item.packageSize || item.package || item.pack_size || "—"}
    </div>
  </div>

  <div>
    <div style={{ color: "#64748b" }}>Unit Price</div>
    <div style={{ fontWeight: 900, color: "#0a2540", marginTop: 4 }}>
      {formatMoney(unitPrice)}
    </div>
  </div>

  <div>
    <div style={{ color: "#64748b" }}>Part #</div>
    <div style={{ fontWeight: 900, color: "#0a2540", marginTop: 4 }}>
      {item.partNumber ||
        item.part_number ||
        item.sku ||
        item.productCode ||
        item.product_code ||
        item.item_number ||
        item.catalogProductName ||
        "—"}
    </div>
  </div>

  <div style={{ textAlign: "right" }}>
    <div style={{ color: "#64748b" }}>Line Total</div>
    <div
      style={{
        fontWeight: 900,
        color: "#f6a531",
        fontSize: 16,
        marginTop: 4,
      }}
    >
      {formatMoney(unitPrice)}
    </div>
  </div>
</div>
            {/* WHY + TECH */}
            <div style={{ fontSize: 13, color: "#334155", lineHeight: 1.6 }}>
              <strong>Why:</strong>{" "}
{getRecommendationMessage(item)}
            </div>

            <div style={{ fontSize: 13, color: "#334155", marginTop: 6 }}>
              <strong>Product Details:</strong>
              {pds?.why ||
                "Recommended based on product application and operating conditions."}
            </div>

            {/* SPECS */}
            {pds?.specs && (
              <div style={{ marginTop: 6 }}>
                <strong style={{ fontSize: 13 }}>Specs:</strong>
                <div style={{ fontSize: 12, color: "#64748b" }}>
                  {pds.specs.slice(0, 4).join(" • ")}
                </div>
              </div>
            )}

            {/* PACKAGE + CONTAMINATION */}
            {getPackageStrategy(item.packageSize) && (
              <div style={{ fontSize: 12, marginTop: 6, color: "#475569" }}>
                <strong>Packaging:</strong>{" "}
                {getPackageStrategy(item.packageSize)}
              </div>
            )}

            {getContaminationNote(item.packageSize) && (
              <div style={{ fontSize: 12, marginTop: 4, color: "#b45309" }}>
                <strong>Contamination:</strong>{" "}
                {getContaminationNote(item.packageSize)}
              </div>
            )}
{/* CUSTOMER DECISION */}
<div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 12,
    paddingTop: 12,
    borderTop: "1px solid #e5e7eb",
  }}
>
  {repProposalReadOnlyCustomerDecisions ? (
    (() => {
      const savedRow = customerSubmittedResponses[index];
      const dec = savedRow?.decision;
      const isApproved = dec === "approved";
      const isDeclined = dec === "declined";
      return (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#64748b" }}>
              Customer decision
            </span>
            {savedRow ? (
              <span
                style={{
                  ...styles.statusPill,
                  background: isApproved ? "#dcfce7" : isDeclined ? "#fee2e2" : "#f1f5f9",
                  color: isApproved ? "#166534" : isDeclined ? "#991b1b" : "#475569",
                }}
              >
                {isApproved ? "Approved" : isDeclined ? "Declined" : dec || "Recorded"}
              </span>
            ) : (
              <span style={{ ...styles.statusPill, background: "#f1f5f9", color: "#64748b" }}>
                No recorded line decision
              </span>
            )}
          </div>
          {savedRow?.feedback ? (
            <div style={{ fontSize: 13, color: "#334155", lineHeight: 1.5 }}>
              <strong>Follow-up / notes:</strong> {savedRow.feedback}
            </div>
          ) : null}
        </>
      );
    })()
  ) : (
    <>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() =>
            setProposalDecisions((prev) => ({
              ...prev,
              [index]: "approved",
            }))
          }
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border:
              proposalDecisions[index] === "approved"
                ? "2px solid #16a34a"
                : "1px solid #d1d5db",
            background:
              proposalDecisions[index] === "approved" ? "#dcfce7" : "#fff",
            color: "#166534",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          Approve
        </button>

        <button
          type="button"
          onClick={() =>
            setProposalDecisions((prev) => ({
              ...prev,
              [index]: "declined",
            }))
          }
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border:
              proposalDecisions[index] === "declined"
                ? "2px solid #dc2626"
                : "1px solid #d1d5db",
            background:
              proposalDecisions[index] === "declined" ? "#fee2e2" : "#fff",
            color: "#991b1b",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          Decline
        </button>
      </div>
      {proposalDecisions[index] === "declined" && (
        <div style={{ marginTop: 4 }}>
          <textarea
            placeholder="Optional: Tell us why this recommendation doesn't fit (price, preference, application, etc.)"
            value={proposalFeedback[index] || ""}
            onChange={(e) =>
              setProposalFeedback((prev) => ({
                ...prev,
                [index]: e.target.value,
              }))
            }
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #e2e8f0",
              fontSize: 13,
              resize: "vertical",
              minHeight: 60,
            }}
          />
        </div>
      )}
    </>
  )}
</div>
            {/* PDS */}
            {pds?.url && (
              <div style={{ marginTop: 8 }}>
                <a
                  href={pds.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: "#f6a531",
                    textDecoration: "none",
                  }}
                >
                  View Product Data Sheet →
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
)}
{equipmentItems.length > 0 && (
  <div style={{ marginBottom: 32 }}>
    <div
      style={{
        fontSize: 13,
        fontWeight: 900,
        textTransform: "uppercase",
        color: "#0a2540",
        letterSpacing: 1,
        marginBottom: 20,
      }}
    >
      Recommended Equipment & Support
    </div>

    <div style={{ display: "grid", gap: 14 }}>
      {equipmentItems.map((item, index) => {
        const total = Number(item.price || 0) * Number(item.qty || 1);

        return (
          <div
            key={index}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 18,
              background: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
                marginBottom: 8,
              }}
            >
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#0a2540" }}>
                  {item.name}
                </div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
                  Qty: {item.qty || 1}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: "#64748b" }}>Line Total</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: "#f6a531" }}>
                  {formatMoney(total)}
                </div>
              </div>
            </div>

            <div style={{ fontSize: 13, color: "#334155", lineHeight: 1.6 }}>
              <strong>Purpose:</strong> Supports proper lubricant handling,
              clean dispensing, and organized storage.
            </div>

            <div style={{ fontSize: 13, color: "#334155", lineHeight: 1.6 }}>
              <strong>Program Benefit:</strong> Helps reduce contamination risk,
              improve handling efficiency, and protect lubricant integrity.
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}
{/* PROGRAM VALUE */}
<div
  style={{
    background: "#f8fafc",
    borderRadius: 14,
    padding: 28,
    marginBottom: 32,
    border: "1px solid #e5e7eb",
  }}
>
  <div
    style={{
      fontSize: 13,
      fontWeight: 900,
      textTransform: "uppercase",
      color: "#0a2540",
      marginBottom: 12,
    }}
  >
    Program Value
  </div>

  <p style={{ margin: 0, color: "#334155", lineHeight: 1.8 }}>
    This lubrication program is designed to improve equipment reliability, reduce downtime risk, and simplify product selection across your operation. By aligning product performance, packaging strategy, and contamination control practices, this solution supports long-term operating efficiency and reduced maintenance costs.
  </p>
</div>
    {/* INVESTMENT SUMMARY */}
<div
  style={{
    background: "#0a2540",
    color: "#fff",
    borderRadius: 14,
    padding: 28,
    marginBottom: 32,
  }}
>
  <div
    style={{
      fontSize: 13,
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 16,
      opacity: 0.8,
    }}
  >
    Investment Summary
  </div>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      fontSize: 16,
      marginBottom: 10,
    }}
  >
    <span>Lubricant Total</span>
    <strong>{formatMoney(getQuoteTotal())}</strong>
  </div>

  {equipmentItems.length > 0 && (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 16,
        marginBottom: 10,
      }}
    >
      <span>Equipment Total</span>
      <strong>
        {formatMoney(
          equipmentItems.reduce(
            (sum, item) =>
              sum + Number(item.price || 0) * Number(item.qty || 1),
            0
          )
        )}
      </strong>
    </div>
  )}

  <div
    style={{
      borderTop: "1px solid rgba(255,255,255,0.2)",
      marginTop: 16,
      paddingTop: 16,
      display: "flex",
      justifyContent: "space-between",
      fontSize: 20,
      fontWeight: 900,
    }}
  >
    <span>Total Investment</span>
    <span>
      {formatMoney(
        getQuoteTotal() +
          equipmentItems.reduce(
            (sum, item) =>
              sum + Number(item.price || 0) * Number(item.qty || 1),
            0
          )
      )}
    </span>
  </div>
</div>
{/* IMPLEMENTATION PLAN */}
<div
  style={{
    background: "#ffffff",
    borderRadius: 14,
    padding: 28,
    marginBottom: 32,
    border: "1px solid #e5e7eb",
  }}
>
  <div
    style={{
      fontSize: 13,
      fontWeight: 900,
      textTransform: "uppercase",
      color: "#0a2540",
      marginBottom: 16,
    }}
  >
    Implementation Plan
  </div>

  <p
    style={{
      color: "#334155",
      lineHeight: 1.8,
      marginBottom: 20,
      fontSize: 14,
    }}
  >
    To ensure a smooth transition and maximize performance improvements, we
    recommend a phased rollout approach that aligns product implementation,
    equipment setup, and best practices across your operation.
  </p>

  <div style={{ display: "grid", gap: 12 }}>
    {/* PHASE 1 */}
    <div
      style={{
        padding: 14,
        borderRadius: 10,
        background: "#f8fafc",
        borderLeft: "4px solid #f6a531",
        color: "#0a2540",
      }}
    >
      <strong>Phase 1: Alignment & Planning</strong>
      <div style={{ fontSize: 13, marginTop: 6, color: "#334155" }}>
        Review product recommendations, confirm equipment requirements, and
        align internal teams on transition priorities.
      </div>
    </div>

    {/* PHASE 2 */}
    <div
      style={{
        padding: 14,
        borderRadius: 10,
        background: "#f8fafc",
        borderLeft: "4px solid #f6a531",
        color: "#0a2540",
      }}
    >
      <strong>Phase 2: Product Transition</strong>
      <div style={{ fontSize: 13, marginTop: 6, color: "#334155" }}>
        Begin transitioning key equipment and applications to Klondike products,
        focusing on high-impact systems first.
      </div>
    </div>

    {/* PHASE 3 */}
    <div
      style={{
        padding: 14,
        borderRadius: 10,
        background: "#f8fafc",
        borderLeft: "4px solid #f6a531",
        color: "#0a2540",
      }}
    >
      <strong>Phase 3: Equipment & Handling Optimization</strong>
      <div style={{ fontSize: 13, marginTop: 6, color: "#334155" }}>
        Implement recommended storage and dispensing equipment to reduce
        contamination risk and improve handling efficiency.
      </div>
    </div>

    {/* PHASE 4 */}
    <div
      style={{
        padding: 14,
        borderRadius: 10,
        background: "#f8fafc",
        borderLeft: "4px solid #f6a531",
        color: "#0a2540",
      }}
    >
      <strong>Phase 4: Monitoring & Optimization</strong>
      <div style={{ fontSize: 13, marginTop: 6, color: "#334155" }}>
        Monitor product performance, adjust as needed, and continue optimizing
        your lubrication program for long-term reliability.
      </div>
    </div>
  </div>
</div>
<div className="page-break" />
{/* REP SIGN-OFF */}
<div
  style={{
    background: "#fff",
    borderRadius: 14,
    padding: 28,
    marginBottom: 32,
    border: "1px solid #e5e7eb",
  }}
>
  <div
    style={{
      fontSize: 13,
      fontWeight: 900,
      textTransform: "uppercase",
      color: "#0a2540",
      marginBottom: 16,
    }}
  >
    <div
  style={{
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 24,
    marginBottom: 28,
  }}
>
  <div
    style={{
      fontSize: 13,
      fontWeight: 900,
      textTransform: "uppercase",
      color: "#0a2540",
      marginBottom: 12,
    }}
  >
    What This Means For Your Operation
  </div>

  <p style={{ margin: 0, color: "#334155", lineHeight: 1.8 }}>
    By implementing this lubrication strategy, you can expect improved equipment
    reliability, reduced downtime risk, and more consistent operating performance.
    This approach is designed to simplify product selection while supporting long-term
    cost efficiency and operational confidence.
  </p>
</div>
    Prepared By
  </div>

  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
    <div>
      <div style={{ fontWeight: 900, fontSize: 16, color: "#0a2540" }}>
        {`${repFirstName || ""} ${repLastName || ""}`.trim() ||
          "Sales Representative"}
      </div>

      <div style={{ color: "#64748b", marginTop: 4 }}>
        {repTitle || "Sales Representative"}
      </div>

      <div style={{ marginTop: 10, fontSize: 14, color: "#334155" }}>
        {repPhone && <div>Phone: {repPhone}</div>}
        {repEmailAddress && <div>Email: {repEmailAddress}</div>}
      </div>
    </div>

    <div>
      <div style={{ fontSize: 13, color: "#64748b", marginBottom: 8 }}>
       Rep Signature
      </div>
<div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>
  Sign here before sending this proposal to the customer.
</div>
      {!signature ? (
        <div>
          <canvas
            ref={canvasRef}
            width={400}
            height={120}
            style={{
              width: "100%",
              border: "1px dashed #94a3b8",
              borderRadius: 10,
              background: "#f8fafc",
              cursor: "crosshair",
            }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />

          <button
            type="button"
            style={{ ...styles.secondaryButton, marginTop: 8 }}
            onClick={clearSignature}
          >
           Clear Signature
          </button>
        </div>
      ) : (
        <div>
          <img
            src={signature}
            alt="Signature"
            style={{
              width: "100%",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              background: "#fff",
            }}
          />

          <button
            type="button"
            style={{ ...styles.secondaryButton, marginTop: 8 }}
            onClick={clearSignature}
          >
            Update Signature
          </button>
        </div>
      )}
    </div>
  </div>
</div>
      {/* CLOSING STATEMENT */}
      {getProposalItems().length > 0 && (
        <div style={{ background: "#fff", borderRadius: 12, padding: 28, marginBottom: 32, border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", borderLeft: "6px solid #f6a531" }}>
      <p style={{ fontSize: 16, lineHeight: 1.9, color: "#1f2937", margin: 0 }}>
  {dealerProfile?.closing_statement
    ? dealerProfile.closing_statement.replace(
        /\[Customer Name\]/g,
        companyName || "your company"
      )
    : `We appreciate the opportunity to work with ${
        companyName || "your team"
      } and support your operation with a more reliable, efficient lubrication program.

This recommendation is designed to improve equipment performance, reduce downtime risk, and simplify your product strategy across the board.

We look forward to partnering with you on implementation and delivering measurable results for your operation.`}
</p>
        </div>
      )}
{/* SEND PROPOSAL TO CUSTOMER */}
{!repProposalReadOnlyCustomerDecisions && (
<div className="no-print" style={{ marginBottom: 20 }}>
  <button
    type="button"
    style={{
      width: "100%",
      padding: 16,
      borderRadius: 10,
      border: "1px solid #0a2540",
      background: "#0a2540",
      color: "#fff",
      fontSize: 15,
      fontWeight: 900,
      cursor: "pointer",
      textTransform: "uppercase",
      letterSpacing: 1,
    }}
    onClick={handleSendProposalToCustomer}
  >
    Send Proposal to Customer
  </button>
</div>
)}
      {/* SUBMIT DECISIONS BUTTON - CALL TO ACTION */}
      {getProposalItems().length > 0 && !repProposalReadOnlyCustomerDecisions && (
        <div style={{ marginBottom: 40, paddingTop: 20 }}>
          <button
            type="button"
            style={{
              width: "100%",
              padding: 18,
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(180deg, #f6a531 0%, #d87400 100%)",
              color: "#fff",
              fontSize: 16,
              fontWeight: 900,
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: 1,
              boxShadow: "0 8px 20px rgba(246, 165, 49, 0.25)",
            }}
            onClick={handleSubmitProposalDecisions}
          >
            Submit Proposal Decisions
          </button>
        </div>
      )}
    </div>
  </div>
)}

        {dealerActiveTab === "cross" && isRep && (
        <div style={styles.card}>
  <div style={styles.eyebrow}>CROSS REFERENCE</div>
  <h3 style={styles.cardTitle}>Find the Klondike Match</h3>

  <p style={styles.cardBody}>
    Search a competitor product and compare Good / Better / Best Klondike recommendations.
  </p>

  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        alignItems: "stretch",
      }}
    >
      <input
        style={{ ...styles.input, flex: "1 1 220px", minWidth: 0 }}
      placeholder="Example: Shell Rotella T4 15W-40"
      value={crossSearch}
      onChange={(e) => {
  setCrossSearch(e.target.value);
  setSelectedPackage("");
  setCrossReferenceResult(null);
  setCrossCatalogMap({});
}}
    />
      <button
        type="button"
        style={{
          ...styles.secondaryButton,
          flex: "0 1 auto",
          whiteSpace: "nowrap",
          minHeight: 44,
        }}
        onClick={() => handleOpenLabelScan("cross")}
      >
        📷 Scan Label
      </button>
    </div>

    <button
      type="button"
      style={{ ...styles.primaryButton, width: "100%", maxWidth: "100%" }}
      onClick={handleCrossReferenceSearch}
    >
      Search Cross Reference
    </button>
  </div>

  {crossReferenceResult && (
    <div style={{ marginTop: 24 }}>
      <div style={styles.eyebrow}>Recommended Matches</div>

      <div style={{ display: "grid", gap: 16, marginTop: 14 }}>
        {crossReferenceResult.recommendations.map((rec) => {
          const pds = findPds(rec.product);
const packages = crossCatalogMap[rec.product] || [];
          return (
            <div
              key={rec.tier}
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 14,
                padding: 22,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={styles.eyebrow}>Matched Product</div>
                <h3 style={{ margin: "6px 0" }}>
  {rec.product || "No Klondike match listed"}
</h3>
                  <p style={{ margin: 0 }}>
                    Replaces: {rec.competitorBrand} {rec.competitorProduct}
                  </p>
  {rec.product && (
  <button
    style={styles.primaryButton}
    onClick={() => {
      setQuoteItems((prev) => [
        ...prev,
        {
          competitor: `${rec.competitorBrand} ${rec.competitorProduct}`,
          klondike: rec.product,
          tier: rec.tier,
          packageSize: selectedPackage || "",
          price: 0,
        },
      ]);

      setDealerActiveTab("quote");
    }}
  >
    Add to Quote
  </button>
)}
                  {packages.length > 0 && (
  <div style={{ marginTop: 12 }}>
    <select
      style={styles.input}
      value={selectedPackage}
      onChange={(e) => setSelectedPackage(e.target.value)}
    >
      <option value="">Select Package</option>
      {packages.map((pkg) => (
        <option key={pkg.id || pkg.part_number || pkg.package_size} value={pkg.package_size}>
  {pkg.package_size} - ${Number(pkg.resale_price || 0).toFixed(2)}
</option>
      ))}
    </select>
  </div>
)}
                </div>
<button
  style={styles.primaryButton}
 onClick={() => {
  if (!selectedPackage) {
    alert("Select a package first");
    return;
  }

  const selectedPkg =
    packages.find((p) => p.package_size === selectedPackage) || {};

  setQuoteItems((prev) => [
    ...prev,
    {
      competitor: `${rec.competitorBrand} ${rec.competitorProduct}`,
      klondike: rec.product,
      tier: rec.tier || "Matched",
      packageSize: selectedPkg.package_size || selectedPackage || "",
      price: Number(selectedPkg.resale_price || 0),
      partNumber: selectedPkg.part_number || "",
      quantity: 1,
    },
  ]);

  setCompetitor(`${rec.competitorBrand} ${rec.competitorProduct}`);
  setKlondike(rec.product);
setTier(rec.tier || "Good");
  setKlondike(rec.product);
setTier(rec.tier || "Good");

  setDealerActiveTab("quote");
  setQuoteStep(2);
}}
>
  Add to Quote
</button>
              </div>

              {pds.why && (
                <div style={{ marginTop: 14 }}>
                  <strong>Technical Rationale</strong>
                  <p>{pds.why}</p>
                </div>
              )}

              {pds.specs && (
                <ul>
                  {pds.specs.map((spec, i) => (
                    <li key={i}>{spec}</li>
                  ))}
                </ul>
              )}

      {pds?.url && (
  <>
    <a
      href={pds.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#6b46c1" }}
    >
      View Product Data Sheet
    </a>

  </>
)}
            </div>
          );
        })}
      </div>
    </div>
  )}
</div>
        )}

        {dealerActiveTab === "library" && isRep && (
          <div style={styles.card}>
            <div style={styles.eyebrow}>QUOTE / PROPOSAL LIBRARY</div>
            <h3 style={styles.cardTitle}>Saved Quotes & Proposals</h3>
            <p style={styles.cardBody}>
              Draft quotes appear here now. Sent proposals will appear here once
              proposal generation is added.
            </p>

            <div style={styles.stack}>
              {myQuotes.length === 0 && (
                <p style={styles.muted}>No quotes or proposals yet.</p>
              )}

              {myQuotes.map((quote) => (
                <div key={quote.id} style={styles.listRow}>
                  <div>
                    <div style={styles.listTitle}>{quote.customer_name}</div>
                    <div style={styles.listMeta}>
                      {quote.competitor_product} → {quote.klondike_product}
                    </div>
                    <div style={styles.listMeta}>
                      {quote.status} •{" "}
                      {quote.customer_email || "No customer email"}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
  <span style={styles.statusPill}>{quote.status}</span>

  <button
    type="button"
    style={styles.secondaryButton}
    onClick={() => handleOpenSavedQuote(quote)}
  >
    Resume
  </button>
  <button
  type="button"
  style={{ ...styles.rejectButton }}
  onClick={() => handleDeleteQuote(quote.id)}
>
  Delete
</button>
  <button
  type="button"
  style={styles.primaryButton}
  onClick={async () => {
    await handleOpenSavedQuote(quote);
    setDealerActiveTab("proposal_view");
  }}
>
  View Proposal
</button>
</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {dealerActiveTab === "pds" && isRep && (
          <div style={styles.card}>
            <div style={styles.eyebrow}>PDS LIBRARY</div>
            <h3 style={styles.cardTitle}>Product data sheets (PDS)</h3>
            <p style={styles.cardBody}>
              Browse {PDS_LIBRARY_INDEX.length} Klondike product data sheets.
              Links open the PDF in a new tab.
            </p>

            <div
              style={{
                marginTop: 22,
                marginBottom: 6,
                padding: "22px 22px 24px",
                borderRadius: 18,
                background:
                  "linear-gradient(145deg, #0c1629 0%, #152036 42%, #1e293b 100%)",
                border: "1px solid rgba(246, 165, 49, 0.28)",
                boxShadow:
                  "0 14px 36px rgba(15, 23, 42, 0.32), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <div
                style={{
                  ...styles.eyebrow,
                  color: "#94a3b8",
                  opacity: 1,
                  letterSpacing: "0.08em",
                }}
              >
                TECHNICAL ADVISOR
              </div>
              <h4
                style={{
                  margin: "10px 0 0",
                  fontSize: 20,
                  fontWeight: 900,
                  color: "#f8fafc",
                  letterSpacing: "-0.02em",
                }}
              >
                Klondike Technical Advisor
              </h4>
              <p
                style={{
                  margin: "12px 0 18px",
                  fontSize: 14,
                  lineHeight: 1.58,
                  color: "#e2e8f0",
                  fontWeight: 600,
                }}
              >
                AI-assisted lubricant application guidance powered by Klondike
                product data and PDS documents.
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <button
                  type="button"
                  disabled
                  style={{
                    ...styles.secondaryButton,
                    opacity: 0.58,
                    cursor: "not-allowed",
                  }}
                >
                  Ask Technical Advisor
                </button>
                <span style={{ ...styles.listMeta, color: "#94a3b8" }}>
                  Coming soon
                </span>
              </div>
            </div>

            {Object.entries(
              PDS_LIBRARY_INDEX.reduce((acc, row) => {
                if (!acc[row.category]) acc[row.category] = [];
                acc[row.category].push(row);
                return acc;
              }, {})
            )
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([category, items]) => (
                <div key={category} style={{ marginTop: 22 }}>
                  <div
                    style={{
                      ...styles.eyebrow,
                      marginBottom: 10,
                      color: "#334155",
                      opacity: 1,
                    }}
                  >
                    {category}
                  </div>
                  <div style={{ ...styles.stack, gap: 10 }}>
                    {items
                      .slice()
                      .sort((x, y) =>
                        x.displayName.localeCompare(y.displayName)
                      )
                      .map((row) => (
                        <a
                          key={row.path}
                          className="kd-pds-doc-link"
                          href={row.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.pdsDocLink}
                        >
                          <span style={styles.pdsDocLinkMain}>
                            <span
                              style={styles.pdsDocLinkIconWrap}
                              aria-hidden
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ display: "block" }}
                              >
                                <path
                                  d="M8 3h7l5 5v13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
                                  stroke="currentColor"
                                  strokeWidth="1.75"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M14 3v4h4"
                                  stroke="currentColor"
                                  strokeWidth="1.75"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9 14h6M9 17h4"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </span>
                            <span style={styles.pdsDocLinkTitle}>
                              {row.displayName}
                            </span>
                          </span>
                          <span
                            className="kd-pds-doc-link-action"
                            style={styles.pdsDocLinkAction}
                          >
                            <span>Open PDF</span>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden
                              style={{ display: "block", flexShrink: 0 }}
                            >
                              <path
                                d="M9 5h10v10M19 5L6 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M15 5h4v4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </a>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        )}

        {dealerActiveTab === "company" && isDealerAdmin && (
          <div style={styles.card}>
            <div style={styles.eyebrow}>COMPANY PERFORMANCE</div>
            <h3 style={styles.cardTitle}>Dealer-Wide Business Performance</h3>
            <p style={styles.cardBody}>
              Company metrics and quote performance will appear here.
            </p>
          </div>
        )}

                {isManager && dealerActiveTab === "dashboard" && (
          <>
            <div style={{ ...styles.card, ...styles.dashboardCard }}>
              <div style={styles.eyebrow}>MANAGER DASHBOARD</div>
              <h3 style={styles.cardTitle}>Assigned Rep Performance</h3>
              <p style={styles.cardBody}>
                Monitor quote activity, proposals, customer responses, approval rate,
                and approved revenue for reps assigned to you.
              </p>

              <div style={styles.grid3}>
                <div
                  style={{ ...styles.summaryCard, ...styles.dashboardSummaryCard }}
                >
                  <div style={styles.summaryLabel}>Assigned Reps</div>
                                   <div style={styles.summaryValue}>
                    {
                      teamAssignments.filter(
                        (assignment) =>
                          assignment.manager_profile_id === session?.user?.id ||
                          assignment.manager_user_id === session?.user?.id
                      ).length
                    }
                  </div>
                </div>

                <div
                  style={{ ...styles.summaryCard, ...styles.dashboardSummaryCard }}
                >
                  <div style={styles.summaryLabel}>Quotes Created</div>
                  <div style={styles.summaryValue}>{repSnapshot.quotes}</div>
                </div>

                <div
                  style={{ ...styles.summaryCard, ...styles.dashboardSummaryCard }}
                >
                  <div style={styles.summaryLabel}>Proposals Sent</div>
                  <div style={styles.summaryValue}>{repSnapshot.proposalsSent}</div>
                </div>

                <div
                  style={{ ...styles.summaryCard, ...styles.dashboardSummaryCard }}
                >
                  <div style={styles.summaryLabel}>Customer Responses</div>
                  <div style={styles.summaryValue}>{repSnapshot.responses}</div>
                </div>

                <div
                  style={{ ...styles.summaryCard, ...styles.dashboardSummaryCard }}
                >
                  <div style={styles.summaryLabel}>Approved Revenue</div>
                  <div style={styles.summaryValue}>
                    ${Number(repSnapshot.approvedRevenue || 0).toLocaleString()}
                  </div>
                </div>

                <div
                  style={{ ...styles.summaryCard, ...styles.dashboardSummaryCard }}
                >
                  <div style={styles.summaryLabel}>Approval Rate</div>
                  <div style={styles.summaryValue}>{repSnapshot.approvalRate}%</div>
                </div>
              </div>
            </div>

            <div style={{ ...styles.card, ...styles.dashboardCard }}>
              <div style={styles.eyebrow}>PIPELINE</div>
              <h3 style={styles.cardTitle}>Assigned Rep Pipeline</h3>

              <div style={styles.grid2}>
                <div
                  style={{
                    ...styles.summaryCard,
                    ...styles.dashboardPipelineCard,
                    ...styles.pipelineAwaiting,
                  }}
                >
                  <div style={styles.summaryLabel}>Awaiting Review</div>
                  <div style={styles.summaryValue}>{pipeline.awaiting.length}</div>
                  <div style={styles.listMeta}>Proposals waiting on customer</div>
                </div>

                <div
                  style={{
                    ...styles.summaryCard,
                    ...styles.dashboardPipelineCard,
                    ...styles.pipelineReviewed,
                  }}
                >
                  <div style={styles.summaryLabel}>Reviewed</div>
                  <div style={styles.summaryValue}>{pipeline.reviewed.length}</div>
                  <div style={styles.listMeta}>Customer has responded</div>
                </div>

                <div
                  style={{
                    ...styles.summaryCard,
                    ...styles.dashboardPipelineCard,
                    ...styles.pipelineApproved,
                  }}
                >
                  <div style={styles.summaryLabel}>Approved</div>
                  <div style={styles.summaryValue}>{pipeline.approved.length}</div>
                  <div style={styles.listMeta}>Deals moving forward</div>
                </div>

                <div
                  style={{
                    ...styles.summaryCard,
                    ...styles.dashboardPipelineCard,
                    ...styles.pipelineFollowUp,
                  }}
                >
                  <div style={styles.summaryLabel}>Needs Follow-Up</div>
                  <div style={styles.summaryValue}>{pipeline.followUp.length}</div>
                  <div style={styles.listMeta}>Declined items requiring attention</div>
                </div>
              </div>
            </div>

            <div style={{ ...styles.card, ...styles.dashboardCard }}>
              <div style={styles.eyebrow}>DEALER LEADERBOARD</div>
              <h3 style={styles.cardTitle}>Rep Performance Rankings</h3>
              <p style={styles.cardBody}>
                Dealer-wide leaderboard remains visible so managers can compare team
                performance across the organization.
              </p>

              <div style={styles.stack}>
                {leaderboard.length === 0 ? (
                  <p style={styles.muted}>No representative performance data yet.</p>
                ) : (
                  leaderboard.map((rep, index) => (
                    <div
                      key={rep.name || index}
                      style={{
                        ...styles.listRow,
                        ...styles.dashboardLeaderboardRow,
                        background: index === 0 ? "#fffbeb" : "#fcfdff",
                        border:
                          index === 0
                            ? "1px solid #f5d478"
                            : "1px solid #e7edf3",
                        boxShadow:
                          index === 0
                            ? "var(--kd-dashboard-leaderboard-first-shadow)"
                            : "var(--kd-dashboard-leaderboard-row-shadow)",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 10,
                            marginBottom: 4,
                          }}
                        >
                          <div style={styles.listTitle}>
                            #{index + 1} {rep.name}
                          </div>
                          <LeaderboardBadgeTray
                            index={index}
                            proposals={rep.proposals}
                            approvalRate={rep.approvalRate}
                            revenue={rep.revenue}
                            approved={rep.approved}
                          />
                        </div>

                        <div style={styles.listMeta}>
                          {rep.proposals} proposal(s) • {rep.approvalRate}% approval •{" "}
                          {rep.approved} approved / {rep.declined} declined
                        </div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <div style={styles.listTitle}>
                          ${Number(rep.revenue || 0).toLocaleString()}
                        </div>
                        <div style={styles.listMeta}>Approved Revenue</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {isManager && dealerActiveTab === "team" && (
          <div style={styles.card}>
            <div style={styles.eyebrow}>TEAM</div>
            <h3 style={styles.cardTitle}>Assigned Representatives</h3>
            <p style={styles.cardBody}>
              View reps currently assigned to this manager.
            </p>

            <div style={styles.stack}>
                            {teamAssignments.filter(
                (assignment) =>
                  assignment.manager_profile_id === session?.user?.id ||
                  assignment.manager_user_id === session?.user?.id
              ).length === 0 && (
                <p style={styles.muted}>No reps assigned to this manager yet.</p>
              )}

                           {teamAssignments
                .filter(
                  (assignment) =>
                    assignment.manager_profile_id === session?.user?.id ||
                    assignment.manager_user_id === session?.user?.id
                )
                .map((assignment) => {
                  const assignedRep = repProfiles.find(
                    (rep) =>
                      rep.id === assignment.rep_profile_id ||
                      rep.user_id === assignment.rep_profile_id
                  );

                  return (
                  <div
                    key={assignment.id || assignment.rep_profile_id}
                    style={styles.listRow}
                  >
                    <div>
                      <div style={styles.listTitle}>
                        {assignedRep
                          ? `${assignedRep.first_name || ""} ${
                              assignedRep.last_name || ""
                            }`.trim()
                          : "Assigned Rep"}
                      </div>

                      <div style={styles.listMeta}>
                        {assignedRep?.email || assignment.rep_profile_id}
                      </div>
                    </div>

                    <span style={styles.statusPill}>Rep</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

               {dealerActiveTab === "request" && isManager && (
          <div style={styles.card}>
            <div style={styles.eyebrow}>ADD USERS</div>
            <h3 style={styles.cardTitle}>Request Manager / Rep Access</h3>
            <p style={styles.cardBody}>
              Submit a request for a new manager or rep. Klondike Admin approval
              is required before access is granted.
            </p>

            <form onSubmit={handleAccessRequest} style={styles.form}>
              <div style={styles.grid3}>
                <input
                  style={styles.input}
                  value={requestName}
                  onChange={(e) => setRequestName(e.target.value)}
                  placeholder="Full name"
                />

                <input
                  style={styles.input}
                  type="email"
                  value={requestEmail}
                  onChange={(e) => setRequestEmail(e.target.value)}
                  placeholder="user@dealer.com"
                />

                <select
                  style={styles.input}
                  value={requestRole}
                  onChange={(e) => setRequestRole(e.target.value)}
                >
                  <option value="manager">Manager</option>
                  <option value="rep">Rep</option>
                </select>
              </div>

              <textarea
                style={styles.textarea}
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
                placeholder="Why does this person need access?"
              />

              <button
                type="submit"
                disabled={requestLoading}
                style={styles.secondaryButton}
              >
                {requestLoading ? "Submitting..." : "Submit Access Request"}
              </button>
            </form>

            {requestMessage && <p style={styles.message}>{requestMessage}</p>}
          </div>
        )}
      </div>
    );
  }

  const renderRepView = () => (
    <div style={styles.grid24}>
      <div style={styles.heroCard}>
        <div style={styles.eyebrow}>REP</div>
        <h2 style={styles.heroTitle}>
          {activeMembership?.organization?.name || "Dealer"} Rep Dashboard
        </h2>
        <p style={styles.heroText}>
          Track your work, follow-ups, and assigned dealer activity.
        </p>
      </div>

      <div style={styles.grid3}>
        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>My Organization</div>
          <div style={styles.summaryValue}>
            {activeMembership?.organization?.name || "—"}
          </div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>My Role</div>
          <div style={styles.summaryValue}>Rep</div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Status</div>
          <div style={styles.summaryValue}>Active</div>
        </div>
      </div>
    </div>
  );

  const renderNoRole = () => (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>No active role</h3>
      <p style={styles.cardBody}>
        This account is signed in but does not currently have an active
        organization membership.
      </p>
    </div>
  );

  const renderRoleView = () => {
    if (!activeMembership) return renderNoRole();
    switch (activeMembership.role) {
      case "platform_admin":
        return renderPlatformAdminView();

      case "dealer_admin":
  return renderDealerAdminView();

case "manager":
case "rep":
  return (
    <DealerPortalShell
            activeMembership={activeMembership}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        );

      default:
        return renderNoRole();
    }
  };

  if (appLoading) {
    return (
      <div style={styles.page}>
        <div style={styles.authCard} className="auth-card-shell">
          <div style={styles.eyebrow}>KLONDIKE DEALER PLATFORM</div>
          <h1 style={styles.authTitle}>Loading...</h1>
          <p style={styles.authText}>
            Loading your session and organization access.
          </p>
        </div>
      </div>
    );
  }
  if (publicReviewToken) {
  return <PublicProposalPage token={publicReviewToken} />;
}
  if (!session) {
    return (
      <div style={styles.page}>
        <div style={styles.authCard} className="auth-card-shell">
          <img
            src="/klondike-full-logo.png"
            alt="Klondike"
            style={styles.logo}
          />
          <h1 style={styles.authTitle}>Sign In</h1>
          <p style={styles.authText}>
            Access the Klondike Dealer Platform with your authorized account.
          </p>

          <form onSubmit={handleLogin} style={styles.form}>
            <div>
              <label style={styles.authLabel}>Email</label>
              <input
                style={styles.authInput}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label style={styles.authLabel}>Password</label>
              <input
                style={styles.authInput}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              style={styles.primaryButton}
            >
              {authLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {authMessage && <p style={styles.error}>{authMessage}</p>}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.appShellLayout}>
        <header style={styles.shellTopBar}>
          <div style={styles.shellTopBarLeft}>
            <img
              src="/favicon.png"
              alt="Klondike"
              style={styles.shellHeaderLogo}
            />
            <h1 style={styles.shellBrandTitle}>
              KLONDIKE DEALER GROWTH PLATFORM
            </h1>
          </div>
          <div style={styles.shellTopBarRight}>
            <span style={styles.shellHeaderUser}>
              Signed in as{" "}
              <strong>{profile?.email || session.user.email}</strong>
            </span>
            <button
              type="button"
              onClick={handleLogout}
              style={styles.shellLogoutButton}
            >
              Log Out
            </button>
          </div>
        </header>

        <div style={styles.shellMain}>
          <div style={styles.shell}>
            {profile?.must_reset_password ? (
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Set Your Password</h3>
                <p style={styles.cardBody}>
                  You signed in with a temporary password. Please create a new one
                  to continue.
                </p>

                <form onSubmit={handleResetPassword} style={styles.form}>
                  <div style={styles.grid2}>
                    <div>
                      <label style={styles.label}>New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={styles.input}
                        required
                      />
                    </div>

                    <div>
                      <label style={styles.label}>Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        style={styles.input}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={passwordResetLoading}
                    style={styles.primaryButton}
                  >
                    {passwordResetLoading ? "Updating..." : "Save New Password"}
                  </button>
                </form>

                {passwordResetMessage && (
                  <p style={styles.cardBody}>{passwordResetMessage}</p>
                )}
              </div>
            ) : (
              <>
                {authMessage && <p style={styles.error}>{authMessage}</p>}
                {renderRoleView()}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
function PublicProposalPage({ token }) {
  const [quote, setQuote] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [decisions, setDecisions] = React.useState({});
  const [feedback, setFeedback] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
const [equipment, setEquipment] = React.useState([]);
const [equipmentDecisions, setEquipmentDecisions] = React.useState({});
const [equipmentFeedback, setEquipmentFeedback] = React.useState({});
  React.useEffect(() => {
    const load = async () => {
      const { data: quoteData, error: quoteError } = await supabase
        .from("quotes")
        .select("*")
        .eq("review_token", token)
        .maybeSingle();

      if (quoteError) {
        console.error("Public quote load error:", quoteError.message);
        return;
      }

      if (!quoteData) return;

      const { data: itemData, error: itemError } = await supabase
        .from("quote_items")
        .select("*")
        .eq("quote_id", quoteData.id)
        .order("created_at", { ascending: true });

      if (itemError) {
        console.error("Public quote items load error:", itemError.message);
      }
const { data: equipmentData, error: equipmentError } = await supabase
  .from("quote_equipment")
  .select("*")
  .eq("quote_id", quoteData.id)
  .order("created_at", { ascending: true });

if (equipmentError) {
  console.error("Public equipment load error:", equipmentError.message);
}

setQuote(quoteData);
setItems(itemData || []);
setEquipment(equipmentData || []);
    };

    load();
  }, [token]);

  const formatMoney = (value) => `$${Number(value || 0).toFixed(2)}`;

  const normalize = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/[®™]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

  const findPublicPds = (productName) => {
    if (!productName) return null;

    const normalized = normalize(productName);

    if (PDS_MAP?.[productName]) return PDS_MAP[productName];

    for (const entry of Object.values(PDS_MAP || {})) {
      if (normalize(entry?.name) === normalized) return entry;

      if (
        Array.isArray(entry?.aliases) &&
        entry.aliases.some((alias) => normalize(alias) === normalized)
      ) {
        return entry;
      }
    }

    return null;
  };

  const total = items.reduce(
    (sum, item) => sum + Number(item.total_price || item.unit_price || 0),
    0
  );

  const handleSubmit = async () => {
    const missing = items.filter((_, index) => !decisions[index]);

const missingEquipment = equipment.filter(
  (_, index) => !equipmentDecisions[index]
);

    if (missing.length > 0 || missingEquipment.length > 0) {
  alert("Please approve or decline each product and equipment recommendation before submitting.");
  return;
}

    setSubmitting(true);

    const responsePayload = items.map((item, index) => ({
      quote_item_id: item.id,
      product: item.klondike_product || item.product_name,
      package: item.package || "",
      price: item.total_price || item.unit_price || 0,
      decision: decisions[index],
      feedback: feedback[index] || "",
    }));
const equipmentPayload = equipment.map((item, index) => ({
  quote_equipment_id: item.id,
  product: item.equipment_name,
  package: "Equipment",
  price: item.total_price || item.unit_price || 0,
  decision: equipmentDecisions[index],
  feedback: equipmentFeedback[index] || "",
  type: "equipment",
}));
    const { error } = await supabase.from("proposal_responses").insert({
      quote_id: quote.id,
      decision_data: {
        customer_name: quote.customer_name,
        customer_email: quote.customer_email,
        rep_name: quote.rep_name,
        rep_email: quote.rep_email,
        responses: responsePayload,
equipment: equipmentPayload,
      },
    });

    if (error) {
      setSubmitting(false);
      alert("Failed to submit response.");
      console.error(error);
      return;
    }

    await supabase
      .from("quotes")
      .update({ review_status: "submitted" })
      .eq("id", quote.id);

   const allResponses = [...responsePayload, ...equipmentPayload];

const approved = allResponses.filter((row) => row.decision === "approved");
const declined = allResponses.filter((row) => row.decision === "declined");

    const { error: emailError } = await supabase.functions.invoke(
      "send-proposal-reviewed-email",
      {
        body: {
          repEmail: quote.rep_email,
          repName: quote.rep_name || "Sales Representative",
          customerName: quote.customer_name,
          customerEmail: quote.customer_email,
          approved,
          declined,
        },
      }
    );

    if (emailError) {
      console.error("Rep notification email failed:", emailError);
    }

    setSubmitting(false);
    setSubmitted(true);
  };
const dealerDisplayName = quote?.dealer_name || "Your Dealer";

const executiveSummary =
  quote?.intro_statement ||
  `Based on our review of your current lubrication program and operating requirements, this recommendation outlines a lubrication strategy designed to improve equipment reliability, simplify product selection, reduce contamination risk, and support long-term operating performance.`;

const closingStatement =
  quote?.closing_statement ||
  `We appreciate the opportunity to support your operation. Your representative will follow up to review next steps and ensure a smooth implementation.`;  if (!quote) {
    return <div style={{ padding: 40 }}>Loading proposal...</div>;
  }

  if (submitted || quote.review_status === "submitted") {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 520,
          width: "100%",
          background: "#ffffff",
          borderRadius: 16,
          padding: 36,
          textAlign: "center",
          border: "1px solid #e5e7eb",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
        }}
      >
        <div style={{ fontSize: 42, marginBottom: 12 }}>✅</div>

        <h1 style={{ margin: "0 0 12px", color: "#0a2540" }}>
          Response Submitted
        </h1>

        <p style={{ color: "#475569", lineHeight: 1.6, marginBottom: 20 }}>
          Thank you for reviewing your Klondike lubrication recommendation.
          Your responses have been successfully submitted.
        </p>

        <div
          style={{
            background: "#f8fafc",
            borderRadius: 10,
            padding: 16,
            fontSize: 14,
            color: "#334155",
            marginBottom: 18,
          }}
        >
          Your {dealerDisplayName} representative has been notified and will follow up with
          you shortly to review next steps.
        </div>

        <div style={{ fontSize: 13, color: "#94a3b8" }}>
          If you have any immediate questions, please contact your representative
          directly.
        </div>
      </div>
    </div>
  );
}

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #0a2540 0%, #1a3f5e 100%)",
          color: "#fff",
          borderBottom: "6px solid #f6a531",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "36px 32px" }}>
          {quote.dealer_logo_url && (
  <img
    src={quote.dealer_logo_url}
    alt="Dealer Logo"
    style={{
      maxHeight: 90,
      maxWidth: 240,
      objectFit: "contain",
      marginBottom: 18,
      background: "#fff",
      padding: 10,
      borderRadius: 14,
    }}
  />
)}
          <div style={{ fontSize: 28, fontWeight: 900 }}>
            {dealerDisplayName} Lubrication Recommendation
          </div>

          <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>
            Prepared for <strong>{quote.customer_name || "Customer"}</strong>
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.2 }}>
              Improving Equipment Reliability &
              <br />
              Reducing Operating Cost
            </div>

            <div style={{ fontSize: 15, opacity: 0.85, marginTop: 12 }}>
              Review each product recommendation below and submit your response.
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 32px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: 28,
            marginBottom: 28,
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase", color: "#64748b", marginBottom: 14 }}>
            Customer Profile
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            <div>
              <div style={{ color: "#64748b", fontSize: 13, fontWeight: 800 }}>Company</div>
              <div style={{ color: "#0a2540", fontWeight: 900 }}>{quote.customer_name || "—"}</div>
            </div>

            <div>
              <div style={{ color: "#64748b", fontSize: 13, fontWeight: 800 }}>Email</div>
              <div style={{ color: "#0a2540", fontWeight: 900 }}>{quote.customer_email || "—"}</div>
            </div>

            <div>
              <div style={{ color: "#64748b", fontSize: 13, fontWeight: 800 }}>Industry</div>
              <div style={{ color: "#0a2540", fontWeight: 900 }}>{quote.industry || "—"}</div>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: 28,
            marginBottom: 32,
            border: "1px solid #e5e7eb",
            borderLeft: "6px solid #f6a531",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase", color: "#64748b", marginBottom: 12 }}>
            Executive Summary
          </div>

          <p style={{ fontSize: 16, lineHeight: 1.8, color: "#1f2937", margin: 0 }}>
  {executiveSummary}
</p>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 900,
              textTransform: "uppercase",
              color: "#0a2540",
              letterSpacing: 1,
              marginBottom: 20,
            }}
          >
            Product Recommendations
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            {items.map((item, index) => {
              const productName = item.klondike_product || item.product_name || "Recommended Product";
              const price = Number(item.total_price || item.unit_price || 0);
              const pds = findPublicPds(productName);

              return (
                <div
                  key={item.id || index}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 14,
                    padding: 20,
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: "#0a2540" }}>
                        {productName}
                      </div>

                      <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
                        Replaces: {item.competitor_name || "Current product"}
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "#64748b", fontSize: 13 }}>Line Total</div>
                      <div style={{ fontWeight: 900, color: "#f6a531", fontSize: 18 }}>
                        {formatMoney(price)}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 12,
                      marginTop: 16,
                      padding: 14,
                      borderRadius: 10,
                      background: "#f8fafc",
                    }}
                  >
                    <div>
                      <div style={{ color: "#64748b", fontSize: 12 }}>Package</div>
                      <div style={{ fontWeight: 900, color: "#0a2540" }}>{item.package || "—"}</div>
                    </div>

                    <div>
                      <div style={{ color: "#64748b", fontSize: 12 }}>Qty</div>
                      <div style={{ fontWeight: 900, color: "#0a2540" }}>{item.quantity || 1}</div>
                    </div>

                    <div>
                      <div style={{ color: "#64748b", fontSize: 12 }}>Unit Price</div>
                      <div style={{ fontWeight: 900, color: "#0a2540" }}>
                        {formatMoney(item.unit_price || price)}
                      </div>
                    </div>

                    <div>
                      <div style={{ color: "#64748b", fontSize: 12 }}>Part #</div>
                      <div style={{ fontWeight: 900, color: "#0a2540" }}>{item.part_number || "—"}</div>
                    </div>
                  </div>

                  <div style={{ marginTop: 14 }}>
  <div style={{ fontWeight: 900, color: "#0a2540", marginBottom: 4 }}>
    Why This Recommendation
  </div>

  <div style={{ fontSize: 13, color: "#334155", lineHeight: 1.6 }}>
    {pds?.why ||
      "This product was selected based on your equipment requirements, operating conditions, and performance needs to improve reliability, reduce wear, and support longer service intervals."}
  </div>
</div>
<div style={{ fontSize: 12, color: "#64748b", marginTop: 8 }}>
  ✔ Proven performance in demanding applications  
  ✔ Designed to support equipment longevity  
  ✔ Backed by Klondike technical standards
</div>

                  {Array.isArray(pds?.specs) && pds.specs.length > 0 && (
                    <div style={{ marginTop: 8 }}>
                      <strong style={{ fontSize: 13 }}>Specs:</strong>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
                        {pds.specs.slice(0, 4).join(" • ")}
                      </div>
                    </div>
                  )}

                  {pds?.url && (
                    <div style={{ marginTop: 10 }}>
                      <a
                        href={pds.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 13,
                          fontWeight: 900,
                          color: "#f6a531",
                          textDecoration: "none",
                        }}
                      >
                        View Product Data Sheet →
                      </a>
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      marginTop: 16,
                      paddingTop: 16,
                      borderTop: "1px solid #e5e7eb",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setDecisions((prev) => ({ ...prev, [index]: "approved" }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: 8,
                        border:
                          decisions[index] === "approved"
                            ? "2px solid #16a34a"
                            : "1px solid #d1d5db",
                        background:
                          decisions[index] === "approved" ? "#dcfce7" : "#fff",
                        color: "#166534",
                        fontWeight: 900,
                        cursor: "pointer",
                      }}
                    >
                      Approve
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setDecisions((prev) => ({ ...prev, [index]: "declined" }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: 8,
                        border:
                          decisions[index] === "declined"
                            ? "2px solid #dc2626"
                            : "1px solid #d1d5db",
                        background:
                          decisions[index] === "declined" ? "#fee2e2" : "#fff",
                        color: "#991b1b",
                        fontWeight: 900,
                        cursor: "pointer",
                      }}
                    >
                      Decline
                    </button>
                  </div>

                  {decisions[index] === "declined" && (
                    <textarea
                      placeholder="Optional: Tell us why this recommendation does not fit."
                      value={feedback[index] || ""}
                      onChange={(e) =>
                        setFeedback((prev) => ({
                          ...prev,
                          [index]: e.target.value,
                        }))
                      }
                      style={{
                        width: "100%",
                        minHeight: 70,
                        marginTop: 12,
                        padding: 12,
                        borderRadius: 8,
                        border: "1px solid #d1d5db",
                        boxSizing: "border-box",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
{equipment.length > 0 && (
  <div style={{ marginBottom: 32 }}>
    <div
      style={{
        fontSize: 13,
        fontWeight: 900,
        textTransform: "uppercase",
        color: "#0a2540",
        letterSpacing: 1,
        marginBottom: 20,
      }}
    >
      Recommended Equipment & Support
    </div>

    <div style={{ display: "grid", gap: 16 }}>
      {equipment.map((item, index) => {
        const totalPrice = Number(item.total_price || 0);

        return (
          <div
            key={item.id || index}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 14,
              padding: 20,
              background: "#fff",
              boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#0a2540" }}>
                  {item.equipment_name}
                </div>

                <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
                  Qty: {item.quantity || 1}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#64748b", fontSize: 13 }}>Line Total</div>
                <div style={{ fontWeight: 900, color: "#f6a531", fontSize: 18 }}>
                  ${totalPrice.toFixed(2)}
                </div>
              </div>
            </div>

            <div style={{ fontSize: 13, color: "#334155", lineHeight: 1.6, marginTop: 14 }}>
              <strong>Purpose:</strong> Supports clean lubricant handling,
              dispensing control, storage organization, and reduced contamination risk.
            </div>

            {/* APPROVE / DECLINE */}
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 16,
                paddingTop: 16,
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setEquipmentDecisions((prev) => ({
                    ...prev,
                    [index]: "approved",
                  }))
                }
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  border:
                    equipmentDecisions[index] === "approved"
                      ? "2px solid #16a34a"
                      : "1px solid #d1d5db",
                  background:
                    equipmentDecisions[index] === "approved" ? "#dcfce7" : "#fff",
                  color: "#166534",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Approve
              </button>

              <button
                type="button"
                onClick={() =>
                  setEquipmentDecisions((prev) => ({
                    ...prev,
                    [index]: "declined",
                  }))
                }
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  border:
                    equipmentDecisions[index] === "declined"
                      ? "2px solid #dc2626"
                      : "1px solid #d1d5db",
                  background:
                    equipmentDecisions[index] === "declined" ? "#fee2e2" : "#fff",
                  color: "#991b1b",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Decline
              </button>
            </div>

            {/* FEEDBACK */}
            {equipmentDecisions[index] === "declined" && (
              <textarea
                placeholder="Optional: Tell us why this equipment does not fit."
                value={equipmentFeedback[index] || ""}
                onChange={(e) =>
                  setEquipmentFeedback((prev) => ({
                    ...prev,
                    [index]: e.target.value,
                  }))
                }
                style={{
                  width: "100%",
                  minHeight: 70,
                  marginTop: 12,
                  padding: 12,
                  borderRadius: 8,
                  border: "1px solid #d1d5db",
                  boxSizing: "border-box",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  </div>
)}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: 14,
            padding: 28,
            marginBottom: 32,
            border: "1px solid #e5e7eb",
          }}
        >
          
          <div style={{ fontSize: 13, fontWeight: 900, textTransform: "uppercase", color: "#0a2540", marginBottom: 12 }}>
            Program Value
          </div>

          <p style={{ margin: 0, color: "#334155", lineHeight: 1.8 }}>
            This lubrication program is designed to improve equipment reliability, reduce downtime risk,
            and simplify product selection across your operation. By aligning product performance,
            packaging strategy, and contamination control practices, this solution supports long-term
            operating efficiency and reduced maintenance costs.
          </p>
        </div>

        <div
          style={{
            background: "#0a2540",
            color: "#fff",
            borderRadius: 14,
            padding: 28,
            marginBottom: 32,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 900, textTransform: "uppercase", opacity: 0.8, marginBottom: 16 }}>
            Investment Summary
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 900 }}>
            <span>Total Investment</span>
            <span>{formatMoney(total)}</span>
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: 14,
            padding: 28,
            marginBottom: 32,
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 900, textTransform: "uppercase", color: "#0a2540", marginBottom: 16 }}>
            Implementation Plan
          </div>

          {[
            ["Phase 1: Alignment & Planning", "Review product recommendations, confirm requirements, and align teams on transition priorities."],
            ["Phase 2: Product Transition", "Begin transitioning key equipment and applications to recommended Klondike products."],
            ["Phase 3: Equipment & Handling Optimization", "Implement proper storage and dispensing practices to reduce contamination risk."],
            ["Phase 4: Monitoring & Optimization", "Monitor performance, adjust as needed, and optimize for long-term reliability."],
          ].map(([title, body]) => (
            <div
              key={title}
              style={{
                padding: 14,
                borderRadius: 10,
                background: "#f8fafc",
                borderLeft: "4px solid #f6a531",
                color: "#0a2540",
                marginBottom: 12,
              }}
            >
              <strong>{title}</strong>
              <div style={{ fontSize: 13, marginTop: 6, color: "#334155" }}>
                {body}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: 28,
            marginBottom: 32,
            border: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 900,
              textTransform: "uppercase",
              color: "#0a2540",
              marginBottom: 16,
            }}
          >
            Prepared By
          </div>

          <div style={{ fontWeight: 900, fontSize: 16, color: "#0a2540" }}>
            {quote.rep_name || "Sales Representative"}
          </div>

          <div style={{ color: "#64748b", marginTop: 4 }}>
           {quote.rep_email || `${dealerDisplayName} Representative`}
          </div>

          {quote.rep_signature && (
            <div style={{ marginTop: 18 }}>
              <div style={{ fontSize: 13, color: "#64748b", marginBottom: 8 }}>
                Representative Signature
              </div>
              <img
                src={quote.rep_signature}
                alt="Representative Signature"
                style={{
                  maxWidth: 360,
                  width: "100%",
                  border: "1px solid #e5e7eb",
                  borderRadius: 10,
                  background: "#fff",
                }}
              />
            </div>
          )}
        </div>
<div
  style={{
    background: "#fff",
    borderRadius: 14,
    padding: 28,
    marginBottom: 32,
    border: "1px solid #e5e7eb",
    borderLeft: "6px solid #f6a531",
  }}
>
  <div
    style={{
      fontSize: 12,
      fontWeight: 900,
      textTransform: "uppercase",
      color: "#64748b",
      marginBottom: 12,
    }}
  >
    Next Steps
  </div>

  <p style={{ fontSize: 16, lineHeight: 1.8, color: "#1f2937", margin: 0 }}>
    {closingStatement}
  </p>
</div>
<div
  style={{
    marginBottom: 16,
    padding: 16,
    borderRadius: 10,
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
    fontSize: 14,
    color: "#334155",
  }}
>
  Please review each recommendation carefully. Once submitted, your
  representative will follow up with you to confirm next steps and support
  implementation.
</div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          style={{
            width: "100%",
            padding: 18,
            borderRadius: 10,
            border: "none",
            background: "linear-gradient(180deg, #f6a531 0%, #d87400 100%)",
            color: "#fff",
            fontSize: 16,
            fontWeight: 900,
            cursor: submitting ? "not-allowed" : "pointer",
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 40,
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? "Submitting..." : "Submit Proposal Decisions"}
        </button>
      </div>
    </div>
  );
}
const styles = {
    page: {
    minHeight: "var(--kd-page-min-height)",
    background: "var(--kd-page-background)",
    padding: "var(--kd-page-padding)",
    boxSizing: "border-box",
    color: "var(--kd-page-color)",
    overflowX: "var(--kd-page-overflow-x)",
  },

    shell: {
    maxWidth: "var(--kd-shell-max-width)",
    margin: "0 auto",
    display: "grid",
    gap: "var(--kd-shell-gap)",
    width: "100%",
    minWidth: 0,
  },

  appShellLayout: {
    position: "relative",
    minHeight: "calc(100vh - (var(--kd-page-padding) * 2))",
    textAlign: "left",
  },

  shellTopBar: {
    position: "fixed",
    top: "var(--kd-page-padding)",
    left: "var(--kd-page-padding)",
    right: "var(--kd-page-padding)",
    height: "var(--kd-shell-header-height)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    padding: "0 18px",
    boxSizing: "border-box",
    background: "var(--kd-shell-header-background)",
    border: "var(--kd-shell-header-border)",
    borderRadius: "var(--kd-shell-header-radius)",
    boxShadow: "var(--kd-shell-header-shadow)",
    backdropFilter: "blur(14px)",
    zIndex: 45,
    flexWrap: "wrap",
  },

  shellTopBarLeft: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    minWidth: 0,
    flex: "1 1 auto",
  },

  shellTopBarRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexShrink: 0,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },

  shellHeaderLogo: {
    height: "var(--kd-shell-header-logo-height)",
    width: "auto",
    objectFit: "contain",
    flexShrink: 0,
    display: "block",
  },

  shellBrandTitle: {
    margin: 0,
    fontSize: "var(--kd-shell-brand-font-size)",
    fontWeight: 900,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: "#fff",
    lineHeight: 1.2,
    flex: "1 1 160px",
    minWidth: 0,
    textAlign: "left",
  },

  shellHeaderUser: {
    fontSize: 12,
    color: "var(--kd-sidebar-nav-muted)",
    maxWidth: "min(42vw, 320px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  shellLogoutButton: {
    padding: "8px 16px",
    borderRadius: 11,
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    fontWeight: 800,
    fontSize: 14,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  portalCommandBar: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
    padding: "var(--kd-portal-command-padding)",
    borderRadius: "var(--kd-portal-command-radius)",
    background: "var(--kd-portal-command-background)",
    border: "var(--kd-portal-command-border)",
    boxShadow: "var(--kd-portal-command-shadow)",
    marginBottom: 4,
    minWidth: 0,
  },

  portalTabButton: {
    padding: "var(--kd-portal-tab-padding-y) var(--kd-portal-tab-padding-x)",
    minHeight: "var(--kd-portal-tab-min-height)",
    borderRadius: "var(--kd-portal-tab-radius)",
    border: "var(--kd-portal-tab-border)",
    background: "var(--kd-portal-tab-background)",
    color: "var(--kd-portal-tab-color)",
    fontSize: "var(--kd-portal-tab-font-size)",
    fontWeight: "var(--kd-font-weight-heavy)",
    cursor: "pointer",
    boxSizing: "border-box",
    transition:
      "border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease, transform 0.12s ease",
    outline: "none",
  },

  portalTabButtonActive: {
    border: "var(--kd-portal-tab-active-border)",
    background: "var(--kd-portal-tab-active-background)",
    color: "var(--kd-portal-tab-active-color)",
    boxShadow: "var(--kd-portal-tab-active-shadow)",
  },

  workflowTabBar: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 18,
    minWidth: 0,
  },

  workflowTab: {
    padding: "var(--kd-portal-tab-padding-y) var(--kd-portal-tab-padding-x)",
    minHeight: "var(--kd-portal-tab-min-height)",
    borderRadius: "var(--kd-portal-tab-radius)",
    border: "1px solid #cbd5e1",
    background: "#f8fafc",
    color: "#0f172a",
    fontSize: "var(--kd-portal-tab-font-size)",
    fontWeight: "var(--kd-font-weight-heavy)",
    cursor: "pointer",
    boxSizing: "border-box",
    textTransform: "capitalize",
    transition:
      "border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease, transform 0.12s ease",
    outline: "none",
  },

  workflowTabActive: {
    border: "var(--kd-portal-tab-active-border)",
    background: "var(--kd-portal-tab-active-background)",
    color: "var(--kd-portal-tab-active-color)",
    boxShadow: "var(--kd-portal-tab-active-shadow)",
  },

  shellMain: {
    marginLeft: 0,
    minWidth: 0,
    width: "100%",
    maxWidth: "100%",
    paddingTop: "var(--kd-shell-content-offset-top)",
    boxSizing: "border-box",
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
    gap: 18,
    width: "100%",
    minWidth: 0,
  },

   card: {
    background: "var(--kd-card-background)",
    color: "var(--kd-card-color)",
    borderRadius: "var(--kd-card-border-radius)",
    padding: "var(--kd-card-padding)",
    border: "var(--kd-card-border)",
    boxShadow: "var(--kd-card-shadow)",
    overflow: "hidden",
    minWidth: 0,
    boxSizing: "border-box",
  },

  form: {
    display: "grid",
    gap: "var(--kd-form-gap)",
    width: "100%",
    minWidth: 0,
  },

  input: {
    display: "block",
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    height: "var(--kd-input-height)",
    padding:
      "var(--kd-input-padding-y) var(--kd-input-padding-x)",
    borderRadius: "var(--kd-input-border-radius)",
    border: "var(--kd-input-border)",
    backgroundColor: "var(--kd-input-background)",
    color: "var(--kd-input-color)",
    boxSizing: "border-box",
    fontSize: "var(--kd-input-font-size)",
    lineHeight: "var(--kd-input-line-height)",
    boxShadow: "var(--kd-input-shadow)",
    outline: "none",
  },

  textarea: {
    display: "block",
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    minHeight: "var(--kd-textarea-min-height)",
    padding:
      "var(--kd-textarea-padding-y) var(--kd-input-padding-x)",
    borderRadius: "var(--kd-input-border-radius)",
    border: "var(--kd-input-border)",
    backgroundColor: "var(--kd-input-background)",
    color: "var(--kd-input-color)",
    boxSizing: "border-box",
    resize: "vertical",
    fontSize: "var(--kd-input-font-size)",
    lineHeight: "var(--kd-input-line-height)",
    boxShadow: "var(--kd-input-shadow)",
    outline: "none",
  },

  topHero: {
  background: "var(--kd-top-hero-background)",
  border: "var(--kd-top-hero-border)",
  borderRadius: "var(--kd-top-hero-border-radius)",
  padding: "var(--kd-top-hero-padding)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "var(--kd-top-hero-gap)",
},

  logo: {
  width: 150,
  height: "auto",
},

  eyebrow: {
    fontSize: 12,
    letterSpacing: "0.18em",
    fontWeight: 800,
    opacity: 0.72,
    marginBottom: 8,
    textTransform: "uppercase",
  },

  sectionHeader: {
    fontSize: 14,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 800,
    color: "#cbd5e1",
    marginBottom: 10,
  },

  pageTitle: {
  fontSize: "var(--kd-page-title-font-size)",
  fontWeight: "var(--kd-font-weight-black)",
  letterSpacing: "var(--kd-page-title-letter-spacing)",
  color: "#fff",
  margin: "6px 0 0",
},

  demoBar: {
    display: "flex",
    justifyContent: "space-between",
    gap: 18,
    flexWrap: "wrap",
    padding: 18,
    borderRadius: 20,
    background: "rgba(7,16,32,0.72)",
    border: "1px solid rgba(255,255,255,0.08)",
    minWidth: 0,
  },

  demoTitle: {
    fontSize: 20,
    fontWeight: 900,
    marginBottom: 6,
  },

  demoText: {
    fontSize: 15,
    lineHeight: 1.45,
    opacity: 0.9,
  },

  demoButtons: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
  },

  topCard: {
    padding: 22,
    borderRadius: 22,
    background: "rgba(7,16,32,0.72)",
    border: "1px solid rgba(255,255,255,0.08)",
    minWidth: 0,
  },

  topCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
    flexWrap: "wrap",
  },

  topCardTitle: {
    margin: 0,
    fontSize: 28,
    fontWeight: 900,
  },

  roleBadge: {
    display: "inline-block",
    padding:
      "var(--kd-role-badge-padding-y) var(--kd-role-badge-padding-x)",
    borderRadius: "var(--kd-role-badge-border-radius)",
    background: "var(--kd-role-badge-background)",
    color: "var(--kd-role-badge-color)",
    fontWeight: "var(--kd-font-weight-bold)",
    textTransform: "uppercase",
    letterSpacing: "var(--kd-role-badge-letter-spacing)",
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
    minWidth: 0,
  },

    summaryCard: {
    background: "var(--kd-summary-card-background)",
    color: "var(--kd-summary-card-color)",
    borderRadius: "var(--kd-summary-card-border-radius)",
    padding: "var(--kd-summary-card-padding)",
    border: "var(--kd-summary-card-border)",
    boxShadow: "var(--kd-summary-card-shadow)",
    minWidth: 0,
  },

  dashboardCard: {
    borderRadius: 26,
    padding: 28,
    boxShadow: "var(--kd-dashboard-card-shadow)",
    border: "var(--kd-dashboard-card-border)",
  },

  dashboardSummaryCard: {
    borderRadius: 20,
    padding: "22px 22px 24px",
    background: "var(--kd-dashboard-metric-background)",
    border: "var(--kd-dashboard-metric-border)",
    boxShadow: "var(--kd-dashboard-metric-shadow)",
  },

  dashboardLeaderboardRow: {
    padding: "18px 20px",
    borderRadius: 18,
    background: "#fcfdff",
    border: "1px solid rgba(226, 232, 240, 0.9)",
    boxShadow: "var(--kd-dashboard-leaderboard-row-shadow)",
    transition:
      "transform 180ms ease, box-shadow 200ms ease, border-color 200ms ease",
  },

  dashboardPipelineCard: {
    borderRadius: 20,
    padding: "22px 22px 20px",
    background: "#fff",
    border: "var(--kd-dashboard-pipeline-border)",
    boxShadow: "var(--kd-dashboard-pipeline-shadow)",
    transition:
      "transform 180ms ease, box-shadow 200ms ease, border-color 200ms ease",
  },

  pipelineAwaiting: {
    borderLeft: "4px solid #94a3b8",
    background: "linear-gradient(95deg, #f4f6f8 0%, #fafcfd 48%)",
  },

  pipelineReviewed: {
    borderLeft: "4px solid #60a5fa",
    background: "linear-gradient(95deg, #e8f3ff 0%, #f5faff 55%)",
  },

  pipelineApproved: {
    borderLeft: "4px solid #22c55e",
    background: "linear-gradient(95deg, #e8faf0 0%, #f4fcf7 55%)",
  },

  pipelineFollowUp: {
    borderLeft: "4px solid #f87171",
    background: "linear-gradient(95deg, #fef2f2 0%, #fffbfb 55%)",
  },

  summaryLabel: {
    fontSize: "var(--kd-summary-label-font-size)",
    letterSpacing: "var(--kd-summary-label-letter-spacing)",
    textTransform: "uppercase",
    fontWeight: "var(--kd-font-weight-bold)",
    color: "var(--kd-summary-label-color)",
    marginBottom: "var(--kd-summary-label-margin-bottom)",
  },

  summaryValue: {
    fontSize: "var(--kd-summary-value-font-size)",
    fontWeight: "var(--kd-font-weight-heavy)",
    lineHeight: "var(--kd-summary-value-line-height)",
  },

  grid24: {
    display: "grid",
    gap: "var(--kd-grid24-gap)",
    minWidth: 0,
  },

  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
    minWidth: 0,
  },

 heroCard: {
  background: "var(--kd-hero-card-background)",
  border: "var(--kd-hero-card-border)",
  borderRadius: "var(--kd-hero-card-border-radius)",
  padding: "var(--kd-hero-card-padding)",
  boxShadow: "var(--kd-hero-card-shadow)",
},

  heroTitle: {
    margin: "var(--kd-hero-title-margin)",
    fontSize: "var(--kd-hero-title-font-size)",
    fontWeight: "var(--kd-font-weight-heavy)",
  },

  heroText: {
  marginTop: "var(--kd-hero-text-margin-top)",
  fontSize: "var(--kd-hero-text-font-size)",
  color: "var(--kd-hero-text-color)",
  fontWeight: "var(--kd-font-weight-semibold)",
},

  cardTitle: {
    margin: "var(--kd-card-title-margin)",
    fontSize: "var(--kd-card-title-font-size)",
    fontWeight: "var(--kd-font-weight-heavy)",
    color: "var(--kd-card-title-color)",
  },

  cardBody: {
    margin: "var(--kd-card-body-margin)",
    color: "var(--kd-card-body-color)",
    lineHeight: "var(--kd-card-body-line-height)",
    fontSize: "var(--kd-card-body-font-size)",
  },

  label: {
    display: "block",
    marginBottom: "var(--kd-label-margin-bottom)",
    fontWeight: "var(--kd-label-font-weight)",
    fontSize: "var(--kd-label-font-size)",
    color: "var(--kd-label-color)",
  },

  primaryButton: {
    padding:
      "var(--kd-button-padding-y) var(--kd-button-padding-x)",
    borderRadius: "var(--kd-button-border-radius)",
    border: "none",
    background: "var(--kd-primary-button-background)",
    color: "var(--kd-primary-button-color)",
    fontWeight: "var(--kd-font-weight-heavy)",
    cursor: "pointer",
    fontSize: "var(--kd-button-font-size)",
    boxShadow: "var(--kd-primary-button-shadow)",
  },

  secondaryButton: {
    padding:
      "var(--kd-button-padding-y) var(--kd-button-padding-x)",
    borderRadius: "var(--kd-button-border-radius)",
    border: "var(--kd-secondary-button-border)",
    background: "var(--kd-secondary-button-background)",
    color: "var(--kd-secondary-button-color)",
    fontWeight: "var(--kd-font-weight-heavy)",
    cursor: "pointer",
    fontSize: "var(--kd-button-font-size)",
    boxShadow: "var(--kd-secondary-button-shadow)",
  },

  smallButton: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: 15,
    boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
  },

  approveButton: {
    padding: "11px 16px",
    borderRadius: "var(--kd-button-border-radius)",
    border: "none",
    background: "var(--kd-success-button-background)",
    color: "#fff",
    fontWeight: "var(--kd-font-weight-heavy)",
    cursor: "pointer",
    fontSize: "var(--kd-button-font-size)",
    boxShadow: "var(--kd-success-button-shadow)",
  },

  rejectButton: {
    padding: "11px 16px",
    borderRadius: "var(--kd-button-border-radius)",
    border: "none",
    background: "var(--kd-destructive-button-background)",
    color: "#fff",
    fontWeight: "var(--kd-font-weight-heavy)",
    cursor: "pointer",
    fontSize: "var(--kd-button-font-size)",
    boxShadow: "var(--kd-destructive-button-shadow)",
  },

  rowButtons: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    flexWrap: "wrap",
  },

  stack: {
    display: "grid",
    gap: 12,
  },

  pdsDocLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    flexWrap: "wrap",
    padding: "12px 18px",
    minHeight: 52,
    boxSizing: "border-box",
    borderRadius: 999,
    textDecoration: "none",
    cursor: "pointer",
    background: "var(--kd-pds-doc-bg)",
    border: "var(--kd-pds-doc-border)",
    boxShadow: "var(--kd-pds-doc-shadow)",
    color: "var(--kd-pds-doc-title)",
    outline: "none",
    transition:
      "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease, background 0.22s ease",
  },

  pdsDocLinkMain: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flex: "1 1 220px",
    minWidth: 0,
  },

  pdsDocLinkIconWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: "var(--kd-pds-doc-icon)",
    opacity: 0.92,
  },

  pdsDocLinkTitle: {
    fontSize: 15,
    fontWeight: 700,
    lineHeight: 1.35,
    letterSpacing: "-0.01em",
    color: "inherit",
    flex: "1 1 auto",
    minWidth: 0,
    wordBreak: "break-word",
  },

  pdsDocLinkAction: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
    padding: "9px 16px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: "0.03em",
    textTransform: "uppercase",
    background: "var(--kd-pds-doc-action-bg)",
    border: "var(--kd-pds-doc-action-border)",
    color: "var(--kd-pds-doc-action-color)",
    boxShadow: "var(--kd-pds-doc-action-shadow)",
    transition:
      "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
  },

  listRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 14,
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    background: "#f8fafc",
    border: "1px solid #e7edf3",
    flexWrap: "wrap",
    minWidth: 0,
    transition: "var(--kd-list-row-transition)",
  },

  listTitle: {
    fontSize: "var(--kd-list-title-font-size)",
    fontWeight: "var(--kd-font-weight-heavy)",
    color: "var(--kd-list-title-color)",
  },

  listMeta: {
    marginTop: "var(--kd-list-meta-margin-top)",
    color: "var(--kd-list-meta-color)",
    fontSize: "var(--kd-list-meta-font-size)",
  },

  listReason: {
    marginTop: 8,
    color: "#334155",
    fontSize: 14,
    lineHeight: 1.45,
  },

  statusPill: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "7px 11px",
    borderRadius: 999,
    fontWeight: 800,
    fontSize: 13,
    background: "#e2e8f0",
    color: "#334155",
    whiteSpace: "nowrap",
  },

  message: {
    marginTop: 12,
    color: "#0a2540",
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
    fontSize: 14,
  },

  muted: {
    margin: 0,
    color: "#64748b",
  },

  authCard: {
    maxWidth: 520,
    margin: "48px auto",
    padding: 28,
    borderRadius: 24,
    background: "rgba(7,16,32,0.72)",
    border: "1px solid rgba(255,255,255,0.14)",
    boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
    backdropFilter: "blur(14px)",
  },

  authTitle: {
    margin: "0 0 10px",
    fontSize: 42,
    lineHeight: 1.05,
    fontWeight: 900,
  },

  authText: {
    margin: "0 0 24px",
    fontSize: 17,
    lineHeight: 1.55,
    color: "rgba(255,255,255,0.82)",
  },

  authLabel: {
    display: "block",
    marginBottom: 6,
    fontWeight: 700,
    color: "#fff",
  },

  authInput: {
    width: "100%",
    padding:
      "var(--kd-auth-input-padding-y) var(--kd-auth-input-padding-x)",
    borderRadius: "var(--kd-auth-input-border-radius)",
    border: "var(--kd-auth-input-border)",
    backgroundColor: "var(--kd-auth-input-background)",
    color: "var(--kd-auth-input-color)",
    fontSize: "var(--kd-auth-input-font-size)",
    lineHeight: "var(--kd-input-line-height)",
    outline: "none",
    boxSizing: "border-box",
    boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
  },

  error: {
    marginTop: 12,
    color: "#ff9b9b",
    whiteSpace: "pre-wrap",
  },
};
