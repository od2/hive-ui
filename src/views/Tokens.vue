<template>
  <div class="columns">
    <div class="column is-three-quarters">
      <h1 class="title">Tokens</h1>
      <h2 class="subtitle">Auth tokens for Hive CLI tooling</h2>
    </div>
    <div class="column buttons">
      <button class="button is-primary">New</button>
      <button class="button is-danger is-outlined">Revoke All</button>
    </div>
  </div>
  <p>
    Hive CLI applications need tokens to run. Currently, they allow full access
    to the worker API.
    <br />
    They can only be seen on creation, so save them somewhere secure.
  </p>
  <hr />
  <table class="table" id="od2-tokens-list">
    <thead>
      <tr>
        <th>Description</th>
        <th>Token</th>
        <th>Created</th>
        <th>Last used</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="od2-col-expand">Test Token</td>
        <td class="od2-col-shrink"><code>...2bc3</code></td>
        <td class="od2-col-shrink">2020-11-11 11:11</td>
        <td class="od2-col-shrink">2021-01-23 03:50</td>
        <td class="od2-col-shrink">
          <button class="button is-small is-danger is-outlined">Revoke</button>
        </td>
      </tr>
      <tr>
        <td class="od2-col-expand">YouTube workers</td>
        <td class="od2-col-shrink"><code>...139f</code></td>
        <td class="od2-col-shrink">2020-11-11 11:12</td>
        <td class="od2-col-shrink">2021-01-23 03:50</td>
        <td class="od2-col-shrink">
          <button class="button is-small is-danger is-outlined">Revoke</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.od2-col-shrink {
  white-space: nowrap;
}

.od2-col-expand {
  width: 99%;
}

#od2-tokens-list {
  max-width: 50em;
}

td {
  vertical-align: middle;
}
</style>

<script>
export default {
  name: "Tokens"
};
</script>
