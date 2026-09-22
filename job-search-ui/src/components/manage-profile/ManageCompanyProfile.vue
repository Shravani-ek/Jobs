<script setup lang="ts">
import { ref } from "vue";
import {
  Upload,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  CalendarDays,
  Image as ImageIcon,
} from "lucide-vue-next";

export interface CompanyProfileForm {
  name: string;
  tagline: string;
  industry: string;
  companySize: string;
  foundedYear: string;
  about: string;
  logoUrl: string;
}

const props = defineProps<{
  form: CompanyProfileForm;
}>();

const emit = defineEmits<{
  (e: "back"): void;
  (e: "continue"): void;
}>();

const fileInputRef = ref<HTMLInputElement | null>(null);

const industryOptions = [
  "IT Services & Consulting",
  "Software & IT Services",
  "FinTech",
  "Healthcare & Life Sciences",
  "E-commerce & Retail",
  "Education & EdTech",
  "Manufacturing",
  "Media & Entertainment",
  "Consulting & Professional Services",
];

const companySizeOptions = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–500 employees",
  "501–1000 employees",
  "1000+ employees",
];

function triggerUpload() {
  fileInputRef.value?.click();
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        props.form.logoUrl = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  }
}

function removeLogo() {
  props.form.logoUrl = "";
  if (fileInputRef.value) {
    fileInputRef.value.value = "";
  }
}
</script>

<template>
  <section class="p-5 sm:p-6 pb-0 sm:pb-0">

    <!-- Hidden file input -->
    <input
      ref="fileInputRef"
      type="file"
      accept="image/png,image/jpeg,image/webp,image/svg+xml"
      class="hidden"
      @change="handleFileChange"
    />

    <!-- Form Content -->
    <div class="space-y-5">
      <!-- Company Logo Upload -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-wide text-slate-600">
          Company Logo
        </label>
        <div class="mt-2 flex flex-wrap items-center gap-4 rounded-lg border border-dashed border-slate-300 bg-slate-50/50 p-4 transition hover:border-violet-300">
          <!-- Logo Display Box -->
          <div
            class="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs"
          >
            <img
              v-if="form.logoUrl"
              :src="form.logoUrl"
              alt="Company logo preview"
              class="h-full w-full object-cover"
            />
            <div v-else class="flex flex-col items-center justify-center text-slate-400">
              <ImageIcon class="h-6 w-6 text-slate-300" />
              <span class="mt-0.5 text-[9px] font-semibold uppercase text-slate-400">Logo</span>
            </div>
          </div>

          <!-- Upload Info & Buttons -->
          <div class="flex-1 min-w-[200px]">
            <p class="text-xs font-semibold text-slate-700">Upload Company Logo</p>
            <p class="mt-0.5 text-[11px] text-slate-400">
              Recommended: Square PNG, JPG, or SVG (minimum 200x200px, max 2MB).
            </p>
            <div class="mt-2 flex items-center gap-2">
              <button
                type="button"
                @click="triggerUpload"
                class="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:border-slate-400"
              >
                <Upload class="h-3.5 w-3.5 text-slate-500" />
                <span>{{ form.logoUrl ? "Change Logo" : "Choose File" }}</span>
              </button>

              <button
                v-if="form.logoUrl"
                type="button"
                @click="removeLogo"
                class="text-xs font-medium text-rose-500 hover:text-rose-600"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Company Name & Tagline (2 columns on md) -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <!-- Company Name -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wide text-slate-600">
            Company Name
            <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.name"
            type="text"
            placeholder="e.g. WebArtifacts"
            class="mt-1.5 h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <!-- Tagline -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wide text-slate-600">
            Tagline
            <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.tagline"
            type="text"
            placeholder="e.g. Building digital experiences for a better tomorrow."
            class="mt-1.5 h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      <!-- Industry, Company Size, Founded Year -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <!-- Industry -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wide text-slate-600">
            Industry
            <span class="text-red-500">*</span>
          </label>
          <div class="relative mt-1.5">
            <select
              v-model="form.industry"
              class="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-8 text-sm text-slate-800 outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
            >
              <option v-for="ind in industryOptions" :key="ind" :value="ind">
                {{ ind }}
              </option>
            </select>
            <ChevronDown class="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <!-- Company Size -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wide text-slate-600">
            Company Size
            <span class="text-red-500">*</span>
          </label>
          <div class="relative mt-1.5">
            <select
              v-model="form.companySize"
              class="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-8 text-sm text-slate-800 outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
            >
              <option v-for="size in companySizeOptions" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
            <ChevronDown class="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <!-- Founded Year -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wide text-slate-600">
            Founded Year
            <span class="text-red-500">*</span>
          </label>
          <div class="relative mt-1.5">
            <input
              v-model="form.foundedYear"
              type="number"
              min="1800"
              max="2099"
              placeholder="e.g. 2020"
              class="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 pr-8 text-sm text-slate-800 outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
            />
            <CalendarDays class="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      <!-- About Company -->
      <div>
        <div class="flex items-center justify-between">
          <label class="block text-xs font-bold uppercase tracking-wide text-slate-600">
            About Company
          </label>
          <span class="text-[11px] text-slate-400">Describe your company, products, and services</span>
        </div>
        <textarea
          v-model="form.about"
          rows="4"
          placeholder="Describe your company, products, services, team culture, and expertise..."
          class="mt-1.5 w-full rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
        ></textarea>
      </div>

      <!-- Action Buttons (Sticky Fixed at Bottom) -->
      <div class="sticky bottom-0 z-10 mt-4 -mx-5 sm:-mx-6 flex items-center justify-between border-t border-slate-200 bg-white px-4 sm:px-6 py-2 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-b-lg">
        <button
          type="button"
          @click="emit('back')"
          class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 cursor-pointer"
        >
          <ArrowLeft class="h-3.5 w-3.5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          @click="emit('continue')"
          class="inline-flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-indigo-200 cursor-pointer"
        >
          <span>Save &amp; Continue</span>
          <ArrowRight class="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  </section>
</template>
