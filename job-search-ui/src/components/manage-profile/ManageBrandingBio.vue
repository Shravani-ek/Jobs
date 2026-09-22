<script setup lang="ts">
import {
  ArrowLeft,
  ArrowRight,
  Share2,
} from "lucide-vue-next";

export interface BrandingBioForm {
  mission: string;
  vision: string;
  culture: string;
  linkedin: string;
  twitter: string;
  github: string;
}

const props = defineProps<{
  form: BrandingBioForm;
}>();

const emit = defineEmits<{
  (e: "back"): void;
  (e: "continue"): void;
}>();
</script>

<template>
  <section
    class="custom-scroll h-full min-h-0 overflow-y-auto p-5 sm:p-6"
  >
    <!-- Form Content -->
    <div class="space-y-5">
      <!-- Mission & Vision -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <!-- Mission -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wide text-slate-600">
            Company Mission
          </label>
          <textarea
            v-model="form.mission"
            rows="3"
            placeholder="e.g. Empowering businesses through world-class engineering and intuitive design."
            class="mt-1.5 w-full rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
          ></textarea>
        </div>

        <!-- Vision -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wide text-slate-600">
            Company Vision
          </label>
          <textarea
            v-model="form.vision"
            rows="3"
            placeholder="e.g. To be the premier digital transformation partner for high-growth global innovators."
            class="mt-1.5 w-full rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
          ></textarea>
        </div>
      </div>

      <!-- Company Culture & Perks -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-wide text-slate-600">
          Workplace Culture &amp; Values
        </label>
        <textarea
          v-model="form.culture"
          rows="3"
          placeholder="e.g. Collaborative, async-first environment prioritizing psychological safety, rapid iteration, and work-life harmony."
          class="mt-1.5 w-full rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
        ></textarea>
      </div>

      <!-- Social Presence -->
      <div class="pt-2 border-t border-slate-100">
        <div class="flex items-center gap-2 mb-3">
          <Share2 class="h-4 w-4 text-[#4F46E5]" />
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700">
            Social &amp; Developer Profiles
          </h3>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <!-- LinkedIn -->
          <div>
            <label class="block text-xs font-medium text-slate-600">LinkedIn URL</label>
            <input
              v-model="form.linkedin"
              type="url"
              placeholder="linkedin.com/company/webartifacts"
              class="mt-1.5 h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <!-- Twitter / X -->
          <div>
            <label class="block text-xs font-medium text-slate-600">Twitter / X URL</label>
            <input
              v-model="form.twitter"
              type="url"
              placeholder="x.com/webartifacts"
              class="mt-1.5 h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <!-- GitHub -->
          <div>
            <label class="block text-xs font-medium text-slate-600">GitHub / Open Source</label>
            <input
              v-model="form.github"
              type="url"
              placeholder="github.com/webartifacts"
              class="mt-1.5 h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100"
            />
          </div>
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
