<template>
  <h1 class="title is-1">Tokens</h1>
  <p>
    Hive CLI applications need tokens to run. Tokens grant full access to the
    worker API.
  </p>
  <hr />
  <h3 class="title is-4">Active Tokens</h3>
  <table class="table" id="od2-tokens-list">
    <thead>
      <tr>
        <th>Description</th>
        <th>Token</th>
        <th>Created</th>
        <th>Last used</th>
        <th>
          <button class="button is-fullwidth is-small is-danger is-outlined">
            Revoke All
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="od2-col-expand">Test Token</td>
        <td class="od2-col-shrink"><code>...2bc3</code></td>
        <td class="od2-col-shrink">2020-11-11 11:11</td>
        <td class="od2-col-shrink">2021-01-23 03:50</td>
        <td class="od2-col-shrink">
          <button class="button is-fullwidth is-small is-danger">Revoke</button>
        </td>
      </tr>
      <tr>
        <td class="od2-col-expand">YouTube workers</td>
        <td class="od2-col-shrink"><code>...139f</code></td>
        <td class="od2-col-shrink">2020-11-11 11:12</td>
        <td class="od2-col-shrink">2021-01-23 03:50</td>
        <td class="od2-col-shrink">
          <button class="button is-fullwidth is-small is-danger">Revoke</button>
        </td>
      </tr>
    </tbody>
  </table>
  <hr />
  <h3 class="title is-4">Create New Token</h3>
  <div class="columns mt-4">
    <div id="newTokenNameField" class="column field">
      <label class="label">Description</label>
      <div class="control">
        <input class="input" type="text" />
      </div>
      <p class="help">What's this token for?</p>
    </div>
    <div class="column is-narrow field">
      <div class="control">
        <button id="newTokenSubmit" class="button is-primary">Create</button>
      </div>
    </div>
  </div>
  <div class="notification is-primary is-light">
    <strong>Your Token:&ensp;</strong>
    <tt>HCzSGK1WSf4OlRQzcxk0uFwYo5riFOMI-ryAhSv6IlHdP</tt>
    <p class="mt-2">
      Be sure to save this token. You won't be able to see it again.
    </p>
  </div>
</template>

<style scoped>
#newTokenNameField {
  max-width: 30em;
}

@media (min-width: 48em) {
  #newTokenSubmit {
    margin-top: 24pt;
  }
}

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
  name: "Tokens",
  mounted() {
    this.$store.dispatch("listWorkerTokens");
  }
};
</script>
