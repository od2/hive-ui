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
          <li><a>Hive</a></li>
          <li><a href="#">Tokens</a></li>
        </ul>
      </nav>
      <router-view />
    </div>
  </main>
</template>

<style lang="scss">
@import "../node_modules/bulma/bulma.sass";
</style>
