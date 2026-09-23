<script setup lang="ts">
import { computed } from "vue";
import {
  Eye,
  Check,
  Globe,
  MapPin,
  Users,
  Calendar,
  ShieldCheck,
} from "lucide-vue-next";

const props = withDefaults(
  defineProps<{
    companyName?: string;
    industry?: string;
    legalInfo?: string;
    tagline?: string;
    location?: string;
    companySize?: string;
    organizationType?: string;
    foundedYear?: string;
    website?: string;
    websiteDisplay?: string;
    logoUrl?: string;
    taxStatus?: string;
    profileLabel?: string;
    verified?: boolean;
  }>(),
  {
    companyName: "WebArtifacts",
    industry: "Software & IT Services",
    legalInfo: "Legal company name",
    tagline: "Building modern digital experiences",
    location: "Pune, Maharashtra, India",
    companySize: "11-50 employees",
    organizationType: "Private",
    foundedYear: "2026",
    website: "www.webartifacts.com",
    websiteDisplay: "www.webartifacts.com",
    logoUrl: "",
    taxStatus: "Pending Docs",
    profileLabel: "Company Profile",
    verified: true,
  }
);

const displayInitials = computed(() => {
  const name = props.companyName?.trim();
  if (!name || name.toLowerCase() === "company name") return "WA";
  const words = name.split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
});

const displayTagline = computed(() => {
  const t = props.tagline?.trim();
  if (!t || t.toLowerCase().includes("will display here")) {
    return "Building modern digital experiences";
  }
  return t;
});

const displayWebsite = computed(() => {
  if (props.websiteDisplay) return props.websiteDisplay;
  if (!props.website) return "www.webartifacts.com";
  return props.website.replace(/^https?:\/\//i, "").replace(/\/$/, "");
});

const displayLocation = computed(() => {
  const loc = props.location?.trim();
  if (!loc || loc === "India") return "Pune, Maharashtra, India";
  return loc;
});

const displaySize = computed(() => {
  return props.companySize || "11-50 employees";
});

const displayYear = computed(() => {
  return props.foundedYear || "2026";
});
</script>

<template>
  <div class="space-y-4 select-none">
    <!-- Main Live Preview Card Container -->
    <div class="rounded-lg border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
      <!-- Header -->
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-start gap-3">
          <Eye class="h-4 w-4 text-violet-600 shrink-0 mt-0.5" />
          <div>
            <h2 class="text-base sm:text-sm font-bold text-slate-900 leading-tight">
              Live Preview
            </h2>
            <p class="text-xs text-slate-500 font-normal mt-0.5">
              How your company page will look on NxtTurn
            </p>
          </div>
        </div>
      </div>

      <!-- Hero Banner Preview Card -->
      <div
        class="mt-3 sm:mt-4 relative overflow-hidden rounded-lg bg-slate-900 min-h-[210px] sm:min-h-[220px] p-5 sm:p-6 flex flex-col justify-between shadow-md"
        style="background-image: url('/images/office-banner.jpg'); background-size: cover; background-position: center;"
      >
        <!-- Atmospheric Dark Navy Gradient Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-[#0b172e]/92 via-[#112344]/75 via-45% to-[#112344]/20 pointer-events-none"
        />

        <!-- Top Right: Better Technology Brighter Tomorrow -->
        <div class="self-end text-right z-10 select-none">
          <div class="text-white font-bold text-xs sm:text-sm leading-tight tracking-tight">
            Better<br />
            Technology<br />
            Brighter<br />
            Tomorrow
          </div>
          <div class="mt-1 h-0.5 w-8 bg-blue-500 rounded-full ml-auto"></div>
        </div>

        <!-- Center / Lower Branding -->
        <div class="relative z-10 flex items-center gap-3.5 sm:gap-4 my-auto pt-2">
          <!-- Logo Box -->
          <div
            class="flex h-13 w-13 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5"
          >
            <img
              v-if="logoUrl"
              :src="logoUrl"
              alt="Company Logo"
              class="h-full w-full object-contain rounded-xl"
            />
            <span
              v-else
              class="text-xl sm:text-xl font-black bg-gradient-to-br from-[#2563EB] via-indigo-600 to-violet-600 bg-clip-text text-transparent"
            >
              {{ displayInitials }}
            </span>
          </div>

          <!-- Name & Tagline -->
          <div class="min-w-0">
            <div class="flex items-center gap-1.5 flex-wrap">
              <h3 class="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight truncate">
                {{ companyName || 'WebArtifacts' }}
              </h3>
              <span
                class="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-xs"
                title="Verified Employer"
              >
                <Check class="h-2.5 w-2.5 stroke-[3]" />
              </span>
            </div>

            <p class="text-xs sm:text-[13px] font-normal text-slate-200/90 mt-1 leading-snug line-clamp-2">
              {{ displayTagline }}
            </p>
          </div>
        </div>

        <!-- Bottom Metadata Row -->
        <div
          class="relative z-10 mt-4 flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-1 text-[11px] sm:text-xs font-medium text-slate-200/90"
        >
          <span class="flex items-center gap-1.5">
            <Globe class="h-3.5 w-3.5 text-slate-300 shrink-0" />
            <span>{{ displayWebsite }}</span>
          </span>

          <span class="flex items-center gap-1.5">
            <MapPin class="h-3.5 w-3.5 text-slate-300 shrink-0" />
            <span>{{ displayLocation }}</span>
          </span>

          <span class="flex items-center gap-1.5">
            <Users class="h-3.5 w-3.5 text-slate-300 shrink-0" />
            <span>{{ displaySize }}</span>
          </span>

          <span class="flex items-center gap-1.5">
            <Calendar class="h-3.5 w-3.5 text-slate-300 shrink-0" />
            <span>Est. {{ displayYear }}</span>
          </span>
        </div>
      </div>
</div>

    <!-- Native DOM Instant Sanitization Card -->
    <div class="rounded-2xl border border-violet-100 bg-[#f8faff] p-5 shadow-xs">
      <div class="flex items-center gap-2.5">
        <ShieldCheck class="h-6 w-6 text-violet-600 shrink-0" />
        <h3 class="text-sm font-bold text-violet-950">
          Native DOM Instant Sanitization
        </h3>
      </div>
      <div class="mt-3.5 space-y-2.5 pl-0.5">
        <div class="flex items-center gap-2.5 text-xs font-medium text-slate-700">
          <span class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white shadow-xs">
            <Check class="h-2.5 w-2.5 stroke-[3]" />
          </span>
          <span>Invalid characters stripped instantly on keystroke</span>
        </div>
        <div class="flex items-center gap-2.5 text-xs font-medium text-slate-700">
          <span class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white shadow-xs">
            <Check class="h-2.5 w-2.5 stroke-[3]" />
          </span>
          <span>Search bar blocks special symbols</span>
        </div>
        <div class="flex items-center gap-2.5 text-xs font-medium text-slate-700">
          <span class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white shadow-xs">
            <Check class="h-2.5 w-2.5 stroke-[3]" />
          </span>
          <span>PAN, GSTIN &amp; Phone strictly filtered per field rules</span>
        </div>
      </div>
    </div>
  </div>
</template>
