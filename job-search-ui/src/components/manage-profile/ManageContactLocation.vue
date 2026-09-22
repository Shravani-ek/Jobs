<script setup lang="ts">
import {
  Mail,
  Phone,
  Globe,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
} from "lucide-vue-next";

export interface ContactLocationForm {
  email: string;
  phone: string;
  website: string;
  country: string;
  state: string;
  city: string;
  streetAddress: string;
  pincode: string;
}

const props = defineProps<{
  form: ContactLocationForm;
}>();

const emit = defineEmits<{
  (e: "back"): void;
  (e: "continue"): void;
}>();

const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Singapore",
  "Germany",
];

const indianStates = [
  "Karnataka",
  "Maharashtra",
  "Delhi NCR",
  "Telangana",
  "Tamil Nadu",
  "Gujarat",
  "Uttar Pradesh",
  "West Bengal",
  "Kerala",
  "Other",
];
</script>

<template>
  <section
    class="custom-scroll h-full min-h-0 overflow-y-auto p-5 sm:p-6"
  >
    <!-- Form Content -->
    <div class="space-y-5">
      <!-- Contact Details -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <!-- Email -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wide text-slate-600">
            Official Company Email
            <span class="text-red-500">*</span>
          </label>
          <div class="relative mt-1.5">
            <Mail class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              v-model="form.email"
              type="email"
              placeholder="e.g. contact@webartifacts.com"
              class="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <!-- Phone -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wide text-slate-600">
            Company Phone
            <span class="text-red-500">*</span>
          </label>
          <div class="relative mt-1.5">
            <Phone class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              v-model="form.phone"
              type="tel"
              placeholder="e.g. +91 9876543210"
              class="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>
      </div>

      <!-- Website URL -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-wide text-slate-600">
          Official Website URL
        </label>
        <div class="relative mt-1.5">
          <Globe class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            v-model="form.website"
            type="url"
            placeholder="e.g. https://webartifacts.com"
            class="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      <!-- Headquarters Heading -->
      <div class="pt-2">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700">
          Headquarters Location
        </h3>
      </div>

      <!-- Country, State, City -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <!-- Country -->
        <div>
          <label class="block text-xs font-medium text-slate-600">
            Country
            <span class="text-red-500">*</span>
          </label>
          <div class="relative mt-1.5">
            <select
              v-model="form.country"
              class="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-8 text-sm text-slate-800 outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
            >
              <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
            </select>
            <ChevronDown class="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <!-- State -->
        <div>
          <label class="block text-xs font-medium text-slate-600">
            State / Region
            <span class="text-red-500">*</span>
          </label>
          <div class="relative mt-1.5">
            <select
              v-model="form.state"
              class="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-8 text-sm text-slate-800 outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">Select State</option>
              <option v-for="st in indianStates" :key="st" :value="st">{{ st }}</option>
            </select>
            <ChevronDown class="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <!-- City -->
        <div>
          <label class="block text-xs font-medium text-slate-600">
            City
            <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.city"
            type="text"
            placeholder="e.g. Bangalore"
            class="mt-1.5 h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      <!-- Street Address & Pincode -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div class="md:col-span-2">
          <label class="block text-xs font-medium text-slate-600">
            Street Address / Office Unit
          </label>
          <input
            v-model="form.streetAddress"
            type="text"
            placeholder="e.g. 402, Outer Ring Road, Tech Park"
            class="mt-1.5 h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-600">
            Postal / ZIP Code
            <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.pincode"
            type="text"
            placeholder="e.g. 560103"
            class="mt-1.5 h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
          />
        </div>
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
          @click="emit('continue')"
          class="inline-flex items-center gap-2 rounded-lg bg-[#4F46E5] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <span>Save &amp; Continue</span>
          <ArrowRight class="h-4 w-4" />
        </button>
      </div>
    </div>
  </section>
</template>
