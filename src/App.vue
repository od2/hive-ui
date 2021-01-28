<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Home</router-link>
      </div>
      <div class="navbar-end">
        <a class="navbar-item">Login</a>
      </div>
    </div>
  </nav>
  <main class="section">
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li v-for="crumb in crumbs" :key="crumb.path">
            <router-link :to="crumb.path">{{ crumb.name }}</router-link>
          </li>
        </ul>
      </nav>
      <router-view />
    </div>
  </main>
</template>

<style lang="scss">
@import "../node_modules/bulma/bulma.sass";
</style>

<script>
export default {
  computed: {
    crumbs: function() {
      const route = this.$router.currentRoute.value;
      const crumbs = [];
      crumbs.push({ name: "Hive", path: "/" });
      // TODO Support nested routes
      if (route.path != "/")
        crumbs.push({ name: route.name, path: route.path });
      return crumbs;
    }
  }
};
</script>
