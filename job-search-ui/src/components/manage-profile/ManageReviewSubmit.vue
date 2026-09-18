<script setup lang="ts">
import { ref } from "vue";
import {
  Building2,
  MapPin,
  FileText,
  Palette,
  ArrowLeft,
  CheckCircle2,
} from "lucide-vue-next";

import type { CompanyProfileForm } from "./ManageCompanyProfile.vue";
import type { ContactLocationForm } from "./ManageContactLocation.vue";
import type { LegalTaxForm } from "./ManageLegalTax.vue";
import type { BrandingBioForm } from "./ManageBrandingBio.vue";

const props = defineProps<{
  profile: CompanyProfileForm;
  contact: ContactLocationForm;
  legal: LegalTaxForm;
  branding: BrandingBioForm;
}>();

const emit = defineEmits<{
  (e: "back"): void;
  (e: "submit"): void;
}>();

const agreementAccepted = ref(true);
</script>

<template>
  <section
    class="custom-scroll h-full min-h-0 overflow-y-auto p-5 sm:p-6"
  >
    <div class="space-y-5">
      <!-- Summary Grid -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <!-- 1. Core Profile Summary -->
        <div class="rounded-lg border border-slate-200 bg-slate-50/50 p-4">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Building2 class="h-4 w-4 text-[#4F46E5]" />
            <span>Company Profile</span>
          </div>
          <div class="mt-3 space-y-1.5 text-xs">
            <div class="flex justify-between">
              <span class="text-slate-500">Company Name:</span>
              <span class="font-semibold text-slate-800">{{ profile.name || "N/A" }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Industry:</span>
              <span class="font-medium text-slate-800">{{ profile.industry }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Size:</span>
              <span class="font-medium text-slate-800">{{ profile.companySize }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Founded:</span>
              <span class="font-medium text-slate-800">{{ profile.foundedYear }}</span>
            </div>
            <div class="pt-1 text-[11px] text-slate-500 italic truncate">
              "{{ profile.tagline || 'No tagline set' }}"
            </div>
          </div>
        </div>

        <!-- 2. Contact & Location Summary -->
        <div class="rounded-lg border border-slate-200 bg-slate-50/50 p-4">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <MapPin class="h-4 w-4 text-[#4F46E5]" />
            <span>Contact &amp; Location</span>
          </div>
          <div class="mt-3 space-y-1.5 text-xs">
            <div class="flex justify-between">
              <span class="text-slate-500">Email:</span>
              <span class="font-medium text-slate-800">{{ contact.email || "N/A" }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Phone:</span>
              <span class="font-medium text-slate-800">{{ contact.phone || "N/A" }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Website:</span>
              <span class="font-medium text-[#4F46E5] truncate max-w-[180px]">{{ contact.website || "N/A" }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Location:</span>
              <span class="font-medium text-slate-800">{{ contact.city ? `${contact.city}, ${contact.country}` : contact.country }}</span>
            </div>
          </div>
        </div>

        <!-- 3. Legal & Tax Summary -->
        <div class="rounded-lg border border-slate-200 bg-slate-50/50 p-4">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <FileText class="h-4 w-4 text-[#4F46E5]" />
            <span>Legal &amp; Tax</span>
          </div>
          <div class="mt-3 space-y-1.5 text-xs">
            <div class="flex justify-between">
              <span class="text-slate-500">CIN / LLPIN:</span>
              <span class="font-medium text-slate-800 uppercase">{{ legal.cin || legal.llpin || "Not provided" }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">PAN:</span>
              <span class="font-medium text-slate-800 uppercase">{{ legal.pan || "Not provided" }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">GSTIN:</span>
              <span class="font-medium text-slate-800 uppercase">{{ legal.gstin || "Not provided" }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Verification Doc:</span>
              <span class="font-medium" :class="legal.uploadedFileName ? 'text-emerald-600' : 'text-slate-400'">
                {{ legal.uploadedFileName || "Pending Upload" }}
              </span>
            </div>
          </div>
        </div>

        <!-- 4. Branding Summary -->
        <div class="rounded-lg border border-slate-200 bg-slate-50/50 p-4">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Palette class="h-4 w-4 text-[#4F46E5]" />
            <span>Branding &amp; Social</span>
          </div>
          <div class="mt-3 space-y-1.5 text-xs">
            <div class="flex justify-between">
              <span class="text-slate-500">Mission:</span>
              <span class="font-medium text-slate-800 truncate max-w-[180px]">{{ branding.mission || "Not set" }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Vision:</span>
              <span class="font-medium text-slate-800 truncate max-w-[180px]">{{ branding.vision || "Not set" }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">LinkedIn:</span>
              <span class="font-medium text-[#4F46E5] truncate max-w-[180px]">{{ branding.linkedin || "Not set" }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">GitHub:</span>
              <span class="font-medium text-[#4F46E5] truncate max-w-[180px]">{{ branding.github || "Not set" }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Agreement Card -->
      <div class="rounded-lg border border-amber-200 bg-amber-50/60 p-4">
        <label class="flex items-start gap-3 cursor-pointer">
          <input
            v-model="agreementAccepted"
            type="checkbox"
            class="mt-1 h-4 w-4 rounded border-amber-300 text-[#4F46E5] focus:ring-indigo-200"
          />
          <div class="text-xs text-amber-900 leading-5">
            <span class="font-bold">Employer Representation Agreement:</span> I verify that I am an authorized officer or employer representative authorized to manage and publish this organization's official profile, branding assets, and job postings.
          </div>
        </label>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <button
          type="button"
          @click="emit('back')"
          class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50"
        >
          <ArrowLeft class="h-4 w-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          :disabled="!agreementAccepted"
          @click="emit('submit')"
          class="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle2 class="h-4 w-4" />
          <span>Save &amp; Publish Profile</span>
        </button>
      </div>
    </div>
  </section>
</template>
