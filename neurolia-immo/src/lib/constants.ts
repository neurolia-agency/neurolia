export const ROUTES = {
  // Auth
  LOGIN: "/login",
  REGISTER: "/register",
  REGISTER_STAFF: "/register-staff",
  MAGIC_LINK_SENT: "/magic-link-sent",
  CALLBACK: "/callback",

  // Owner
  DASHBOARD: "/dashboard",
  CLEANING_STATUS: "/cleaning-status",
  RESERVATION: "/reservations",
  ANOMALY: "/anomalies",
  CALENDAR: "/calendar",
  CALENDAR_DAY: "/calendar/day",
  MANAGEMENT: "/management",
  PROPERTIES: "/management/properties",
  TEAM: "/management/team",
  SETTINGS: "/management/settings",

  // Staff
  PLANNING: "/planning",
  TASK: "/task",
  PROPERTY_INFO: "/property-info",
  PROFILE: "/profile",
  PROFILE_SETTINGS: "/profile/settings",

  // Public
  LIVRET: "/livret",

  // API
  API_WEBHOOK_RESERVATION: "/api/webhooks/n8n/reservation",
  API_WEBHOOK_ICAL_ALERT: "/api/webhooks/n8n/ical-alert",
  API_WEBHOOK_TASK_CREATED: "/api/webhooks/n8n/task-created",
} as const;

export const PUBLIC_PATHS = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.REGISTER_STAFF,
  ROUTES.MAGIC_LINK_SENT,
  ROUTES.CALLBACK,
  ROUTES.LIVRET,
] as const;

export const OWNER_PREFIX_PATHS = [
  ROUTES.DASHBOARD,
  ROUTES.CLEANING_STATUS,
  ROUTES.RESERVATION,
  ROUTES.ANOMALY,
  ROUTES.CALENDAR,
  ROUTES.MANAGEMENT,
] as const;

export const STAFF_PREFIX_PATHS = [
  ROUTES.PLANNING,
  ROUTES.TASK,
  ROUTES.PROPERTY_INFO,
  ROUTES.PROFILE,
] as const;
