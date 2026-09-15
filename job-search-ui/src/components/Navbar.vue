<script setup lang="ts">
import {
  Compass,
  Users,
  MessageSquare,
  Bell,
  Search,
  ChevronDown,
  GraduationCap,
  ListChecks,
} from "lucide-vue-next";

import { ref } from "vue";
import { useRouter } from "vue-router";
import Dropdown from "./Dropdown.vue";

const router = useRouter();

const props = withDefaults(
  defineProps<{ showSecondary?: boolean }>(),
  {
    showSecondary: true,
  }
);

const emit = defineEmits<{
  (e: "mode-change", mode: string): void;
  (e: "search-change", query: string): void;
  (e: "open-my-activities"): void;
  (e: "navigate-seekers"): void;
  (e: "show-recommended-popup"): void;
}>();

const isProfileMenuOpen = ref(false);
const activeTab = ref("All category");
const jobsSearch = ref("");

const navItems = [
  { label: "Explore", icon: Compass, color: "text-violet-600" },
  { label: "Seekers", icon: GraduationCap, color: "text-brand-primary" },
  { label: "Network", icon: Users, color: "text-yellow-600" },
  { label: "Messages", icon: MessageSquare, color: "text-green-600" },
  { label: "Alerts", icon: Bell, color: "text-blue-600", badge: 2 },
];

const tabs = [
  "All category",
  "Internship",
  "Jobs",
  "Freshers",
  "Government openings",
  "Recommended",
];

function selectTab(tab: string) {
  activeTab.value = tab;

  if (tab === 'Recommended') {
    emit('show-recommended-popup');
    return;
  }

  emit('mode-change', tab);
}

function handleNavItemClick(label: string) {
  if (label === 'Seekers') {
    router.push('/');
    emit('navigate-seekers');
  }
}

function handleJobsSearchInput() {
  emit('search-change', jobsSearch.value);
}
</script>

<template>
  <nav class="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-6 py-2">
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2">
          <div>
            <h1 class="text-3xl font-semibold tracking-tight text-brand-primary">
              NxtTurn
            </h1>
          </div>
        </div>

        <div class="hidden xl:flex flex-1">
          <div class="relative w-full">
            <input
              type="text"
              placeholder="Search for users or content..."
              class="w-full h-10 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none placeholder:text-gray-400 focus:border-gray-200"
            />
          </div>
        </div>

        <div class="ml-auto hidden lg:flex items-center gap-4">
          <div
            v-for="item in navItems"
            :key="item.label"
            class="relative flex flex-col items-center gap-1 text-slate-500 transition cursor-pointer"
            @click="handleNavItemClick(item.label)"
          >
            <component
              :is="item.icon"
              :class="['w-5 h-5', item.color]"
            />
            <span class="text-[12px] font-medium text-slate-600">{{ item.label }}</span>
            <span
              v-if="item.badge"
              class="absolute -top-1 right-0 inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[10px] text-white"
            >
              {{ item.badge }}
            </span>
          </div>

          <div class="relative profile-dropdown-wrapper">
            <button
              @click="isProfileMenuOpen = !isProfileMenuOpen"
              class="flex items-center gap-2 rounded-full p-1 transition hover:bg-slate-100"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-full bg-brand-dark text-white font-bold"
              >
                S
              </div>

              <ChevronDown
                class="h-4 w-4 text-slate-500 transition-transform duration-200"
                :class="{ 'rotate-180': isProfileMenuOpen }"
              />
            </button>

            <Dropdown
              v-if="isProfileMenuOpen"
              @company-dashboard="isProfileMenuOpen = false"
              @settings="isProfileMenuOpen = false"
              @help="isProfileMenuOpen = false"
              @accessibility="isProfileMenuOpen = false"
              @feedback="isProfileMenuOpen = false"
              @logout="isProfileMenuOpen = false"
            />
          </div>
        </div>

        <div class="lg:hidden ml-auto relative profile-dropdown-wrapper">
          <button
            @click="isProfileMenuOpen = !isProfileMenuOpen"
            class="flex items-center gap-2 rounded-full p-1 transition hover:bg-slate-100"
          >
            <div
              class="flex h-11 w-11 items-center justify-center rounded-full bg-brand-dark text-white font-bold"
            >
              S
            </div>

            <ChevronDown
              class="h-4 w-4 text-slate-500 transition-transform duration-200"
              :class="{ 'rotate-180': isProfileMenuOpen }"
            />
          </button>

          <Dropdown
            v-if="isProfileMenuOpen"
            @company-dashboard="isProfileMenuOpen = false"
            @settings="isProfileMenuOpen = false"
            @help="isProfileMenuOpen = false"
            @accessibility="isProfileMenuOpen = false"
            @feedback="isProfileMenuOpen = false"
            @logout="isProfileMenuOpen = false"
          />
        </div>
      </div>

      <div v-if="props.showSecondary" class="mt-3 border-t border-slate-200"></div>
      <div v-if="props.showSecondary" class="mt-3 grid grid-cols-[auto_1fr_auto] items-center gap-2 min-w-0">
        <div class="flex items-center gap-2 min-w-0">
          <div class="flex items-center gap-2 text-[18px] font-semibold tracking-tight text-[#A100FF]">
            <GraduationCap class="h-5 w-5 text-brand-primary" />
            <span>Seekers</span>
          </div>
          <div class="flex items-center gap-2 min-w-0 overflow-hidden">
            <button
              v-for="tab in tabs"
              :key="tab"
              @click="selectTab(tab)"
              class="whitespace-nowrap border-b-2 border-transparent px-4 py-1.5 text-14px font-medium transition hover:border-brand-primary hover:text-brand-primary"
              :class="activeTab === tab ? 'border-brand-primary text-brand-primary' : 'text-slate-700'"
            >
              {{ tab }}
            </button>
          </div>
        </div>

        <div class="flex items-center justify-center min-w-0">
          <div class="flex items-center h-10 w-full max-w-xl rounded-full border border-slate-200 bg-white px-2 shadow-sm mx-auto">
            <Search class="w-4 h-4 text-slate-400" />
            <input
              v-model="jobsSearch"
              @input="handleJobsSearchInput"
              placeholder="Search jobs by title, skill or company"
              class="ml-3 w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <div class="flex items-center justify-end min-w-0">
          <button
            @click="$emit('open-my-activities')"
            class="btn-primary inline-flex h-9 items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold shadow-sm"
            style="background-color: #F3F4F6; color: #1F2937;"
          >
            <ListChecks class="h-4 w-4" />
            My Activities
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>