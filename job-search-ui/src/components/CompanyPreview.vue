<script setup lang="ts">
import {
  Building2,
  CalendarDays,
  Globe,
  MapPin,
  ShieldCheck,
  Users,
  Eye,
} from "lucide-vue-next";

withDefaults(
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
    logoUrl?: string;
    taxStatus?: string;
    profileLabel?: string;
    verified?: boolean;
  }>(),
  {
    companyName: "Company Name",
    industry: "Software & IT Services",
    legalInfo: "Legal company name",
    tagline: "Company tagline or mission statement will display here.",
    location: "India",
    companySize: "11-50 employees",
    organizationType: "Private",
    foundedYear: "2026",
    website: "",
    logoUrl: "",
    taxStatus: "Pending Docs",
    profileLabel: "Company Profile",
    verified: false,
  }
);
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between px-1">
      <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
        <Eye class="h-4 w-4 text-indigo-600" />
        <span>Live Card Preview</span>
      </div>
      <span class="text-xs text-slate-400">Employer Profile</span>
    </div>

    <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="p-5">
        <div class="flex items-start gap-3">
          <div class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-indigo-50">
            <img v-if="logoUrl" :src="logoUrl" alt="Company logo" class="h-full w-full object-cover" />
            <Building2 v-else class="h-7 w-7 text-indigo-600" />
          </div>

          <div class="min-w-0">
            <div class="flex items-center gap-1.5">
              <h3 class="truncate text-base font-bold text-slate-900">{{ companyName }}</h3>
              <ShieldCheck v-if="verified" class="h-4 w-4 shrink-0 text-emerald-500" />
            </div>
            <p class="mt-1 text-xs font-medium text-indigo-600">{{ industry }}</p>
            <p class="mt-1 truncate text-[10px] text-slate-400">Legal: {{ legalInfo }}</p>
          </div>
        </div>

        <p class="mt-4 text-xs italic leading-5 text-slate-500">"{{ tagline }}"</p>
        <div class="my-3 border-t border-slate-200"></div>

        <div class="grid grid-cols-2 gap-x-4 gap-y-3">
          <div class="flex items-center gap-2">
            <MapPin class="h-4 w-4 shrink-0 text-slate-400" />
            <span class="truncate text-xs text-slate-500">{{ location }}</span>
          </div>
          <div class="flex items-center gap-2">
            <Users class="h-4 w-4 shrink-0 text-slate-400" />
            <span class="truncate text-xs text-slate-500">{{ companySize }}</span>
          </div>
          <div class="flex items-center gap-2">
            <Building2 class="h-4 w-4 shrink-0 text-slate-400" />
            <span class="truncate text-xs text-slate-500">{{ organizationType }}</span>
          </div>
          <div class="flex items-center gap-2">
            <CalendarDays class="h-4 w-4 shrink-0 text-slate-400" />
            <span class="truncate text-xs text-slate-500">Est. {{ foundedYear }}</span>
          </div>
        </div>

        <div v-if="website" class="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
          <Globe class="h-4 w-4 text-indigo-500" />
          <span class="truncate text-xs font-medium text-indigo-600">{{ website }}</span>
        </div>

        <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <span class="text-[10px] font-bold text-slate-400">Tax Verification</span>
          <span class="text-[10px] text-slate-400">{{ taxStatus }}</span>
        </div>

        <button type="button" class="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-slate-100 text-xs font-semibold text-slate-600 transition hover:bg-slate-200">
          <Globe class="h-4 w-4" />
          {{ profileLabel }}
        </button>
      </div>
    </div>

    <div class="rounded-lg border border-indigo-100 bg-indigo-50/70 p-4">
      <div class="flex items-center gap-2">
        <ShieldCheck class="h-4 w-4 text-indigo-600" />
        <h3 class="text-xs font-bold text-indigo-800">Native DOM Instant Sanitization</h3>
      </div>
      <ul class="mt-2 space-y-1.5 pl-4 text-[11px] leading-4 text-indigo-700">
        <li class="list-disc">Invalid characters stripped instantly on keystroke</li>
        <li class="list-disc">Search bar blocks special symbols</li>
        <li class="list-disc">PAN, GSTIN &amp; Phone strictly filtered per field rules</li>
      </ul>
    </div>
  </div>
</template>
