<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          AI Business Optimizer
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
      <div class="text-center">
        © 2023 AI Business Optimizer
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}
</style>