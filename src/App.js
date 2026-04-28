import "./styles.css";
import React, { useEffect, useMemo, useState } from "react";
import { PDS_MAP } from "./data/pdsMap";
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

  const [requestName, setRequestName] = useState("");
  const [requestEmail, setRequestEmail] = useState("");
  const [requestRole, setRequestRole] = useState("rep");
  const [requestReason, setRequestReason] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");

  const [reviewLoadingId, setReviewLoadingId] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");

  const [dealerCompanyName, setDealerCompanyName] = useState("");
  const [dealerPhone, setDealerPhone] = useState("");
  const [dealerWebsite, setDealerWebsite] = useState("");
  const [dealerAddress, setDealerAddress] = useState("");
  const [dealerCity, setDealerCity] = useState("");
  const [dealerProvinceState, setDealerProvinceState] = useState("");
  const [dealerPostalCode, setDealerPostalCode] = useState("");
  const [dealerIntroStatement, setDealerIntroStatement] = useState("");
  const [dealerClosingStatement, setDealerClosingStatement] = useState("");
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

  const [dealerMessage, setDealerMessage] = React.useState("");
  const [userMessage, setUserMessage] = React.useState("");

  // mock data (you can wire to DB later)
  const [accessRequests, setAccessRequests] = React.useState([]);
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
        "id, organization_id, requester_name, requester_email, requested_role, reason, status, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(50);

    if (!error) setRecentAccessRequests(data || []);
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
            dealer_name: newDealerName.trim(),
            dealer_slug: slug,
            dealer_admin_email: newDealerAdminEmail.trim().toLowerCase(),
          },
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
      const payload = {
        organization_id: activeMembership.organization_id,
        company_name:
          dealerCompanyName ||
          activeMembership?.organization?.name ||
          "Dealer Company",
        phone: dealerPhone || null,
        website: dealerWebsite || null,
        address: dealerAddress || null,
        city: dealerCity || null,
        province_state: dealerProvinceState || null,
        postal_code: dealerPostalCode || null,
        intro_statement: dealerIntroStatement || null,
        closing_statement: dealerClosingStatement || null,
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
      setDealerSaveMessage("Dealer profile saved.");
    } catch (err) {
      setDealerSaveMessage(err?.message || "Unexpected save error.");
    } finally {
      setDealerSaving(false);
    }
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

  const renderRoleBadge = (role) => (
    <span style={styles.roleBadge}>{roleLabel(role)}</span>
  );

  const renderDemoFlowBar = () => (
    <div style={styles.demoBar}>
      <div>
        <div style={styles.eyebrow}>DEMO FLOW</div>
        <div style={styles.demoTitle}>Recommended Walkthrough</div>
        <div style={styles.demoText}>
          Platform Admin → Create Dealer → Dealer Admin → Manager → Rep
        </div>
      </div>

      <div style={styles.demoButtons}>
        <button
          style={styles.smallButton}
          onClick={() => {
            const m = memberships.find((x) => x.role === "platform_admin");
            if (m) setActiveOrgId(m.organization_id);
          }}
        >
          Admin
        </button>
        <button
          style={styles.smallButton}
          onClick={() => {
            const m = memberships.find((x) => x.role === "dealer_admin");
            if (m) setActiveOrgId(m.organization_id);
          }}
        >
          Dealer Admin
        </button>
        <button
          style={styles.smallButton}
          onClick={() => {
            const m = memberships.find((x) => x.role === "manager");
            if (m) setActiveOrgId(m.organization_id);
          }}
        >
          Manager
        </button>
        <button
          style={styles.smallButton}
          onClick={() => {
            const m = memberships.find((x) => x.role === "rep");
            if (m) setActiveOrgId(m.organization_id);
          }}
        >
          Rep
        </button>
      </div>
    </div>
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

      <div>
        <div style={styles.sectionHeader}>Primary Actions</div>

        <div style={styles.grid2}>
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
                style={styles.secondaryButton}
              >
                {inviteLoading ? "Creating..." : "Create User"}
              </button>
            </form>

            {inviteMessage && <p style={styles.message}>{inviteMessage}</p>}
          </div>
        </div>
      </div>

      <div>
        <div style={styles.sectionHeader}>Access Approvals</div>

        <div style={styles.card}>
          <div style={styles.eyebrow}>PENDING REQUESTS</div>
          <h3 style={styles.cardTitle}>Approve Dealer Access</h3>
          <p style={styles.cardBody}>
            Dealer admins and managers submit access requests here. Approval
            creates the user, provisions the role, and removes the pending
            request.
          </p>

          <div style={styles.stack}>
            {pendingAccessRequests.length === 0 && (
              <p style={styles.muted}>No pending access requests.</p>
            )}

            {pendingAccessRequests.map((req) => (
              <div key={req.id} style={styles.listRow}>
                <div style={{ flex: 1 }}>
                  <div style={styles.listTitle}>
                    {req.requester_name || req.requester_email}
                  </div>

                  <div style={styles.listMeta}>
                    {(orgNameById[req.organization_id] ||
                      "Unknown organization") +
                      " • " +
                      roleLabel(req.requested_role)}
                  </div>

                  <div style={styles.listMeta}>{req.requester_email}</div>

                  {req.reason && (
                    <div style={styles.listReason}>{req.reason}</div>
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
            ))}
          </div>

          {reviewMessage && <p style={styles.message}>{reviewMessage}</p>}
        </div>
      </div>

      <div>
        <div style={styles.sectionHeader}>Recent Activity</div>

        <div style={styles.grid2}>
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
        </div>
      </div>
    </div>
  );
  const renderDealerAdminView = () => (
    <div style={styles.grid24}>
      <div style={styles.heroCard}>
        <div style={styles.eyebrow}>DEALER COMMAND CENTER</div>
        <h2 style={styles.heroTitle}>
          {activeMembership?.organization?.name || "Dealer"} Workspace
        </h2>
        <p style={styles.heroText}>
          Manage your dealer profile, request team access, enroll reps, and
          assign sales coverage from one clean workspace.
        </p>
      </div>

      <div style={styles.grid3}>
        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Dealer Profile</div>
          <div style={styles.summaryValue}>
            {dealerProfile ? "Started" : "Needs Setup"}
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Saved Reps</div>
          <div style={styles.summaryValue}>{repProfiles.length}</div>
        </div>

        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Assignments</div>
          <div style={styles.summaryValue}>{teamAssignments.length}</div>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.eyebrow}>BUSINESS PROFILE</div>
        <h3 style={styles.cardTitle}>Dealer Profile</h3>
        <p style={styles.cardBody}>
          This information powers your dealer-facing documents, customer-facing
          presentation material, and internal deal workflows.
        </p>

        <form onSubmit={handleSaveDealerProfile} style={styles.form}>
          <div style={styles.grid3}>
            <div>
              <label style={styles.label}>Company Name</label>
              <input
                style={styles.input}
                value={dealerCompanyName}
                onChange={(e) => setDealerCompanyName(e.target.value)}
                placeholder="Dealer Company"
              />
            </div>

            <div>
              <label style={styles.label}>Phone</label>
              <input
                style={styles.input}
                value={dealerPhone}
                onChange={(e) => setDealerPhone(e.target.value)}
                placeholder="555-555-5555"
              />
            </div>

            <div>
              <label style={styles.label}>Website</label>
              <input
                style={styles.input}
                value={dealerWebsite}
                onChange={(e) => setDealerWebsite(e.target.value)}
                placeholder="https://dealer.com"
              />
            </div>

            <div>
              <label style={styles.label}>Address</label>
              <input
                style={styles.input}
                value={dealerAddress}
                onChange={(e) => setDealerAddress(e.target.value)}
                placeholder="Street address"
              />
            </div>

            <div>
              <label style={styles.label}>City</label>
              <input
                style={styles.input}
                value={dealerCity}
                onChange={(e) => setDealerCity(e.target.value)}
                placeholder="City"
              />
            </div>

            <div>
              <label style={styles.label}>Province / State</label>
              <input
                style={styles.input}
                value={dealerProvinceState}
                onChange={(e) => setDealerProvinceState(e.target.value)}
                placeholder="Province or State"
              />
            </div>

            <div>
              <label style={styles.label}>Postal Code</label>
              <input
                style={styles.input}
                value={dealerPostalCode}
                onChange={(e) => setDealerPostalCode(e.target.value)}
                placeholder="Postal code"
              />
            </div>
          </div>

          <div style={styles.grid2}>
            <div>
              <label style={styles.label}>Intro Statement</label>
              <textarea
                style={styles.textarea}
                value={dealerIntroStatement}
                onChange={(e) => setDealerIntroStatement(e.target.value)}
                placeholder="Brief intro used in customer-facing material."
              />
            </div>

            <div>
              <label style={styles.label}>Closing Statement</label>
              <textarea
                style={styles.textarea}
                value={dealerClosingStatement}
                onChange={(e) => setDealerClosingStatement(e.target.value)}
                placeholder="Closing note used in proposals or summaries."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={dealerSaving}
            style={styles.primaryButton}
          >
            {dealerSaving ? "Saving Profile..." : "Save Dealer Profile"}
          </button>
        </form>

        {dealerSaveMessage && <p style={styles.message}>{dealerSaveMessage}</p>}
      </div>

      <div style={styles.grid2}>
        <div style={styles.card}>
          <div style={styles.eyebrow}>TEAM ACCESS</div>
          <h3 style={styles.cardTitle}>Request Additional Access</h3>
          <p style={styles.cardBody}>
            Request manager or rep access for users who should join this dealer
            workspace.
          </p>

          <form onSubmit={handleAccessRequest} style={styles.form}>
            <div style={styles.grid3}>
              <div>
                <label style={styles.label}>Name</label>
                <input
                  style={styles.input}
                  value={requestName}
                  onChange={(e) => setRequestName(e.target.value)}
                  placeholder="Full name"
                />
              </div>

              <div>
                <label style={styles.label}>Email</label>
                <input
                  style={styles.input}
                  type="email"
                  value={requestEmail}
                  onChange={(e) => setRequestEmail(e.target.value)}
                  placeholder="user@dealer.com"
                />
              </div>

              <div>
                <label style={styles.label}>Requested Role</label>
                <select
                  style={styles.input}
                  value={requestRole}
                  onChange={(e) => setRequestRole(e.target.value)}
                >
                  <option value="manager">Manager</option>
                  <option value="rep">Rep</option>
                </select>
              </div>
            </div>

            <div>
              <label style={styles.label}>Reason</label>
              <textarea
                style={styles.textarea}
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
                placeholder="Briefly explain why this user needs access."
              />
            </div>

            <button
              type="submit"
              disabled={requestLoading}
              style={styles.secondaryButton}
            >
              {requestLoading
                ? "Submitting Request..."
                : "Submit Access Request"}
            </button>
          </form>

          {requestMessage && <p style={styles.message}>{requestMessage}</p>}
        </div>

        <div style={styles.card}>
          <div style={styles.eyebrow}>REP SETUP</div>
          <h3 style={styles.cardTitle}>Rep Enrollment</h3>
          <p style={styles.cardBody}>
            Add sales reps to this dealer profile so they can be assigned to
            managers and customer activity.
          </p>

          <form onSubmit={handleSaveRepEnrollment} style={styles.form}>
            <div style={styles.grid2}>
              <div>
                <label style={styles.label}>First Name</label>
                <input
                  style={styles.input}
                  value={repFirstName}
                  onChange={(e) => setRepFirstName(e.target.value)}
                  placeholder="First name"
                />
              </div>

              <div>
                <label style={styles.label}>Last Name</label>
                <input
                  style={styles.input}
                  value={repLastName}
                  onChange={(e) => setRepLastName(e.target.value)}
                  placeholder="Last name"
                />
              </div>

              <div>
                <label style={styles.label}>Title</label>
                <input
                  style={styles.input}
                  value={repTitle}
                  onChange={(e) => setRepTitle(e.target.value)}
                  placeholder="Sales Rep"
                />
              </div>

              <div>
                <label style={styles.label}>Phone</label>
                <input
                  style={styles.input}
                  value={repPhone}
                  onChange={(e) => setRepPhone(e.target.value)}
                  placeholder="555-555-5555"
                />
              </div>

              <div>
                <label style={styles.label}>Email</label>
                <input
                  style={styles.input}
                  type="email"
                  value={repEmailAddress}
                  onChange={(e) => setRepEmailAddress(e.target.value)}
                  placeholder="rep@dealer.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={repSaving}
              style={styles.secondaryButton}
            >
              {repSaving ? "Saving Rep..." : "Save Rep"}
            </button>
          </form>

          {repSaveMessage && <p style={styles.message}>{repSaveMessage}</p>}
        </div>
      </div>

      <div style={styles.grid2}>
        <div style={styles.card}>
          <div style={styles.eyebrow}>DEALER TEAM</div>
          <h3 style={styles.cardTitle}>Saved Reps</h3>

          <div style={styles.stack}>
            {repProfiles.length === 0 && (
              <p style={styles.muted}>No reps saved yet.</p>
            )}

            {repProfiles.map((rep) => (
              <div key={rep.id} style={styles.listRow}>
                <div>
                  <div style={styles.listTitle}>
                    {`${rep.first_name || ""} ${rep.last_name || ""}`.trim() ||
                      "Unnamed Rep"}
                  </div>
                  <div style={styles.listMeta}>
                    {(rep.title || "Rep") + " • " + (rep.email || "No email")}
                  </div>
                </div>

                <span style={styles.statusPill}>{rep.phone || "No phone"}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.eyebrow}>COVERAGE</div>
          <h3 style={styles.cardTitle}>Manager → Rep Assignment</h3>

          <form onSubmit={handleAssignRepToManager} style={styles.form}>
            <div style={styles.grid2}>
              <div>
                <label style={styles.label}>Manager</label>
                <select
                  style={styles.input}
                  value={assignManagerId}
                  onChange={(e) => setAssignManagerId(e.target.value)}
                >
                  <option value="">Select manager</option>
                  {managerMembers.map((m) => {
                    const id = m.profile?.id || m.user_id;
                    const name =
                      m.profile?.full_name || m.profile?.email || m.user_id;

                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label style={styles.label}>Rep</label>
                <select
                  style={styles.input}
                  value={assignRepId}
                  onChange={(e) => setAssignRepId(e.target.value)}
                >
                  <option value="">Select rep</option>
                  {repProfiles.map((rep) => (
                    <option key={rep.id} value={rep.id}>
                      {(rep.first_name || "") +
                        " " +
                        (rep.last_name || "") +
                        (rep.email ? ` (${rep.email})` : "")}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={assignmentSaving}
              style={styles.secondaryButton}
            >
              {assignmentSaving ? "Assigning..." : "Assign Rep"}
            </button>
          </form>

          {assignmentMessage && (
            <p style={styles.message}>{assignmentMessage}</p>
          )}

          <div style={styles.stack}>
            {teamAssignments.length === 0 && (
              <p style={styles.muted}>No assignments yet.</p>
            )}

            {teamAssignments.map((assignment) => {
              const manager = managerMembers.find(
                (m) =>
                  (m.profile?.id || m.user_id) === assignment.manager_profile_id
              );
              const rep = repProfiles.find(
                (r) => r.id === assignment.rep_profile_id
              );

              return (
                <div key={assignment.id} style={styles.listRow}>
                  <div>
                    <div style={styles.listTitle}>
                      {manager?.profile?.full_name ||
                        manager?.profile?.email ||
                        assignment.manager_profile_id}
                    </div>
                    <div style={styles.listMeta}>
                      manages{" "}
                      {rep
                        ? `${rep.first_name || ""} ${
                            rep.last_name || ""
                          }`.trim()
                        : assignment.rep_profile_id}
                    </div>
                  </div>

                  <span style={styles.statusPill}>active</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
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
  const PRODUCT_MAP = [
    {
      keywords: ["shell", "rotella", "15w-40", "t4"],
      match: "KLONDIKE 15W-40 Heavy Duty Engine Oil",
    },
    {
      keywords: ["chevron", "delo", "400"],
      match: "KLONDIKE 15W-40 Premium Diesel Engine Oil",
    },
    {
      keywords: ["hydraulic", "aw"],
      match: "KLONDIKE AW Hydraulic Oil",
    },
    {
      keywords: ["atf", "transmission"],
      match: "KLONDIKE ATF",
    },
  ];
  function DealerPortalShell({ activeMembership, activeTab, setActiveTab }) {
    const role = activeMembership?.role || "";
    const orgName = activeMembership?.organization?.name || "Dealer";

    const isRep = role === "rep";
    const isManager = role === "manager";
    const isDealerAdmin = role === "dealer_admin";

    const [quoteStep, setQuoteStep] = React.useState(1);
    const [quoteItems, setQuoteItems] = React.useState([]);
    const [myQuotes, setMyQuotes] = React.useState([]);

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

    const [competitor, setCompetitor] = React.useState("");
    const [klondike, setKlondike] = React.useState("");
    const [tier, setTier] = React.useState("Professional");
    const [packageSize, setPackageSize] = React.useState("");
    const [quoteSearchResults, setQuoteSearchResults] = React.useState([]);
    const [selectedProduct, setSelectedProduct] = React.useState(null);

    const [proposalDecisions, setProposalDecisions] = React.useState({});
    const [quoteSaving, setQuoteSaving] = React.useState(false);
    const [quoteMessage, setQuoteMessage] = React.useState("");
    const [pricingMap, setPricingMap] = React.useState({});
    const [useFloorPrice, setUseFloorPrice] = React.useState(false);
    const [searchResults, setSearchResults] = useState([]);
    React.useEffect(() => {
      const loadPricing = async () => {
        if (!activeMembership?.organization_id) return;

        const { data, error } = await supabase
          .from("dealer_price_sheet_items")
          .select("*")
          .eq("organization_id", activeMembership.organization_id)
          .eq("is_active", true);

        if (error) {
          console.error("Pricing load error:", error.message);
          return;
        }

        const map = {};
        (data || []).forEach((item) => {
          const key = `${item.klondike_product}__${item.package_size}`;
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
          { id: "team", label: "Team Performance" },
          { id: "request", label: "Request Access" },
        ]
      : [
          { id: "dashboard", label: "Dashboard" },
          { id: "company", label: "Company Performance" },
          { id: "team", label: "Team Overview" },
          { id: "request", label: "Request Access" },
        ];

    const getPriceForItem = (item) => {
      const key = `${item.klondike}__${item.packageSize}`;
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
    const getDisplayPrice = (priceData) => {
      const basePrice = Number(
        priceData?.suggested_account_unit_price ||
          priceData?.dealer_sell_price ||
          priceData?.suggestedAccountUnitPrice ||
          0
      );

      return useFloorPrice ? basePrice * 0.9 : basePrice;
    };

    const formatMoney = (value) => `$${Number(value || 0).toFixed(2)}`;
    const getQuoteTotal = () =>
      quoteItems.reduce((sum, item) => {
        const priceData =
          getPriceForItem(item) ||
          resolvePricingMatch(item.klondike, pricingMap);
        return sum + Number(priceData?.dealer_sell_price || 0);
      }, 0);

    const handleCompetitorSearch = (value) => {
      setCompetitor(value);
      setKlondike("");
      setSelectedProduct(null);
      setQuoteMessage("");

      if (!value.trim()) {
        setQuoteSearchResults([]);
        return;
      }

      const search = value.toLowerCase();

      const results = PRODUCT_DB.filter((product) =>
        `${product.brand} ${product.name} ${product.category}`
          .toLowerCase()
          .includes(search)
      );

      setQuoteSearchResults(results);
    };

    const handleSelectProduct = (product) => {
      setSelectedProduct(product);
      setCompetitor(product.name);
      setKlondike(product.klondike);
      setQuoteSearchResults([]);
      setQuoteStep(2);
      setQuoteMessage("");
    };

    const handleAddProduct = () => {
      if (!selectedProduct) {
        setQuoteMessage("Select a competitor product first.");
        return;
      }

      setQuoteItems((prev) => [
        ...prev,
        {
          competitor: selectedProduct.name,
          brand: selectedProduct.brand,
          category: selectedProduct.category,
          klondike: selectedProduct.klondike,
          tier,
          packageSize,
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

      setQuoteSaving(true);

      const { data, error } = await supabase
        .from("quotes")
        .insert({
          user_id: session.user.id,
          organization_id: activeMembership.organization_id,
          customer_name: companyName.trim(),
          customer_email: quoteContactEmail.trim() || null,
          industry: industry || null,
          competitor_product: quoteItems
            .map((item) => `${item.brand} ${item.competitor}`)
            .join(", "),
          klondike_product: quoteItems.map((item) => item.klondike).join(", "),
          status: "draft",
        })
        .select("*")
        .single();

      setQuoteSaving(false);

      if (error) {
        setQuoteMessage(error.message);
        return;
      }

      setMyQuotes((prev) => [data, ...prev]);
      setQuoteMessage("Quote saved to library.");
      setActiveTab("library");

      setCompanyName("");
      setContactName("");
      setQuoteContactEmail("");
      setPhone("");
      setAddress("");
      setCity("");
      setProvince("");
      setPostalCode("");
      setIndustry("");
      setSubIndustry("");
      setSegment("");
      setCompetitor("");
      setKlondike("");
      setQuoteItems([]);
      setSelectedProduct(null);
      setQuoteSearchResults([]);
      setQuoteStep(1);
    };

    const PortalButton = ({ tab }) => {
      const active = activeTab === tab.id;

      return (
        <button
          type="button"
          onClick={() => setActiveTab(tab.id)}
          style={{
            padding: "13px 18px",
            borderRadius: 12,
            border: active
              ? "1px solid rgba(246,165,49,0.9)"
              : "1px solid rgba(255,255,255,0.14)",
            background: active
              ? "linear-gradient(180deg, #f6a531 0%, #d87400 100%)"
              : "rgba(255,255,255,0.08)",
            color: "#fff",
            fontSize: 15,
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          {tab.label}
        </button>
      );
    };

    return (
      <div style={styles.grid24}>
        <div style={styles.heroCard}>
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

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            padding: 18,
            borderRadius: 22,
            background: "rgba(7,16,32,0.72)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {tabs.map((tab) => (
            <PortalButton key={tab.id} tab={tab} />
          ))}
        </div>

        {activeTab === "dashboard" && (
          <div style={styles.card}>
            <div style={styles.eyebrow}>DASHBOARD</div>
            <h3 style={styles.cardTitle}>Performance Snapshot</h3>
            <p style={styles.cardBody}>
              {isRep
                ? `You currently have ${myQuotes.length} quote(s) in your library.`
                : "Performance metrics will appear here as quote activity builds."}
            </p>
          </div>
        )}

        {activeTab === "quote" && isRep && (
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
                    Search competitor products and build your Klondike
                    recommendation.
                  </p>

                  {/* INPUT ROW */}
                  <div style={styles.grid2}>
                    <div style={{ position: "relative" }}>
                      <input
                        style={styles.input}
                        placeholder="Competitor Product (e.g. Rotella T4 15W-40)"
                        value={competitor || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          setCompetitor(value);

                          if (
                            !PRODUCT_MAP ||
                            PRODUCT_MAP.length === 0 ||
                            !value.trim()
                          ) {
                            setKlondike("");
                            setSearchResults([]);
                            return;
                          }

                          const lower = value.toLowerCase();

                          const ranked = PRODUCT_MAP.map((p) => {
                            const combinedText = `${p.keywords.join(" ")} ${
                              p.match
                            }`.toLowerCase();

                            const score = p.keywords.filter(
                              (k) =>
                                lower.includes(k.toLowerCase()) ||
                                k.toLowerCase().includes(lower)
                            ).length;

                            let confidence = "Low";
                            if (score >= 2) confidence = "High";
                            else if (score === 1) confidence = "Medium";

                            let reason = "Matches application category";

                            if (combinedText.includes("15w-40")) {
                              reason =
                                "Matches 15W-40 viscosity and heavy-duty engine oil application";
                            } else if (
                              combinedText.includes("hydraulic") ||
                              combinedText.includes("aw")
                            ) {
                              reason = "Matches hydraulic oil application";
                            } else if (
                              combinedText.includes("atf") ||
                              combinedText.includes("transmission")
                            ) {
                              reason = "Matches transmission fluid application";
                            }

                            const competitorLabel =
                              p.competitor ||
                              p.name ||
                              (p.keywords?.length
                                ? p.keywords.join(" ")
                                : "Competitor Match");

                            return {
                              ...p,
                              score,
                              confidence,
                              reason,
                              competitor: competitorLabel,
                            };
                          })
                            .filter((p) => p.score > 0)
                            .sort((a, b) => b.score - a.score)
                            .slice(0, 5);

                          setSearchResults(ranked);

                          const topMatch = ranked[0];
                          setKlondike(topMatch ? topMatch.match : "");
                        }}
                      />

                      {searchResults.length > 0 && (
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            right: 0,
                            background: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: 8,
                            marginTop: 4,
                            zIndex: 20,
                            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                            overflow: "hidden",
                          }}
                        >
                          {searchResults.map((result, index) => (
                            <button
                              key={`${
                                result.competitor || result.match
                              }-${index}`}
                              type="button"
                              style={{
                                display: "block",
                                width: "100%",
                                textAlign: "left",
                                padding: "10px 12px",
                                border: "none",
                                borderBottom:
                                  index === searchResults.length - 1
                                    ? "none"
                                    : "1px solid #eee",
                                background: "#fff",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setCompetitor(result.competitor || competitor);
                                setKlondike(result.match || "");
                                setSearchResults([]);
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div style={{ fontWeight: 700 }}>
                                  {result.competitor || "Competitor Match"}
                                </div>

                                <span
                                  style={{
                                    fontSize: 12,
                                    fontWeight: 700,
                                    padding: "4px 8px",
                                    borderRadius: 999,
                                    background:
                                      result.confidence === "High"
                                        ? "#d1fae5"
                                        : result.confidence === "Medium"
                                        ? "#fef3c7"
                                        : "#fee2e2",
                                  }}
                                >
                                  {result.confidence}
                                </span>
                              </div>

                              <div style={{ fontSize: 13, opacity: 0.8 }}>
                                {result.reason}
                              </div>

                              <div style={{ fontSize: 13, opacity: 0.75 }}>
                                → {result.match}
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
                  <div style={styles.grid2}>
                    <select
                      style={styles.input}
                      value={tier}
                      onChange={(e) => setTier(e.target.value)}
                    >
                      <option>Good</option>
                      <option>Better</option>
                      <option>Best</option>
                    </select>

                    <select
                      style={styles.input}
                      value={packageSize}
                      onChange={(e) => setPackageSize(e.target.value)}
                    >
                      <option value="">Select Package</option>
                      <option>Drum</option>
                      <option>Tote</option>
                      <option>Pail</option>
                    </select>
                  </div>

                  {/* ADD BUTTON */}
                  <div style={{ marginTop: 12 }}>
                    <button
                      style={styles.primaryButton}
                      onClick={() => {
                        if (!competitor || !klondike) return;

                        setQuoteItems((prev) => [
                          ...prev,
                          {
                            id: Date.now(),
                            competitor,
                            klondike,
                            tier,
                            packageSize,
                          },
                        ]);

                        setCompetitor("");
                        setKlondike("");
                        setTier("Good");
                        setPackageSize("");
                        setSearchResults([]);
                      }}
                    >
                      Add Product
                    </button>
                  </div>

                  {/* CURRENT ITEMS */}
                  <div style={{ marginTop: 18 }}>
                    {quoteItems.length === 0 && (
                      <p style={styles.muted}>No products added yet.</p>
                    )}

                    {quoteItems.map((item, index) => (
                      <div key={item.id} style={styles.listRow}>
                        <div>
                          <div style={styles.listTitle}>{item.klondike}</div>
                          <div style={styles.listMeta}>
                            Replaces: {item.competitor}
                          </div>
                          <div style={styles.listMeta}>
                            {item.tier} • {item.packageSize || "No package"}
                          </div>
                        </div>

                        <button
                          style={styles.secondaryButton}
                          onClick={() => {
                            setQuoteItems((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* NAV BUTTONS */}
                  <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                    <button
                      style={styles.secondaryButton}
                      onClick={() => setQuoteStep(1)}
                    >
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
                        const priceData =
                          getPriceForItem(item) ||
                          resolvePricingMatch(item.klondike, pricingMap);
                        const price = getDisplayPrice(priceData);

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
                                {priceData
                                  ? `$${price.toFixed(2)}`
                                  : "No price"}
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
                      {quoteItems
                        .reduce((sum, item) => {
                          const priceData =
                            getPriceForItem(item) ||
                            resolvePricingMatch(item.klondike, pricingMap);
                          return sum + getDisplayPrice(priceData);
                        }, 0)
                        .toFixed(2)}
                    </div>
                  </div>

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
                      {quoteSaving ? "Saving..." : "Save Quote to Library"}
                    </button>
                  </div>

                  {quoteMessage && <p style={styles.message}>{quoteMessage}</p>}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "proposal_view" && isRep && (
          <div style={styles.card}>
            <div style={styles.eyebrow}>CUSTOMER PROPOSAL</div>
            <h3 style={styles.cardTitle}>Lubrication Recommendation</h3>
            <p style={styles.cardBody}>
              Review each recommended product and select approve or decline.
            </p>

            <div style={styles.stack}>
              {quoteItems.length === 0 && (
                <p style={styles.muted}>
                  No quote items yet. Add products in Start New Quote first.
                </p>
              )}

              {quoteItems.map((item, index) => {
                const priceData = getPriceForItem(item);

                return (
                  <div
                    key={`${item.competitor}-${index}`}
                    style={styles.listRow}
                  >
                    <div style={{ maxWidth: 520 }}>
                      <div style={styles.listTitle}>{item.klondike}</div>

                      <div style={styles.listMeta}>
                        Replaces: {item.brand ? `${item.brand} ` : ""}
                        {item.competitor}
                      </div>

                      <div style={styles.listMeta}>
                        Tier: {item.tier || "Not selected"} • Package:{" "}
                        {item.packageSize || "No package selected"}
                      </div>

                      <div style={styles.listMeta}>
                        Price:{" "}
                        {priceData
                          ? `$${priceData.dealer_sell_price}`
                          : "No price"}
                      </div>

                      <div style={{ marginTop: 8 }}>
                        <span style={{ fontWeight: 700 }}>
                          Why we recommend this:
                        </span>
                        <div style={styles.listMeta}>
                          High-performance formulation designed for equipment
                          protection, durability, and reliable operation.
                          Product-specific reasoning will later be pulled from
                          the PDS library.
                        </div>
                      </div>

                      <div style={{ marginTop: 6 }}>
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          style={{
                            color: "#f6a531",
                            fontWeight: 800,
                            textDecoration: "none",
                          }}
                        >
                          View Product Data Sheet →
                        </a>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setProposalDecisions((prev) => ({
                            ...prev,
                            [index]: "approved",
                          }))
                        }
                        style={{
                          padding: "10px 14px",
                          borderRadius: 10,
                          border: "none",
                          background:
                            proposalDecisions[index] === "approved"
                              ? "#2ecc71"
                              : "#e5e7eb",
                          fontWeight: 800,
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
                            [index]: "denied",
                          }))
                        }
                        style={{
                          padding: "10px 14px",
                          borderRadius: 10,
                          border: "none",
                          background:
                            proposalDecisions[index] === "denied"
                              ? "#e74c3c"
                              : "#e5e7eb",
                          fontWeight: 800,
                          cursor: "pointer",
                        }}
                      >
                        Decline
                      </button>

                      <div style={{ fontSize: 12, textAlign: "center" }}>
                        {proposalDecisions[index] === "approved" &&
                          "✅ Approved"}
                        {proposalDecisions[index] === "denied" && "❌ Declined"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 24 }}>
              <button
                type="button"
                style={styles.primaryButton}
                onClick={() => {
                  const approved = Object.values(proposalDecisions).filter(
                    (decision) => decision === "approved"
                  ).length;

                  const denied = Object.values(proposalDecisions).filter(
                    (decision) => decision === "denied"
                  ).length;

                  alert(
                    `Submitted!\nApproved: ${approved}\nDeclined: ${denied}`
                  );
                }}
              >
                Submit Decisions
              </button>
            </div>
          </div>
        )}

        {activeTab === "cross" && isRep && (
          <div style={styles.card}>
            <div style={styles.eyebrow}>CROSS REFERENCE</div>
            <h3 style={styles.cardTitle}>Quick Product Match</h3>
            <p style={styles.cardBody}>
              This quick search will later use the full crossover list.
            </p>
          </div>
        )}

        {activeTab === "library" && isRep && (
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
                  <span style={styles.statusPill}>{quote.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "pds" && isRep && (
          <div style={styles.card}>
            <div style={styles.eyebrow}>PDS LIBRARY</div>
            <h3 style={styles.cardTitle}>Product Documents</h3>
            <p style={styles.cardBody}>
              Product data sheets and spec sheets will be added here once
              uploaded.
            </p>
          </div>
        )}

        {activeTab === "company" && isDealerAdmin && (
          <div style={styles.card}>
            <div style={styles.eyebrow}>COMPANY PERFORMANCE</div>
            <h3 style={styles.cardTitle}>Dealer-Wide Business Performance</h3>
            <p style={styles.cardBody}>
              Company metrics and quote performance will appear here.
            </p>
          </div>
        )}

        {activeTab === "team" && (isDealerAdmin || isManager) && (
          <div style={styles.card}>
            <div style={styles.eyebrow}>TEAM</div>
            <h3 style={styles.cardTitle}>Team Performance</h3>
            <p style={styles.cardBody}>
              Rep activity and manager performance will appear here.
            </p>
          </div>
        )}

        {activeTab === "request" && (isDealerAdmin || isManager) && (
          <div style={styles.card}>
            <div style={styles.eyebrow}>REQUEST ACCESS</div>
            <h3 style={styles.cardTitle}>Request User Access</h3>
            <p style={styles.cardBody}>
              Dealer admins and managers can request new manager or rep access.
            </p>
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
        <div style={styles.authCard}>
          <div style={styles.eyebrow}>KLONDIKE DEALER PLATFORM</div>
          <h1 style={styles.authTitle}>Loading...</h1>
          <p style={styles.authText}>
            Loading your session and organization access.
          </p>
        </div>
      </div>
    );
  }
  if (!session) {
    return (
      <div style={styles.page}>
        <div style={styles.authCard}>
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
      <div style={styles.shell}>
        <div style={styles.topHero}>
          <div>
            <img
              src="/klondike-full-logo.png"
              alt="Klondike"
              style={styles.logo}
            />
            <div style={styles.eyebrow}>KLONDIKE DEALER PLATFORM</div>
            <h1 style={styles.pageTitle}>Deal Tool Platform</h1>
            <p style={styles.heroText}>
              Signed in as{" "}
              <strong>{profile?.email || session.user.email}</strong>
            </p>
          </div>

          <button onClick={handleLogout} style={styles.smallButton}>
            Log Out
          </button>
        </div>
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
            {renderDemoFlowBar()}

            <div style={styles.topCard}>
              <div style={styles.topCardHeader}>
                <div>
                  <div style={styles.eyebrow}>ACTIVE ACCESS</div>
                  <h2 style={styles.topCardTitle}>Current Access Context</h2>
                </div>

                {activeMembership && (
                  <div>{renderRoleBadge(activeMembership.role)}</div>
                )}
              </div>

              <div style={styles.grid2}>
                <div>
                  <label style={styles.label}>Choose Organization View</label>
                  <select
                    style={styles.input}
                    value={activeOrgId}
                    onChange={(e) => setActiveOrgId(e.target.value)}
                  >
                    <option value="">Select organization</option>
                    {memberships.map((membership) => (
                      <option
                        key={membership.id}
                        value={membership.organization_id}
                      >
                        {(membership.organization?.name ||
                          "Unknown organization") +
                          " — " +
                          membership.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={styles.grid2}>
                  <div style={styles.summaryCard}>
                    <div style={styles.summaryLabel}>Organization</div>
                    <div style={styles.summaryValue}>
                      {activeMembership?.organization?.name ||
                        "No organization selected"}
                    </div>
                  </div>

                  <div style={styles.summaryCard}>
                    <div style={styles.summaryLabel}>Role</div>
                    <div style={styles.summaryValue}>
                      {roleLabel(activeMembership?.role)}
                    </div>
                  </div>
                </div>
              </div>

              {authMessage && <p style={styles.error}>{authMessage}</p>}
            </div>

            {renderRoleSummaryStrip()}
            {renderRoleView()}
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 50% 20%, #143b66 0%, #082846 26%, #04192d 55%, #010b14 100%)",
    padding: 24,
    boxSizing: "border-box",
    color: "#fff",
    overflowX: "hidden",
  },

  shell: {
    maxWidth: 1180,
    margin: "0 auto",
    display: "grid",
    gap: 22,
    width: "100%",
    minWidth: 0,
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
    gap: 18,
    width: "100%",
    minWidth: 0,
  },

  card: {
    background: "#fff",
    color: "#0f172a",
    borderRadius: 22,
    padding: 24,
    border: "1px solid #e7edf3",
    overflow: "hidden",
    minWidth: 0,
    boxSizing: "border-box",
  },

  form: {
    display: "grid",
    gap: 14,
    width: "100%",
    minWidth: 0,
  },

  input: {
    display: "block",
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    height: 48,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #d8e0e8",
    background: "#fff",
    color: "#0a2540",
    boxSizing: "border-box",
    fontSize: 15,
  },

  textarea: {
    display: "block",
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    minHeight: 96,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #d8e0e8",
    background: "#fff",
    color: "#0a2540",
    boxSizing: "border-box",
    resize: "vertical",
    fontSize: 15,
  },

  topHero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    flexWrap: "wrap",
    padding: 22,
    borderRadius: 24,
    background:
      "linear-gradient(135deg, #06284b 0%, #0a3764 45%, #02162b 100%)",
    border: "1px solid rgba(255,255,255,0.08)",
    minWidth: 0,
  },

  logo: {
    width: 210,
    maxWidth: "80%",
    display: "block",
    marginBottom: 10,
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
    margin: 0,
    fontSize: 40,
    lineHeight: 1.05,
    fontWeight: 900,
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
    padding: "8px 14px",
    borderRadius: 999,
    background: "linear-gradient(180deg, #f6a531 0%, #d87400 100%)",
    color: "#fff",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
    minWidth: 0,
  },

  summaryCard: {
    background: "#fff",
    color: "#0f172a",
    borderRadius: 18,
    padding: 16,
    border: "1px solid #e7edf3",
    minWidth: 0,
  },

  summaryLabel: {
    fontSize: 12,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 800,
    color: "#64748b",
    marginBottom: 8,
  },

  summaryValue: {
    fontSize: 19,
    fontWeight: 900,
    lineHeight: 1.25,
  },

  grid24: {
    display: "grid",
    gap: 22,
    minWidth: 0,
  },

  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
    minWidth: 0,
  },

  heroCard: {
    padding: 28,
    borderRadius: 24,
    background:
      "linear-gradient(135deg, #0a3764 0%, #06284b 55%, #04192d 100%)",
    border: "1px solid rgba(255,255,255,0.08)",
    minWidth: 0,
  },

  heroTitle: {
    margin: "0 0 10px",
    fontSize: 34,
    fontWeight: 900,
  },

  heroText: {
    margin: 0,
    fontSize: 17,
    lineHeight: 1.55,
    opacity: 0.92,
  },

  cardTitle: {
    margin: "0 0 10px",
    fontSize: 28,
    fontWeight: 900,
    color: "#0a2540",
  },

  cardBody: {
    margin: "0 0 16px",
    color: "#64748b",
    lineHeight: 1.5,
    fontSize: 16,
  },

  label: {
    display: "block",
    marginBottom: 6,
    fontWeight: 800,
    fontSize: 14,
    color: "#0a2540",
  },

  primaryButton: {
    padding: "13px 16px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(180deg, #f6a531 0%, #d87400 100%)",
    color: "#fff",
    fontWeight: 900,
    cursor: "pointer",
    fontSize: 16,
  },

  secondaryButton: {
    padding: "13px 16px",
    borderRadius: 12,
    border: "1px solid #d8e0e8",
    background: "#fff",
    color: "#0a2540",
    fontWeight: 900,
    cursor: "pointer",
    fontSize: 16,
  },

  smallButton: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    fontWeight: 800,
    cursor: "pointer",
  },

  approveButton: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "none",
    background: "#22c55e",
    color: "#fff",
    fontWeight: 800,
    cursor: "pointer",
  },

  rejectButton: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "none",
    background: "#ef4444",
    color: "#fff",
    fontWeight: 800,
    cursor: "pointer",
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
  },

  listTitle: {
    fontSize: 17,
    fontWeight: 900,
    color: "#0f172a",
  },

  listMeta: {
    marginTop: 5,
    color: "#64748b",
    fontSize: 14,
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
    padding: "13px 15px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
    fontSize: 17,
    outline: "none",
    boxSizing: "border-box",
  },

  error: {
    marginTop: 12,
    color: "#ff9b9b",
    whiteSpace: "pre-wrap",
  },
};
