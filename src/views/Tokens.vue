<template>
  <h1 class="title is-1">Tokens</h1>
  <p>
    Hive CLI applications need tokens to run. Tokens grant full access to the
    worker API.
  </p>
  <hr />
  <h3 class="title is-4">Active Tokens</h3>
  <table class="table" id="tokens-list">
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
        <td class="od2-col-shrink"><tt>&hellip;2bc3</tt></td>
        <td class="od2-col-shrink">2020-11-11 11:11</td>
        <td class="od2-col-shrink">2021-01-23 03:50</td>
        <td class="od2-col-shrink">
          <button class="button is-fullwidth is-small is-danger">Revoke</button>
        </td>
      </tr>
      <tr>
        <td class="od2-col-expand">YouTube workers</td>
        <td class="od2-col-shrink"><tt>&hellip;139f</tt></td>
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
    <div id="new-token-name-field" class="column field">
      <label class="label">Description</label>
      <div class="control">
        <input class="input" type="text" />
      </div>
      <p class="help">What's this token for?</p>
    </div>
    <div class="column is-narrow field">
      <div class="control">
        <button id="new-token-submit" class="button is-primary">Create</button>
      </div>
    </div>
  </div>
  <div id="copy-token-notification" class="notification is-primary is-light">
    <div>
      <strong>Your Token:&ensp;</strong>
      <tt>HCzSGK1WSf4OlRQzcxk0uFwYo5riFOMI-ryAhSv6IlHdP</tt>
      &ensp;
      <button id="copy-token-button" class="button is-small">
        <span class="icon is-small has-text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="white"
              d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"
            />
          </svg>
        </span>
      </button>
      <p class="mt-2">
        Be sure to save this token. You won't be able to see it again.
      </p>
    </div>
  </div>
</template>

<style scoped>
#new-token-name-field {
  max-width: 37rem;
}

@media (min-width: 48em) {
  #new-token-submit {
    margin-top: 24pt;
  }
}

#copy-token-button {
  background: #00947e;
  color: white;
  border: none;
  vertical-align: baseline;
  top: 0.3333rem;
  font-size: 0.9rem;
}

#copy-token-outline {
  fill: #00947e;
}

#copy-token-notification {
  max-width: 42rem;
  padding-bottom: 24pt;
  display: flex;
  justify-content: space-around;
}
.od2-col-shrink {
  white-space: nowrap;
}

.od2-col-expand {
  width: 99%;
}

#tokens-list {
  max-width: 42rem;
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
