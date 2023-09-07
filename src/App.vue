<script lang="ts" setup>
// import MaxGraph from './components/MaxGraph.vue'
import X6Graph from './components/X6Graph.vue'
// import { createEditor } from './editor'
// createEditor(this.$refs.rete as HTMLElement)
</script>

<template>
  <!-- <MaxGraph /> -->
  <!-- <X6Graph /> -->
  <nav>
    <RouterLink to="/x6graph">x6graph</RouterLink>
    <RouterLink to="/logicflowgraph">logicflowgraph</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped>
body {
  margin: 0;
}
.rete {
  width: 100vw;
  height: 100vh;
}
nav {
  margin: 5px 10px;
}

nav a {
  margin-right: 10px;
}
</style>
