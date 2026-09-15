<script setup lang="ts">
import ProfileCompletion from "./ProfileCompletion.vue";
import PeopleSuggestions from "./PeopleSuggestions.vue";
import FeaturedOpportunity from "./FeaturedOpportunity.vue";
</script>

<template>
  <div class="mt-0 space-y-3 max-w-[300px] rounded-2xl">

    <ProfileCompletion />

    <PeopleSuggestions />

    <FeaturedOpportunity />

  </div>
</template>