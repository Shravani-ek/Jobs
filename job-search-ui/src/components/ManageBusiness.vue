<template>
  <section class="mt-3 space-y-4">

    <!-- ABOUT COMPANY -->
    <div
      class="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Building2 class="h-4 w-4 text-violet-600" />

          <h2 class="text-sm font-bold text-slate-800">
            ABOUT COMPANY
          </h2>
        </div>

        <button
          class="rounded-md border border-violet-200 px-3 py-1.5 text-[11px] font-semibold text-violet-600 hover:bg-violet-50"
        >
          + Add About
        </button>
      </div>

      <p class="mt-3 max-w-5xl text-md leading-5 text-slate-400">
        No company description added yet.
      </p>

      <div class="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">

        <div
          class="rounded-lg border border-slate-100 bg-slate-50/50 p-3"
        >
          <p class="text-xs font-bold uppercase text-violet-600">
            Mission
          </p>

          <p class="mt-2 text-sm leading-4 text-slate-400">
            Add your company mission.
          </p>
        </div>

        <div
          class="rounded-lg border border-slate-100 bg-slate-50/50 p-3"
        >
          <p class="text-xs font-bold uppercase text-violet-600">
            Vision
          </p>

          <p class="mt-2 text-sm leading-4 text-slate-400">
            Add your company vision.
          </p>
        </div>

      </div>
    </div>


    <!-- WHAT WE DO + COMPANY CULTURE -->
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">

      <!-- WHAT WE DO -->
      <div
        class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
      >
        <div class="flex items-center justify-between">

          <div class="flex items-center gap-2">
            <Settings class="h-4 w-4 text-violet-600" />

            <h2 class="text-sm font-bold text-slate-800">
              WHAT WE DO
            </h2>
          </div>

          <button
            class="rounded-md border border-violet-200 px-3 py-1 text-[10px] font-semibold text-violet-600"
          >
            Manage →
          </button>

        </div>

        <div class="mt-3 space-y-1">

          <p v-if="services.length === 0" class="text-xs text-slate-400">
            No services added yet.
          </p>

          <div
            v-for="service in services"
            :key="service"
            class="rounded-md bg-slate-50 px-3 py-2 text-[11px] text-slate-600"
          >
            {{ service }}
          </div>

        </div>

        <button
          class="mt-3 rounded-md border border-violet-200 px-3 py-1.5 text-[10px] font-semibold text-violet-600"
        >
          + Add Service
        </button>
      </div>


      <!-- COMPANY CULTURE -->
      <div
        class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
      >
        <div class="flex items-center justify-between">

          <div class="flex items-center gap-2">
            <Users class="h-4 w-4 text-violet-600" />

            <h2 class="text-sm font-bold text-slate-800">
              COMPANY CULTURE
            </h2>
          </div>

          <button
            class="rounded-md border border-violet-200 px-3 py-1 text-[10px] font-semibold text-violet-600"
          >
            + Add Culture
          </button>

        </div>

        <div v-if="cultureImages.length > 0" class="mt-3 grid grid-cols-3 gap-2">
          <div
            v-for="image in cultureImages"
            :key="image"
            class="h-20 overflow-hidden rounded-md bg-slate-100"
          >
            <img
              :src="image"
              class="h-full w-full object-cover"
              alt="Company culture"
            />
          </div>
        </div>

        <p v-else class="mt-3 text-xs text-slate-400">
          No culture photos added yet.
        </p>

        <button
          class="mt-3 rounded-md border border-violet-200 px-3 py-1.5 text-[10px] font-semibold text-violet-600"
        >
          + Add Photos
        </button>
      </div>

    </div>


    <!-- PROJECTS -->
    <div
      class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >

      <div class="flex items-center justify-between">

        <div class="flex items-center gap-2">
          <BriefcaseBusiness class="h-4 w-4 text-violet-600" />

          <h2 class="text-sm font-bold text-slate-800">
            PROJECTS / WORK SHOWCASE
          </h2>
        </div>

        <button
          class="rounded-md border border-violet-200 px-3 py-1 text-[10px] font-semibold text-violet-600"
        >
          + Add Project
        </button>

      </div>

      <div v-if="projects.length > 0" class="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">

        <div
          v-for="project in projects"
          :key="project.title"
          class="overflow-hidden rounded-lg border border-slate-200"
        >

          <div class="h-28 bg-slate-100">
            <img
              :src="project.image"
              class="h-full w-full object-cover"
              :alt="project.title"
            />
          </div>

          <div class="p-3">

            <h3 class="text-xs font-bold text-slate-800">
              {{ project.title }}
            </h3>

            <p class="mt-1 text-xs text-slate-500">
              {{ project.description }}
            </p>

            <div class="mt-2 flex flex-wrap gap-1">

              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="rounded-full bg-violet-50 px-2 py-1 text-[9px] text-violet-600"
              >
                {{ tech }}
              </span>

            </div>

          </div>

        </div>

      </div>

      <p v-else class="mt-4 text-xs text-slate-400">
        No projects added yet.
      </p>
    </div>


    <!-- LOWER SECTION -->
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">

      <!-- TEAM -->
      <div
        class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2"
      >
        <div class="flex items-center justify-between">

          <div class="flex items-center gap-2">
            <Users class="h-4 w-4 text-violet-600" />

            <h2 class="text-sm font-bold text-slate-800">
              OUR TEAM
            </h2>
          </div>

          <button
            class="rounded-md border border-violet-200 px-3 py-1 text-[10px] font-semibold text-violet-600"
          >
            + Add Member
          </button>

        </div>

        <div v-if="team.length > 0" class="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">

          <div
            v-for="member in team"
            :key="member.name"
            class="rounded-lg border border-slate-100 bg-slate-50 p-3 text-center"
          >

            <div
              class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-600"
            >
              {{ member.initial }}
            </div>

            <p class="mt-2 text-[10px] font-bold text-slate-700">
              {{ member.name }}
            </p>

            <p class="mt-1 text-[9px] text-slate-500">
              {{ member.role }}
            </p>

          </div>

        </div>

        <p v-else class="mt-4 text-xs text-slate-400">
          No team members added yet.
        </p>
      </div>


      <!-- ACHIEVEMENTS -->
      <div
        class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
      >
        <div class="flex items-center justify-between">

          <div class="flex items-center gap-2">
            <Trophy class="h-4 w-4 text-violet-600" />

            <h2 class="text-sm font-bold text-slate-800">
              ACHIEVEMENTS
            </h2>
          </div>

          <button
            class="text-[10px] font-semibold text-violet-600"
          >
            + Add Achievement
          </button>

        </div>

        <div v-if="achievements.length > 0" class="mt-4 space-y-4">

          <div
            v-for="achievement in achievements"
            :key="achievement.year"
            class="flex gap-3"
          >
            <div class="w-10 text-[10px] font-bold text-slate-500">
              {{ achievement.year }}
            </div>

            <div>
              <p class="text-[10px] font-bold text-slate-700">
                {{ achievement.title }}
              </p>

              <p class="mt-1 text-[9px] leading-4 text-slate-500">
                {{ achievement.description }}
              </p>
            </div>
          </div>

        </div>

        <p v-else class="mt-4 text-xs text-slate-400">
          No achievements added yet.
        </p>
      </div>

    </div>


    <!-- CLIENT FEEDBACK -->
    <div
      class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >

      <div class="flex items-center justify-between">

        <div class="flex items-center gap-2">
          <MessageSquare class="h-4 w-4 text-violet-600" />

          <h2 class="text-sm font-bold text-slate-800">
            CLIENT FEEDBACK
          </h2>
        </div>

        <button
          class="rounded-md border border-violet-200 px-3 py-1 text-[10px] font-semibold text-violet-600"
        >
          + Add Review
        </button>

      </div>

      <p class="mt-3 text-xs text-slate-400">
        No client feedback added yet.
      </p>
    </div>


    <!-- COMPANY UPDATES -->
    <div
      class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >

      <div class="flex items-center justify-between">

        <div class="flex items-center gap-2">
          <MessageSquare class="h-4 w-4 text-violet-600" />

          <h2 class="text-sm font-bold text-slate-800">
            COMPANY UPDATES
          </h2>
        </div>

        <button
          class="rounded-md border border-violet-200 px-3 py-1 text-[10px] font-semibold text-violet-600"
        >
          + New Post
        </button>

      </div>

      <div v-if="updates.length > 0" class="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">

        <div
          v-for="update in updates"
          :key="update.title"
          class="rounded-lg border border-slate-100 p-2"
        >

          <div class="h-24 overflow-hidden rounded-md bg-slate-100">
            <img
              :src="update.image"
              class="h-full w-full object-cover"
              alt=""
            />
          </div>

          <p class="mt-2 text-[9px] font-bold text-violet-600">
            {{ update.type }}
          </p>

          <h3 class="mt-1 text-[10px] font-bold text-slate-700">
            {{ update.title }}
          </h3>

          <p class="mt-1 text-[9px] text-slate-400">
            {{ update.date }}
          </p>

        </div>

      </div>

      <p v-else class="mt-3 text-xs text-slate-400">
        No company updates added yet.
      </p>
    </div>

  </section>
</template>

<script setup lang="ts">
import {
  Building2,
  Settings,
  Users,
  BriefcaseBusiness,
  Trophy,
  MessageSquare,
} from "lucide-vue-next";

const services: string[] = [];
const cultureImages: string[] = [];
const projects: {
  title: string;
  description: string;
  image: string;
  technologies: string[];
}[] = [];
const team: { name: string; role: string; initial: string }[] = [];
const achievements: {
  year: string;
  title: string;
  description: string;
}[] = [];
const updates: {
  type: string;
  title: string;
  date: string;
  image: string;
}[] = [];
</script>